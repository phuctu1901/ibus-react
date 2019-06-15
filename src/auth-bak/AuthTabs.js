
import City from '../Cities/City';
import Cities from '../Cities/Cities';
// import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const authTabs = createBottomTabNavigator({
    'Đăng nhập': { screen: LoginScreen },
    'Đăng ký': { screen: SignUpScreen }
});

const CitiesNav = createStackNavigator({
    Auth: { screen: authTabs},
    Cities: { screen: Cities },
    City: { screen: City },
});

const AuthTabs = createAppContainer(authTabs, CitiesNav);

export default AuthTabs;