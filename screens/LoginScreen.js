import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, Image, TouchableOpacity, AsyncStorage  } from 'react-native';
import { Updates } from 'expo';

import Setting from '../constants/Setting';
export default class LoginScreen extends Component {

  constructor()
  {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  setLoginStatus(state)
  {
    try {
      AsyncStorage.setItem('loginState', state);
      Updates.reload();
    } catch (error) {
      console.log(error);
    }
  }

  submitLoginForm()
  {
    //console.warn(this.state);
    //console.warn(Setting.LoginUrl);

    fetch('http://127.0.0.1/ddl/api/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(data => data.json())
    .then(res => {
      console.log(res);
    });
  }
  
  render(){

    let { t, i18n} = this.props.screenProps;
    const { navigate } = this.props.navigation;

    const styles = StyleSheet.create({

      container: { 
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
      },
    
      skipButton: {
        marginTop: 30,
        alignSelf: 'flex-end',
      },
    
      inner: {
        flex: 1,
        width: '100%',
        justifyContent: 'center'
      },
      
      logoContainer: {    
        alignSelf: 'center'
      },
    
      loginText: {
        color: '#777',
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center'
      },
    
      formContainer: {
        marginTop: 60,
      },
    
      inputStyle: {
        backgroundColor: '#999',
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 35,
        height: 45,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 20,
        textAlign: (i18n.language != 'en') ? 'right' : 'left'
      },
    
      btn: {
        backgroundColor: '#da7437',
        borderRadius: 35,
        paddingVertical: 15,
        marginBottom: 20
      },
    
      btnText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
      }
    });

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
          
      <View style={styles.skipButton}>
        <Button title={t("Skip")} onPress={() => { this.setLoginStatus('skipped') }} />
      </View>
      
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>

          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo-ddl.png')} />
            <Text style={styles.loginText}>{ t('Login with your DDL account') }</Text>
          </View>

          <View style={styles.formContainer}>

            <TextInput 
              style={ styles.inputStyle } 
              placeholder={t("Email or Username")} 
              placeholderTextColor="#555" 
              onChangeText={ (text) => { this.setState({ username: text}) }} 
            />
            <TextInput 
              style={ styles.inputStyle } 
              placeholder={t("Password")} placeholderTextColor="#555" 
              secureTextEntry={true} 
              onChangeText={ (text) => { this.setState({ password: text}) }} 
            />
            <TouchableOpacity style={ styles.btn } onPress={() => this.submitLoginForm()}>
              <Text style={ styles.btnText }>{t('Sign In')}</Text>
            </TouchableOpacity>
            <Button title={t('Register')} onPress={ () => { navigate('Signup') } } />
          </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}
