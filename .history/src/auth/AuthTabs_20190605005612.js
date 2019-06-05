

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';


const authTabs = createBottomTabNavigator({
    'Đăng nhập': { screen: LoginScreen },
    'Đăng ký': { screen: SignUpScreen }
});

const AuthTabs = createAppContainer(authTabs);

export default AuthTabs;