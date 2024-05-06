import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useRootNavigationState } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import BookIcon from '@/assets/icons/BookIcon.svg';
import Checkmark from '@/assets/icons/Checkmark.svg';
import commonStyles from '@/constants/commonStyles';
import theme from '@/constants/theme';
import { useEffect } from 'react';
import wordBooks from '@/constants/wordBooks';
import { makePlan, Task } from '@/store/plan';
import { ProgressByBookType, dayOfToday } from '@/store/userProfile';
import { makeWordList } from '@/store/wordList';
import { getTaskTitle } from '@/constants/globals';

export default function TaskScreen() {
  const currentBookKey:string = useAppSelector(state => state.userProfile.currentBookKey)
  const progressByBook:ProgressByBookType = useAppSelector(state => state.userProfile.progressByBook)
  const todayTasks = useAppSelector(state => state.plan.todayTasks)
  const tomorrowTasks = useAppSelector(state => state.plan.tomorrowTasks)
  const currentBook = wordBooks.find(b => b.key === currentBookKey)
  let progress = progressByBook[currentBookKey]
  let dayIndex = progress ? dayOfToday(progress) : 0

  const dispatch = useAppDispatch()
  console.log('userProgress', progress);

  // jump to book select screen if user hasn't selected a book
  const rootNavigationState = useRootNavigationState();
  const navigatorReady = rootNavigationState?.key != null
  useEffect(() => { 
    if (!navigatorReady) return
    if (currentBookKey === '' || !wordBooks.some(b => b.key === currentBookKey)) {
      router.navigate('/bookSelect')
    }
  }, [navigatorReady])
  
  useEffect(() => { // make plans for today and tomorrow
    if (currentBookKey === '' || !(currentBookKey in progressByBook)) return;
    const progress = progressByBook[currentBookKey]
    dispatch(makePlan({bookKey: currentBookKey, ...progress }))
  }, [progressByBook, currentBookKey])

  const renderTasks = (tasks:Task[], disabled:boolean) => {
    return tasks.map((task, index) => (
      <View key={index} style={styles.checkboxListItem} onTouchEnd={() => {
          if(disabled) return
          router.navigate('/listDetail')
          dispatch(makeWordList({bookKey: currentBookKey, ...progress, dayIndex: task.day, isRevisit: task.isRevisit}))
        }}>
          {task.finished ?
            <View style={styles.checkboxListCheckboxSelected}>
                <Checkmark/>
            </View>
              :
            <View style={styles.checkboxListCheckbox}>
            </View>
          }
          <Text style={styles.checkboxListText}>{getTaskTitle(task.day, task.isRevisit)}</Text>
      </View>
    ))
  }
  
  return (
    <SafeAreaView style={commonStyles.masterContainer}>
        <View style={commonStyles.row}>
            <View style={commonStyles.fill}>
                <Text style={commonStyles.h1}>今日任务</Text>
                <Text style={commonStyles.auxText}>第{dayIndex+1}/{progress ? progress.planDays : '?'}天 {currentBook?.name}</Text>
            </View>
            <View style={styles.changeBookButton} onTouchEnd={() => router.navigate('/bookSelect')}>
                {/* <Image source={require('@/assets/images/bookIcon.png')}/> */}
                <BookIcon />
                <Text style={styles.changeBookButtonText}>换书</Text>
            </View>
        </View>
        <ScrollView>
          <View style={styles.checkboxList}>
              { renderTasks(todayTasks, false) }
          </View>

          <View style={styles.checkboxList}>
              <Text style={commonStyles.dimmedH2}>明日任务</Text>
              { renderTasks(tomorrowTasks, true) }
          </View>
        </ScrollView>
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
    gap: 8,
    marginBottom: 28,
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
