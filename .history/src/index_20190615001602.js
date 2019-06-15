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

const CitiesTabs = createBottomTabNavigator({
  'Danh sách vé': { screen: CitiesNav },
  'Mua vé':{screen: BuyTicketNav},
  'Thông tin tài khoản': { screen: AddCity }
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
