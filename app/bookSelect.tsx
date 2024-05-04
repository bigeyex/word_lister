import { ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import BigBookIcon from '@/assets/icons/BigBookIcon.svg';
import BigBookIconSelected from '@/assets/icons/BigBookIconSelected.svg';
import MinusSign from '@/assets/icons/MinusSign.svg';
import PlusSign from '@/assets/icons/PlusSign.svg';
import CheckmarkAccent from '@/assets/icons/CheckmarkAccent.svg';
import commonStyles from '@/constants/commonStyles';
import theme from '@/constants/theme';
import ModalHeader from '@/components/ModalHeader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import WordBooks from '@/constants/wordBooks';
import { setBookKey, setPlanDays, toggleClearProgress } from '@/store/bookList';
import { changeUserBook } from '@/store/userProfile';
import { router } from 'expo-router';
import { persistor } from '@/store/store';

export default function TabOneScreen() {
    let selectedBookKey = useAppSelector(store => store.bookList.selectedBookKey)
    let clearProgress = useAppSelector(store => store.bookList.clearProgress)
    if(selectedBookKey === '') {
        selectedBookKey = WordBooks[0].key
    }
    const planDays = useAppSelector(store => store.bookList.planDays)
    const wordsPerDay = Math.ceil(WordBooks.filter(book => book.key === selectedBookKey)[0].wordCount / planDays)
    const dispatch = useAppDispatch();

    const gallaryItems = WordBooks.map(item => {        
        return <TouchableOpacity key={item.key}>
            <View onTouchEnd={() => dispatch(setBookKey(item.key))} 
                    style={selectedBookKey === item.key ? styles.bookGallaryItemSelected: styles.bookGallaryItem}>
                <Text style={selectedBookKey === item.key ? styles.bookGallaryTitleSelected: styles.bookGallaryTitle}>{item.name}</Text>
                <Text style={styles.bookGallarySubTitle}>{item.wordCount}词</Text>
                { selectedBookKey === item.key ? <BigBookIconSelected/> : <BigBookIcon/> }
            </View>
        </TouchableOpacity>
    })

    return (
        <SafeAreaView style={commonStyles.masterContainer}>
            <ModalHeader title="选择单词书"/>

            <ScrollView>
                <View style={styles.bookGallary}>
                    {gallaryItems}
                </View>
            </ScrollView>

            <View style={styles.bookSelectFooter}>
                <View style={styles.planControl}>
                    <View style={commonStyles.fill}>
                        <Text style={styles.planControlLabel}>希望多少天背完？</Text>
                        <Text style={styles.planControlSubLabel}>每天{wordsPerDay}个新单词</Text>
                    </View>
                    <View style={styles.planControlNumeric}>
                        <TouchableOpacity><View style={styles.planControlNumericButton}
                            onTouchEnd={() => dispatch(setPlanDays(planDays - 1))}><MinusSign/></View></TouchableOpacity>
                        <TextInput keyboardType="numeric" style={styles.planControlNumberInput} defaultValue={'' + planDays}
                            onChangeText={text => dispatch(setPlanDays(parseInt(text)))}/>
                        <TouchableOpacity><View style={styles.planControlNumericButton}
                            onTouchEnd={() => dispatch(setPlanDays(planDays + 1))}><PlusSign/></View></TouchableOpacity>
                    </View>
                </View>

                <View style={styles.planControl}>
                    <TouchableOpacity>
                        <View style={clearProgress ? styles.clearProgressCheckboxSelected : styles.clearProgressCheckbox }
                            onTouchEnd={() => dispatch(toggleClearProgress())}>
                            { clearProgress ? <CheckmarkAccent/> : ''}
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.clearProgressText}>清除之前的进度</Text>
                    
                </View>

                <TouchableOpacity>
                    <View style={styles.bookSelectActionButton} onTouchEnd={() => {
                        dispatch(changeUserBook({key: selectedBookKey, planDays: planDays, clearProgress: clearProgress}))
                        router.back()
                        }}>
                        <Text style={styles.bookSelectActionText}>开始计划</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
                
        </SafeAreaView>
    );
}


const basicStyles = StyleSheet.create({
    bookGallary: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        gap: 10,
    },

    bookGallaryItem: {
        width: 144,
        height: 144,
        backgroundColor: theme.secondaryBg,
        borderRadius: 20,
        padding: 12,
        gap: 4,
    },

    bookGallaryTitle: {
        fontSize: 16,
        fontWeight: '500',
    },

    bookGallarySubTitle: {
        flex: 1,
        fontSize: 12,
        color: theme.dimmedTextColor,
    },


    bookSelectFooter: {
        gap: 12,
    },

    planControl: {
        flexDirection: 'row',
        alignItems: 'center',

    },

    planControlLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    planControlSubLabel: {
        fontSize: 12,
        color: theme.dimmedTextColor,
    },

    planControlNumeric: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },

    planControlNumericButton: {
        padding: 10,
    },

    planControlNumberInput: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: theme.accentBg,
        color: theme.accent,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    clearProgressText: {
        marginLeft: 10,
        color: theme.dimmedTextColor,
    },

    clearProgressCheckbox: {
        width: 28,
        height: 28,
        backgroundColor: theme.unselectedBg,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    bookSelectActionButton: {
        height: 48,
        backgroundColor: theme.primaryBg,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    bookSelectActionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

const styles = StyleSheet.create({
    ...basicStyles,

    bookGallaryItemSelected: {
        ...basicStyles.bookGallaryItem,
        backgroundColor: theme.accentBg,
    },

    clearProgressCheckboxSelected: {
        ...basicStyles.clearProgressCheckbox,
        backgroundColor: theme.accentBg,
    },

    bookGallaryTitleSelected: {
        ...basicStyles.bookGallaryTitle,
        color: theme.accent,
    },
})