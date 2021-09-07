import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, ActivityIndicator, Share, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import HTML from 'react-native-render-html';

import Setting from '../../../constants/Setting';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default class ResourceDetail extends Component {

  state = {
    isLoading: true,
    data: '',
  }

  componentDidMount(){
    this.getData()
  }

  getData = async() => {
    console.log('Link: ' + Setting.resourceApi + this.props.navigation.getParam('id'));
    await fetch(Setting.resourceApi + this.props.navigation.getParam('id'))
    .then(data => data.json())
    .then(res => {
      this.setState({
        data: res,
        isLoading: false
      });
    })
  }

  render(){

    let { t, i18n} = this.props.screenProps;

    const shareResource = async() => {
      try {
        const result = await Share.share({
          url: Setting.mainUrl + i18n.language + '/resource/' + this.props.navigation.getParam('id'),
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    }
    
    ResourceDetail.navigationOptions = {
        title: this.props.navigation.getParam('title'),
        headerRight: (
          <Ionicons name='ios-share' size={24} style={{ marginRight: 20 }} onPress={ () => shareResource() } />
        )
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
        writingDirection: (i18n.language != 'en') ? 'rtl' : 'ltr',
      },
      coverPhoto:{
        height:350, 
        width: Dimensions.get('window').width, 
        resizeMode: 'stretch',
      },
      hr:{
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginTop: 5,
        marginBottom: 5,
      },
      title:{
        fontSize: 22,
        marginTop: 10,
        writingDirection: (i18n.language != 'en') ? 'rtl' : 'ltr',
      },
      text:{
        marginTop: 10,
        textAlign: 'justify', 
        color: 'grey', 
        fontSize: (i18n.language != 'en') ? 11 : 13,
        writingDirection: (i18n.language != 'en') ? 'rtl' : 'ltr',
      },
      title:{
        writingDirection: (i18n.language != 'en') ? 'rtl' : 'ltr',
      },
      user:{
        borderWidth: 0,
        alignSelf: (i18n.language != 'en') ? 'flex-end' : 'flex-start',
        marginHorizontal: 0,
        flexDirection: 'row',
        margin: 3,
        textAlignVertical: 'center'
      },
      userContainer:{
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 30,
      },
      userTxt:{
        
      },
      icons:{
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 60,
        height: 40,
        backgroundColor: '#eee',
        borderRadius: 50,
        flexDirection: 'row',
        margin: 3,
      },
      iconsContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      iconBtn:{
        flex: 1,
        marginHorizontal: 0,
        alignSelf: 'center'
      },
      iconTxt:{
        marginLeft: 10
      },
      commentInput:{
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 16,
        marginTop: 10,
        fontSize: 16,
        paddingLeft: 12,
        paddingRight: 12,
        writingDirection: (i18n.language != 'en') ? 'rtl' : 'ltr',
      }
    });

    if(this.state.isLoading){
      return(
        <View style={{ flex: 1, alignItems: 'center', padding:0, paddingTop: 15 }}>
          <ActivityIndicator animating size={'small'} />
        </View>
      )
    }

    let img = this.props.navigation.getParam('img');

    let authors = this.state.data.authors.map((author, key) => {
      return(
        <TouchableOpacity key={key}>
          <Text style={ styles.text }> { author.name } </Text>
        </TouchableOpacity>
      )
    })

    let levels = this.state.data.levels.map((level, key) => {
      return(
        <TouchableOpacity key={key}>
          <Text style={ styles.text }> { level.name } </Text>
        </TouchableOpacity>
      )
    })

    let subjects = this.state.data.subjects.map((subject, key) => {
      return(
        <TouchableOpacity key={key}>
          <Text style={ styles.text }> { subject.name } </Text>
        </TouchableOpacity>
      )
    })

    let types = this.state.data.LearningResourceTypes.map((type, key) => {
      return(
        <TouchableOpacity key={key}>
          <Text style={ styles.text }> { type.name } </Text>
        </TouchableOpacity>
      )
    })

    let publishers = this.state.data.publishers.map((publisher, key) => {
      return(
        <TouchableOpacity key={key}>
          <Text style={ styles.text }> { publisher.name } </Text>
        </TouchableOpacity>
      )
    })

    let translations = this.state.data.translations.map((translation, key) => {
      return(
        <TouchableOpacity key={key}>
          <Text style={ styles.text }> { t(translation.language) } </Text>
        </TouchableOpacity>
      )
    })

    let licenses = this.state.data.CreativeCommons.map((license, key) => {
      return(
        <TouchableOpacity key={key} onPress={ () => { this.props.navigation.navigate('Resources', attachment) }}>
          <Text style={ styles.text }> { license.name } </Text>
        </TouchableOpacity>
      )
    })

    let attachments = this.state.data.attachments.map((attachment, key) => {
      let fileType = 'book';

      if(attachment.file_mime == 'application/pdf') fileType = "file-pdf-o";
      else if(attachment.file_mime == 'application/msword') fileType = "file-word-o";
      else if(attachment.file_mime == 'audio/mpeg') fileType = "file-audio-o";

      return(
        <TouchableOpacity key={key} style={{ marginTop:5 }} onPress={ () => 
          this.props.navigation.navigate('RenderPDF', { data: attachment, title: this.props.navigation.getParam('title') }) 
        }>
          <FontAwesome.Button name={ fileType } backgroundColor="#9C6C1F" size={20}>
            <Text style={ styles.text, {color: 'white'} }> { attachment.file_name }</Text>
          </FontAwesome.Button>
        </TouchableOpacity>
      )
    })
  
    let comments = this.state.data.comments.map((comment, key) => {
      return(
        <TouchableOpacity key={key} style={styles.userContainer}>

          <View style={[styles.user]}>
            <Ionicons name="md-person" size={22} color="#777" />
            <Text style={[styles.iconTxt, { color:'#777' }]}>{ comment.username }</Text>
          </View>
          <Text style={ styles.text }> { comment.comment } </Text>
        </TouchableOpacity>
      )
    })

    return(
      <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>

        <View style={styles.shadow}>
          <Image style={styles.coverPhoto} source={{uri: img }} />
        </View>

        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconBtn} onPress={()=>{alert('clicked')}}>
            <View style={[styles.icons, {width: 80}]}>
              <Ionicons name="ios-eye" size={26} color="#FFA800" />
              <Text style={styles.iconTxt}>{ this.state.data.views }</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} onPress={()=>{alert('Added to Favorites')}}>
            <View style={styles.icons}>
              <Ionicons name="ios-star" size={26} color="#FFA800" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} onPress={()=>{alert('Flagged')}}>
            <View style={styles.icons}>
              <Ionicons name="ios-flag" size={26} color="#FFA800" />
            </View>
          </TouchableOpacity>
        </View>
      
        <View style={styles.container}>
          <Text style={styles.title}>{ this.props.navigation.getParam('title') }</Text>

          <HTML 
            html={ this.props.navigation.getParam('abstract') } 
            ignoredTags={[ 'img' ]}
            ignoredStyles={[ 'font', 'font-family', 'font-size' ]}
            imagesMaxWidth={ Dimensions.get('window').width } 
            containerStyle={ 'margin:50px' }
            tagsStyles={{ span: styles.text, p: styles.text }}
          />
        </View>

        <View style={ styles.hr } />
  
        <View style={styles.container}>
          <Text style={styles.title}>{ t('Author') }</Text>
          { authors }
        </View>

        <View style={ styles.hr } />
  
        <View style={styles.container}>
          <Text style={styles.title}>{ t('Resource Level') }</Text>
          { levels }
        </View>

        <View style={ styles.hr } />
  
        <View style={styles.container}>
          <Text style={styles.title}>{ t('Subject Area') }</Text>
          { subjects }
        </View>

        <View style={ styles.hr } />
  
        <View style={styles.container}>
          <Text style={styles.title}>{ t('Learning Resource Type') }</Text>
          { types }
        </View>

        <View style={ styles.hr } />
  
        <View style={styles.container}>
          <Text style={styles.title}>{ t('Publisher') }</Text>
          { publishers }
        </View>

        <View style={ styles.hr } />
  
        <View style={styles.container}>
          <Text style={styles.title}>{ t('Languages Available') }</Text>
          { translations }
        </View>

        <View style={ styles.hr } />
  
        <View style={styles.container}>
          <Text style={styles.title}>{ t('License') }</Text>
          { licenses }
        </View>

        <View style={ styles.hr } />
  
        <View style={styles.container}>
          <Text style={styles.title}>{ t('Attachments') }</Text>
          { attachments }
        </View>

        <View style={ styles.hr } />
  
        <View style={styles.container}>
          <Text style={styles.title}>{ t('Comments') }</Text>
          { comments }
          <TextInput placeholder={t('Comment')} style={styles.commentInput}></TextInput>
        </View>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      </ScrollView>
    )
  }
}


//const title = this.props.navigation.getParam('title');
// ResourceDetail.navigationOptions = (navigation) => ({
//   title: navigation.getParam('title'),
// });