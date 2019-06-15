import AddCity from "./AddCity/AddCity";
import Cities from "./Cities/Cities";
import City from "./Cities/City";
import EditCity from "./EditCity/EditCity";
import StationScanner from './buyticket/qrscanner';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
// import LoginScreen from "./auth/LoginScreen";
import AuthTabs from "./auth/Tabs";
import ListRoute from "./buyticket/listroute";
import DetailRoute from "./buyticket/detailroute";
import MomoPayment from "./buyticket/momopayment";
import BuySuccess from "./buyticket/showticket";
import DetailTicket from "./Ticket/detailticket";

import { colors, fonts } from './theme'

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
})

const CitiesNav = createStackNavigator({
  Cities: { screen: Cities },
  City: { screen: City },
  EditCity: { screen: EditCity },
  DetailTicket: {screen: DetailTicket}
});

const BuyTicketNav = createStackNavigator({
  StationScanner: {screen: StationScanner},
  ListRoute:{screen: ListRoute},
  DetailRoute: {screen: DetailRoute},
  MomoPayment:{screen: MomoPayment},
  BuySuccess: {screen: BuySuccess},
})

const routes = {
  Home: {
    screen: CitiesNav,
    navigationOptions: {
      title: 'Sign In',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/signInButton.png')}
          style={[styles.icon, { tintColor }]}
        />
      )
    }
  },
  BuyTicket: {
    screen: BuyTicketNav,
    navigationOptions: {
      title: 'Sign Up',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/signUpButton.png')}
          style={[styles.icon, { tintColor }]}
        />
      )
    }
  },
  Profile: {
    screen: AddCity,
    navigationOptions: {
      title: 'Sign Up',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/signUpButton.png')}
          style={[styles.icon, { tintColor }]}
        />
      )
    }
  }
}

const routeConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: true,
    activeTintColor: colors.primary,
    inactiveTintColor: colors.secondary,
    indicatorStyle: { backgroundColor: colors.secondary },
    labelStyle: {
      fontFamily: fonts.base,
      fontSize: 12
    },
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      paddingBottom: 3
    },
  }
}


const CitiesTabs = createBottomTabNavigator(routes, routeConfig);


// const CitiesTabs = createBottomTabNavigator({
//   'Danh sách vé': { screen: CitiesNav },
//   'Mua vé':{screen: BuyTicketNav},
//   'Thông tin tài khoản': { screen: AddCity }
// });
const mainNav = createSwitchNavigator(
    {
      Login: AuthTabs,
      City : CitiesTabs
      //   City: City,
      //   EditCity: EditCity
    },
    {
      initialRouteName: "Login"
    }
  );
  

// const CitiesTabs = createBottomTabNavigator({
//     Cities: { screen: CitiesNav },
//     AddCity: { screen: AddCity }
// });

const Tabs = createAppContainer(mainNav);

export default Tabs;
