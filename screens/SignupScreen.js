import React, { Component, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert, AsyncStorage
} from 'react-native';
import {Updates} from "expo";

export default class SignupScreen extends Component {
  constructor()
  {
    super();
    this.state = {
      email: '',
      password: '',
      username:'',
      errorEmail:'',
      showEmailError:false,
      errorPassword:'',
      showPasswordError:false,
      errorName:'',
      showNameError:false
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

  submitSignupForm()
  {
    let formdata = new FormData();
    formdata.append('email',this.state.email);
    formdata.append('password',this.state.password);
    formdata.append('username',this.state.username);

    fetch('http://192.168.0.105:8000/api/register', {
      method: 'POST',
      body: formdata,
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      })
    }).then(data => data.json())
        .then(res => {
          if(res.email){
            this.setState({showEmailError:true})
            this.setState({errorEmail:res.email[0]})
          }if(res.password){
            this.setState({showPasswordError:true})
            this.setState({errorPassword:res.password[0]})
          }if(res.username){
            this.setState({showNameError:true})
            this.setState({errorName:res.username[0]})
          }if(res.user){
            Alert.alert(
                "Thank you "+res.user+" !",
                "Your account has been created",
                [{ text: "OK", onPress: () => this.setLoginStatus('signedIn') }]
            );
            AsyncStorage.setItem('user', res.user);
            AsyncStorage.setItem('token', res.token);
console.log(res);
          }
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

      btnPrimary: {
        borderRadius: 35,
        paddingVertical: 15,
        marginBottom: 20
      },

      TextSlim: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'normal'
      },

      TextLarge: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize:18
      },

      btnText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
      },
      error: {
        textAlign: (i18n.language != 'en') ? 'right' : 'left',
        color: '#da7437',
        fontWeight: 'bold',
        marginBottom:20,
        paddingLeft: 15,
        paddingRight: 15,
      }
    });

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container} >
          
      <View style={styles.skipButton}>
        <Button title="Skip" onPress={() => { this.setLoginStatus('skipped') }} />
      </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>

          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo-ddl.png')} />
            <Text style={styles.loginText}>Signup to Darakht-e Danesh Library</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput style={ styles.inputStyle } placeholder="Email" placeholderTextColor="#555"
                       onChangeText={ (text) => { this.setState({ email: text}) }} />
            {this.state.showEmailError ? <Text style={ styles.error }>{this.state.errorEmail}</Text> : null}

            <TextInput style={ styles.inputStyle } placeholder="Username" placeholderTextColor="#555"
                       onChangeText={ (text) => { this.setState({ username: text}) }} />
            {this.state.showNameError ? <Text style={ styles.error }>{this.state.errorName}</Text> : null}

            <TextInput style={ styles.inputStyle } placeholder="Password" placeholderTextColor="#555" secureTextEntry={true}
                       onChangeText={ (text) => { this.setState({ password: text}) }} />
            {this.state.showPasswordError ? <Text style={ styles.error }>{this.state.errorPassword}</Text> : null}

            <TouchableOpacity style={ styles.btn } onPress={ () => this.submitSignupForm() }>
              <Text style={ styles.btnText }>Sign Up</Text>
            </TouchableOpacity>
            <Text style={ styles.TextSlim }>Already have an account?</Text>
            <TouchableOpacity style={ styles.btnPrimary } onPress={ () => { navigate('Login') } }>
              <Text style={ styles.TextLarge }>Sign in</Text>
            </TouchableOpacity>
          </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}


