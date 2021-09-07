import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import {AsyncStorage} from 'react-native';

export default class SettingsScreen extends Component {
  render(){

    let { t, i18n} = this.props.screenProps;
    async function changeLang(lang = 'en') {
      
      try {
        await AsyncStorage.setItem('lang', lang);
        i18n.changeLanguage(lang)
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <View style={ styles.container }>
        <Button style={ styles.btn } title={ t('en') } onPress={ () => { changeLang('en') }} />
        <Button style={ styles.btn } title={ t('fa') } onPress={ () => { changeLang('fa') }} />
        <Button style={ styles.btn } title={ t('ps') } onPress={ () => { changeLang('ps') }} />
        {/*
        <Button style={ styles.btn } title={ t('uz') } onPress={ () => { changeLang('uz') }} />
        <Button style={ styles.btn } title={ t('mj') } onPress={ () => { changeLang('mj') }} />
        <Button style={ styles.btn } title={ t('no') } onPress={ () => { changeLang('no') }} />
        <Button style={ styles.btn } title={ t('sw') } onPress={ () => { changeLang('sw') }} />
        <Button style={ styles.btn } title={ t('sh') } onPress={ () => { changeLang('sh') }} />
        */}
      </View>
    )
  }
}

SettingsScreen.navigationOptions = ({ screenProps: { t } }) => ({
  title: t('choose_language'),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  btn: {
    padding:20
  }
});
