import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';

const NetworkInfo = () => {

    const netInfo = useNetInfo()

    return (
        !netInfo.isConnected &&
        <View style={ styles.networkContainer }>
            <ActivityIndicator color='#fff'/>
            <Text style={ styles.textStyle }>Connection lost..</Text>
        </View>
    )
}

export default NetworkInfo

const styles = StyleSheet.create({
    networkContainer: {
        marginTop: 10,
        width: '70%',
        flexDirection: 'row',
        padding: 5,
        borderRadius: 100 / 2,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textStyle: {
        color: '#fff',
        marginLeft: 10
    }
})