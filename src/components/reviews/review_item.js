import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import ReviewRating from '../rating/review_rating';

const ReviewItem = (props) => {
    return (
        <View style={ styles.card }>
            <View style={ styles.userContainer }>
                <Image 
                    style={ styles.imageContainer }
                    source={ props.user_image ? {uri: props.user_image} : require('../../../assets/placeholder.png')}
                />
                <Text style={ styles.userName }>{ props.user_name }</Text>
            </View>
            <View style={ styles.reviewContainer }>
                {
                    props.review_text
                    ?
                    <Text>{ props.review_text }</Text>
                    :
                    <Text style={{ color: '#ccc' }}>(Review without text)</Text>
                }
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                    <ReviewRating rating={ props.review_stars }/>
                    <Text style={ styles.reviewTimestamp }>{ props.review_timestamp }</Text>
                </View>
            </View>
        </View>
    )
}

export default ReviewItem

const styles = StyleSheet.create({
    card: {
        width: '100%',
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 1
    },

    userContainer: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        backgroundColor: '#fcba00'
    },

    imageContainer: {
        width: 30,
        height: 30,
        borderRadius: 100 / 2
    },

    userName: {
        paddingLeft: 10,
        color: '#fff'
    },

    reviewContainer: {
        padding: 10
    },

    reviewTimestamp: {
        color: '#ccc',

    }
})