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
  state={
    station_id:'',
    routes: []
  };

  detail = route => {
    console.log('Station ID'+this.state.params.station_id);
    console.log('Route'+ route.id);
    this.props.navigation.navigate("DetailRoute", {route: route, station_id:this.state.station_id });
  };


  render() {
    const {state1} = this.props.navigation;
    let routes = state1.params.routes;
    let station_id= state1.params.station_id;
    this.setState({routes: routes, station_id: station_id});
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

              <View key={route.id}>
                <TouchableWithoutFeedback onPress={() => this.viewCity(route)}>
                  <View style={styles.cityContainer}>
                    <View style={{ flex: 3 }}>
                      <Text style={styles.city}>{route.title}</Text>
                      <Text style={styles.country}>Giá vé: {route.price} VNĐ</Text>
                    </View>
                    <View
                      style={{ flex: 1, justifyContent: "center", padding: 10 }}
                    >
                      <Button
                        onPress={() => this.detail(route)}
                        title="Chi tiết"
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
