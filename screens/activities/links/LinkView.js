import React from 'react';
import WebView from 'react-native-webview';
import Setting from '../../../constants/Setting';

export default function LinkView({ navigation }) {

    LinkView.navigationOptions = {
      title: navigation.getParam('title'),
    };

    let forbiddenLinks = ['fa/impact', 'en/impact', 'ps/impact'];

    return (
        <WebView 
          source={{ uri: Setting.baseUrl + ((!forbiddenLinks.includes(navigation.getParam('path'))) ? 'api/page_view/' : '') + navigation.getParam('path').split('/').pop() }}
          scalesPageToFit={true}
          bounces={true}
          //scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          injectedJavaScript={ 'document.getElementsByClassName("header")[0].remove();' }
        />
    );
}
