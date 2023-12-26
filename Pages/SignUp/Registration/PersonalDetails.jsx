import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme } from "galio-framework";
const {width, height} = Dimensions.get('window');
import Logo from "../../Images/Logo_1.png";
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard } from 'react-native';
// import CheckBox from 'react-native-check-box';

export const PersonalDetails = () => {
    const navigation= useNavigation()
    const [formData, setFormData] = useState({
      email: "",
      name:"",
      city:""
    });
    const [showShopDetails,setShowShopDetails]= useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isFocused, setIsFocused] = useState({
      ForName:false,
      ForEmail:false,
      ForCity:false
    });
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const customStyle ={
      Card1: {
      
        borderRadius:5,
        padding:10,
        backgroundColor:"#fff",
        elevation:isFocused.ForName ? 4 : 0
      },
      Card2: {
      
        borderRadius:5,
        padding:10,
        backgroundColor:"#fff",
        elevation:isFocused.ForEmail ? 4 : 0
      },
      Card3: {
      
        borderRadius:5,
        padding:10,
        backgroundColor:"#fff",
        elevation:isFocused.ForCity ? 4 : 0
      },
    }
    const toggleCheckbox = () => {
      setIsChecked(!isChecked);
    };
    const handelPersonalDetailSubmit=()=>{
        // setShowShopDetails(true);
        navigation.navigate("VerificationDetails")
    }

    const handleInputChange = (fieldName, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    };

    const handelShopDetails=()=>{
        navigation.navigate("UplodeShopImage")
    }

    const handleFocus = (Name) => {
      setIsFocused((prevState) => ({
        ForName: Name === "name",
        ForEmail: Name === "email",
        ForCity: Name === "city"
      }));
   
    };
  
    const handleBlur = (Name) => {
      setIsFocused((prevState) => ({
        ...prevState,
        [Name]: false
      }));
      
    };

    const handelBack = () => {
      navigation.navigate("Login")
    };

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
    <View style={styles.container}>
    <StatusBar style="dark" />
  
        <ScrollView>
      
       <View style={{alignItems:"left",marginTop:35,width:width}}>
         
       {!isKeyboardOpen &&
         <Block>
           
              <AntDesign
                onPress={handelBack}
                name="arrowleft"
                size={30}
                color="grey"
                style={{ marginLeft: 20 }}
              />
            
          </Block>
}
         <Block center style={{marginTop:20}}>
              <LottieView
                style={styles.lottie}
                source={require("../../../assets/Animations/Animation - 1698917253840.json")}
                autoPlay
                loop
              />
            </Block>
   
       
     
         <View style={{alignItems:"left",padding:10,justifyContent:"center"}}>
         {/* {
        showShopDetails ?
         <Text style={{fontSize:24,fontWeight:500}}>Enter Shop Details</Text>
         : */}
         {/* <Text style={{fontSize:24,fontWeight:500}}>Enter Details</Text> */}
{/* } */}
        
        {/* <Block style={[styles.Space_Between,{marginTop:30}]}>
            <Text style={{fontSize:14,fontWeight:500}}>Registering As: <Text style={{color:"#EA5932"}}>Scrap Collector</Text> </Text>
            <Text style={{fontSize:14,fontWeight:500,color:"#6096FF"}} >change</Text>
        </Block> */}
         
         </View>
   
       </View>

       {/* {
        showShopDetails ?
        <Block style={{padding:10}}>
          

        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <Entypo name="shop" size={20}  color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter Shop Name</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>

        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <FontAwesome name="vcard-o" size={20} color="black" />
         
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter Udhyam Adhar No.</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>

        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <FontAwesome name="credit-card" size={20} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter GST No..</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>
        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <Ionicons name="location-sharp" size={20} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter Shop Address</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>
       </Block>
        : */}
        <Block style={{padding:10}}>
          

        <Block style={{marginTop:20}}>
            {/* <Block style={{flexDirection:"row",alignItems:"center"}}>
            <Ionicons name="person" size={18} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter Name</Text>
            </Block>
            <Block>
                <Input/>
            </Block> */}
<Block style={[ customStyle.Card1,{marginTop:20}]}>
                <TextInput

        variant="standard"
        
        label="Name"
        leading={(props) => <Icon name={isFocused.ForName ? 'account-circle' : 'account'} {...props} />}
        value={formData.name}
        onChangeText={(text) => handleInputChange("name", text)}
        onFocus={()=>handleFocus("name")}
        onBlur={()=>handleBlur("ForName")}
        color={ 'white'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:20,letterSpacing:3 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
            
        </Block>

      

        <Block style={{marginTop:30}}>
        <Block style={[ customStyle.Card2]}>
                <TextInput

        variant="standard"
        keyboardType="email-address"
        label="Email"
        leading={(props) => <Icon name={isFocused.ForEmail ? 'mail' : 'email'} {...props} />}
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        onFocus={()=>handleFocus("email")}
        onBlur={()=>handleBlur("ForEmail")}
        color={ 'white'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:20,letterSpacing:3 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
        </Block>

        <Block style={{marginTop:30}}>
        <Block style={[ customStyle.Card3]}>
                <TextInput

        variant="standard"
        keyboardType="default"
        label="City"
        leading={(props) => <Icon name={isFocused.ForCity ? 'map-marker' : 'city'} {...props} />}
        value={formData.city}
        onChangeText={(text) => handleInputChange("city", text)}
        onFocus={()=>handleFocus("city")}
        onBlur={()=>handleBlur("ForCity")}
        color={ 'white'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:20,letterSpacing:3 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
        </Block>

      
       
       </Block>
    {/* } */}

      
        
    <Block right style={[{ padding: 20, marginTop: 10 }]}>
             
                <Button
                  title="Proceed"
                  color="#65be34"
                  style={{ width: 150, padding: 5 }}
                  onPress={handelPersonalDetailSubmit}
                  trailing={(props) => <Icon name="send" {...props} />}
                  tintColor="#fff"
                />
              
            </Block>
      
   
      
       </ScrollView>
       </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"#FFF"
    },
    lottie: {
      width: width * 0.9,
      height: width * 0.5,
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