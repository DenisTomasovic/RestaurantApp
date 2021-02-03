import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const RestaurantHighlights = (props) => {

    return (
        <View style={ styles.highlightContainer }>
            <Text style={ styles.textStyle }>{ props.text || 'Loading..' }</Text>
        </View>
    )

}

export default RestaurantHighlights

const styles = StyleSheet.create({
    highlightContainer: {
        borderRadius: 5,
        backgroundColor: '#fcba00',
        padding: 10,
        margin: 5,
    },

    textStyle: {
        fontSize: 15,
        color: '#fff'
    }
})