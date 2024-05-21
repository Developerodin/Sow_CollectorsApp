import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme } from "galio-framework";

import { AntDesign } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { Header } from '../../../Components/Header/Header';
import { ToastAndroid } from 'react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from "../../Images/Logo_1.png";
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { TextInput, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base_url } from '../../../Config/BaseUrl';







// 08AAHCT9493J1ZI


export const KYC = () => {

  const [PanFront, setPanFront] = useState(null);
  const [PanBack, setPanBack] = useState(null);
  const [AddharFront, setAddharFront] = useState(null);
  const [AddharBack, setAddharBack] = useState(null);
  const [isFocused, setIsFocused] = useState({
    ForPan:false,
    ForAdharName:false,
    ForAdharNumber:false,
    ForAdharAddress:false
  });
  const customStyle ={
    Card1: {
    
      borderRadius:5,
      padding:10,
      backgroundColor:"#fff",
      elevation:isFocused.ForPan ? 4 : 0
    },
    Card2: {
    
      borderRadius:5,
      padding:10,
      backgroundColor:"#fff",
      elevation:isFocused.ForAdharName ? 4 : 0
    },
    Card3: {
    
      borderRadius:5,
      padding:10,
      backgroundColor:"#fff",
      elevation:isFocused.ForAdharNumber ? 4 : 0
    },
    Card4: {
    
      borderRadius:5,
      padding:10,
      backgroundColor:"#fff",
      elevation:isFocused.ForAdharAddress ? 4 : 0
    },
  }
  const navigation = useNavigation();
  const animationRef = useRef(null);
 const [showPAN,setShowPAN] = useState(true)
 const [showAddhar,setShowAddhar] = useState(false)
 const [showSuccess,setShowSuccess] = useState(false)

 const [PANDone,setPANDone] = useState(false)
 const [AddharDone,setAddharDone] = useState(false)
 const [isPANVerify,setIsPANVerify] = useState(false)
 const [PANformData, setPANFormData] = useState({
  PANNo:'',
  companyName: '',
  companyAddress: '',
});
const [AddharformData, setAddharFormData] = useState({
  AdhharNo: '',
  Name: '',
  Address:""
});
const [PANresponse, setPANResponse] = useState(null);
const [expanded, setExpanded] = useState(false);
const [DocumentsImages,setDocumentsImages] = useState([])
const [user, setUser] = useState(null);
const handlePANInputChange = (fieldName, value) => {

  setPANFormData((prevData) => ({
    ...prevData,
    [fieldName]: value,
  }));
};

const handleFocus = (Name) => {
  setIsFocused((prevState) => ({
    ForPan: Name === "pan",
    ForAdharName: Name === "aname",
    ForAdharNumber: Name === "anumber",
    ForAdharAddress: Name === "aaddress"
  }));

};

const handleBlur = (Name) => {
  setIsFocused((prevState) => ({
    ...prevState,
    [Name]: false
  }));
  
};

const handleAddharInputChange = (fieldName, value) => {
  setAddharFormData((prevData) => ({
    ...prevData,
    [fieldName]: value,
  }));
};
const handlePANSearch = async () => {
  try {
    const PANin = PANformData.PANNo; // Replace with the PANIN you want to search for
    const url = `https://commonapi.mastersindia.co/commonapis/searchPANin?PANin=${PANin}`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 2ba4cf3655b71cae3c89683236ea0e81f9f31ed0',
      'client_id': 'umNlnmHOkJCgIfmDde',
    };

    const axiosConfig = {
      method: 'get',
      url: url,
      headers: headers,
    };

    const response = await axios(axiosConfig);

    if (response.status === 200) {
      const PANData = response.data.data
      const PANAddress = PANData.pradr.addr
      const Address = `${PANAddress.bno},${PANAddress.bnm},${PANAddress.st},${PANAddress.pncd},${PANAddress.loc} ,${PANAddress.stcd}`
      // console.log("PAN Data ===>",PANData);
     
      setPANResponse(response.data);
      handlePANInputChange("companyName", PANData.lgnm)
      handlePANInputChange("companyAddress", Address)
      setIsPANVerify(true)
    } else {
      console.error('API request failed');
      ToastAndroid.show('No Data Found Check PAN Number Again', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    ToastAndroid.show('No Data Found Check PAN Number Again', ToastAndroid.SHORT);
  }
};
const isPANValid = panNo => {
    // Define a regular expression pattern for a valid PAN card number
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  
    // Test if the provided PAN number matches the pattern
    return panPattern.test(panNo);
  };
const VerifyPAN =()=>{
  const PANNO = PANformData.PANNo
  if (!PANNO) {
    // Display a toast message
    ToastAndroid.show('Please Provide PAN Number', ToastAndroid.SHORT);
    return;
  }
  if (!isPANValid(PANNO)) {
    ToastAndroid.show('PAN number is not valid', ToastAndroid.SHORT);
    return;
  }
//   handlePANSearch()
handelSubmitPANData()
}

 const handelSubmitPANData =()=>{

  if (!PANformData.PANNo) {
    // Display a toast message
    ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
    return;
  }
  setPANDone(true)
  setShowPAN(false)
  setShowAddhar(true);
  // console.log("PAN Data",PANformData)
  
 }

 const handelSubmitAddharData =()=>{

  if (!AddharformData.AdhharNo || !AddharformData.Name || !AddharformData.Address ) {
    // Display a toast message
    ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
    return;
  }
  setAddharDone(true)
  setShowAddhar(false)
  SubmitSigupData()
  
 }

const SubmitSigupData= async()=>{
  
  const Details = await AsyncStorage.getItem('userDetails') || null;

  
  const userDetails = JSON.parse(Details)
  // console.log("Post req",DocumentsImages)

  // const Data= {
  //   "RegisterAs": RegisterAs,
  //   "pan_Number":PANformData.PANNo,
  //   "adhar_Number":AddharformData.AdhharNo,
  //   "address":AddharformData.Address,
  //   "name":AddharformData.Name,
  // }
  const pan_Number=PANformData.PANNo
  const Adhar = JSON.stringify(AddharformData);
  const SubCategoryData = [
    {name:"test",price:"20",unit:"kg"}
  ]
  const UserData = {
    _id: userDetails._id,
    panNo:PANformData.PANNo,
    adharData:Adhar,
  };

  
  console.log("Data of user ====>",UserData)
     try {
      const response = await axios.put(`${Base_url}api/b2b/update-b2b-kyc`, UserData);
         
      if(response.status === 200){
           if(response.data){
            const data = response.data
              console.log("Data of Kyc ==>",data)
              ToastAndroid.show(data.error, ToastAndroid.SHORT);
              setShowPAN(true);
            //   navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'FillPersonalDetails' }],
            //   });
              // navigation.navigate("FillPersonalDetails")
              return
           }
           return
      }
      
      if (response.status === 201) {
           if(response.data){
      ToastAndroid.show("Kyc updated Successfull", ToastAndroid.SHORT);
      setShowSuccess(true);

     }
       else {
        console.error("Error creating product:", response);
      }
    }
    } catch (error) {
            ToastAndroid.show("Eroor : Try again", ToastAndroid.SHORT);
    
     setShowPAN(true);
      console.error("Error:", error);
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


 const handelSuccess =()=>{
  setPANDone(false)
  setShowPAN(true)
  setShowAddhar(false)
  setAddharDone(false)
  setShowSuccess(false)
  
  navigation.goBack();
  
 }

 
 const toggleAccordion = () => {
  setExpanded(!expanded);
};

const showImagePicker = async (sourceType, name) => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert('Permission to access the gallery is required!');
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    sourceType: sourceType,
  });

  console.log("Result image  ", result);

  if (!result.canceled) {
    if(name === "PanFront"){
      setPanFront(result.assets[0].uri);
    }
    if(name === "PanBack"){
      setPanBack(result.assets[0].uri);
    }
    if(name === "AddharFront"){
      setAddharFront(result.assets[0].uri);
    }
    if(name === "AddharBack"){
      setAddharBack(result.assets[0].uri);
    }
    // Assuming you have a state variable like imagesState to store the image data
    setDocumentsImages(prevState => [
      ...prevState,
      {
        uri: result.assets[0].uri,
        name: name,
      },
    ]);
  }
};

const getUserDetails = async ()=>{
    const user = await AsyncStorage.getItem('userDetails');
    const ParseUser = JSON.parse(user)
    try {
        const response = await axios.get(`${Base_url}api/b2b/${ParseUser._id}`);
        setUser(response.data);
         const Data = response.data;
        console.log("User by id ==>",response.data);
        if(Data.kyc){
            setPANDone(true)
            setAddharDone(true)
            setShowPAN(false)
            setShowAddhar(false)
            setShowSuccess(true);
        }
     
      } catch (error) {
        setUser(null);
       
      }
}

  useEffect(() => {
  
    getUserDetails()
  }, []);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar  style="dark"/>
       
       <Block style={[styles.Center,{padding:10,borderBottomWidth:0.5,borderColor:"grey",marginTop:30}]}>

        <Block style={{padding:5,width:70}}>
          <Block center style={{borderWidth:1,borderColor:`${PANDone ? "#fff" : "grey"}`,borderRadius:100,width:30,height:30,flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:`${PANDone ? "#65be34" : "#fff"}`}}>
           
           {
             PANDone ? 
             <Entypo name="check" size={17} color="#fff" />
             :
             <Text style={{fontSize:16,fontWeight:500}}>1</Text>
           }
           
            
          </Block>

          <Block>
            <Text center style={{fontSize:12,fontWeight:500,marginTop:3}}>Pan</Text>
          </Block>
        </Block>
        
        <Block style={{borderWidth:1,width:50,borderColor:`${PANDone ? "#65be34" : "grey"}`,marginTop:-20}}>

        </Block>
        <Block style={{padding:5,width:70}}>
        <Block center style={{borderWidth:1,borderColor:`${AddharDone ? "#fff" : "grey"}`,borderRadius:100,width:30,height:30,flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:`${AddharDone ? "#65be34" : "#fff"}`}}>
           
           {
             AddharDone ? 
             <Entypo name="check" size={17} color="#fff" />
             :
             <Text style={{fontSize:14,fontWeight:500}}>2</Text>
           }
           
            
          </Block>

          <Block>
            <Text center style={{fontSize:12,fontWeight:500,marginTop:3}}>Addhar</Text>
          </Block>
        </Block>

        <Block style={{borderWidth:1,width:50,borderColor:`${AddharDone ? "#65be34" : "grey"}`,marginTop:-20}}>

          </Block>

        <Block style={{padding:5,width:70}}>
        <Block center style={{borderWidth:1,borderColor:`${AddharDone ? "#fff" : "grey"}`,borderRadius:100,width:30,height:30,flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:`${AddharDone ? "#65be34" : "#fff"}`}}>
           
        {
             AddharDone ? 
             <Entypo name="check" size={17} color="#fff" />
             :
             <Text style={{fontSize:16,fontWeight:500}}>3</Text>
           }
          
           
            
          </Block>

          <Block>
            <Text center style={{fontSize:12,fontWeight:500,marginTop:3}}>Success</Text>
          </Block>
        </Block>


       </Block>

      
      <ScrollView>
     
        {
          showPAN &&  <Block style={{ padding: 10 }}>
          <Block style={{ marginTop: 20 }}>
         
          <Block style={{marginTop:20}}>
   <View style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:15}}>
      <TouchableOpacity  activeOpacity={0.7} onPress={toggleAccordion}>
        <Block style={styles.Space_Between}>
          <Block style={{flexDirection:"row",alignItems:"center"}}>
          <FontAwesome5 name="image" size={24} color="#65be34" style={{marginRight:10}} />
          <Text style={{fontSize:16,fontWeight:500}}>Uplode Pan Card Images</Text>
          </Block>

          <Block>
            {
              expanded ? <MaterialIcons name="keyboard-arrow-up" size={28} color="black" /> 
              :
              <MaterialIcons name="keyboard-arrow-down" size={28} color="black" />
            }
          

          
          </Block>
         
        </Block>
      </TouchableOpacity>
      {expanded && (
        <View style={{flexDirection:"row",marginTop:20,justifyContent:"space-around"}}>
          
         <Block  style={{width:100,height:100,backgroundColor:"#fff",borderRadius:10,elevation:0,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
         <Block>
         <Text style={{fontSize:12,fontWeight:500}}>Front *</Text>
        
         {
          PanFront === null &&   <FontAwesome5 onPress={() => showImagePicker('camera',"PanFront")} name="image" size={28} color="grey"  /> 
         }
         
         
          {PanFront && <Image source={{ uri: PanFront }} style={{resizeMode: 'contain',width:100,height:100}} />}
         </Block>
         
         </Block>

         <Block style={{width:100,height:100,backgroundColor:"#fff",borderRadius:10,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
         <Block>
         <Text style={{fontSize:12,fontWeight:500}}>Back *</Text>
         {
          PanBack === null &&   <FontAwesome5 onPress={() => showImagePicker('camera',"PanBack")} name="image" size={28} color="grey"  /> 
         }
         
         
          {PanBack && <Image source={{ uri: PanBack }} style={{resizeMode: 'contain',width:100,height:100}} />}
         </Block>
         </Block>
         
          
        </View>
      )}
    </View>
   

            </Block>
            <Block style={[ customStyle.Card1,{marginTop:60}]}>
                <TextInput

        variant="standard"
        
        label="PAN CARD NUMBER"
        leading={(props) => <Icon name={isFocused.ForPan ? 'bank' : 'bank'} {...props} />}
        value={PANformData.PANNo}
        onChangeText={(text) => handlePANInputChange("PANNo", text)}
        onFocus={()=>handleFocus("pan")}
        onBlur={()=>handleBlur("ForPan")}
        color={ 'white'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:20,letterSpacing:3 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>


           
            
          </Block>
    
          {/* {
            isPANVerify && <Block>
                     <Block style={{ marginTop: 20 }}>
            <Block style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="location-city" size={20} color="black" />
              <Text style={{ fontSize: 20, fontWeight: 500, marginLeft: 6 }}>Company Name</Text>
            </Block>
            <Block>
              <Input
                value={PANformData.companyName}
                onChangeText={(text) => handlePANInputChange("companyName", text)}
              />
            </Block>
          </Block>
    
          <Block style={{ marginTop: 20 }}>
            <Block style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="location-city" size={20} color="black" />
              <Text style={{ fontSize: 20, fontWeight: 500, marginLeft: 6 }}>Company Address</Text>
            </Block>
            <Block>
              <Input
                value={PANformData.companyAddress}
                onChangeText={(text) => handlePANInputChange("companyAddress", text)}
              />
            </Block>
          </Block>
              </Block>
          } */}
         
        </Block>
        }

        {
          showAddhar && <Block style={{padding:10}}>

<Block style={{marginTop:20}}>
   <View style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:15}}>
      <TouchableOpacity  activeOpacity={0.7} onPress={toggleAccordion}>
        <Block style={styles.Space_Between}>
          <Block style={{flexDirection:"row",alignItems:"center"}}>
          <FontAwesome5 name="image" size={24} color="#65be34" style={{marginRight:10}} />
          <Text style={{fontSize:16,fontWeight:500}}>Uplode Addhar Card Images</Text>
          </Block>

          <Block>
            {
              expanded ? <MaterialIcons name="keyboard-arrow-up" size={28} color="black" /> 
              :
              <MaterialIcons name="keyboard-arrow-down" size={28} color="black" />
            }
          

          
          </Block>
         
        </Block>
      </TouchableOpacity>
      {expanded && (
        <View style={{flexDirection:"row",marginTop:20,justifyContent:"space-around"}}>
          
         <Block  style={{width:100,height:100,backgroundColor:"#fff",borderRadius:10,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
         <Block>
         <Text style={{fontSize:12,fontWeight:500}}>Front *</Text>
         
         {
          AddharFront === null &&   <FontAwesome5 onPress={() => showImagePicker('camera',"AddharFront")} name="image" size={28} color="grey"  /> 
         }
         
         
          {AddharFront && <Image source={{ uri: AddharFront }} style={{resizeMode: 'contain',width:100,height:100}} />}
         </Block>
         
         </Block>

         <Block style={{width:100,height:100,backgroundColor:"#fff",borderRadius:10,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
         <Block>
         <Text style={{fontSize:12,fontWeight:500}}>Back *</Text>
         {
          AddharBack === null &&   <FontAwesome5 onPress={() => showImagePicker('camera',"AddharBack")} name="image" size={28} color="grey"  /> 
         }
         
         
          {AddharBack && <Image source={{ uri: AddharBack }} style={{resizeMode: 'contain',width:100,height:100}} />}
         </Block>
         </Block>
         
          
        </View>
      )}
    </View>
   

            </Block>
<Block style={{marginTop:40}}>
          
            <Block style={[ customStyle.Card2]}>
                <TextInput

        variant="standard"
        
        label="Name"
        leading={(props) => <Icon name={isFocused.ForAdharName ? 'account-circle' : 'account'} {...props} />}
        value={AddharformData.Name}
        onChangeText={(text) => handleAddharInputChange("Name", text)}
        onFocus={()=>handleFocus("aname")}
        onBlur={()=>handleBlur("ForAdharName")}
        color={ 'white'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:20,letterSpacing:3 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
        </Block>

               <Block style={{marginTop:40}}>
           
            <Block style={[ customStyle.Card3]}>
                <TextInput

        variant="standard"
        
        label="Addhar Number"
        leading={(props) => <Icon name={isFocused.ForAdharNumber ? 'bank' : 'bank'} {...props} />}
        value={AddharformData.AdhharNo}
        onChangeText={(text) => handleAddharInputChange("AdhharNo", text)}
        onFocus={()=>handleFocus("anumber")}
        onBlur={()=>handleBlur("ForAdharNumber")}
        color={ 'white'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:20,letterSpacing:3 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
        </Block>

       


        <Block style={{marginTop:40}}>
           
            <Block style={[ customStyle.Card4]}>
                <TextInput

        variant="standard"
        
        label="Addhar Address"
        leading={(props) => <Icon name={isFocused.ForAdharAddress ? 'bank' : 'bank'} {...props} />}
        value={AddharformData.Address}
        onChangeText={(text) => handleAddharInputChange("Address", text)}
        onFocus={()=>handleFocus("aaddress")}
        onBlur={()=>handleBlur("ForAdharAddress")}
        color={ 'white'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:20,letterSpacing:3 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
        </Block>

        {/* <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <FontAwesome name="Addhar" size={16} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Account Holder Name</Text>
            </Block>
            <Block>
            <Input
                 value={AddharformData.AccHolderName}
                 onChangeText={(text) => handleAddharInputChange("AccHolderName", text)}
                />
            </Block>
        </Block> */}
          </Block>
        }

        {
          showSuccess && <Block style={{padding:10,marginBottom:100}}>
           <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
  <LottieView
      ref={animationRef}
      style={styles.lottie}
     
      
      source={require('../../../assets/Animations/Animation - 1695899165253.json')}
      autoPlay={true} loop={true}
    />
  </Block>
          </Block>
        }
        
        <Block style={[styles.Center]}>
          {
           (showPAN && isPANVerify) && 
          
             <Button
             title="SUBMIT PAN DATA"
             color="#65be34"
             style={{ width: 150, padding: 5 }}
             onPress={handelSubmitPANData}
             trailing={(props) => <Icon name="send" {...props} />}
             tintColor="#fff"
           />
           
          }
          {
           (showPAN && !isPANVerify) &&
           <Block right style={{width:width*0.9}}>
             <Button
           title="Verify Pan"
           color="#65be34"
           style={{ width: 150, padding: 5,marginTop:50 }}
           onPress={VerifyPAN}
           trailing={(props) => <Icon name="send" {...props} />}
           tintColor="#fff"
         />
            </Block>
          
          
          }

{
          showAddhar && 
          <Block right style={{width:width*0.9,marginTop:30,marginBottom:60}}>
                    <Button
                title="SUBMIT"
                color="#65be34"
                style={{ width: 150, padding: 5 }}
                onPress={handelSubmitAddharData}
                trailing={(props) => <Icon name="send" {...props} />}
                tintColor="#fff"
              />
            </Block>
              
        }

{
          showSuccess && 
          

              
<Button
title="Done"
color="#65be34"
style={{ width: 150, padding: 5 }}
onPress={handelSuccess}
trailing={(props) => <Icon name="send" {...props} />}
tintColor="#fff"
/>
        }
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
  lottie:{
    width:350,
    height:350
    },
  footer:{
    position: 'absolute',
     left: 0, 
     right: 0, 
     bottom:10,
     backgroundColor:"#fff"
  },
  container1: {
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
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