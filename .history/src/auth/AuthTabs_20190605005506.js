

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';


const authTabs = createBottomTabNavigator({
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen }
});

const AuthTabs = createAppContainer(authTabs);

export default AuthTabs;