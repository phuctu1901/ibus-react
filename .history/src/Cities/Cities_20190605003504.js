import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Button } from 'react-native';
import { colors } from '../theme';
import CenterMessage from '../components/CenterMessage';

export default class Cities extends React.Component {
    static navigationOptions = {
        title: 'Cities',
        headerTitleStyle: {
            color: 'white',
            fontSize: 25,
            fontWeight: '400'
        },
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTintColor: '#fff'
    }

    viewCity = (city) => {
        this.props.navigation.navigate('City', { city });
    }

    editCity = (city) => {
        this.props.navigation.navigate('EditCity', { city });
    }
    
    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    {
                        !this.props.screenProps.cities.length && <CenterMessage message="No Cities" />
                    }
                    {
                        this.props.screenProps.cities.map((city, index) => {
                            return (
                                <View key={city.id}>
                                    <TouchableWithoutFeedback
                                        onPress={() => this.viewCity(city)}
                                    >
                                        <View style={styles.cityContainer}>
                                            <View style={{flex: 3}}>
                                                <Text style={styles.city}>{city.city}</Text>
                                                <Text style={styles.country}>{city.country}</Text>
                                            </View>
                                            <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                                                <Button
                                                    onPress={() => this.editCity(city)}
                                                    title="Edit"
                                                />
                                            </View>
                                            <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
                                                <Button
                                                    onPress={() => this.props.screenProps.deleteCity(city)}
                                                    title="Delete"
                                                />
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#edeaea'
    },
    cityContainer: { 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.primary
    },
    city: {
        fontSize: 25
    },
    country: {
        color: 'rgba(0, 0, 0, .5)'
    },
    edit: {
        color: 'blue',
        fontSize: 20
    },
    delete: {
        color: 'red',
        fontSize: 20
    }
})