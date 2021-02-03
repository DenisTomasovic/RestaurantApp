import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Loading from '../components/loading/loading';
import NetworkInfo from '../components/network/network_info';
import RestaurantItem from '../components/restaurant_item';

export default class RestaurantScreen extends Component {

    _isMounted = false

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: false
        }
    }

    //Method find information about selected city
    componentDidMount = () => {
        this._isMounted = true
        this.setState({ isLoading: true })
        let url = 'https://developers.zomato.com/api/v2.1/locations?query=' + this.props.route.params.res_data
        fetch(url, {
            'method': 'GET',
            'headers': {
                'user-key': '737c2adace7f6ce735ebfaf502f1b658'
            }
        })
            .then(response => response.json())
            .then(json => {
                if (this._isMounted) {
                    json.location_suggestions.map(item => {
                        this.selectRestaurantsFromCity(item.latitude, item.longitude)
                    })
                }
            })
            .catch(error => {
                this.setState({ isLoading: false })
                console.log('ERROR: ' + error)
            })
    }

    //Method is able to get all restaurants from selected city
    selectRestaurantsFromCity = (lan, lon) => {
        this._isMounted = true
        let url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + lan + '&lon=' + lon
        fetch(url, {
            'method': 'GET',
            'headers': {
                'user-key': '737c2adace7f6ce735ebfaf502f1b658'
            }
        })
            .then(response => response.json())
            .then(json => {
                if (this._isMounted) {
                    this.setState({ data: json.nearby_restaurants, isLoading: false })
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

    //Put items from response to the component
    renderItem = ({ item: { restaurant: { name, featured_image, location, user_rating, id } } }) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.sendDataToDetailScreen(id, location.latitude, location.longitude)}>
                <RestaurantItem
                    name={name}
                    thumb={featured_image}
                    location={location.address}
                    rating={user_rating.aggregate_rating}
                />
            </TouchableWithoutFeedback>
        )
    }

    //Get id of restaurant and send to the next activity
    sendDataToDetailScreen = (id, lat, lon) => {
        this.props.navigation.navigate('Details', {
            res_id: id,
            res_lat: lat,
            res_lon: lon
        })
    }

    render() {
        return (
            <View style={styles.restaurantContainer}>
                {
                    this.state.isLoading
                        ?
                        <Loading />
                        :
                        <FlatList
                            ListHeaderComponent={
                                <View style={styles.networkContainer}>
                                    <NetworkInfo />
                                </View>
                            }
                            data={this.state.data}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.restaurant.id.toString()}
                        />
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    restaurantContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    networkContainer: {
        width: '100%',
        alignItems: 'center'
    }
})