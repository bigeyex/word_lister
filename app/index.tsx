import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useRootNavigationState } from 'expo-router';
import { useAppSelector } from '@/store/hooks'
import BookIcon from '@/assets/icons/BookIcon.svg';
import Checkmark from '@/assets/icons/Checkmark.svg';
import commonStyles from '@/constants/commonStyles';
import theme from '@/constants/theme';
import { useEffect } from 'react';

export default function TaskScreen() {
  const currentBookKey = useAppSelector(state => state.userProfile.currentBookKey)
  const progressByBook = useAppSelector(state => state.userProfile.progressByBook)
  console.log('userProgress', progressByBook);

  const rootNavigationState = useRootNavigationState();
  const navigatorReady = rootNavigationState?.key != null
  useEffect(() => {
    if (!navigatorReady) return
    if (currentBookKey === '') {
      router.navigate('/bookSelect')
    }
  }, [navigatorReady])
  
  
  return (
    <SafeAreaView style={commonStyles.masterContainer}>
        <View style={commonStyles.row}>
            <View style={commonStyles.fill}>
                <Text style={commonStyles.h1}>今日任务</Text>
                <Text style={commonStyles.auxText}>第10/20天 日语N1单词</Text>
            </View>
            <View style={styles.changeBookButton} onTouchEnd={() => router.navigate('/bookSelect')}>
                {/* <Image source={require('@/assets/images/bookIcon.png')}/> */}
                <BookIcon />
                <Text style={styles.changeBookButtonText}>换书</Text>
            </View>
        </View>
        <View style={styles.checkboxList}>
            
              <View style={styles.checkboxListItem} onTouchEnd={() => router.navigate('/listDetail')}>
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

  changeBookButtonText: {
    color: theme.primaryBg,
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
