import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = () => {

    return (
        <View style={ styles.loadingContainer }>
            <ActivityIndicator size='large' color='#fff'/>
            <Text style={ styles.loadingText }>Wait please..</Text>
        </View>
    )

}

export default Loading

const styles = StyleSheet.create({
    loadingContainer: {
        width: 100,
        height: 100,
        backgroundColor: '#fcba00',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 4
    },

    loadingText: {
        color: '#fff'
    }
})