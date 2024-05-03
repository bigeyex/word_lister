
import { StyleSheet } from 'react-native';
import theme from '@/constants/theme';

export default StyleSheet.create({
    masterContainer: {
        flex: 1,
        marginVertical: 48,
        marginHorizontal: 32,
        color: '#fff',
        gap: 28,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      fill: {
        flex: 1,
      },
      h1: {
        fontSize: 24,
        fontWeight: '800',
        color: theme.textColor,
      },
      dimmedH2: {
        fontSize: 24,
        fontWeight: '500',
        color: theme.dimmedTextColor,
      },
      auxText: {
        fontSize: 12,
        color: theme.dimmedTextColor,
      },
})