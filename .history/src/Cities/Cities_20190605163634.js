import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Button
} from "react-native";
import { colors } from "../theme";
import CenterMessage from "../components/CenterMessage";

export default class Cities extends React.Component {
  static navigationOptions = {
    title: "Danh sách vé",
    headerTitleStyle: {
      color: "white",
      fontSize: 25,
      fontWeight: "400"
    },
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: "#fff"
  };

  viewTicket = ticket => {
    this.props.navigation.navigate("DetailTicket", { ticket: ticket });
  };

  state = {
    tickets: []
  };

  constructor() {
    super();
    console.log("123");
  }
  async componentDidMount() {
    fetch("http://192.168.1.100:8000/api/ticket/getready", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "phuctu1901"
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.state.tickets = responseJson;
        // this.props.navigation.navigate("ListRoute", { routes: routes });

        // this.setState({
        //   isLoading: false,
        //   cities: this.state.cities
        // });
        this.setState({
          // route: route,
          tickets: this.state.tickets
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          {!this.state.tickets.length && <CenterMessage message="No Cities" />}
          {this.state.tickets.map((ticket, index) => {
            return (
              <View key={ticket.id}>
                <TouchableWithoutFeedback
                  onPress={() => this.viewTicket(ticket)}
                >
                  <View style={styles.cityContainer}>
                    <View style={{ flex: 3 }}>
                      <Text style={styles.city}>{ticket.title}</Text>
                      <Text style={styles.country}>{ticket.address}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#edeaea"
  },
  cityContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary
  },
  city: {
    fontSize: 25
  },
  country: {
    color: "rgba(0, 0, 0, .5)"
  },
  edit: {
    color: "blue",
    fontSize: 20
  },
  delete: {
    color: "red",
    fontSize: 20
  }
});
