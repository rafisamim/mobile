import React from "react";
import { View, Button, StyleSheet, Text, RefreshControl, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import I18n from '../../../locales';


export default function LanguageView({ navigation }) {
  LanguageView.navigationOptions = {
    title: navigation.getParam("title"),
  }
  
    async function changeLang(lang = "en") {
      try {
        await AsyncStorage.setItem("lang", lang);
        I18n.changeLanguage(lang);
      } catch (error) {
        console.log(error);
      }
    }


    return (
      <View>
      <TouchableOpacity
       style={styles.option}
        onPress={() => {
          changeLang('en');
        }}
      >
        <View style={{
              flexDirection:
                I18n.language != "en"
                  ? "row-reverse"
                  : "row",
            }}>
          <View style={styles.optionIconContainer}>
            <Ionicons name="ios-globe" size={22} color="#ccc" />
          </View>
          <View>
            <Text style={styles.optionText}>English</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
       style={styles.option}
        onPress={() => {
          changeLang('fa');
        }}
      >
        <View style={{
              flexDirection:
                I18n.language != "en"
                  ? "row-reverse"
                  : "row",
            }}>
          <View style={styles.optionIconContainer}>
            <Ionicons name="ios-globe" size={22} color="#ccc" />
          </View>
          <View>
            <Text style={styles.optionText}>فارسی</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
       style={styles.option}
        onPress={() => {
          changeLang('ps');
        }}
      >
        <View style={{
              flexDirection:
                I18n.language != "en"
                  ? "row-reverse"
                  : "row",
            }}>
          <View style={styles.optionIconContainer}>
            <Ionicons name="ios-globe" size={22} color="#ccc" />
          </View>
          <View>
            <Text style={styles.optionText}>پشتو</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    );
  }


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