/**
 * Sample React Native App
 * https://www.npmjs.com/package/react-native-momosdk
 * @format
 * @flow
 */
<script src="http://localhost:8097"></script>
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, DeviceEventEmitter,
  SafeAreaView ,Image, NativeModules, NativeEventEmitter, ActivityIndicator} from 'react-native';
import RNMomosdk from 'react-native-momosdk';
import { v4 as uuid } from 'uuid';
import {QRCodeView} from './src/qrcode/qrcode'



const RNMoMoPaymentModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMoMoPaymentModule);

const merchantname = "Thế giới thiên thần";
const merchantcode = "MOMO15W020190527";
const merchantNameLabel = "Nhà nghỉ";
const billdescription = "Thanh toán phòng";
const amount = 50000;
const enviroment = "0"; //"1": production
export default class MomoPayment extends React.Component {

  state = {
    textAmount: this.formatNumberToMoney(amount, null, ""),
    amount: amount,
    description: "",
    processing: false
  }
  componentDidMount() {
    // Listen for native events
    let me = this;
    EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenReceived', (response) => {
      console.log("<MoMoPay>Listen.Event::" + JSON.stringify(response));
      try {
        if (response && response.status == 0) {
          let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
          me.setState({
            description: JSON.stringify(response),
            processing: false
          });
          let momoToken = response.data;
          let phonenumber = response.phonenumber;
          let message = response.message;
          let orderId = response.refOrderId; //your orderId
          let requestId = response.refRequestId; //your requestId
          //continue to submit momoToken,phonenumber to server
        } else {
          me.setState({
            description: "message: Get token fail",
            processing: false
          });
        }
      } catch (ex) {}

    });

    //OPTIONAL
    EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenState', (response) => {
      console.log("<MoMoPay>Listen.RequestTokenState:: " + response.status);
      // status = 1: Parameters valid & ready to open MoMo app.
      // status = 2: canOpenURL failed for URL MoMo app 
      // status = 3: Parameters invalid
    })
  }

  formatNumberToMoney(number, defaultNum, predicate) {
    predicate = !predicate ? "" : "" + predicate;
    if (number == 0 || number == '' || number == null || number == 'undefined' ||
      isNaN(number) === true ||
      number == '0' || number == '00' || number == '000')
      return "0" + predicate;

    var array = [];
    var result = '';
    var count = 0;

    if (!number) {
      return defaultNum ? defaultNum : "" + predicate
    }

    let flag1 = false;
    if (number < 0) {
      number = -number;
      flag1 = true;
    }

    var numberString = number.toString();
    if (numberString.length < 3) {
      return numberString + predicate;
    }

    for (let i = numberString.length - 1; i >= 0; i--) {
      count += 1;
      if (numberString[i] == "." || numberString[i] == ",") {
        array.push(',');
        count = 0;
      } else {
        array.push(numberString[i]);
      }
      if (count == 3 && i >= 1) {
        array.push('.');
        count = 0;
      }
    }

    for (let i = array.length - 1; i >= 0; i--) {
      result += array[i];
    }

    if (flag1)
      result = "-" + result;

    return result + predicate;
  }

  onPress = async () => {
    console.log("Hello world");
    if (!this.state.processing) {
      let jsonData = {};
      jsonData.enviroment = "0"; //"0": SANBOX , "1": PRODUCTION
      jsonData.action = "gettoken";
      jsonData.isDev = true; //SANBOX only , remove this key on PRODUCTION 
      jsonData.merchantname = merchantname;
      jsonData.merchantcode = merchantcode;
      jsonData.merchantnamelabel = merchantNameLabel;
      jsonData.description = billdescription;
      jsonData.amount = this.state.amount;
      jsonData.orderId = uuid();
      jsonData.requestId = uuid();
      jsonData.orderLabel = "Ma don hang";
      console.log("data_request_payment " + JSON.stringify(jsonData));
      if (Platform.OS === 'android') {
        let dataPayment = await RNMomosdk.requestPayment(jsonData);
        console.log("Token:" + dataPayment.data);
        this.momoHandleResponse(dataPayment);
        
        console.log("data_request_payment " + dataPayment.status);
      } else {
        RNMomosdk.requestPayment(JSON.stringify(jsonData));
      }
      this.setState({
        description: "",
        processing: true
      });
    } else {
      this.setState({
        description: ".....",
        processing: false
      });
    }
  }

  async momoHandleResponse(response) {
    try {
      if (response && response.status == 0) {
        // let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
        // this.setState({
        //   description: JSON.stringify(response),
        //   processing: false
        // });
        let momoToken = response.data;
        let phonenumber = response.phonenumber;
        // let message = response.message;

        this.handlePress(momoToken,phonenumber);

        //continue to submit momoToken,phonenumber to server
        // this.setState({
        //   description: "message: Get token success",
        //   processing: true
        // });
      } else {
        this.setState({
          description: "message: Get token fail",
          processing: false
        });
      }
    } catch (ex) {}
  }

  // handlePress = async () => 
  async handlePress(token, phone, amount) {
    let description="Giao dich vo van";
    let partnerRefId = uuid();
    console.log(partnerRefId);
    let partnerTransId=uuid();
    console.log(partnerTransId);
    console.log(JSON.stringify({
      "appData": token,
      "customerNumber": phone,
      "amount": this.state.amount,
      "partnerRefId":partnerRefId,
      "partnerTransId":partnerTransId,
      "description":description
    }));
    fetch('http://192.168.8.100:8000/api/ticket/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "appData": token,
          "customerNumber": phone,
          "amount": this.state.amount,
          "partnerRefId":partnerRefId,
          "partnerTransId":partnerTransId,
          "description":description
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          description: "Giao dịch thành công: "+responseJson.codeview,
          processing: false
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          description: "Giao dịch thất bại",
          processing: false
        });
      });
  }

  onChangeText = (value) => {
    let newValue = value.replace(/\./g, "").trim();
    let amount = this.formatNumberToMoney(newValue, null, "");
    this.setState({
      amount: newValue,
      textAmount: amount,
      description: ""
    });
  }

  render() {
    let { textAmount, description } = this.state;
    return (
      <SafeAreaView style={{flex: 1, marginTop: 50, backgroundColor: 'transparent'}}>
      <View style={styles.container}>
        <View style={[{backgroundColor: 'transparent', alignItems:'center', justifyContent:'center', height: 100}]}>
            <Image style={{flex:1, width:100, height:100}} source={require('./img/iconReact.png')}/>
        </View>
        <Text style={[styles.text, { color: 'red', fontSize: 20 }]}>{"MOMO DEVELOPMENT"}</Text>
        <Text style={[styles.text, { color: 'red', fontSize: 18 }]}>{"React native version"}</Text>
        <Text style={[styles.text, { color: '#000', fontSize: 14,marginVertical: 5, textAlign:'left', marginTop:20 }]}>{"MerchantCode : " + merchantcode}</Text>
        <Text style={[styles.text, { color: '#000', fontSize: 14,marginVertical: 5, textAlign:'left' }]}>{"MerchantName : " + merchantname}</Text>
        <Text style={[styles.text, { color: '#000', fontSize: 14,marginVertical: 5, textAlign:'left' }]}>{"Description : " + billdescription}</Text>
        <View style={styles.formInput}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{flex:1, fontSize: 18, paddingHorizontal:10 }}>{"Total amount"}</Text>
            <TextInput
              autoFocus={true}
              maxLength={10}
              placeholderTextColor={"#929292"}
              placeholder={"Enter amount"}
              keyboardType={"numeric"}
              returnKeyType="done"
              value={textAmount == 0 ? "" : textAmount}
              style={[styles.textInput, { flex: 1, paddingRight: 30 }]}
              onChangeText={this.onChangeText}
              underlineColorAndroid="transparent"
            />
            <Text style={{ position: 'absolute', right: 20, fontSize: 30 }}>{"đ"}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={this.onPress} style={styles.button} >
          {
            this.state.processing ?
            <Text style={styles.textGrey}>Giao dịch đang được xử lý, vui lòng đợi</Text>
            :
            <Text style={styles.text}>Confirm Payment</Text>
        }
        </TouchableOpacity>
        { this.state.processing ?
            <ActivityIndicator size="small" color="#000" />
            : null
        }
        {
          description != "" ?
            <Text style={[styles.text, { color: 'red' }]}>{description}</Text>
            : null
        }
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  textInput: {
    fontSize: 16,
    marginHorizontal: 15,
    marginTop: 5,
    height: 40,
    paddingBottom: 2,
    borderBottomColor: '#dadada',
    borderBottomWidth: 1,
  },
  formInput: {
    backgroundColor: '#FFF',
    borderBottomColor: '#dadada',
    borderTopColor: '#dadada',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#b0006d',
    borderRadius: 4,
    marginHorizontal: 40,
    marginVertical: 10
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 10
  },
  textGrey: {
    color: "grey",
    fontSize: 18,
    textAlign: 'center',
  }
});