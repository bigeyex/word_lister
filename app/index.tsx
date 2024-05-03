import { Image, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookIcon from '@/assets/icons/BookIcon.svg';
import Checkmark from '@/assets/icons/Checkmark.svg';
import commonStyles from '@/constants/commonStyles';
import theme from '@/constants/theme';

export default function TabOneScreen() {
  return (
    <SafeAreaView style={commonStyles.masterContainer}>
        <View style={commonStyles.row}>
            <View style={commonStyles.fill}>
                <Text style={commonStyles.h1}>今日任务</Text>
                <Text style={commonStyles.auxText}>第10/20天 日语N1单词</Text>
            </View>
            <View style={styles.changeBookButton}>
                {/* <Image source={require('@/assets/images/bookIcon.png')}/> */}
                <BookIcon />
                <Text style={{flex: 0}}>换书</Text>
            </View>
        </View>
        <View style={styles.checkboxList}>
            <View style={styles.checkboxListItem}>
                <View style={styles.checkboxListCheckboxSelected}>
                    <Checkmark/>
                </View>
                <Text style={styles.checkboxListText}>List 2</Text>
            </View>
            <View style={styles.checkboxListItem}>
                <View style={styles.checkboxListCheckbox}>
                </View>
                <Text style={styles.checkboxListText}>List 2 当日复习</Text>
            </View>
        </View>

        <View style={styles.checkboxList}>
            <Text style={commonStyles.dimmedH2}>明日任务</Text>
            <View style={styles.checkboxListItem}>
                <View style={styles.checkboxListCheckbox}>
                </View>
                <Text style={styles.checkboxListText}>List 2 复习</Text>
            </View>
        </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  changeBookButton: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: theme.secondaryBg,
    height: 36,
    alignItems: 'center',
    borderRadius: 18,

  },

  checkboxList: {
    gap: 8
  },

  checkboxListItem: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexDirection: 'row',
    backgroundColor: theme.secondaryBg,
    borderRadius: 20,
    gap: 10,
    alignItems: 'center',
  },

  checkboxListCheckbox: {
    padding: 8,
    height: 36,
    width: 36,
    borderRadius: 10,
    backgroundColor: theme.unselectedBg,
  },

  checkboxListCheckboxSelected: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: theme.selectedBg,
  },


  checkboxListText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
