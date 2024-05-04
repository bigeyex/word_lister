import { StyleSheet, ScrollView, Animated } from 'react-native';

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

const ScrollYToShowWord = 200;

export default function TabOneScreen() {

    const scrollY = new Animated.Value(0);
    const demoData = [
        { word: 'インフォメーション', detail: ['information', '④【名】信息，通知，报告；问讯处'], selected: true },
        { word: '足跡', detail: ['あしあと', '④【名】信息，通知，报告；问讯处'], selected: false },
        { word: 'この方', detail: ['information', '④【名】信息，通知，报告；问讯处'], selected: false },
        { word: 'きょうかん', detail: ['あしあと', '④【名】信息，通知，报告；问讯处'], selected: false },
        { word: '免除', detail: ['information', '④【名】信息，通知，报告；问讯处'], selected: false },
        { word: '法廷', detail: ['あしあと', '④【名】信息，通知，报告；问讯处'], selected: false },
        { word: '罵る', detail: ['information', '④【名】信息，通知，报告；问讯处'], selected: false },
        { word: '足跡', detail: ['あしあと', '④【名】信息，通知，报告；问讯处'], selected: false },
        { word: 'この方', detail: ['information', '④【名】信息，通知，报告；问讯处'], selected: false },
    ];

    return (
        <SafeAreaView style={commonStyles.masterContainer}>
        <ModalHeader title="List5"/>
        <Animated.ScrollView style={styles.scrollContainer} onScroll={Animated.event(
                [{ nativeEvent: {contentOffset: {y: scrollY}}}], 
                {useNativeDriver: false})}>
            <View style={styles.upScrollGuide}>
                <UpArrow />
                <Text style={styles.upScrollGuideText}>向上滚动显示释义</Text>
            </View>
            <View style={styles.wordList}>
                { demoData.map((data, index) => (
                    <WordListItem selected={data.selected} key={index} word={data.word} detail={data.detail} scrollY={scrollY}/>
                ))}
            </View>
            <View style={styles.wordListFinishButton}>
                <Text style={styles.wordListFinishButtonText}>完成列表</Text>
            </View>
        </Animated.ScrollView>
        </SafeAreaView>
    );
}

interface WordListItemProps {word: string, detail: string[], scrollY: Animated.Value, selected?: boolean};
const WordListItem = ({word, detail, scrollY, selected=false}:WordListItemProps) => {
    const detailText = detail.map((text, key) => <Text key={key}>{text}</Text>)
    const [selfLayoutY, setSelfLayoutY] = useState(0);
    const animatedOpacityStyle = {
        opacity: scrollY.interpolate({
            inputRange: [ScrollYToShowWord+selfLayoutY, ScrollYToShowWord+selfLayoutY+20],
            outputRange: [0, 1],
        })
    }

    return <View style={styles.wordListItem} onLayout={(e) => { setSelfLayoutY(e.nativeEvent.layout.y) }}>
        <View style={styles.wordListFavorateButton}>
            {selected ? <FavIconSelected/> : <FavIcon/>}
        </View>
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
        width: 164,
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
