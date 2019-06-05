import AddCity from "./AddCity/AddCity";
import Cities from "./Cities/Cities";
import City from "./Cities/City";
import EditCity from "./EditCity/EditCity";

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import LoginScreen from "./auth/LoginScreen";
import AuthTabs from "./auth/AuthTabs";


const mainNav = createSwitchNavigator(
    {
  Login: AuthTabs,
  Cities:  CitiesNav,
//   City: City,
//   EditCity: EditCity 
},
  {
    initialRouteName: "Login"
  }
  );

  const CitiesNav = createStackNavigator({
    Cities: { screen: Cities },
    City: { screen: City },
    EditCity: { screen: EditCity }
});

const CitiesTabs = createBottomTabNavigator({
    Cities: { screen: CitiesNav },
    AddCity: { screen: AddCity }
});


// const CitiesTabs = createBottomTabNavigator({
//     Cities: { screen: CitiesNav },
//     AddCity: { screen: AddCity }
// });

const Tabs = createAppContainer(CitiesTabs);

export default Tabs;
