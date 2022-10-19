import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import HTML from 'react-native-render-html';
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';

import Setting from '../../../constants/Setting';
import PdfReader from '../../../src';

export default class RenderPDF extends Component {

  render(){

    const res = this.props.navigation.getParam('data');
    RenderPDF.navigationOptions = {
      title: this.props.navigation.getParam('title'),
      headerRight: (
        (res.file_name) ?
        <Ionicons name='md-download' size={22} style={{ marginRight: 20 }} onPress={ () => resourceExists() }></Ionicons>
        : ''
      )
    };

    this.props.navigation.navigate({
      params: {data: res, title: this.props.navigation.getParam('title')}
    })



    let storeData = async (uri) => {
      try {

        let resourceData = {
          title: this.props.navigation.getParam('title'),
          file_name: res.file_name,
          file_type: res.file_type,
          file_mime: res.file_mime,
          resource_id: res.resource_id,
          uri: uri,
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

      async function resourceExists() {
       try {
         console.log('checking if file exists');
         const existingResources = await AsyncStorage.getItem('resources');
         let fileExists = false;

         let resources = JSON.parse(existingResources);
         if (resources) {
           for (let i = 0; i < resources.length; i++) {
             if (resources[i].file_name == res.file_name)
               fileExists = true;
           }

           if (fileExists)
             alert("Resource already downloaded!");

           else
             initDownload();

         } else {
           initDownload();
         }

       } catch (error) {
         // Error saving data
       }
     };

    let initDownload = () => {

      alert('Download Started!');
      FileSystem.downloadAsync(
          Setting.FileApi + res.resource_id,
        FileSystem.documentDirectory + res.file_name
      )
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri);
        storeData(uri);
        alert('Resource Downloaded!');
      })
      .catch(error => {
          alert('Resource Can not be Downloaded! ' + error);
      });
    }
    if(res.file_mime == 'application/pdf')
    {
      return(
          <PdfReader
          source={{
            uri: Setting.FileApi + res.resource_id,
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
            { uri: Setting.FileApi + res.resource_id } :
            { html: '<h1 align="center">file not available!</h1>' }
          }
          scalesPageToFit={true}
          bounces={true}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          injectedJavaScript={ 'document.getElementsByClassName("header")[0].remove();' +
              'document.getElementsByTagName(\'footer\')[0].remove();' +
              'document.getElementsByTagName(\'hr\')[0].remove();' }
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
