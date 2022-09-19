import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import I18n from './locales';
import { NativeModules } from 'react-native';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
console.log(AppNavigator);
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

async function changeLang(lang = 'en') {

  try {
    await AsyncStorage.setItem('lang', lang);
    I18n.changeLanguage(lang);
  } catch (error) {
    console.log(error);
  }
};

async function loadResourcesAsync() {

  const locale = NativeModules.I18nManager.localeIdentifier;
  await AsyncStorage.getItem('lang').then((value) => {
    if(value==null) {
      console.log(locale.substring(0,2));
   changeLang(locale.substring(0,2));
    }
    else{
      console.log(value);
     changeLang(value)
    }
  })

  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/home/learn_more.png'),
      require('./assets/images/home/applied-sciences-icon-2.png'),
      require('./assets/images/home/arts-and-humanities-icon.png'),
      require('./assets/images/home/business-and-communication-icon.png'),
      require('./assets/images/home/career-and-technical-education-icon.png'),
      require('./assets/images/home/earth-sciences-icon.png'),
      require('./assets/images/home/education-icon.png'),
      require('./assets/images/home/history-icon.png'),
      require('./assets/images/home/language-arts-icon.png'),
      require('./assets/images/home/life-sciences-icon.png'),
      require('./assets/images/home/mathematics-icon.png'),
      require('./assets/images/home/MO-Website_Red-Quotation-Mark-Icon.png'),
      require('./assets/images/home/physical-sciences-icon.png'),
      require('./assets/images/home/social-sciences-icon.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
