import AddCity from './AddCity/AddCity';
import Cities from './Cities/Cities';
import City from './Cities/City';
import EditCity from './EditCity/EditCity';

import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const CitiesNav = createStackNavigator({
    Cities: { screen: Cities },
    City: { screen: City },
    EditCity: { screen: EditCity }
});

const CitiesTabs = createBottomTabNavigator({
    Cities: { screen: CitiesNav },
    AddCity: { screen: AddCity }
});

const Tabs = createAppContainer(CitiesTabs);

export default Tabs;