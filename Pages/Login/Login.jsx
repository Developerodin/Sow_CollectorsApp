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
  KeyboardAvoidingView,
  Easing ,
  ActivityIndicator,
  TextInput,
  
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme } from "galio-framework";
const { width, height } = Dimensions.get("window");
import PhoneInput from "react-native-phone-number-input";
import Img from "../Images/Onbording.png";
import Logo from "../Images/logo.png";
import BgCurve from "../Images/onboardingCurve.png";
import { Feather } from "@expo/vector-icons";
import { OTPInput } from "../../Components/Otp/OtpInputs";
import { ToastAndroid } from "react-native";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Shape from "../Images/shape.png";
import LoginImg from "../Images/loginImg1.jpg";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";
import { useAppContext } from "../../Context/AppContext";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export const Login = ({ navigation }) => {
  const {setIsLoggedIn,setuserDetails}= useAppContext();
  const initalValuesForm = {
    phoneNumber: "",
  }
  const [formData, setFormData] = useState(initalValuesForm);
  const [showOTP, setOTPShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30); // Initial countdown value
  const [canResend, setCanResend] = useState(false);
  
  const scaleValue = new Animated.Value(1);

  const customStyle ={
    Card: {
    
      borderRadius:5,
      padding:10,
      backgroundColor:"#fff",
      elevation:isKeyboardOpen ? 4 : 0
    }
  }
  
  const handleInputChange = (fieldName, value) => {
   
    const numericValue = value.replace("+91 ", "");

    
    if (numericValue.length <= 10) {
      setFormData({ ...formData, [fieldName]: numericValue });
    }
  };

  const handleOtpFill = (otp) => {
    console.log("OTP entered:", otp);
    setOtp(otp);

    // You can perform any actions with the completed OTP here
  };
  const saveAuthStatus = async () => {
    try {
      // You can use any key you like to store the authentication status
      const key = 'Auth';
      const value = 'true'; // Replace with your actual authentication status
  
      // Use AsyncStorage to save the authentication status
      await AsyncStorage.setItem(key, value);
      console.log('Authentication status saved successfully.');
    } catch (error) {
      console.error('Error saving authentication status:', error);
    }
  };

  const saveMobileNumber = async () => {
    try {
      // You can use any key you like to store the authentication status
      const key = 'Mobile';
      const value = formData.phoneNumber; // Replace with your actual authentication status
  
      // Use AsyncStorage to save the authentication status
      await AsyncStorage.setItem(key, value);
      console.log('Mobile saved successfully.');
    } catch (error) {
      console.error('Error saving Mobile:', error);
    }
  };


  const handelOtpComplete = () => {
    saveMobileNumber()
    loginWithOTP()
    // if (otp === "1234") {
    //   saveAuthStatus()
    //   handelPreviousUser();
    // } else {
    //   handelNewUser();
    // }
  };

  const handelPreviousUser = () => {
    setIsLoggedIn(true);
    saveMobileNumber()
    setFormData(initalValuesForm);
    setOTPShow(false)
    setOtp("")
    navigation.navigate("Tabs");
  };

  const handelNewUser = () => {
    saveMobileNumber()
    setFormData(initalValuesForm);
    setOTPShow(false)
    setOtp("")
    navigation.navigate("Register As");
  };

  const handelMobileNumber = () => {
    if (!formData.phoneNumber) {
      ToastAndroid.show("Please Provide Mobile Number", ToastAndroid.SHORT);
      return;
    }
    generateOTP()
    
  };

  const handelBack = () => {
    setOTPShow(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Animate the scale when focused
    Animated.timing(scaleValue, {
      toValue: 0.8,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false, // Disable native driver for transforms
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Animate the scale back when blurred
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };
 
  const generateOTP = async () => {
    setLoading(true);
    setCanResend(false);
    setCountdown(30);
  
    try {
      console.log('Phone Number:', formData.phoneNumber);
      const response = await axios.post(`${Base_url}b2bUser/generateOTP`, { phoneNumber: formData.phoneNumber });
  
      console.log('Response:', response);
      console.log('Message:', response.data.message);
  
      setLoading(false);
  
      if (response.data.message === "User not found") {
        handelNewUser(); // Ensure this function is defined
        return;
      }
  
      ToastAndroid.show("OTP sent to mobile number", ToastAndroid.SHORT);
      setOTPShow(true);
    } catch (error) {
      if (error.response) {
        console.error('Server Response Error:', error.response.data);
        console.error('Status Code:', error.response.status);
      } else if (error.request) {
        console.error('No Response Received:', error.request);
      } else {
        console.error('Axios Error:', error.message);
      }
      ToastAndroid.show("Try After Some Time", ToastAndroid.SHORT);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    let timer;
    if (countdown > 0 && showOTP && !canResend) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [countdown, showOTP, canResend]);

  const loginWithOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${Base_url}b2bUser/loginWithOTP`, {
        phoneNumber: formData.phoneNumber,
        otp: otp,
      });
  
      setLoading(false);
  
      // Handle different messages
      if (response.data.message === "Login successful") {
        // Get user and token from response
        const User = JSON.stringify(response.data.user); // Access 'user' field here
        const token = response.data.token;
  
        // Save user details and token in AsyncStorage
        await AsyncStorage.setItem("userDetails", User);
        await AsyncStorage.setItem("authToken", token);
  
        // Check user status
        // if (response.data.user.status === false) {
        //   saveMobileNumber();
        //   setOTPShow(false);
        //   setOtp("");
        //   navigation.navigate("VerifyProfileStatus");
        //   return;
        // }
  
        setuserDetails(response.data.user);
        saveAuthStatus();
        handelPreviousUser();
        console.log("res =>", response.data.user);
      } else if (response.data.message === "User not found") {
        handelNewUser();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      console.log("Failed to login. Please try again.");
      ToastAndroid.show("Wrong OTP", ToastAndroid.SHORT);
    }
  };
  

  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar  translucent={true} />
      <ScrollView>

      
      {/* {!isKeyboardOpen &&  <Block
          style={[styles.Space_Between, { marginTop: -12, marginRight: -13 }]}
        >
          <Block>
            {showOTP && (
              <AntDesign
                onPress={handelBack}
                name="arrowleft"
                size={30}
                color="grey"
                style={{ marginLeft: 20 }}
              />
            )}
          </Block>
           
         
        </Block>} */}

    
           <View style={{position:"relative"}}>
      <Image
        source={BgCurve}
        style={{width:width,height:height*0.5}}
      />

      <View style={{position:"absolute",top:120,left:20}}>
      <Image
        source={Logo}
        
      />
      {
        showOTP ?
        <Block>
        <Text style={{fontSize:30,color:"#fff",marginTop:30}}>Enter the OTP sent to</Text>
      
        <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
        <Text style={{color:"#FFFFFF",fontSize:18,marginTop:20}}>+91 {formData.phoneNumber}</Text>

        <TouchableOpacity onPress={handelBack} style={{marginTop:20,marginLeft:8,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <MaterialIcons name="edit" size={20} color="#65C5C4" style={{marginRight:3}} />
          <Text style={{color:"#fff",fontSize:18,color:"#65C5C4"}}>Edit</Text>
        </TouchableOpacity>
        </Block>
      
    </Block>
       
        :
        <Block>
          <Text style={{fontSize:30,color:"#fff",marginTop:30}}>Enter your mobile</Text>
          <Text style={{fontSize:30,color:"#fff"}}>number.</Text>

          <Text style={{color:"#FFFFFF",fontSize:18,marginTop:20}}>Enter your credentials.</Text>
        </Block>
      }
      

      
      </View>
      </View>
       
        
        <View
          style={[
            { marginTop: 0, flexDirection: "row", justifyContent: "center" },
          ]}
        >
          <Block>
         



            {showOTP ? (
              <View
              style={{
                padding: 20,
                justifyContent: "center",
                width: width,
                marginTop: 30,
              
              }}
              >
                {/* <Text style={{ fontSize: 27, fontWeight: 700,letterSpacing:2  }}>
                {loading ? 
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large"  color="#65be34" />
        </View>
        :
        "Enter OTP"
      }
                 
                  
                  
                  </Text> */}
                
              
                <Block
                  style={[
                    styles.Space_Between,
                    { width: "95%", marginTop: 20 },
                  ]}
                >
                  <Block center style={{ flex: 1}}>
                    <OTPInput length={4} onComplete={handleOtpFill} />
                  </Block>
                </Block>

                <Block center style={{width: "95%",marginTop:30,marginBottom: -40, }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "400",
                      
                      color: "black",
                      marginLeft:-40
                    }}
                  >
                    OTP Not Receive ?{" "}
                    <Text style={{ color:"#65C5C4", fontWeight: 500 }}>
                    {canResend ? (
            <Text style={{color:"#65C5C4"}} onPress={generateOTP}>Resend OTP</Text>
          ) : (
            `Resend OTP in ${countdown} sec`
          )}
                    </Text>
                  </Text>
                </Block>
              </View>
            ) : (
              <View
                style={{
                 
                  justifyContent: "center",
                  width: width,
                  
                
                }}
              >
                <Text style={{ fontSize: 27, fontWeight: 700,letterSpacing:2 }}>
                {/* {loading ? 
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large"  color="#65be34" />
        </View>
        :
        "Login"
      } */}
                </Text>
                

                <Block style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                  <Block style={{width:width*0.9}}>
                  <Text
                  style={{
                    fontSize: 15,
                    
                    color: "#A6A6A6",
                   
                    letterSpacing:1,
                    marginBottom:5
                  }}
                >
                  Enter your mobile number. 
                </Text>
                  </Block>
                
                {/* <TextInput

         style={{width:width*0.9}}
        keyboardType="numeric"
        label="+91"
 
        value={formData.phoneNumber}
        onChangeText={(text) => handleInputChange("phoneNumber", text)}
        
        color={ 'black'}
        inputStyle={{ borderWidth:1,borderRadius:10,borderColor:"grey", paddingBottom:0,fontSize:20,letterSpacing:3,backgroundColor:'#fff' }}
        
        
      /> */}

<TextInput
        style={styles.input}
        placeholder="+ 91"
        keyboardType="numeric"
        placeholderTextColor="black"
        value={`+91 ${formData.phoneNumber}`}
        onChangeText={(text) => handleInputChange("phoneNumber", text)}
        maxLength={14} // to account for "+91 " plus 10 digits
      />
                </Block>
      
              </View>
            )}

                       <Block center style={[{ marginTop: 40, marginBottom: 40 }]}>
                          {showOTP ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#000000',
                    width: width * 0.88,
                    padding: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}
                  onPress={handelOtpComplete}
                  activeOpacity={0.8}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={{ color: '#fff', fontSize: 16 }}>Login</Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#000000',
                    width: width * 0.88,
                    padding: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}
                  onPress={handelMobileNumber}
                  activeOpacity={0.8}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={{ color: '#fff', fontSize: 16 }}>Send OTP</Text>
                  )}
                </TouchableOpacity>
              )}
            </Block>
          </Block>
        </View>
      </ScrollView>
      {/* <Block center style={styles.bottomBlock}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginTop: 30,`
            color: "#BDBDBD",
          }}
        >
          Don’t have an account ?{" "}
          <Text
            onPress={handelNewUser}
            style={{ color: "#f8ac50", fontWeight: 500 }}
          >
            Sign up
          </Text>
        </Text>
      </Block> */}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
     // Fully opaque background
  },
 
  inputContainer: {
    width: "100%",
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: "transparent", // Make the border color transparent
  },
  lottie: {
    width: width * 0.9,
    height: width * 0.5,
  },
  input: {
    flex: 1,
    textAlign: "left",
    padding:15,
    fontSize:16,
    borderWidth:1,
    borderRadius:8,
    borderColor:"#A6A6A6",
    width:width*0.9,
    letterSpacing:3
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
    flex: 0.5,
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
  bottomBlock: {
    position: "absolute",
    bottom: 50,
    width: width,
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
