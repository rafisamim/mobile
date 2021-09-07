import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

export default AuthStackNavigator = createStackNavigator(
{
    Login: {
        screen: LoginScreen,
    },
    Signup: {
        screen: SignupScreen,
    }
}, {

    headerMode: 'none',
});