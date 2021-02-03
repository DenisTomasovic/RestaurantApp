import React, { Component } from 'react';
import { View, StyleSheet, Alert, ImageBackground, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Loading from '../components/loading/loading';
import NetworkInfo from '../components/network/network_info';
import SearchBar from '../components/search_bar';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { ZOMATO_API_KEY } from '../config';

const _width = Dimensions.get('window').width
const _height = Dimensions.get('window').height

export default class MainScreen extends Component {

    _isMounted = false

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isExist: false
        }
    }

    //Make callback from SearchBar
    searchRestaurantsByCity = (city) => {
        this._isMounted = true
        if (city) {
            this.setState({ isLoading: true })
            let url = 'https://developers.zomato.com/api/v2.1/cities?q=' + city
            fetch(url, {
                'method': 'GET',
                'headers': {
                    'user-key': ZOMATO_API_KEY
                }
            })
                .then(response => response.json())
                .then(json => {
                    if (this._isMounted) {
                        this.setState({ isLoading: false })
                        if (json.location_suggestions.length > 0) {
                            this.sentDataToResultScreen(json.location_suggestions)
                        } else {
                            Alert.alert(
                                'Error',
                                'Searched city doesn\'t exsist in the restaurant API. \nPlease, try it again'
                            )
                        }
                    }
                })
                .catch(error => {
                    this.setState({ isLoading: false })
                    console.log('ERROR: ' + error)
                })
        } else {
            Alert.alert(
                'Error',
                'Text field can\'t be empty. \nPlease, try it again'
            )
        }
    }

    componentWillUnmount = () => {
        this._isMounted = false
    }

    sentDataToResultScreen = (data) => {
        this.props.navigation.navigate('Select city', {
            res_data: data
        })
    }

    showInfo = () => {
        return Alert.alert(
            'App information',
            '- App shows information about restaurants in selected city.'
            + '\n\n-  This API doesn\'t contain all world cities.'
            + '\n\n- Try to search: Bratislava, Prague, Olomouc, Brno, Trnava, New York, Washington, Texas etc.'
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.isLoading
                        ?
                        <View style={styles.container}>
                            <Loading />
                        </View>
                        :
                        <ImageBackground style={styles.imageContainer} source={require('../../assets/background.jpg')}>
                            <View style={styles.searchHolder}>
                                <SearchBar getCity={this.searchRestaurantsByCity} />
                                <NetworkInfo />
                            </View>
                            <View style={styles.info}>
                                <TouchableWithoutFeedback onPress={() => this.showInfo()}>
                                    <Ionicon size={32} color='#fff' name='ios-information-circle-outline' />
                                </TouchableWithoutFeedback>
                            </View>
                        </ImageBackground>
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageContainer: {
        width: _width,
        height: _height,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    searchHolder: {
        alignItems: 'center'
    },

    info: {
        position: 'absolute',
        right: 15,
        bottom: 35
    }

})