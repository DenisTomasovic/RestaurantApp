import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ZOMATO_API_KEY } from '../../config';
import ReviewItem from './review_item';

export default class ReviewSlider extends Component {

    _isMounted = false

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    //Take last five comments from API
    componentDidMount = () => {
        this._isMounted = true
        let url = 'https://developers.zomato.com/api/v2.1/reviews?res_id='+ this.props.res_id +'&count=5'
        fetch(url, {
            'method': 'GET',
            'headers': {
                'user-key': ZOMATO_API_KEY
            }
        })
        .then(response => response.json())
        .then(json => {
            if (this._isMounted) {
                this.setState({ data: json.user_reviews})
            }
        })
        .catch(error => {
            console.log('ERROR: ' + error)
        })
    }

    componentWillUnmount = () => {
        this._isMounted = false
    }

    render() {
        return (
            <View style={ styles.reviewContainer }>
                {
                    this.state.data.map((item, index) =>  {
                        return (
                            <View key={ index }>
                                <ReviewItem
                                    user_name={ item.review.user.name || 'Not avaible..' }
                                    user_image={ item.review.user.profile_image || 'Not avaible..' }
                                    review_text={ item.review.review_text }
                                    review_timestamp={ item.review.review_time_friendly || 'Not avaible..' }
                                    review_stars={ item.review.rating || '0'}
                                />
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    reviewContainer: {

    },

})

