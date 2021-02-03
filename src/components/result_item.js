import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ResultItem = (props) => {

    return (
        <View style={ styles.itemContainer }>
            <Text style={ styles.itemText }>{ props.city }</Text>
            <Text>{ props.country }</Text>
        </View>
    )

}

export default ResultItem

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },

    itemText: {
        fontSize: 18
    }
})