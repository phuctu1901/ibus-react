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
    route: "",
    stations: [],
    station_id: "",
    isLoading: true
  };
  static navigationOptions = props1 => {
    return {
      title: "Chi tiết tuyến: " + props1.navigation.state.params.route.title,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "400"
      }
    };
  };

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  async componentDidMount() {
    const { state } = this.props.navigation;
    let route = state.params.route;
    let station_id = state.params.station_id;
    this.setState({ route: route, station_id: station_id });
    console.log(route.ticket_id);
    let stations;
    fetch("http://192.168.1.100:8000/api/route/getroutedetail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        route_id: route.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        stations = responseJson;
        // this.props.navigation.navigate("ListRoute", { routes: routes });

        // this.setState({
        //   isLoading: false,
        //   cities: this.state.cities
        // });
        this.setState({
          // route: route,
          isLoading: false,
          stations: stations
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  buyticket = ticket_id => {
    console.log(ticket_id);

    console.log("11111111111: " + this.state.station_id);

    this.props.navigation.navigate("MomoPayment", {
      route: this.state.route,
      ticket_id: ticket_id,
      station_id: this.state.station_id
    });
    // if (this.state.name === "" || this.state.info === "") return;
    // const { city } = this.props.navigation.state.params;
    // const location = {
    //   name: this.state.name,
    //   info: this.state.info
    // };
    // this.props.screenProps.addLocation(location, city);
    // this.setState({
    //   name: "",
    //   info: ""
    // });
  };

  render() {
    console.log(this.state.stations);
    console.log("XXXX");
    console.log(this.state.route);
    return (
      <View style={{ flex: 1 }}>
        {!this.state.stations.length && (
          <CenterMessage message="No locations" />
        )}
        {this.state.stations.map((station, index) => {
          return (
            <View style={styles.locationContainer}>
              <Text style={styles.locationName}>{station.address}</Text>
            </View>
          );
        })}
        {/* <TextInput
          value={this.route.title}
          placeholder="Location name"
          onChangeText={val => this.onChangeText("name", val)}
          style={styles.input}
          placeholderTextColor="white"
        /> */}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.buyticket(this.state.route.ticket_id)}
          >
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
