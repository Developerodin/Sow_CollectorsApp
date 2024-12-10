import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView,ActivityIndicator,TextInput, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated } from 'react-native'
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
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
import { ToastAndroid } from "react-native";

import { CategoryAddModel } from '../../../Components/CategoryAddModel/CategoryAddModel';
import { Checkbox } from 'galio-framework';
import { StateSelectModel } from '../../../Components/Model/StateSelectModel';
import * as ImagePicker from 'expo-image-picker';

// import CheckBox from 'react-native-check-box';

export const Kyc = () => {
    const navigation= useNavigation()
    const [formData, setFormData] = useState({
      // gender:"",

      gstinNumber:"",

    });
    const [CategoriesData, setCategoriesData] = useState([]);
    const [isFocused, setIsFocused] = useState({
      ForName:false,
      ForEmail:false,
      ForCity:false
    });
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [ modalVisible,setModalVisible] = useState(false);

    const [termandCondition,setTermandCondition] = useState(false);
    const [privacyPolicy,setprivacyPolicy] = useState(false);

    const [loading,setLoading] = useState(false)
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
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

   
    const showImagePicker = async (sourceType) => {
        // Request media library permission
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        if (permissionResult.granted === false) {
          alert('Permission to access the gallery is required!');
          return;
        }
      
        // Launch image picker
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          sourceType: sourceType,
          base64: true,  // Request base64 encoding
        });
      
        // Check if the user selected an image
        if (!result.canceled) {
          // console.log("URI of image library ==> ", result.assets[0]);
          const dataImage = result.assets[0]
    
          if(dataImage){
            // console.log("Base64 of selected image ==> ", result.assets[0].base64);
          const base64data = `data:${dataImage.mimeType};base64,${dataImage.base64}`  // Base64 string
          setImage(base64data);  // Or you can set the base64 if needed
        //   updateUserImage(userDetails.id,base64data)
          }
          
        }
      };

      const showImagePicker2 = async (sourceType) => {
        // Request media library permission
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        if (permissionResult.granted === false) {
          alert('Permission to access the gallery is required!');
          return;
        }
      
        // Launch image picker
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          sourceType: sourceType,
          base64: true,  // Request base64 encoding
        });
      
        // Check if the user selected an image
        if (!result.canceled) {
          // console.log("URI of image library ==> ", result.assets[0]);
          const dataImage = result.assets[0]
    
          if(dataImage){
            // console.log("Base64 of selected image ==> ", result.assets[0].base64);
          const base64data = `data:${dataImage.mimeType};base64,${dataImage.base64}`  // Base64 string
          setImage2(base64data);  // Or you can set the base64 if needed
        //   updateUserImage(userDetails.id,base64data)
          }
          
        }
      };
      const handelSkip = () => {
        navigation.navigate("VerifyProfileStatus")
      };

      const handelSubmitData = async (data) => {
        setLoading(true)
        try {
          const response = await axios.post(`${Base_url}b2bUser/kyc`, data); // Adjust the endpoint to match your backend route
          if (response.data.success) {
            console.log('KYC details added successfully:', response.data.data);
            navigation.navigate("VerifyProfileStatus")
            if(image !== ""){
                handelSubmitWareHouseData()
            }
            if(image2 !== ""){
                handelSubmitOwnerImageData()
            }

            
            return { success: true, data: response.data.data };
          }
        } catch (error) {
          setLoading(false)
          console.error('Error adding KYC details:', error.response?.data?.message || error.message);
          return { success: false, message: error.response?.data?.message || error.message };
        }
      };

      const handelSubmitOwnerImageData = async () => {
      
        try {
          const response = await axios.post(`${Base_url}b2bUser/kycOwnerImage`, image2); // Adjust the endpoint to match your backend route
          if (response.data.success) {
            console.log('KYC details added successfully:', response.data.data);
            return { success: true, data: response.data.data };
          }
        } catch (error) {
          console.error('Error adding KYC details:', error.response?.data?.message || error.message);
          return { success: false, message: error.response?.data?.message || error.message };
        }
      };

      const handelSubmitWareHouseData = async () => {
        try {
          const response = await axios.post(`${Base_url}b2bUser/kycWareHouseImage`, image); // Adjust the endpoint to match your backend route
          if (response.data.success) {
            console.log('KYC details added successfully:', response.data.data);
            return { success: true, data: response.data.data };
          }
        } catch (error) {
          console.error('Error adding KYC details:', error.response?.data?.message || error.message);
          return { success: false, message: error.response?.data?.message || error.message };
        }
      };
   
    
    const handelPersonalDetailSubmit=async()=>{
        const UserId = await AsyncStorage.getItem('userID') || null;
          console.log("User Id in kyc",UserId)
          const data ={
            gstinNumber:formData.gstinNumber,
            userId:UserId,
            WareHouseImage:"",
            OwnerImage:""
          }
          if(termandCondition && privacyPolicy){
            handelSubmitData(data)
          }
          else{
            ToastAndroid.show(`Please accept both conditions`, ToastAndroid.SHORT);
          }
         
        // navigation.navigate("VerifyProfileStatus")
    }

   

    const handleInputChange = (fieldName, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    };


    const handelBack = () => {
      navigation.navigate("Register As")
    };
    const getCategories = async () => {
      
      try {
        const response = await axios.get(`${Base_url}categories`);
        setCategoriesData(response.data);
        console.log("Categories all", response.data)
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    };
    
    
    const handelCategoryModelOpen=()=>{
      setModalVisible(true)
    }


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

    useEffect(()=>{
      getCategories();
   
    },[])

    
  return (
    <View style={styles.container}>
    <StatusBar style="dark" />
  
        <ScrollView>
      
       <View style={{alignItems:"left",marginTop:55,width:width}}>
         
       {!isKeyboardOpen &&
                <Block style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Block style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={handelBack} activeOpacity={0.8}>
            <Block style={{ backgroundColor: "black", width: 50, height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 150, marginLeft: 20 }}>
              <MaterialIcons name="arrow-back-ios" size={22} style={{ marginLeft: 5 }} color="white" />
            </Block>
            </TouchableOpacity>
            <Text style={{ marginLeft: 15, fontSize: 25, fontWeight: 500 }}>Almost there</Text>
          </Block>
          <TouchableOpacity activeOpacity={0.8} onPress={handelSkip}>
          <Block style={{  flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 30, marginRight: 20 ,padding: 8}}>
            <Text style={{ color: "#000", marginRight: 5,fontSize: 16,fontWeight:600 }}>Skip</Text>
            <MaterialIcons name="double-arrow" size={18} color="#000" />
           

            
          </Block>
          </TouchableOpacity>
        </Block>
}
   
       </View>

        <Block style={{padding:10}}>
        <Block style={{marginTop:15}}>
<Block style={[ customStyle.Card1]}>
          <Text style={{fontSize:16}}>GSTIN *</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your GST Number"
          value={formData.gstinNumber}
          onChangeText={(text) => handleInputChange("gstinNumber", text)}
          placeholderTextColor="#B7B7B7"
         
        //   value={formData.phoneNumber}
        // onChangeText={(text) => handleInputChange("phoneNumber", text)}
        />
                </Block>
            
        </Block>

       

       <Block style={{marginTop:20,padding:10}}>
       <Text style={styles.sectionTitle}>Upload photo/video</Text>
        <Text style={styles.label}>Warehouse Live Video</Text>
        {image && <Image source={{ uri: image }} style={{resizeMode: 'contain',width:80,height:80,borderRadius:8}} />}
        <TouchableOpacity onPress={() => showImagePicker('camera')}  style={styles.button1}>
            <Ionicons
              name="camera"
              size={24}
              color="#000"
              style={styles.icon}
            />
            <Text style={{ fontSize: 18, fontWeight: 400, color: "#000", marginLeft:10 }}>
              Open Camera
            </Text>
          </TouchableOpacity>

          <Text style={[styles.label]}>Owner’s photo in workplace</Text>
          {image2 && <Image source={{ uri: image2 }} style={{resizeMode: 'contain',width:80,height:80,borderRadius:8}} />}
          <TouchableOpacity onPress={() => showImagePicker2('camera')}  style={styles.button1}>
            <Ionicons
              name="camera"
              size={24}
              color="#000"
              style={styles.icon}
            />
            <Text style={{ fontSize: 18, fontWeight: 400, color: "#000", marginLeft:10 }}>
              Open Camera
            </Text>
          </TouchableOpacity>
       </Block>


        
        <Block center>
            <Text style={{fontSize:16}}>Read the <Text style={{color:"#65C5C4",fontSize:18,textDecorationLine: 'underline'}}>Terms & Condiation</Text> and </Text>
            <Text style={{color:"#65C5C4",fontSize:18,textDecorationLine: 'underline'}}>Privacy Policy</Text>
        </Block>
      
        
      

               

        <Block style={[{flexDirection:"row",justifyContent:"left",alignItems:"center",marginLeft:10}]}>
        <Checkbox
      style={{marginTop:15}}
      color="#65C5C4"
      label={"By checking this box, you accept the terms and conditions"}
      initialValue={termandCondition}
        onChange={(el) => {
                console.log("VAlue of checkbox ==>",el)
                setTermandCondition(el)
        }}
      />

      
        </Block>
      
        <Block style={[{flexDirection:"row",justifyContent:"left",alignItems:"center",marginLeft:10}]}>
        <Checkbox
      style={{marginTop:15}}
      color="#65C5C4"
      label={"By checking this box, you accept the Privacy Policy"}
      initialValue={privacyPolicy}
        onChange={(el) => {
                console.log("VAlue of checkbox ==>",el)
                setprivacyPolicy(el)
        }}
      />

      
        </Block>

       </Block>
    {/* } */}

      
        
    <Block right style={[{ padding: 20, marginTop: 20 }]}>
             
                
       
                        <TouchableOpacity
              style={{
                backgroundColor: '#000000',
                width: width * 0.88,
                padding: 15,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
              }}
              onPress={handelPersonalDetailSubmit}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{ color: '#fff', fontSize: 16 }}>Next</Text>
              )}
            </TouchableOpacity>
      
              
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
    label: { fontSize: 14, color: "#000", marginBottom: 0 ,fontWeight: '600',marginTop:20},
    button1: {
        borderWidth: 1,
        width: width * 0.9,
        height: 60,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        borderColor: "black",
        borderRadius: 10,
      },
      sectionTitle: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
    inputContainer: {
      width: '100%',
      height: 66,
      borderBottomWidth: 1, // Add a bottom border for the input
      borderColor: 'transparent', // Make the border color transparent
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
      
      marginTop:4
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