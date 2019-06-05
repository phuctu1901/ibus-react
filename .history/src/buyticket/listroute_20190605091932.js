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

export default class ListRoute extends React.Component {
  static navigationOptions = {
    title: "Danh sách các tuyến xe",
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

  viewCity = city => {
    this.props.navigation.navigate("City", { city });
  };

  editCity = city => {
    this.props.navigation.navigate("Login");
  };


  render() {
    const {state} = this.props.navigation;
    let routes = state.params.routes;
    console.log(state.params.routes);
    return (
      <ScrollView style={styles.container}>
        <View>
          {!routes.length && (
            <CenterMessage message="Không tìm thấy tuyến xe" />
          )}
          {
              routes.map((route, index) => {
            return (

              <View key={city.id}>
                <TouchableWithoutFeedback onPress={() => this.viewCity(city)}>
                  <View style={styles.cityContainer}>
                    <View style={{ flex: 3 }}>
                      <Text style={styles.city}>{route.title}</Text>
                      <Text style={styles.country}>{route.price}</Text>
                    </View>
                    <View
                      style={{ flex: 1, justifyContent: "center", padding: 10 }}
                    >
                      <Button
                        onPress={() => this.editCity(route)}
                        title="Edit"
                      />
                    </View>
                    <View
                      style={{ flex: 1, justifyContent: "center", padding: 10 }}
                    >
                      <Button
                        onPress={() => this.props.screenProps.deleteCity(route)}
                        title="Delete"
                      />
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
