import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView,ActivityIndicator, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated } from 'react-native'
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
import { Checkbox } from 'galio-framework';
import { StateSelectModel } from '../../../Components/Model/StateSelectModel';

// import CheckBox from 'react-native-check-box';

export const PersonalDetails = () => {
    const navigation= useNavigation()
    const [formData, setFormData] = useState({
      // gender:"",
      email: "",
      name:"",
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
    const [termandCondition,setTermandCondition] = useState(false);
    const [selectedState, setSelectedState] = useState("Delhi");
    const [selectedCity, setSelectedCity] = useState("");
 
    const [pincode,setPincode] = useState("")
    const [isStateModelOpen,setIsStateModelOpen] = useState(false);
    const [isCityModelOpen,setIsCityModelOpen] = useState(false);
    const [AddressData,setAddressData] = useState([]);
    const [loading,setLoading] = useState(false)
    
     
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
        // You can use any key you like to store the authentication status
        const key = 'Details';
        const data = {
          ...formData,
          city:selectedCity,
          state:selectedState,
          pincode:pincode
        }
        const value = JSON.stringify(data) // Replace with your actual authentication status
        
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
        SubmitSigupData()
        // navigation.navigate("VerificationDetails")
    }

    const SubmitSigupData= async()=>{
      setLoading(true)
      const RegisterAs = await AsyncStorage.getItem('RegisterAs') || null;
      const Details = await AsyncStorage.getItem('Details') || null;
      const Mobile = await AsyncStorage.getItem('Mobile') || null;
      // const Category = await AsyncStorage.getItem('selectedCategory') || null;
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
      const Category = JSON.stringify(categoryNames);
     
      // console.log("Post req",DocumentsImages)
    
      // const Data= {
      //   "RegisterAs": RegisterAs,
      //   "pan_Number":PANformData.PANNo,
      //   "adhar_Number":AddharformData.AdhharNo,
      //   "address":AddharformData.Address,
      //   "name":AddharformData.Name,
      // }
      // const Adhar = JSON.stringify(AddharformData);
      // const SubCategoryData = [
      //   {name:"test",price:"20",unit:"kg"}
      // ]
      const UserData = {
        name: formData.name,
        email: formData.email ,
        password: '1234',
        mobile: Mobile,
        Address: formData.address,
        city: selectedCity,
        pincode: pincode,
        state: selectedState,
        country: 'India',
        registerAs: RegisterAs,
        adharData:'',
        images:[],
        categories:Category,
      };
    
      
      // console.log("Data of user ====>",UserData)
         try {
          const response = await axios.post(`${Base_url}api/b2b`, UserData);
             
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

    const uniqueStates = [...new Set(AddressData.map(address => address.state_name))];
    const filteredCities = AddressData.filter(address => address.state_name === selectedState);
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

        <Block style={{marginTop:10}}>
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

        <Block style={[{marginTop:10},styles.Space_Between]}>
    
        <Block style={[ customStyle.Card3,{width:"100%"}]}>
                <TextInput

        variant="standard"
        keyboardType="numeric"
        label="Pin Code"
        leading={(props) => <Icon name={ 'city'} {...props} />}
        name="pincode"
      
        value={pincode}
        onChangeText={(text) => handlePincodeChange(text)}
        color={ 'grey'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
      
       
       

                
       
        </Block>
        
       
        <Block style={[ customStyle.Card3]}>


<View style={{borderBottomWidth:1,borderColor:"grey"}} >
      <Text>Select a State:</Text>
      <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
            <Block >
            <Icon name={ 'city'} size={24} color={'grey'} />
            </Block>
         <Block style={{width:"90%"}}>
         <Picker
        selectedValue={selectedState}
        onValueChange={(itemValue) => handleStateChange(itemValue)}
        style={[styles.picker]}
      >
        {uniqueStates.map((state, index) => (
          <Picker.Item key={index} label={state} value={state} />
        ))}
      </Picker>

         </Block>
      </Block>
      {/* <Text>Selected State: {selectedState}</Text> */}
    </View>
      {/* <TouchableOpacity onPress={()=>setIsStateModelOpen(true)}>
        <Text>Sate Model Open</Text>
      </TouchableOpacity> */}
                </Block>

                <Block style={[ customStyle.Card3]}>
        {selectedState !== "" ? (
        <View style={{borderBottomWidth:1,borderColor:"grey"}}>
          <Text>Select a City:</Text>
          <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
            <Block >
            <Icon name={ 'city'} size={24} color={'grey'} />
            </Block>
         <Block style={{width:"90%"}}>
         <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => handleCityChange(itemValue)}
            // style={styles.picker}
          >
            {filteredCities.map((address, index) => (
              <Picker.Item key={index} label={address.city_name} value={address.city_name} />
            ))}
          </Picker>
         </Block>
          

          </Block>
        
        </View>
      ) : null}

      
                </Block>

        <Block style={[{flexDirection:"row",justifyContent:"left",alignItems:"center",marginLeft:10}]}>
        <Checkbox
      style={{marginTop:15}}
      color="#239456"
      label={"By checking this box, you accept the terms and conditions"}
      initialValue={termandCondition}
        onChange={(el) => {
                console.log("VAlue of checkbox ==>",el)
                setTermandCondition(el)
        }}
      />
        </Block>

       </Block>
    {/* } */}

      
        
    <Block right style={[{ padding: 20, marginTop: 20 }]}>
             
                
                    {loading ? 
        <View >
          <ActivityIndicator size="large"  color="#65be34" />
        </View>
        :
        <Button
                  title="Proceed"
                  color="#65be34"
                  style={{ width: 150, padding: 5 }}
                  onPress={handelPersonalDetailSubmit}
                  trailing={(props) => <Icon name="send" {...props} />}
                  tintColor="#fff"
                />
      }
              
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
