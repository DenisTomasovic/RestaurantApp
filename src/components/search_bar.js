
import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: null
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchBody}>
                        <TextInput
                            style={styles.searchBarText}
                            placeholder='Search for city..'
                            value={this.state.searchValue}
                            onChangeText={text => this.setState({ searchValue: text })}
                        />

                    </View>
                    <TouchableWithoutFeedback onPress={() => this.props.getCity(this.state.searchValue)}>
                        <View style={styles.searchButton}>
                            <Ionicon size={25} name='ios-search' color='#fff' />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    searchContainer: {
        width: '70%',
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 100 / 2,
        elevation: 2,
        borderColor: '#fcba00',
    },

    searchBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },

    searchBarText: {
        textAlign: 'center',
        paddingLeft: 50
    },

    searchButton: {
        width: 50,
        height: 50,
        backgroundColor: '#fcba00',
        borderRadius: 100 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
})