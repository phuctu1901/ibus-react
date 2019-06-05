//This is an example code to generate QR code//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, TextInput, TouchableOpacity, Text,} from 'react-native';
import Cities from '../Cities/Cities';
// import all basic components
import QRCode from 'react-native-qrcode';
//import QRCode
 
export default class BuySuccess extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      // Default Value of the TextInput
      valueForQRCode: '',
      // Default value for the QR Code
    };
  }
  static navigationOptions = props => {
    return {
      title: "Thông tin vé",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "400"
      },
      tabBarVisible: false
    };
  };

  componentDidMount(){
    const { state } = this.props.navigation;
    let codeview = state.params.codeview;
    this.setState({valueForQRCode: codeview});
    
  }
  
  getTextInputValue = () => {
    // Function to get the value from input
    // and Setting the value to the QRCode
    this.setState({ valueForQRCode: this.state.inputValue });
  };
  render() {
    return (
      <View style={styles.MainContainer}>
        <QRCode
          value={this.state.valueForQRCode}
          //Setting the value of QRCode
          size={250}
          //Size of QRCode
          bgColor="#000"
          //Backgroun Color of QRCode
          fgColor="#fff"
          //Front Color of QRCode
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    paddingTop: 40,
  },
  
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});