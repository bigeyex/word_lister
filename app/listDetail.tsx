import { StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import UpArrow from '@/assets/icons/UpArrow.svg';
import FavIcon from '@/assets/icons/FavIcon.svg';
import FavIconSelected from '@/assets/icons/FavIconSelected.svg';
import commonStyles from '@/constants/commonStyles';
import theme from '@/constants/theme';
import ModalHeader from '@/components/ModalHeader';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { TaskInfoType, WordListItemType, toggleFavorite } from '@/store/wordList';
import { saveFavourite } from '@/store/userProfile';
import { finishTask, finishTaskInList } from '@/store/plan';
import { getTaskTitle } from '@/constants/globals';

const ScrollYToShowWord = 200;
let lastScrollY = 0;

export default function listDetailScreen() {
    const wordList:WordListItemType[] = useAppSelector(store => store.wordList.wordList)
    const taskInfo:TaskInfoType = useAppSelector(store => store.wordList.taskInfo)
    const scrollY = new Animated.Value(lastScrollY);
    scrollY.addListener(v => lastScrollY=v.value)
    const dispatch = useAppDispatch();

    return (
        <SafeAreaView style={commonStyles.masterContainer}>
        <ModalHeader title={getTaskTitle(taskInfo.day, taskInfo.isRevisit)}/>
        <Animated.ScrollView style={styles.scrollContainer} onScroll={Animated.event(
                [{ nativeEvent: {contentOffset: {y: scrollY}}}], 
                {useNativeDriver: true})}>
            <View style={styles.upScrollGuide}>
                <UpArrow />
                <Text style={styles.upScrollGuideText}>向上滚动显示释义</Text>
            </View>
            <View style={styles.wordList}>
                { wordList.map((data, index) => (
                    <WordListItem favorited={data.favorited} key={index} word={data.name} detail={data.desc} scrollY={scrollY} wordIndex={data.wordIndex}/>
                ))}
            </View>
            <TouchableOpacity>
                <View style={styles.wordListFinishButton} onTouchEnd={() => {
                    const day = taskInfo.isRevisit ? taskInfo.day : -1
                    dispatch(finishTask({day: day}))
                    router.back()
                }}>
                    <Text style={styles.wordListFinishButtonText}>完成列表</Text>
                </View>
            </TouchableOpacity>
        </Animated.ScrollView>
        </SafeAreaView>
    );
}

interface WordListItemProps {word: string, detail: string[], scrollY: Animated.Value, wordIndex: number, favorited?: boolean};
const WordListItem = ({word, detail, scrollY, wordIndex, favorited=false}:WordListItemProps) => {
    const detailText = detail.map((text, key) => <Text key={key} style={styles.wordListDetailText}>{text}</Text>)
    const [selfLayoutY, setSelfLayoutY] = useState(0);
    const dispatch = useAppDispatch();
    const animatedOpacityStyle = {
        opacity: scrollY.interpolate({
            inputRange: [ScrollYToShowWord+selfLayoutY, ScrollYToShowWord+selfLayoutY+20],
            outputRange: [0, 1],
        })
    }

    return <View style={styles.wordListItem} 
            onLayout={(e) => { setSelfLayoutY(e.nativeEvent.layout.y) }}
            onTouchEnd={() => { 
                dispatch(toggleFavorite(wordIndex))
                dispatch(saveFavourite({wordIndex: wordIndex, isFavorated: !favorited}))
            }}>
        <TouchableOpacity>
            <View style={styles.wordListFavorateButton}>
                {favorited ? <FavIconSelected/> : <FavIcon/>}
            </View>
        </TouchableOpacity>
        
        <Text style={styles.wordListWord}>{word}</Text>
        <Animated.View style={[styles.wordListDetail, animatedOpacityStyle]}>
            {detailText}
        </Animated.View>
    </View>
}


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },

    upScrollGuide: {
        height: 400,
        marginBottom: 50,
        gap: 8,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    upScrollGuideText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.dimmedTextColor,
    },

    wordList: {
        gap: 12,
    },

    wordListItem: {
        flexDirection: 'row',
    },

    wordListFavorateButton: {

    },

    wordListWord: {
        fontSize: 16,
        fontWeight: 'bold', 
        color: theme.textColor,
        width: 108,
        textAlign: 'right',
        marginRight: 28,
    },

    wordListDetail: {
        gap: 4,
        width: 164,
    },

    wordListDetailText: {
        color: theme.textColor,
        fontSize: 14,
        width: 140,
        
    },

    wordListFinishButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: theme.secondaryBg,
        height: 50,
        width: 200,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 18,
        marginTop: 50,
        marginBottom: 250,
    },

    wordListFinishButtonText: {
        color: theme.primaryBg,
    }
});
