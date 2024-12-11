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

// import CheckBox from 'react-native-check-box';

export const PersonalDetails = () => {
    const navigation= useNavigation()
    const [formData, setFormData] = useState({
      // gender:"",
      email: "",
      name:"",
      // referralCode:"",
      businessName:""
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
    const [termandCondition,setTermandCondition] = useState(false);
    const [selectedState, setSelectedState] = useState("Delhi");
    const [selectedCity, setSelectedCity] = useState("");
 
    const [pincode,setPincode] = useState("")
    const [isStateModelOpen,setIsStateModelOpen] = useState(false);
    const [isCityModelOpen,setIsCityModelOpen] = useState(false);
    const [AddressData,setAddressData] = useState([]);
    const [loading,setLoading] = useState(false)
    
     const handleAddress = () => {
      navigation.navigate('Address');
    };

   
     
    const handleStateChange = (state) => {
      setSelectedState(state);
    };
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

    const AddAddressData = async () => {
      try {
        const url = `${Base_url}api/unifiedPinCode`;
        // const formData1 = new FormData();
        // formData1.append('user_id', userDetails.user_id);
        // formData1.append('degree', formData.degree);
        // formData1.append('university', formData.university);
        // formData1.append('year', formData.yearGraduated);
  
      
  
        const response = await axios.get(url,{
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization" :`Berear ${token}`,
       
          }
        });
        const data = response.data
            // console.log("Response check work experience",data.data)
            
              // if(data === "otp in valid"){
              //   showToast("error", "wrong otp", "");
              //   return;
              // }
  
            if(data.status === "success"){
                //  localStorage.setItem("userRegisterDetails", JSON.stringify(data.user));
            
              //  console.log("Data main ==>",data.data)
               const Data = data.data
              //  console.log("Address Data =====>",Data)
               // Set the unique states in the state variable
               setAddressData(Data);
             
             
                return
              
            }
            // showToast("error", "Try After Some Time", "");
  
              
           
            
      } catch (error) {
        console.error('Error:', error);
        // showToast("error", "Try After Some Time", "");
      }
    };

    const handlePincodeChange = (newPincode) => {
   
      setPincode(newPincode);
      // console.log("Enter Pin code ==>",AddressData)
      // Search for the pincode in the data array
      const pinData =  AddressData.find(item => item.pincode === parseInt(newPincode));
    
      // console.log("Pincode Data",pinData);
      if (pinData) {
        setSelectedCity(pinData.city_name);
        setSelectedState(pinData.state_name);
      } else {
        setSelectedCity('');
        setSelectedState('');
      }
    };

       const savePersonalDetails = async () => {
      try {
        const RegisterAs = await AsyncStorage.getItem('RegisterAs') || null;
        const PhoneNumber = await AsyncStorage.getItem('Mobile') || null;
        const categoryNames = selectedCategories.map(category => {
          return {
            name: category.name
          };
        });
        // const categoryNames = selectedCategories.map(category => {
        //   return {
        //     name: category.name,
        //     sub_category: [
        //       {
        //         name: "test",
        //         price: "100",
        //         unit: "Kg"
        //       }
        //     ]
        //   }
        // });
        const Category = categoryNames.length > 0 
          ? categoryNames.map((category) => ({ name: category })) 
          : [];
        const UserData = {
          name: formData.name,
          email: formData.email,
          phoneNumber: PhoneNumber,
          registerAs: RegisterAs,
          category: categoryNames,
          businessName: formData.businessName,
          referralCode:"SOW123",
        };
        const UserDetails = JSON.stringify(UserData);
        await AsyncStorage.setItem("UserDetails", UserDetails);
        console.log('Details saved successfully.', UserDetails);
    
        // Call SubmitSigupData to save details in the database
        await SubmitSigupData();
      } catch (error) {
        console.error('Error saving Details :', error);
      }
    };
    
    const SubmitSigupData = async () => {
      console.log("need to do more");
      const UserDetails = await AsyncStorage.getItem('UserDetails') || null;
      const UserData = JSON.parse(UserDetails);
    
      console.log("Data of user ====>", UserDetails);
      setLoading(true);
      try {
        const response = await axios.post(`${Base_url}b2bUser`, UserData);
        console.log("Response of user ====>", response.data);
        const data = response.data;
            const userId = data.id;
            console.log("Data after submit  ==>", data,userId);
            await AsyncStorage.setItem('userID', userId);
            navigation.navigate('Address', { userId });
    
        if (response.status === 200) {
          if (response.data) {
            
            return;
          }
          return;
        }
      } catch (error) {
        console.error('Error submitting data:', error);
        setLoading(false);
      }
    };
    
    const handelPersonalDetailSubmit=()=>{
      const emptyField = Object.keys(formData).find(key => formData[key] === "");
       
      if(!termandCondition){
        ToastAndroid.show(`Please check term and conditions`, ToastAndroid.SHORT);
        return
      }

      if (emptyField) {
        ToastAndroid.show(`Please provide ${emptyField}`, ToastAndroid.SHORT);
        return ;
      }
        // setShowShopDetails(true);
        console.log("Details",formData);
        // savePersonalDetails()
         

        savePersonalDetails()
        
        // navigation.navigate("VerificationDetails")
    }

    const SubmitSigup= async()=>{
      setLoading(true)
      const UserDetails = await AsyncStorage.getItem('UserDetails') || null;
    const UserData = JSON.parse(UserDetails);
    
      
      // console.log("Data of user ====>",UserData)
         try {
          const response = await axios.post(`${Base_url}b2bUser`, UserData);
             
          if(response.status === 200){
               if(response.data){
                const data = response.data
                  console.log("Data ==>",response.data)
                  ToastAndroid.show(data.error, ToastAndroid.SHORT);
                  setLoading(false);
                  // setShowPAN(true);
                  // navigation.reset({
                  //   index: 0,
                  //   routes: [{ name: 'FillPersonalDetails' }],
                  // });
                  // navigation.navigate("FillPersonalDetails")
                  return
               }
               return
          }
          
          if (response.status === 201) {
               if(response.data){
          ToastAndroid.show("Signup Successfull", ToastAndroid.SHORT);
          // setShowSuccess(true);
          // setLoading(false)
          navigation.navigate("VerifyProfileStatus")
    
         }
           else {
            console.error("Error creating user:", response);
            // setLoading(false)
          }
        }
        } catch (error) {
                ToastAndroid.show("Eroor : Try again", ToastAndroid.SHORT);
        
        //  setShowPAN(true);
          console.error("Error:", error);
          // setLoading(false)
        }
    
      // try {
      //   const response = await axios.post(`${Base_url}b2b`, formData); // Update the API endpoint accordingly
      //   console.log("Res ==>",response.data);
      //   if(response.data){
      //     ToastAndroid.show("Signup Successfull", ToastAndroid.SHORT);
      //     setShowSuccess(true);
    
      //   }
        
      // } catch (error) {
      //   console.error('Error creating user:', error);
        
      //     ToastAndroid.show("Eroor : Try again", ToastAndroid.SHORT);
        
      //   setShowPAN(true);
      // }
    
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
    const handelCategoryModelClose = ()=>{
      setModalVisible(false)
    }

    const handelStateSelectComplete = ()=>{

    }

    const handleCityChange = (city) => {
      setSelectedCity(city);
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

    useEffect(()=>{
      getCategories();
      AddAddressData()
    },[])

    const handelTermCondition = ()=>{
      const Data={
        url:"https://www.scraponwheels.com/terms.html"
        }
      navigation.navigate("Scrap On Wheels", { Data });
    }

    const uniqueStates = [...new Set(AddressData.map(address => address.state_name))];
    const getUniqueCitiesByName = (addresses) => {
      const uniqueCities = {};
      addresses.forEach(address => {
        if (!uniqueCities[address.city_name]) {
          uniqueCities[address.city_name] = address.city_name;
        }
      });
      return Object.values(uniqueCities);
    };
    
    const filteredCities = getUniqueCitiesByName(AddressData.filter(address => address.state_name === selectedState));
  return (
    <View style={styles.container}>
    <StatusBar style="dark" />
  
        <ScrollView>
      
       <View style={{alignItems:"left",marginTop:55,width:width}}>
         
       {!isKeyboardOpen &&
         <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
              
              <Block style={{backgroundColor:"black",width:50,height:50,flexDirection:"row",justifyContent:"center",alignItems:"center",borderRadius:150,marginLeft:20}}>
             
              <MaterialIcons onPress={handelBack} name="arrow-back-ios" size={22} style={{marginLeft:5}} color="white" />
              </Block>
              

              <Text style={{marginLeft:15,fontSize:25,fontWeight:500}}>Your Info</Text>
            
          </Block>
}
   
       </View>

        <Block style={{padding:10}}>
        <Block style={{marginTop:15}}>
<Block style={[ customStyle.Card1]}>
          <Text style={{fontSize:16}}>Name <Text style={{color:"red"}}>*</Text></Text>
      <TextInput
          style={styles.input}
          placeholder="Enter you name"
          value={formData.name}
          onChangeText={(text) => handleInputChange("name", text)}
          placeholderTextColor="#B7B7B7"
        //   value={formData.phoneNumber}
        // onChangeText={(text) => handleInputChange("phoneNumber", text)}
        />
                </Block>
            
        </Block>

        {/* <Block style={{marginTop:10,padding:10}}>
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
            
        </Block> */}

        <Block style={{marginTop:10}}>
        <Block style={[ customStyle.Card2]}>
        <Text style={{fontSize:16}}>Email Address <Text style={{color:"red"}}>*</Text></Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
          placeholderTextColor="#B7B7B7"
        //   value={formData.phoneNumber}
        // onChangeText={(text) => handleInputChange("phoneNumber", text)}
        />
                </Block>
        </Block>

        <Block style={{marginTop:10}}>
        <Block style={[ customStyle.Card2]}>
        <Text style={{fontSize:16}}>Business Name <Text style={{color:"red"}}>*</Text></Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your business name"
          value={formData.businessName}
        onChangeText={(text) => handleInputChange("businessName", text)}
          placeholderTextColor="#B7B7B7"
        //   value={formData.phoneNumber}
        // onChangeText={(text) => handleInputChange("phoneNumber", text)}
        />
                </Block>
        </Block>

       

       

        <Block style={{marginTop:10,padding:10}}>
        <Text style={{fontSize:16}}>Category <Text style={{color:"red"}}>*</Text></Text>
<TouchableOpacity activeOpacity={0.9} onPress={handelCategoryModelOpen} style={[{borderWidth:1,padding:18,borderColor:"#A6A6A6",borderRadius:10,marginTop:4}]}>
  
  <Block  style={{width:"95%"}}>
  <Block style={{width:"95%"}} >
  <Text style={[selectedCategories.length >0 ?{color:"black"}:{color:"#B7B7B7",fontSize:16}]} >{ selectedCategories.length >0 ?selectedCategories.map(category => category.name).join(', '): "Select Category"}</Text>
</Block>
  </Block>


                </TouchableOpacity>
            
        </Block>


       {/* <Block style={{marginTop:10}}>
        <Block style={[ customStyle.Card2]}>
        <Text style={{fontSize:16}}>Referral Code</Text>
      <TextInput
          style={styles.input}
          placeholder="0000000000"
          value={formData.referralCode}
        onChangeText={(text) => handleInputChange("referralCode", text)}
          placeholderTextColor="#B7B7B7"
       
        />
                </Block>
        </Block>
        */}

        {/* <Block style={{marginTop:10}}>
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
      <Button
        title="Add Address"
        onPress={handleAddressChange}
        color="#65be34"
      />
                </Block>
        </Block> */}

      
        
      

               

<Block style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", marginHorizontal: 10 }}>
  <Checkbox
    style={{ marginTop: 15 }}
    color="black"
    label={"By checking this box, you accept the"}
    initialValue={termandCondition}
    onChange={(el) => {
      console.log("Value of checkbox ==>", el);
      setTermandCondition(el);
    }}
  />
  <Text onPress={handelTermCondition} style={{  color: "#65C5C4", marginLeft: 5 }}>
  Terms &
  </Text>
  <Text onPress={handelTermCondition} style={{  color: "#65C5C4", marginLeft: 30 }}>
  Conditions
  </Text>

</Block>
      

       
       </Block>
    {/* } */}

      
        
    <Block right style={[{ padding: 20, marginTop: 20 }]}>
             
                
   <TouchableOpacity onPress={handelPersonalDetailSubmit} style={[styles.btn,{backgroundColor:"#000"}]} activeOpacity={0.8} disabled={loading}>
   {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
    <Text style={{color:"#fff",fontSize:18}}>Next</Text>
    )}
    </TouchableOpacity>
              
            </Block>
      
            <CategoryAddModel 
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible} 
            categoriesData={CategoriesData}
            setSelectedCategories={setSelectedCategories}
            selectedCategories={selectedCategories}
            />

            <StateSelectModel
              modalVisible={isStateModelOpen}
              setModalVisible={setIsStateModelOpen}
              handelComplete={handelStateSelectComplete}
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
     width: '100%',
      height: 55,
      borderRadius: 35,
      backgroundColor: '#000',
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