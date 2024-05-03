import { Image, ScrollView, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/assets/icons/BackButton.svg';
import BigBookIcon from '@/assets/icons/BigBookIcon.svg';
import BigBookIconSelected from '@/assets/icons/BigBookIconSelected.svg';
import MinusSign from '@/assets/icons/MinusSign.svg';
import PlusSign from '@/assets/icons/PlusSign.svg';
import commonStyles from '@/constants/commonStyles';
import theme from '@/constants/theme';

export default function TabOneScreen() {
  return (
    <SafeAreaView style={commonStyles.masterContainer}>
        <View style={styles.modalHeader}>
            <View style={styles.backButton}>
                <BackButton/>
            </View>
            <Text style={commonStyles.h1}>选择单词书</Text>
        </View>

        <ScrollView>
            <View style={styles.bookGallary}>
                <View style={styles.bookGallaryItemSelected}>
                    <Text style={styles.bookGallaryTitleSelected}>日语N2单词</Text>
                    <Text style={styles.bookGallarySubTitle}>1200词</Text>
                    <BigBookIconSelected/>
                </View>
                <View style={styles.bookGallaryItem}>
                    <Text style={styles.bookGallaryTitle}>日语N2单词</Text>
                    <Text style={styles.bookGallarySubTitle}>1200词</Text>
                    <BigBookIcon/>
                </View>
                <View style={styles.bookGallaryItem}>
                    <Text style={styles.bookGallaryTitle}>日语N2单词</Text>
                    <Text style={styles.bookGallarySubTitle}>1200词</Text>
                    <BigBookIcon/>
                </View>
                <View style={styles.bookGallaryItem}>
                    <Text style={styles.bookGallaryTitle}>日语N2单词</Text>
                    <Text style={styles.bookGallarySubTitle}>1200词</Text>
                    <BigBookIcon/>
                </View>
                <View style={styles.bookGallaryItem}>
                    <Text style={styles.bookGallaryTitle}>日语N2单词</Text>
                    <Text style={styles.bookGallarySubTitle}>1200词</Text>
                    <BigBookIcon/>
                </View>
                <View style={styles.bookGallaryItem}>
                    <Text style={styles.bookGallaryTitle}>日语N2单词</Text>
                    <Text style={styles.bookGallarySubTitle}>1200词</Text>
                    <BigBookIcon/>
                </View>
                <View style={styles.bookGallaryItem}>
                    <Text style={styles.bookGallaryTitle}>日语N2单词</Text>
                    <Text style={styles.bookGallarySubTitle}>1200词</Text>
                    <BigBookIcon/>
                </View>
            </View>
        </ScrollView>

        <View style={styles.bookSelectFooter}>
            <View style={styles.planControl}>
                <View style={commonStyles.fill}>
                    <Text style={styles.planControlLabel}>希望多少天背完？</Text>
                    <Text style={styles.planControlSubLabel}>每天30分钟，90个新单词</Text>
                </View>
                <View style={styles.planControlNumeric}>
                    <MinusSign/>
                    <TextInput keyboardType="numeric" style={styles.planControlNumberInput} defaultValue={"30"}/>
                    <PlusSign/>
                </View>
            </View>
            <View style={styles.bookSelectActionButton}>
                <Text style={styles.bookSelectActionText}>开始计划</Text>
            </View>
        </View>
            
    </SafeAreaView>
  );
}


const basicStyles = StyleSheet.create({
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.secondaryBg,
        alignItems: "center",
        justifyContent: "center",
    },

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
        gap: 16,
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
        gap: 12,
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

    bookGallaryTitleSelected: {
        ...basicStyles.bookGallaryTitle,
        color: theme.accent,
    },
})