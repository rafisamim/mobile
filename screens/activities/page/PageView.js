import React from 'react';
import WebView from 'react-native-webview';
import { StyleSheet, ActivityIndicator, Text, View, RefreshControl } from 'react-native';
import Setting from '../../../constants/Setting';

export default class PageView extends React.Component {

  state = {
    isLoading: true,
    refreshing: false,
    text: 'loading',
    data: ''
  }
  
  getPageDetails = async() => {
    await fetch(Setting.pageApi + 4137 + '/' + this.props.screenProps.i18n.language)
    .then(data => data.json())
    .then(res => {
      this.setState({
        pageDataSource: res,
        pageLoading: false
      });

      console.log(pageDataSource);
    })
  }

  render()
  {
    const { navigate } = this.props.navigation;
    if(this.state.isLoading){
      return(
        <View style={{ flex: 1, alignItems: 'center', padding:0, paddingTop: 15 }}>
          <ActivityIndicator animating size={'small'} />
        </View>
      )
    }

    PageView.navigationOptions = {
      title: "COVID-19",
    };

    return (
        <WebView 
          source={{ uri: Setting.pageApi + 4137 + '/en' + this.props.screenProps.i18n.language }}
          scalesPageToFit={true}
          bounces={true}
          //scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          injectedJavaScript={ 'document.getElementsByClassName("header")[0].remove();' }
        />
    );

  }

}


}
PageView.navigationOptions = {
  title: "COVID-19",
};

