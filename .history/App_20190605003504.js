import React, {Component} from 'react';
import { Alert, AsyncStorage } from 'react-native';
import Tabs from './src/index';

const key = 'cities';

export default class App extends Component {
  state = {
    cities: [],
    isLoading: true
  }

  async componentDidMount() {
    try {
      const cities = await AsyncStorage.getItem(key);
      if(cities) this.setState({ cities: JSON.parse(cities) });
    } catch (e) {
      console.log('e: ', e)
    }

    // fetch('https://mywebsite.com/endpoint/', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     firstParam: 'yourValue',
    //     secondParam: 'yourOtherValue',
    //   }),
    // }).then().then().catch();
    
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let movies = [];
        responseJson.movies.forEach(movie => {
          let newMovie = {
            city: movie.title,
            country: movie.releaseYear,
            locations: [],
            id: movie.id
          }
          movies.push(newMovie);
        });
        this.state.cities = this.state.cities.concat(movies);
        this.setState({
          isLoading: false,
          cities: this.state.cities
        });
      })
      .catch((error) =>{
        console.error(error);
      });  
  }

  addCity = (city) => {
    const cities = this.state.cities;
    cities.push(city);
    AsyncStorage.setItem(key, JSON.stringify(cities))
      .then(() => console.log('item stored'))
      .catch(err => {
        console.log('err', err)
    });
    this.setState({ cities: cities })
  }

  editCity = (city) => {
    const index = this.state.cities.findIndex(item => item.id === city.id);
    this.state.cities[index].city = city.city;
    this.state.cities[index].country = city.country;
    this.setState({
      cities: this.state.cities
    }, () => {
      AsyncStorage.setItem(key, JSON.stringify(this.state.cities))
      .then(() => console.log('item updated'))
      .catch(err => {
        console.log('err', err)
      })
    });
  }

  deleteCity = (city) => {
    Alert.alert('You tapped the Delete Button!')
    this.state.cities = this.state.cities.filter(item => item.id !== city.id);
    this.setState({
      cities: this.state.cities
    }, () => {
      AsyncStorage.setItem(key, JSON.stringify(this.state.cities))
      .then(() => console.log('item deleted'))
      .catch(err => {
        console.log('err', err)
      })
    });
  }

  addLocation = (location, city) => {
    const index = this.state.cities.findIndex(item => item.id === city.id);
    const chosenCity = this.state.cities[index];
    chosenCity.locations.push(location);
    const cities = [
      ...this.state.cities.slice(0, index),
      chosenCity,
      ...this.state.cities.slice(index + 1)
    ];

    this.setState({
      cities
    }, () => {
      AsyncStorage.setItem(key, JSON.stringify(cities))
      .then(() => console.log('item updated'))
      .catch(err => {
        console.log('err', err)
      })
    });
  }

  render() {
    return (
      <Tabs
        screenProps={{
          cities: this.state.cities,
          addCity: this.addCity,
          editCity: this.editCity,
          deleteCity: this.deleteCity,
          addLocation: this.addLocation
        }}
      />
    )
  }
}
