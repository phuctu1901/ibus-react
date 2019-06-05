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
import LoginScreen from "./auth/LoginScreen";
import AuthTabs from "./auth/AuthTabs";
import ListRoute from "./buyticket/listroute";
import DetailRoute from "./buyticket/detailroute";


const CitiesNav = createStackNavigator({
  Cities: { screen: Cities },
  City: { screen: City },
  EditCity: { screen: EditCity }
});

const BuyTicketNav = createStackNavigator({
  StationScanner: {screen: StationScanner},
  ListRoute:{screen: ListRoute},
  DetailRoute: {screen: DetailRoute},
})

const CitiesTabs = createBottomTabNavigator({
  Cities: { screen: CitiesNav },
  'Mua vé':{screen: BuyTicketNav},
  AddCity: { screen: AddCity }
});
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
