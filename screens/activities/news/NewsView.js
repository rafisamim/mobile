import React from 'react';
import WebView from 'react-native-webview';
import Setting from '../../../constants/Setting';

export default function NewsView({ navigation }) {

    NewsView.navigationOptions = {
      title: navigation.getParam('title'),
    };

    return (
        <WebView 
          source={{ uri: Setting.baseUrl + 'api/api_news/' + navigation.getParam('id') }}
          scalesPageToFit={true}
          bounces={true}
          //scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          injectedJavaScript={ 'document.getElementsByClassName("header")[0].remove();' }
        />
    );
}