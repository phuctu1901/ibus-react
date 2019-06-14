import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { colors } from "../theme";
import CenterMessage from "../components/CenterMessage";

export default class Cities extends React.Component {
  constructor(props) {
    super(props);
    //True to show the loader
    this.state = { refreshing: true };
    //Running the getData Service for the first time
    this.GetData();
  }

  static navigationOptions = {
    title: "Danh sách vé",
    headerRight: (
      <Button
        onPress={() => alert("This is a button!")}
        title="Info"
        color="#black"
      />
    ),
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

  GetData = () => {
    //Service to get the data from the server to render
    return fetch("http://192.168.1.100:8000/api/ticket/getready", {
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
        this.setState({
          refreshing: false,
          //Setting the data source for the list to render
          dataSource: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ListViewItemSeparator = () => {
    return (
      //returning the listview item saparator view
      <View
        style={{
          height: 0.2,
          width: "90%",
          backgroundColor: "#808080"
        }}
      />
    );
  };
  onRefresh() {
    //Clear old data of the list
    this.setState({ dataSource: [] });
    //Call the Service to get the latest data
    this.GetData();
  }
  render() {
    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          enableEmptySections={true}
          renderItem={({ item }) => (
            <View style={styles.cityContainer}>
              <View style={{ flex: 3 }} onPress={() => this.viewTicket(ticket)}>
                <Text style={styles.city}>{item.title}</Text>
                <Text style={styles.country}>{item.address}</Text>
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
      </View>
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
    fontSize: 25,
    color: "black"
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
