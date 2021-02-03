import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import RestaurantHighlights from '../components/highlights/restaurant_highlights';
import Loading from '../components/loading/loading';
import RestaurantRating from '../components/restaurant_rating';
import ReviewSlider from '../components/reviews/review_slider';
import { ZOMATO_API_KEY } from '../config';

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55
const MAX_HEIGHT = 350

export default class RestaurantDetail extends Component {

    _isMounted = false

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            rating: null,
            votes: null,
            highlights: [],
            coordinate: [],
            isLoading: false
        }
    }

    //Find restaurant details by restaurant id
    componentDidMount = () => {
        this._isMounted = true
        this.setState({ isLoading: true })
        let url = 'https://developers.zomato.com/api/v2.1/restaurant?res_id=' + this.props.route.params.res_id
        fetch(url, {
            'method': 'GET',
            'headers': {
                'user-key': ZOMATO_API_KEY
            }
        })
            .then(response => response.json())
            .then(json => {
                if (this._isMounted) {
                    this.setState({
                        data: json,
                        rating: json.user_rating.aggregate_rating,
                        votes: json.user_rating.votes,
                        highlights: json.highlights,
                        location: json.location.address,
                        coordinate: [json.location.latitude, json.location.longitude],
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                this.setState({ isLoading: false })
                console.log('ERROR: ' + error)
            })
    }

    componentWillUnmount = () => {
        this._isMounted = false
    }

    //Split timings from response
    splitTimings = (string) => {
        if (string) {
            var splitString = string.split("),")
            for (var i = 0; i < splitString.length - 1; i++) {
                splitString[i] += ')'
            }
            return splitString.map((item, index) => <Text key={index}>{item}</Text>)
        }
    }

    //Split phone numbers from response
    splitPhone = (string) => {
        if (string) {
            var splitString = string.split(",")
            return splitString.map((item, index) => <Text key={index}>{item}</Text>)
        }
    }

    render() {
        let data = this.state.data

        return (
            this.state.isLoading
                ?
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Loading />
                </View>
                :
                <HeaderImageScrollView
                    maxHeight={MAX_HEIGHT}
                    minHeight={MIN_HEIGHT}
                    maxOverlayOpacity={0.6}
                    minOverlayOpacity={0.3}
                    renderHeader={() => (
                        <Image style={styles.imageContainer} source={data.featured_image ? { uri: data.featured_image } : require('../../assets/placeholder.png')} />
                    )}
                >
                    <TriggeringView>
                        <View style={styles.restaurantHeader}>
                            <Text style={styles.headerText}>{data.name || 'Not avaible..'}</Text>
                            <RestaurantRating rating={this.state.rating} />
                        </View>
                        <View style={styles.cardContainer}>
                            <Text style={styles.titleText}>Address</Text>
                            <Text>{this.state.location || 'Not avaible..'}</Text>
                        </View>
                        <Text style={styles.highlightTitle}>Highlights</Text>
                        <ScrollView horizontal style={{ borderBottomWidth: 1, borderColor: 'lightgray' }}>
                            <View style={styles.highlightContainer}>
                                {
                                    this.state.highlights.map((value, index) => {
                                        return (
                                            <View key={index}>
                                                <RestaurantHighlights text={value} />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                        <View style={styles.cardContainer}>
                            <Text style={styles.titleText}>Timings</Text>
                            <View style={styles.viewContainer}>
                                {
                                    this.splitTimings(data.timings)
                                }
                            </View>
                        </View>
                        <View style={styles.cardContainer}>
                            <Text style={styles.titleText}>Phone number</Text>
                            <View style={styles.viewContainer}>
                                {
                                    this.splitPhone(data.phone_numbers)
                                }
                            </View>
                        </View>
                        <View style={[styles.cardContainer, { borderTopWidth: 1, borderTopColor: '#ccc' }]}>
                            <Text style={styles.titleText}>Last reviews</Text>
                            <ReviewSlider res_id={this.props.route.params.res_id} />
                        </View>
                    </TriggeringView>
                </HeaderImageScrollView>

        )
    }

}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: MAX_HEIGHT,
    },

    restaurantHeader: {
        width: '100%',
        backgroundColor: '#fcba00',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        elevation: 2
    },

    headerText: {
        width: '85%',
        fontSize: 17,
        color: '#fff'
    },

    highlightContainer: {
        flexDirection: 'row',
        padding: 10,
    },

    cardContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        padding: 15
    },

    titleText: {
        fontSize: 16,
        paddingBottom: 10
    },

    highlightTitle: {
        fontSize: 16,
        paddingTop: 10,
        paddingLeft: 15
    },

    viewContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    mapStyle: {
        width: '100%',
        height: 300,
    }
})