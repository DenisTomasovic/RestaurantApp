import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import NetworkInfo from '../components/network/network_info';
import ResultItem from '../components/result_item';

export default class SearchResult extends Component {

    constructor(props) {
        super(props);
    }

    renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.sendDataToResultScreen(item.name)}>
                <ResultItem city={item.name} country={item.country_name} />
            </TouchableWithoutFeedback>
        )
    }

    sendDataToResultScreen = (data) => {
        this.props.navigation.navigate('All restaurants', {
            res_data: data
        })
    }

    render() {
        return (
            <View style={styles.resultContainer}>
                <View style={styles.networkContainer}>
                    <NetworkInfo />
                </View>
                <FlatList
                    data={this.props.route.params.res_data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    resultContainer: {

    },

    networkContainer: {
        width: '100%',
        alignItems: 'center'
    }
})