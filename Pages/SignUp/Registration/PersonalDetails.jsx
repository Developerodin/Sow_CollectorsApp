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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
import { ToastAndroid } from "react-native";
import MultiSelect from 'react-native-multiple-select';
import { CategoryAddModel } from '../../../Components/CategoryAddModel/CategoryAddModel';
// import CheckBox from 'react-native-check-box';

export const PersonalDetails = () => {
    const navigation= useNavigation()
    const [formData, setFormData] = useState({
      gender:"",
      pincode:"",
      email: "",
      name:"",
      city:"",
      address:""
    });
    const [CategoriesData, setCategoriesData] = useState([]);
    const [isFocused, setIsFocused] = useState({
      ForName:false,
      ForEmail:false,
      ForCity:false
    });
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [ modalVisible,setModalVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
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

    const savePersonalDetails = async () => {
      try {
        // You can use any key you like to store the authentication status
        const key = 'Details';
        const value = JSON.stringify(formData) // Replace with your actual authentication status
        
        const categoryNames = selectedCategories.map(category => {
          return {
            name:category.name,
            sub_category:[
              {
                name:"test",
                price:"100",
                unit:"Kg"
              }
            ] 
          }});
        console.log("categoryNames",categoryNames)
        const key2= 'selectedCategory';
        const value2 = JSON.stringify(categoryNames);
        // Use AsyncStorage to save the authentication status
        await AsyncStorage.setItem(key, value);
        await AsyncStorage.setItem(key2, value2);
        console.log('Details saved successfully.');
      } catch (error) {
        console.error('Error saving Details :', error);
      }
    };
    const handelPersonalDetailSubmit=()=>{
      const emptyField = Object.keys(formData).find(key => formData[key] === "");

      if (emptyField) {
        ToastAndroid.show(`Please provide ${emptyField}`, ToastAndroid.SHORT);
        return ;
      }
        // setShowShopDetails(true);
        console.log("Details",formData);
        savePersonalDetails()
        navigation.navigate("VerificationDetails")
    }

    const handleInputChange = (fieldName, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    };

    const handleCategoryChange = (itemValue, index) => {
      const updatedCategories = [...formData.categories];
      updatedCategories[index] = itemValue;
  
      setFormData((prevData) => ({
        ...prevData,
        categories: updatedCategories,
      }));
    };
  
    const renderCategoriesPickerItems = () => {
      return CategoriesData.map((el, index) => {
        return (
          <Picker.Item key={index} label={el.name} value={el.name} />
        );
      });
    };
    const handelBack = () => {
      navigation.navigate("Login")
    };
    const getCategories = async () => {
      
      try {
        const response = await axios.get(`${Base_url}api/category`);
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
    const handelCategoryModelClose = ()=>{
      setModalVisible(false)
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
      getCategories()
    },[])
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
   
       </View>

        <Block style={{padding:10}}>
        <Block style={{marginTop:20}}>
<Block style={[ customStyle.Card1]}>
                <TextInput

        variant="standard"
        
        label="Name"
        leading={(props) => <Icon name={'account'} {...props} />}
        value={formData.name}
        onChangeText={(text) => handleInputChange("name", text)}
        color={ 'grey'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
            
        </Block>

        <Block style={{marginTop:10,padding:10}}>
<Block style={[{borderBottomWidth:1,borderColor:"grey",flexDirection:"row",alignItems:"center"}]}>
  <Block style={{width:"6%"}}>
  <MaterialCommunityIcons name="gender-male" size={24} color="grey" />
  </Block>
<Block style={{width:"95%"}} >
<Picker
          selectedValue={formData.gender}
          onValueChange={(itemValue) => handleInputChange('gender', itemValue)}
          style={{ color: 'black', height: 50, fontSize: 18,borderWidth:1,borderColor:"red" }}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other"  />
        </Picker>
</Block>

                </Block>
            
        </Block>

        <Block style={{marginTop:20}}>
        <Block style={[ customStyle.Card2]}>
                <TextInput

        variant="standard"
        keyboardType="email-address"
        label="Email"
        leading={(props) => <Icon name={'email'} {...props} />}
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        color={ 'grey'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
        </Block>

       

        <Block style={{marginTop:10,padding:10}}>
<Block style={[{paddingBottom:10,borderBottomWidth:1,borderColor:"grey",flexDirection:"row",alignItems:"center"}]}>
  <Block style={{width:"6%"}}>
  <MaterialIcons name="category" size={24} color="grey" />
  </Block>
  <TouchableOpacity onPress={handelCategoryModelOpen} style={{width:"95%"}}>
  <Block style={{width:"95%"}} >
  <Text style={{marginLeft:15}}>{ selectedCategories.length >0 ?selectedCategories.map(category => category.name).join(', '): "Select Category"}</Text>
</Block>
  </TouchableOpacity>


                </Block>
            
        </Block>

        <Block style={{marginTop:20}}>
        <Block style={[ customStyle.Card3]}>
                <TextInput

        variant="standard"
        keyboardType="default"
        label="Address"
        leading={(props) =>  <FontAwesome5 name="address-book" {...props} />}
        value={formData.address}
        onChangeText={(text) => handleInputChange("address", text)}
        color={ 'grey'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
        </Block>

        <Block style={[{marginTop:20},styles.Space_Between]}>
    
        <Block style={[ customStyle.Card3,{width:"48%"}]}>
                <TextInput

        variant="standard"
        keyboardType="numeric"
        label="Pin Code"
        leading={(props) => <Icon name={ 'city'} {...props} />}
        value={formData.pincode}
        onChangeText={(text) => handleInputChange("pincode", text)}
        color={ 'grey'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
      
       
        <Block style={[ customStyle.Card3,{width:"48%"}]}>
                <TextInput

        variant="standard"
        keyboardType="default"
        label="City"
        leading={(props) => <Icon name={ 'city'} {...props} />}
        value={formData.city}
        onChangeText={(text) => handleInputChange("city", text)}
        color={ 'grey'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
       
        </Block>

       </Block>
    {/* } */}

      
        
    <Block right style={[{ padding: 20, marginTop: 20 }]}>
             
                <Button
                  title="Proceed"
                  color="#65be34"
                  style={{ width: 150, padding: 5 }}
                  onPress={handelPersonalDetailSubmit}
                  trailing={(props) => <Icon name="send" {...props} />}
                  tintColor="#fff"
                />
              
            </Block>
      
            <CategoryAddModel 
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible} 
            categoriesData={CategoriesData}
            setSelectedCategories={setSelectedCategories}
            selectedCategories={selectedCategories}
            />
      
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
