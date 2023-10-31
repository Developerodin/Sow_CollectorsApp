import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import PhoneInput from "react-native-phone-number-input";
import Img from "../Images/Onbording.png"
import Logo from "../Images/Logo_1.png"
import { Feather } from '@expo/vector-icons';
import { OTPInput } from '../../Components/Otp/OtpInputs';
import { ToastAndroid } from 'react-native';
export const Login = ({navigation}) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
  });
  const [showOTP,setOTPShow]=useState(false)
  const [otp, setOtp] = useState("");

  const handleInputChange = (fieldName, value) => {

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleOtpFill = (otp) => {
    console.log("OTP entered:", otp);
    setOtp(otp);
    
    // You can perform any actions with the completed OTP here
  };

  const handelOtpComplete =()=>{
    if(otp === "1234"){
      handelPreviousUser()
    }
    else{
      handelNewUser()
    }
  }

 const handelPreviousUser =()=>{
  navigation.navigate('Tabs')
 }

 const handelNewUser =()=>{
  navigation.navigate('FillPersonalDetails')
 }

  const handelMobileNumber=()=>{
    if(!formData.phoneNumber){
      ToastAndroid.show('Please Provide Mobile Number', ToastAndroid.SHORT);
    return;
    }
    setOTPShow(true);
  }

  return (
   
      <View style={styles.container}>
 <StatusBar style="dark" />
     <ScrollView>
     
    <View style={{alignItems:"left",marginTop:40,width:width}}>
    
      <View style={{alignItems:"center"}}>
      <Image
        source={Img}
        style={{resizeMode: 'contain',width:250,height:250}}
      />
      </View>
      <View style={{alignItems:"center",marginTop:10}}>
      <Image
        source={Logo}
        style={{resizeMode: 'contain',width:260,height:91}}
      />
      </View>
      

     
{
  showOTP ?
  <View style={{alignItems:"left",padding:10,justifyContent:"center",marginTop:40}}>
      <Text style={{fontSize:22,fontWeight:400}}>Enter OTP</Text>
      <Text style={{fontSize:14,fontWeight:400,marginTop:10}}>OTP Sent to +91 902 496 7391</Text>
      <Block style={{flexDirection:"row",alignItems:"center"}}>
      <Text style={{fontSize:14,fontWeight:400,marginTop:10,color:"#00A56A"}}>Change Number</Text>
        {/* <Image source={Line1} style={{marginTop:10}} /> */}

        
      </Block>
      <Block style={[styles.Space_Between,{width:"95%",marginTop:20}]} >
        <Block  style={{flex:1}}>
        <OTPInput length={4} onComplete={handleOtpFill} />
        </Block>
      
        </Block>
      
      <Block>
      <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 30, color: '#BDBDBD' }}>
        Don’t Receive the OTP ? <Text style={{ color: '#00A56A' }}>Resend OTP</Text>
      </Text>
      </Block>
      {/* <Block style={[styles.Space_Around]}>
        <TouchableOpacity onPress={handelPreviousUser}>
          <Text style={{fontSize:14,fontWeight:400,color:"#00A56A"}}>Previous User</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handelNewUser}>
          <Text style={{fontSize:14,fontWeight:400,color:"#00A56A"}}>New User</Text>
        </TouchableOpacity>
      </Block> */}
      </View>

    :
    
         <View style={{alignItems:"left",padding:10,justifyContent:"center",marginTop:100}}>
      <Text style={{fontSize:22,fontWeight:400}}>Login</Text>
      
      <Block style={[styles.Space_Between,{width:"95%",marginTop:20}]} >
        <Block style={{width:width*0.15}}>
        <Input 
         value='+91'
      
        />
        </Block>

        <Block style={{width:width*0.7,marginLeft:10}}>
        <Input 
         value={formData.phoneNumber}
         onChangeText={(text) => handleInputChange("phoneNumber", text)}
        />
        </Block>
        </Block>
      
      </View>
   
    
}

    </View>

    
    <Block style={{marginBottom:20,marginTop:20}}>
    

        <Block style={[styles.Center,{marginTop:20}]} >
          {
            showOTP ?
            <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.btn,
                  {
                    flexDirection:"row",
                    backgroundColor: '#96DE20',
                    textAlign:"center",
                    borderRadius:30
                  },
                ]}
                onPress={handelOtpComplete}
                >
                <Text
                  style={{
                    fontWeight:500,
                    fontSize: 22,
                    color:"black",
                  }}>
                  Proceed 
                </Text>
                <Feather name="arrow-right" size={24} color="black" style={{marginLeft:10}} />
              </TouchableOpacity>
              :
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    flexDirection:"row",
                    backgroundColor: '#96DE20',
                    textAlign:"center",
                    borderRadius:30
                  },
                ]}
                onPress={handelMobileNumber}
                >
                <Text
                  style={{
                    fontWeight:500,
                    fontSize: 22,
                    color:"black",
                  }}>
                  Proceed 
                </Text>
                <Feather name="arrow-right" size={24} color="black" style={{marginLeft:10}} />
              </TouchableOpacity>
          }
              
        </Block>
      
      
    </Block>
    
    </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#FFF",

  },
  inputContainer: {
    width: '100%',
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: 'transparent', // Make the border color transparent
  },
  input: {
    flex: 1,
    textAlign:"center",
    padding:0,
    fontSize:22
     // Remove padding to make it look borderless
  },
  subtitle: {
    color:"black",
    fontSize: 20,
    marginTop: 10,
  
    textAlign: 'left',
    lineHeight: 23,
    letterSpacing:0.3
  },
  title: {
    color:"black",
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 52,
  },
  btn: {
   width: '95%',
    height: 55,
    borderRadius: 5,
    backgroundColor: '#40A99E',
    justifyContent: 'center',
    alignItems: 'center',
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