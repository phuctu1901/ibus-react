import AddCity from './AddCity/AddCity';
import Cities from './Cities/Cities';
import City from './Cities/City';
import EditCity from './EditCity/EditCity';

import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';


const authTabs = createBottomTabNavigator({
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen }
});

const AuthTabs = createAppContainer(authTabs);

export default AuthTabs;