import React, { Component } from "react";
import { View, Button, StyleSheet, Text, RefreshControl, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import LanguageView from './activities/setting/LanguageView';
import Setting from "../constants/Setting";
import * as Updates from "expo-updates";

export default class SettingsScreen extends Component {
  
  constructor() {
    super();
    this.state = { status: '' };

    AsyncStorage.getItem('loginState').then( async (data) => {
      this.setState({ status: data });
  } )
  }

  render() {
    let { t, i18n } = this.props.screenProps;
    const { navigate } = this.props.navigation;

   
    
  function Logout() {
      AsyncStorage.getItem('loginState').then( async (data) => {
          if (data === 'skipped') {
              Alert.alert(
                  t("Log Out"),
                  t("You are not signed in to any account!"),
                  [{ text: t("Close"), onPress: () => {} }]
              );
  
          }
          if (data === 'signedIn') {
              AsyncStorage.getItem('user').then( async (user) => {
                  Alert.alert(
                      t("Log Out"),
                      t("You are signed in as ")+user+ t(', do you want to logout?'),
                      [{ text: t("Yes"), onPress: async () => {
                              await AsyncStorage.removeItem('user');
                              await AsyncStorage.removeItem('token');
                              await AsyncStorage.removeItem('loginState');
                              await Updates.reloadAsync();
                          } },
                          { text: t("No"), onPress: () => {} }]
                  );
              })
          }
      } )
  
  }
    
  function DeleteUser() {
      Alert.alert(
          t("Delete Account"),
          t("Delete Account Confirmation"),
          [{ text: t("Yes"), onPress: async () => {
            fetch(Setting.DeleteUser, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            }).then((data) => console.log(data) )
              } },
              { text: t("No"), onPress: () => {} }]
      );
}

const deleteUser = async () => {
  try {
    const response = await fetch(Setting.DeleteUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed, such as authentication headers
      },
      body: JSON.stringify({}), // You can pass any data if required by your backend
    });

    const data = await response.json();
    console.log(data); // Assuming the response contains a message
    // Do something with the data if needed
  } catch (error) {
    console.error('Error deleting user:', error);
    // Handle error
  }
};


    return (
      <View>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {   navigate("Languages", { title: t("choose_language") }); }}
        >
          <View
            style={{
              flexDirection:
                this.props.screenProps.i18n.language != "en"
                  ? "row-reverse"
                  : "row",
            }}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name="globe" size={22} color="#ccc" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
             { t("choose_language") }
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        { this.state.status == 'signedIn' && (
        <TouchableOpacity
          style={styles.option}
          onPress={() => { Logout() }}
        >
          <View
            style={{
              flexDirection:
                this.props.screenProps.i18n.language != "en"
                  ? "row-reverse"
                  : "row",
            }}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name="log-out" size={22} color="#ccc" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
              {t('Log Out')}
              </Text>
            </View>
          </View>
        </TouchableOpacity> )}
        { this.state.status == 'signedIn' && (
        <TouchableOpacity
          style={styles.option}
          onPress={() => { deleteUser() }}
        >
          <View
            style={{
              flexDirection:
                this.props.screenProps.i18n.language != "en"
                  ? "row-reverse"
                  : "row",
            }}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name="person-remove" size={22} color="#ccc" />
            </View> 
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
              {  t("Delete Account") }
              </Text>
            </View>
          </View>
        </TouchableOpacity>)}
      </View>
      
    );
  }
}

SettingsScreen.navigationOptions = ({ screenProps: { t } }) => ({
  title: 'Settings',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
    marginLeft: 9,
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
});
