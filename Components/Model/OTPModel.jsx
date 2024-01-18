import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Pressable, View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAppContext } from "../../Context/AppContext";

import { AntDesign } from "@expo/vector-icons";
import { Block, Text, Input, theme, Button } from "galio-framework";
import { NavigationActions } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneInput from "react-native-phone-number-input";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";
import axios from "axios";
import { OTPInput } from "../Otp/OtpInputs";
import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get("screen");
export const OTPModel = ({modalVisible,setModalVisible,handelComplete,orderCompleteStatus}) => {
  const navigation = useNavigation();
  const animationRef = useRef(null);

  const handelModelClose = () => {
    console.log("Model CLick");
    setModalVisible(!modalVisible);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const phoneInput = useRef(null);
  const initalValues = {
    number: "",
    otp: "",
    errorMessage: "",
  };
  const [formData, setFormData] = useState(initalValues);
  const [otp, setOtp] = useState("");
  const [mobileNumber, setmobileNumber] = useState();
  const [formattedValue, setFormattedValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Loading,setLoading] = useState(false);
  // const handleLogin = async () => {
  //   if (formData.number === "9090909090" && otp === "1234") {
  //     // localStorage.setItem("Auth",true)
  //     try {
  //       await AsyncStorage.setItem("Auth", "true");
  //       console.log("Login==>", formData, otp);
  //       setFormData(initalValues);
  //       setIsLoggedIn(true);
  //       setModalVisible(false);
  //       navigation.navigate("Tabs");
  //     } catch (e) {
  //       // saving error
  //       console.log("Error saving Auth:", e);
  //     }
  //   } else {
  //     console.log("Login err==>", formData, formattedValue);
  //     setFormData({
  //       ...formData,
  //       errorMessage: "Invalid username or password",
  //     });
  //   }
  // };

  
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleOtpComplete = (otp) => {
    console.log("OTP entered:", otp);
    setOtp(otp);
    // You can perform any actions with the completed OTP here
  };

  const setMobileNumber = () => {
    console.log("true");
    if (formData.number.length >= 10) {
      setmobileNumber(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Enter A Valid Mobile Number");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  const handeOtpBack = () => {
    setmobileNumber(false);
  };
  const handleSkip = () => {
    console.log("Handel SKip");
    navigation.navigate("Tabs"); // Navigate to Tabs and specify the Home tab
  };

  const handleOtpFill = (otp) => {
    console.log("OTP entered:", otp);
    setOtp(otp);
  };

  const handelDone = ()=>{
    setModalVisible(false)
  }

  return (
    <Modal
    // propagateSwipe={true}
        animationType="slide"
        transparent={true}
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        backdropOpacity={0.1}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection={[ "down"]}
        style={styles.viewHalf}
      >
   
      <View style={[styles.centeredView]}>
        {
          orderCompleteStatus ? <View style={styles.modalView}>
          
            
  
            <Block center style={{ marginTop:0, width: width }}>
                
            <LottieView
      ref={animationRef}
      style={styles.lottie}
     
      
      source={require('../../assets/Animations/Animation - 1695899165253.json')}
      autoPlay={true} loop={true}
    />
                
              </Block>
              
  
             
  
            
              <Block style={{position:"absolute",bottom:60}}>
                <Button onPress={()=>handelDone(otp)} color="success">Done</Button>
              </Block>
  
           
          </View>
          :
          <View style={styles.modalView}>
        <Block center style={{marginTop:-42}}>
          <AntDesign name="minus" size={50} color="grey" />
          </Block>
          <Block center style={{width:width,padding:16}}>
          <Text left style={{fontSize:30}}>Enter OTP</Text>
          </Block>

          <Block style={{ marginTop: 10, width: width }}>
              

          <Block center  style={{flex:1,marginTop:30}}>
        <OTPInput length={4} onComplete={handleOtpFill} />
        </Block>
              
            </Block>
            

           

          
            <Block style={{position:"absolute",bottom:60}}>
              <Button onPress={()=>handelComplete(otp)} color="success"> Complete</Button>
            </Block>

         
        </View>
        }
        
       
        
      </View>

      {/* <View style={styles.content}>
    <Text style={styles.contentTitle}>Hi 👋!</Text>
    <Button testID={'close-button'}  title="Close" />
  </View> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewHalf: {
    justifyContent: "flex-end",
    margin: 0,
  },
  lottie:{
    width:250,
    height:250
    },
  content: {
    backgroundColor: "white",
    padding: 22,
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
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: -50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 35,
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
    height: height - 400,
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

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  
  AlignCenter: {
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "grey",
    borderBottomWidth: 0.5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  borderView: {
    borderWidth: 1,
    borderColor: "red",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBlock: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  textContainer: {
    position: "absolute",
    bottom: 40, // Adjust as needed
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
