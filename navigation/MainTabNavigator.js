import * as React from 'react';
import {Alert, Dimensions, Platform, TouchableOpacity} from 'react-native';
import { Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from '@avadon/react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import LinkView from '../screens/activities/links/LinkView';
import NewsScreen from '../screens/NewsScreen';
import NewsView from '../screens/activities/news/NewsView';
import PageView from '../screens/activities/page/PageView';
import LanguageView from '../screens/activities/setting/LanguageView'
import SettingsScreen from '../screens/SettingsScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import DownloadsScreen from '../screens/DownloadsScreen';
import ResourceDetailScreen from '../screens/activities/resources/ResourceDetailScreen';
import RenderPdfScreen from '../screens/activities/resources/RenderPDF';
import RenderDownloadedFile from '../screens/activities/download/RenderFile';
import Setting from "../constants/Setting";
import LoginScreen from "../screens/LoginScreen";
import AuthStackNavigator from './AuthStackNavigator';
import SignupScreen from "../screens/SignupScreen";
import {t} from "i18next";
import * as Updates from "expo-updates";
const {height, width} = Dimensions.get('window');



const CustomDrawerComponent = (props) => (
  <ScrollView>
    <SafeAreaView>
      <View style={{ marginTop:-50, paddingTop: 70, paddingBottom:20, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#000' }}>
        <Image source={ require('../assets/images/logo.png') }></Image>
      </View>
      <DrawerItems { ...props } style={{ writingDirection: 'rtl', textAlign: 'right' }} labelStyle={{ textAlign: 'right' }} />
        <TouchableOpacity onPress={ Login }><Text style={{ color:'#222' , textAlign: 'left', fontWeight: 'bold',  marginLeft: 14, marginTop: 8}}> {t('Sign In') +'/'+ t('Register')} </Text></TouchableOpacity>
       </SafeAreaView>
   <View>
       <View style={{height: height-470}}>
           <Text style={{ textAlign: 'center', position: 'absolute', bottom:0, left:30 }}>
               DDL APP VERSION 1.0 {'\n'} COPYRIGHT &copy; Darakht-e Danesh
           </Text>
       </View>
   </View>

  </ScrollView>
)

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    defaultNavigationOptions: (data) => {
      return {
        headerTitleStyle: {
          color: '#000',
            maxWidth: width-80,
        },
        headerStyle:{
          backgroundColor: '#FFA800',
        },
        headerLeft : () => {
            return (<Ionicons name='md-menu' size={28} style={{ marginLeft: 20 }} onPress={ () => data.navigation.toggleDrawer() }></Ionicons>)
    }
    ,
        unmountInactiveRoutes: true,
        unmountInactiveScreens: true
      }
    }
  }
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    }, 
    PageView: {
      screen: PageView,
    }
  },
  config
);

HomeStack.navigationOptions = ({ screenProps: { t } }) => ({
  drawerLabel: t('home'),
  tabBarLabel: t('home'),
  path: 'homes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  )
})

HomeStack.path = '';

// Resources Stack
const ResourcesStack = createStackNavigator(
  {
    Resources: {
        screen: ResourcesScreen,
    },
    ResourceDetail: {
        screen: ResourceDetailScreen,
        navigationOptions: (data) => {
          return{
            headerLeft: (
              <Ionicons name='md-arrow-back' size={28} style={{ marginLeft: 20 }} onPress={ () => data.navigation.goBack() }></Ionicons>
            )
          }
        }
    },
    RenderPDF: {
        screen: RenderPdfScreen,
        navigationOptions: (data) => {
          return{
            headerLeft: (
              <Ionicons name='md-arrow-back' size={28} style={{ marginLeft: 20 }} onPress={ () => data.navigation.goBack() }></Ionicons>
            )
          }
        }
    }
  },
  config
);

ResourcesStack.navigationOptions = ({ screenProps: { t } }) => ({
  drawerLabel: t('library'),
  tabBarLabel: t('library'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-book`
          : 'md-book'
      }
    />
  ),
});

ResourcesStack.path = '';

// Downloaded Resources Stack
const DownloadsStack = createStackNavigator(
  {
    Downloads: {
      screen: DownloadsScreen
    },
    RenderFile: {
      screen: RenderDownloadedFile,
      navigationOptions: (data) => {
        return{
          headerLeft: (
            <Ionicons name='md-arrow-back' size={28} style={{ marginLeft: 20 }} onPress={ () => data.navigation.goBack() }></Ionicons>
          )
        }
      }
    }
  },
  config
);

DownloadsStack.navigationOptions = ({ screenProps: { t } }) => ({
  drawerLabel: t('downloads'),
  tabBarLabel: t('downloads'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-download`
          : 'md-download'
      }
    />
  ),
});

DownloadsStack.path = '';

// Links Stack
const LinksStack = createStackNavigator(
  {
    Links: {
        screen: LinksScreen,
    },
    LinkView: {
        screen: LinkView,
        navigationOptions: (data) => {
          return{
            headerLeft: (
              <Ionicons name='md-arrow-back' size={28} style={{ marginLeft: 20 }} onPress={ () => data.navigation.goBack() }></Ionicons>
            )
          }
        }
    }
  },
  config
);

LinksStack.navigationOptions = ({ screenProps: { t } }) => ({
  drawerLabel: t('links'),
  tabBarLabel: t('links'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} style={{color: 'orange'}} />
  ),
});

LinksStack.path = '';


// News Stack
const NewsStack = createStackNavigator(
  {
    News: {
        screen: NewsScreen,
    },
    NewsView: {
        screen: NewsView,
        navigationOptions: (data) => {
          return{
            headerLeft: (
              <Ionicons name='md-arrow-back' size={28} style={{ marginLeft: 20 }} onPress={ () => data.navigation.goBack() }></Ionicons>
            )
          }
        }
    }
  },
  config
);

NewsStack.navigationOptions = ({ screenProps: { t } }) => ({
  drawerLabel: t('news'),
  tabBarLabel: t('news'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-newspaper' : 'md-newspaper'} style={{color: 'orange'}} />
  ),
});

NewsStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
    },
    Languages: {
      screen: LanguageView,
      navigationOptions: (data) => {
        return{
          headerLeft: (
            <Ionicons name='md-arrow-back' size={28} style={{ marginLeft: 20 }} onPress={ () => data.navigation.goBack() }></Ionicons>
          )
        }
      }
  }
  },
  config
);

SettingsStack.navigationOptions = ({ screenProps: { t } }) => ({
  drawerLabel: 'Settings',
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} />
  ),
});
SettingsStack.path = '';

const LoginStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
        Signup: {
            screen: SignupScreen,
        }
    },{
        headerMode: 'none',
    }
);


LoginStack.navigationOptions = ({ screenProps: { t } }) => ({
    drawerLabel: t('Sign In') +' / '+ t('Register')
});



function Login() {
    AsyncStorage.getItem('loginState').then( async (data) => {
        if (data === 'skipped') {
            await AsyncStorage.removeItem('loginState');
            await Updates.reloadAsync();
        }
        if (data === 'signedIn') {
            AsyncStorage.getItem('user').then( async (user) => {
                Alert.alert(
                    t("Log Out"),
                    t("You are signed in as ")+user+ t(', do you want to logout?'),
                    [{ text: t("Yes"), onPress: async () => {
                            await AsyncStorage.removeItem('user');
                            await AsyncStorage.removeItem('token');
                            await AsyncStorage.removeItem('loginState');
                            await Updates.reloadAsync();
                        } },
                        { text: t("No"), onPress: () => {} }]
                );
            })
        }
    } )

}


const tabNavigator = createBottomTabNavigator({ 
  HomeStack,
  ResourcesStack,
  DownloadsStack,
  LinksStack,
  NewsStack,
  SettingsStack,
}, {
  tabBarOptions: {
    unmountInactiveRoutes: true,
    unmountInactiveScreens: true,
    activeTintColor: '#76401E',
    labelStyle: {
      fontSize: 12,
      fontWeight: '300'
    },
  }
});


const Drawer = createDrawerNavigator({
  view:{
    screen: tabNavigator,
    navigationOptions: {
      drawerLabel: ()=>null
    }
  },
  HomeStack,
  ResourcesStack,
  DownloadsStack,
  LinksStack,
  NewsStack,
  SettingsStack
},{
  contentComponent: CustomDrawerComponent,
  //drawerPosition: (Setting.language != 'en') ? 'right' : 'left',
});



export default createAppContainer(Drawer);