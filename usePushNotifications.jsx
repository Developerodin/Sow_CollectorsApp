import React, { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import axios from "axios";
import { Base_url } from "./Config/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const usePushNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });
 
  const [expoPushToken, setExpoPushToken] = useState(undefined);
  const [notification, setNotification] = useState(undefined);

  const notificationListener = useRef();
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;
    // if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      console.log("step 1 ===>")
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        console.log("step 2 ===>")
      }
      if (finalStatus !== "granted") {
        console.log("step 3 failed ===>")
        alert("Failed to get push token for push notification");
        return;
      }
      console.log("step 3 ===>")
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
    // } else {
    //   alert("Must be using a physical device for Push notifications");
    // }
    console.log("step 4 ===>")
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    console.log("step 5 ===>")
   console.log("Token =====>",token)
   
    return token;
  }


  const saveToken = async(token,userId)=>{
    if (token) {
      // console.log("Token update api call ===>",userId,token)
      try {
        const res = await axios.post(`${Base_url}api/b2b/${userId}/update-token`, { notificationToken: token });
        console.log("Response from token update:==>", res.data);
      } catch (error) {
        console.error("Error updating token on backend:", error.response ? error.response.data : error.message);
      }
    }
  }
  const userDetailsFromStorage = async (token) => {
    // console.log("Token in user details check ===>",token)
    try{
      const Details = (await AsyncStorage.getItem("userDetails")) || null;
      // console.log("step 6 ===>",Details)
    const ParseData = JSON.parse(Details);
     
    // console.log("Parse Data of user  ===>", ParseData);
    const data = ParseData;
    if(data){
      saveToken(token,data._id)
    }
    return ;
    }
    catch(err){
      console.log("Error in getting user ==.",err)
    }
   
  }; 

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log("Use Effect token =======>",token)
      setExpoPushToken(token);
      userDetailsFromStorage(token.data);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};

export default usePushNotifications;

