import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme, Button } from "galio-framework";
const { width, height } = Dimensions.get("window");
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Logo from "./Logo_3.png";
import ProfileLogo from "../../assets/profileMenu.png";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu ";
import { useAppContext } from "../../Context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { ThemeData } from "../../Theme/Theme";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";

export const Header = () => {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const {
    ProfilneImageUpdate,
    setProfilneImageUpdate,
    toggleDrwerMenu,
    isDrwerMenuVisible,
    setDrawerMenuVisible,
    userDetails,
    update,
    notificatoinUpdate,
    setNotificationsUpdate,
  } = useAppContext();
  const [image, setImage] = useState(null);
  const [notificationCount, setNotificationsCount] = useState(0);
  const handelProfileClick = () => {
    navigation.navigate("Profile");
  };

  const handelNotificationClick = () => {
    navigation.navigate("Notification");
  };

  const handelDailyRatesClick = () => {
    navigation.navigate("Daily Rates");
  };

  const getUserImage = async (id) => {
    console.log("Getting user image in header===============================>");
    try {
      // Replace 'yourapiurl' with your actual API endpoint URL
      const response = await axios.get(`${Base_url}b2bUser/profilepic/${id}`);

      // Assuming the response contains the image data as a base64 string
      const imageBase64 = response.data.image;
      setImage(imageBase64);
      // Log or return the image base64 string
      // console.log('User image fetched successfully:');

      return imageBase64;
    } catch (error) {
      // Handle errors
      console.error(
        "Error fetching user image:",
        error.response ? error.response.data : error.message
      );
      throw error; // Throw error to be caught by the caller
    }
  };

  const getNotificationsCount = async (id) => {
    try {
      const response = await axios.get(
        `${Base_url}b2b-notifications/count/${id}`
      );
      console.log("notifications count on home page ===>", response.data);
      setNotificationsCount(response.data.unreadCount || 0);
      // Reset error state on successful fetch
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("userID ====>", userDetails.id);
    if (userDetails.id) {
      getUserImage(userDetails.id);
      getNotificationsCount(userDetails.id);
    }
  }, [userDetails, update, notificatoinUpdate]);

  useEffect(() => {
    if (userDetails.id) {
      getUserImage(userDetails.id);
    }
  }, [ProfilneImageUpdate]);
  return (
        <View style={[{ marginTop: 40, padding: 10 }, styles.container]}>
      <Block style={[styles.Space_Between]}>
        <TouchableOpacity activeOpacity={0.9} onPress={handelProfileClick}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                resizeMode: "contain",
                width: 50,
                height: 50,
                borderRadius: 100,
              }}
            />
          ) : (
            <Image source={ProfileLogo} style={{ width: 45, height: 44 }} />
          )}
        </TouchableOpacity>
    
        <Block style={{ position: 'absolute', left: '50%', transform: [{ translateX: -32.5 }] }}>
          <Image source={Logo} style={{ width: 65, height: 64 }} />
        </Block>
    
        <Block style={{ flexDirection: "row", gap: 20, marginLeft: 'auto' }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handelNotificationClick}
            style={{ position: "relative" }}
          >
            <FontAwesome5 name="bell" size={30} color={ThemeData.textColor} />
            {notificationCount !== 0 && (
              <Block
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 100,
                  backgroundColor: "red",
                  position: "absolute",
                  right: -3,
                  top: -3,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 10 }}>
                  {notificationCount}
                </Text>
              </Block>
            )}
          </TouchableOpacity>
          {userDetails && userDetails.registerAs !== "Retailer" && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handelDailyRatesClick}
            >
              <FontAwesome5
                name="envelope"
                size={30}
                color={ThemeData.textColor}
              />
            </TouchableOpacity>
          )}
        </Block>
      </Block>
      <HamburgerMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeData.containerBackgroundColor,
  },
  inputContainer: {
    width: "100%",
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: "transparent", // Make the border color transparent
  },
  input: {
    flex: 1,
    textAlign: "center",
    padding: 0,
    fontSize: 22,
    // Remove padding to make it look borderless
  },
  subtitle: {
    color: "black",
    fontSize: 20,
    marginTop: 10,

    textAlign: "left",
    lineHeight: 23,
    letterSpacing: 0.3,
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 52,
  },
  btn: {
    width: "95%",
    height: 55,
    borderRadius: 5,
    backgroundColor: "#40A99E",
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    borderWidth: 1,
    borderColor: "blue",
  },
  Center: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Space_Around: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  Space_Between: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    width: width,
  },
});
