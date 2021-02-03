import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import RestaurantRating from './restaurant_rating';

export default class RestaurantItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let name = this.props.name
        let thumb = this.props.thumb
        let location = this.props.location
        let rating = this.props.rating
    
        return (
            <View style={styles.card}>
                <Image
                    source={thumb !== '' ? { uri: thumb } : require('../../assets/placeholder.png')}
                    resizeMode="cover"
                    style={styles.imageStyle}
                />
                <View style={ styles.cardInfo }>
                    <View>
                        <Text numberOfLines={1} style={ styles.nameStyle }>{ name }</Text>
                        <Text numberOfLines={2} style={ styles.locationStyle }>{ location }</Text>
                    </View>
                    <View style={ styles.ratingStyle }>
                        <RestaurantRating rating={ rating }/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ccc',
        height: 110,
        margin: 5,
        marginVertical: 5,
        flexDirection: 'row',
        elevation: 2,
        borderRadius: 8
    },

    cardInfo: {
        width: '65%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },

    imageStyle: {
        height: '100%',
        width: '35%',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },

    ratingStyle: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    nameStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    locationStyle: {
        fontSize: 15,
        color: '#888'
    }

})