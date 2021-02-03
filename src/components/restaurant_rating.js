import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const RestaurantRating = (props) => {

    return (
        <View style={ styles.ratingContainer }>
            <Text style={ styles.textStyle }>{ props.rating || '0' }</Text>
        </View>
    )
}

export default RestaurantRating

const styles = StyleSheet.create({
    ratingContainer: {
        width: 30,
        height: 25,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },

    textStyle: {
        color: '#fff',

    }
})