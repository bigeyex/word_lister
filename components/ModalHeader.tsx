import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import BackButton from '@/assets/icons/BackButton.svg';
import commonStyles from '@/constants/commonStyles';
import theme from '@/constants/theme';


export default (props: {title:string}) => {
    return <View style={styles.modalHeader}>
        <View style={styles.backButton} onTouchEnd={() => router.back()}>
            <BackButton/>
        </View>
        <Text style={commonStyles.h1}>{props.title}</Text>
    </View>
}

const styles = StyleSheet.create({
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
});