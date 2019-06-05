import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme';
import { TextInput } from 'react-native-gesture-handler';

export default class EditCity extends React.Component {
    state = {
        oldCity: {},
        city: '',
        country: ''
    }
    static navigationOptions = (props) => {
        return {
            title: 'Edit City',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: '400'
            }
        }
    }

    componentDidMount() {
        const { city } = this.props.navigation.state.params;
        this.setState({
            oldCity: city,
            city: city.city,
            country: city.country
        });
    }

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    submit = () => {
        if(this.state.city === '' || this.state.country === '') return;
        const city = {
            city: this.state.city,
            country: this.state.country,
            locations: this.state.oldCity.locations ? this.state.oldCity.locations : [],
            id: this.state.oldCity.id
        };
        this.props.screenProps.editCity(city);
        this.setState({
            city: '',
            country: ''
        }, () => {
            this.props.navigation.navigate('Cities');
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Cities App</Text>
                <TextInput
                    placeholder='City name'
                    value={this.state.city}
                    onChangeText={val => this.onChangeText('city', val)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Country name'
                    value={this.state.country}
                    onChangeText={val => this.onChangeText('country', val)}
                    style={styles.input}
                />
                <TouchableOpacity onPress={this.submit}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Edit City
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        margin: 10,
        paddingHorizontal: 8,
        height: 50
    },
    button: {
        height: 50,
        backgroundColor: '#666',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonText: {
        color: 'white'
    },
    container: {
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    }
})