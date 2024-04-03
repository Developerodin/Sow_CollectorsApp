import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Linking,
  Platform,
  ActivityIndicator
} from "react-native";
import { Block, Text, Input, theme,Button } from "galio-framework";

import { Ionicons } from "@expo/vector-icons";

import Modal from "react-native-modal";

import { TextInput } from "@react-native-material/core";
import { Entypo } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";




export const WebViewApp = ({route}) => {
 const navigation = useNavigation()
 const { Data } = route.params;
//  const [userData,setUserData] = useState(null)
//  const [url,setUrl] = useState("");
 const [isLoading, setIsLoading] = useState(true);

  const handelClose = () => {
    navigation.goBack();
    // setFormData(initalValuesForm);
  };

  const handleWebViewLoad = () => {
    // Implement any logic you need when the WebView is loaded
    console.log("Platform ===>",Platform.OS)
  };

  
  


  const webViewProps = {
    source: { uri: Data.url },
    originWhitelist: ['*'],
    javaScriptEnabled: true,
    domStorageEnabled: true,
    allowsInlineMediaPlayback: true,
    mediaPlaybackRequiresUserAction: false,
    onLoad: handleWebViewLoad
  };

  // Conditionally adjust WebView props based on screen height
  if (Platform.OS === 'ios' && height < 812) {
    // For smaller iOS devices (like iPhone SE), hide the bottom buttons
    webViewProps.style = { marginBottom: -34 };
  } else if (Platform.OS === 'android' && height < 640) {
    // For smaller Android devices, adjust the margin bottom accordingly
    webViewProps.style = { marginBottom: -20 };
  }



  // useEffect(()=>{
    
  //   console.log("Data ===>",ZoomMeetingNumber)
  //   const state = { ZoomMeetingNumber };
  //   const zoomMeetingNumberString = JSON.stringify(state.ZoomMeetingNumber);
  //   const queryParams = new URLSearchParams();
  //   queryParams.append('ZoomMeetingNumber', zoomMeetingNumberString);
  //   const queryString = queryParams.toString();
  //   const uri = `https://zoom-live-web.vercel.app/cdn?${queryString}`;
  //   console.log("URL Updated ==>",uri);
  //   setUrl(uri);
   
  // },[])

//  useEffect(()=>{
//   setIsLoading(true)
//   setTimeout(()=>{
//     setIsLoading(false)
//   },4000)
//  },[])


  return (
    <View style={[styles.centeredView]}>
      <StatusBar style="dark" backgroundColor="white" translucent={true} />
    <View style={styles.modalView}>
  
      
    
      <Block style={{paddingTop:32}}>
      <WebView style={styles.webcontainer} 
      {...webViewProps}
      
      />
      </Block>
      
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  webcontainer: {
     width:width,
     height:height,
     borderWidth:1,
     borderColor:"red"
      // marginTop: Constants.statusBarHeight,
    },
viewHalf: {
  justifyContent: "flex-end",
  margin: 0,
},
lottie: {
  width: 250,
  height: 250,
},
content: {
  backgroundColor: "white",
  padding: 12,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 4,
  borderColor: "rgba(0, 0, 0, 0.1)",
},
contentTitle: {
  fontSize: 20,
  marginBottom: 12,
},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",

},
modalView: {
  margin: 20,
  backgroundColor: "white",
  padding: 20,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  width: width,
  height: height - 0.9,
  borderWidth:1,
  borderColor:"red",
  
},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
},
buttonOpen: {
  backgroundColor: "#F194FF",
},
buttonClose: {
  backgroundColor: "#2196F3",
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
},
modalText: {
  marginTop: 5,
  marginBottom: 15,
  textAlign: "center",
  fontSize: 45,
  fontWeight: "bold",
  color: "#2DA194",
},
});
