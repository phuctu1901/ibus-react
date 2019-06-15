import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { fonts, colors } from "../theme";

import Input from "../components/Input";
import Button from "../components/Button";
// import Home from "../home/home";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
    accessCode: "",
    visible: false,
    isLogged: false
  };

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  async storeToken(user) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async getToken(user) {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData != null) {
        console.log(data);
        let data = JSON.parse(userData);
        this.setState({ accessCode: data });
        this.setState({ isLogged: true });
        this.GetDetail();
        this.props.navigation.navigate("Home");
      }
      console.log(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  componentDidMount() {
    this.getToken();
  }
  Login() {
    this.setState({ visible: !this.state.visible });
    fetch("http://192.168.1.100:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(r =>
        r.json().then(data => ({ ok: r.ok, status: r.status, body: data }))
      )
      .then(res => {
        this.setState({ visible: !this.state.visible });
        console.log(res);
        console.log(res.body.success.token);
        if (res.ok) {
          this.storeToken(res.body.success.token);
          this.GetDetail();
          this.props.navigation.navigate("Cities");
        } else {
          Alert.alert("Error", "Error: " + res.status);
        }
      })
      .catch(error => {
        console.error(error);
      });
    // this.GetDetail();
  }

  GetDetail() {
    fetch("http://192.168.1.100:8000/api/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.accessCode
      }
    })
      .then(r =>
        r.json().then(data => ({ ok: r.ok, status: r.status, body: data }))
      )
      .then(res => {
        console.log(res);
        if (res.ok) {
        } else {
          Alert.alert("Error", "Error: " + res.status);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { fontsLoaded } = this.state;
    const { visible } = this.state;
    if (this.state.isLogged) {
      <View style={styles.container}>
        {/* <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../loading/data.json")}
          animationStyle={styles.lottie}
          speed={1}
        /> */}
      </View>;
    }
    return (
      <View style={styles.container}>
        {/* <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../loading/data.json")}
          animationStyle={styles.lottie}
          speed={1}
        /> */}
        <View style={styles.heading}>
          <Image
            source={require("../assets/shape.png")}
            style={styles.headingImage}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.greeting]}>Welcome back,</Text>
        <Text style={[styles.greeting2]}>sign in to continue</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="User Name"
            type="username"
            onChangeText={this.onChangeText}
            value={this.state.username}
          />
          <Input
            placeholder="Password"
            type="password"
            onChangeText={this.onChangeText}
            value={this.state.password}
            secureTextEntry
          />
        </View>

        <Button
          //   isLoading={isAuthenticating}
          title="Sign In"
          onPress={this.Login.bind(this)}
        />
        {/* <Text style={[styles.errorMessage, signInError && { color: 'black' }]}>Error logging in. Please try again.</Text>
          <Text style={[styles.errorMessage, signInError && { color: 'black' }]}>{signInErrorMessage}</Text> */}
        {
          //   showSignInConfirmationModal && (
          //     <Modal>
          //       <View style={styles.modal}>
          //         <Input
          //           placeholder="Authorization Code"
          //           type='authCode'
          //           keyboardType='numeric'
          //         //   onChangeText={this.onChangeText}
          //         //   value={this.state.authCode}
          //           keyboardType='numeric'
          //         />
          //         <Button
          //           title='Confirm'
          //           onPress={this.confirm.bind(this)}
          //         //   isLoading={isAuthenticating}
          //         />
          //       </View>
          //     </Modal>
          //   )
        }
      </View>
    );
  }
}

export default SignIn;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    flexDirection: "row"
  },
  headingImage: {
    width: 38,
    height: 38
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: "transparent",
    fontFamily: fonts.base
  },
  inputContainer: {
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40
  },
  greeting: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: fonts.light
  },
  greeting2: {
    color: "#666",
    fontSize: 24,
    marginTop: 5,
    fontFamily: fonts.light
  },
  lottie: { width: 300, height: 300 }
});
