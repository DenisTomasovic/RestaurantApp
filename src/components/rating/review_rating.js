import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ReviewRating = (props) => {

    return(
        <View style={ styles.reviewContainer }>
            <Text style={ styles.textStyle }>{ props.rating }</Text>
        </View>
    )

}

export default ReviewRating

const styles = StyleSheet.create({
    reviewContainer: {
        width: 25,
        height: 20,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },

    textStyle: {
        color: '#fff'
    }
})