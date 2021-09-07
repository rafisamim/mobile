import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, Image, TouchableOpacity  } from 'react-native';

export default class LoginScreen extends Component {
  
  render(){

    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
          
      <View style={styles.skipButton}>
        <Button title="Skip" onPress={() => {alert('Skipping this part')}} />
      </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>

          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo-ddl.png')} />
            <Text style={styles.loginText}>Signup to Darakht-e Danesh Library</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput style={ styles.inputStyle } placeholder="Email" placeholderTextColor="#555" />
            <TextInput style={ styles.inputStyle } placeholder="Username" placeholderTextColor="#555" />
            <TextInput style={ styles.inputStyle } placeholder="Password" placeholderTextColor="#555" secureTextEntry={true} />
            <TouchableOpacity style={ styles.btn } onPress={() => null}>
              <Text style={ styles.btnText }>Sign Up</Text>
            </TouchableOpacity>
            <Button title="Already have an account, Login" onPress={ () => { navigate('Login') } } />
          </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}

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
    alignSelf: 'flex-end'
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
    marginTop: 10
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
    marginBottom: 20,
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
