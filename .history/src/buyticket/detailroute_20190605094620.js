import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { colors } from "../theme";
import CenterMessage from "../components/CenterMessage";

export default class DetailRoute extends React.Component {
  state = {
    route:null
  };
  static navigationOptions = props => {
    return {
      title: "Chi tiết tuyến: " + props.navigation.state.params.route.title,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "400"
      }
    };
  };
  constructor(){
    super();
    const {state} = props.navigation;
    let route = state.params.route;
    this.state.route =route;
    console.log("Detail");
    console.log(this.state.route);
  }
  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  async componentDidMount() {
    fetch('http://192.168.1.100:8000/api/route/getroutedetail', {
        method:'POST',
        headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                route_id: route.id,
              }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let routes = responseJson;
        console.log(routes);
        // this.props.navigation.navigate("ListRoute", { routes: routes });

        // this.setState({
        //   isLoading: false,
        //   cities: this.state.cities
        // });
      })
      .catch((error) =>{
        console.error(error);
      });  
  }
  addLocation = () => {
    if (this.state.name === "" || this.state.info === "") return;
    const { city } = this.props.navigation.state.params;
    const location = {
      name: this.state.name,
      info: this.state.info
    };
    this.props.screenProps.addLocation(location, city);
    this.setState({
      name: "",
      info: ""
    });
  };

  render() {
    const {state} = this.props.navigation;
    let route = state.params.route;
    return (
      <View style={{ flex: 1 }}>
        {!route.length && <CenterMessage message="No locations" />}
        {/* {city.locations.map(location => {
          return (
            <View style={styles.locationContainer}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationInfo}>{location.info}</Text>
            </View>
          );
        })} */}
        {/* <TextInput
          value={this.route.title}
          placeholder="Location name"
          onChangeText={val => this.onChangeText("name", val)}
          style={styles.input}
          placeholderTextColor="white"
        /> */}

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.addLocation}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Mua vé</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    position: "absolute",
    height: 50,
    backgroundColor: colors.primary,
    width: "100%",
    bottom: 104,
    left: 0,
    color: "white"
  },
  input2: {
    bottom: 52
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%"
  },
  button: {
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 20
  },
  locationContainer: {
    padding: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2
  },
  locationName: {
    fontSize: 20
  },
  locationInfo: {
    color: "rgba(0, 0, 0, .5)"
  }
});
