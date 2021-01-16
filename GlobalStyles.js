import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F0FFFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
});
