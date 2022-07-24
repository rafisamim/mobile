import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import HTML from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';

import Setting from '../../../constants/Setting';
import PdfReader from '../../../src';

export default class RenderFile extends Component {
  render(){

    const res = this.props.navigation.getParam('data');
    RenderFile.navigationOptions = {
      title: this.props.navigation.getParam('title')
    };

    let storeData = async () => {
      try {

        let resourceData = {
          title: this.props.navigation.getParam('title'),
          file_name: res.file_name,
          file_type: res.file_type,
          file_mime: res.file_mime,
          resource_id: res.resource_id,
          id:res.id
        };

        const existingResources = await AsyncStorage.getItem('resources');

        let resources = JSON.parse(existingResources);
        if( !resources ){
          resources = []
        }

        resources.push( resourceData )

        await AsyncStorage.setItem('resources', JSON.stringify(resources));
      } catch (error) {
        // Error saving data
      }
    };

    let retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('resources');
        if (value !== null) {
          // We have data!!
          console.log(value);
          console.log(FileSystem.getInfoAsync(FileSystem.documentDirectory + res.file_name) );
        }
      } catch (error) {
        // Error retrieving data
      }
    };

    const downloadResource = () => {
      FileSystem.downloadAsync(
          Setting.FileApi + res.resource_id,
        FileSystem.documentDirectory + res.file_name
      )
      .then(({ uri }) => {
        //console.log('Finished downloading to ', uri);
        storeData();
        alert('Resource Downloaded!');
      })
      .catch(error => {
          console.error(error);
      });
    }

    if(res.file_mime == 'application/pdf')
    {
      return(
          <PdfReader
            source={{
              uri: res.uri,
            }}
            customStyle={{
              readerContainerZoomContainer: {
                borderRadius: 30,
                backgroundColor: 'black',
              },
              readerContainerZoomContainerButton: {
                borderRadius: 30,
              },
            }}
          />
      )
    } else { 
        return(
          <WebView 
            source={
              (res.file_name) ? 
              {  uri: Setting.FileApi + res.resource_id } :
              { html: '<h1 align="center">file not available!</h1>' }
            }
            scalesPageToFit={true}
            bounces={true}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            injectedJavaScript={ 'document.getElementsByClassName("header")[0].remove();' }
          />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    writingDirection: (Setting.language != 'en') ? 'rtl' : 'ltr',
  },
});
