import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";

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
const scrapData = [
  {
    title: 'Plastic',
    value: '50',
    image: 'https://cdn-icons-png.flaticon.com/512/3520/3520812.png',
    category: 'Category 1'
  },
  {
    title: 'Newspaper',
    value: '10',
    image: 'https://cdn1.iconfinder.com/data/icons/office-icons-17/512/ilustracoes_04-14-512.png',
    category: 'Category 2'
  },
  {
    title: 'Iron',
    value: '30 ',
    image: 'https://cdn3.iconfinder.com/data/icons/minecraft-icons/512/Iron_Ingot.png',
    category: 'Category 1'
  },
  {
    title: 'Brass',
    value: '75',
    image: 'data:image/png;base64,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',
    category: 'Category 1'
  },
  {
    title: 'Glass Bottles',
    value: '20',
    image: 'https://static-00.iconduck.com/assets.00/glass-bottle-icon-425x512-trib9o8d.png',
    category: 'Category 2'
  },
  {
    title: 'Paperboard',
    value: '15',
    image: 'https://w7.pngwing.com/pngs/690/983/png-transparent-boxes-food-boxes-mixed-paper-paper-paperboard-recycling-recycling-materials-icon.png',
    category: 'Category 1'
  },
  {
    title: 'Steel',
    value: '40',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkhFOmbzyE2plcCjR5qhW6m-WA-YA2rByxeg&usqp=CAU',
    category: 'Category 3'
  
  },
  {
    title: 'Cardboard',
    value: '25',
    image: 'https://cdn-icons-png.flaticon.com/512/4320/4320173.png',
    category: 'Category 2'
  },
  {
    title: 'Tin Cans',
    value: '35',
    image: 'https://cdn-icons-png.flaticon.com/512/454/454598.png',
    category: 'Category 4'
  },
 
];




// 08AAHCT9493J1ZI


export const UpgradeTo = () => {
  const navigation = useNavigation();
  const animationRef = useRef(null);
 const [showGST,setShowGST] = useState(true)
 const [showBank,setShowBank] = useState(false)
 const [showSuccess,setShowSuccess] = useState(false)

 const [GstDone,setGstDone] = useState(false)
 const [BankDone,setBankDone] = useState(false)
 const [isGstVerify,setIsGstVerify] = useState(false)
 const [GstformData, setGstFormData] = useState({
  gstNo:'',
  companyName: '',
  companyAddress: '',
});
const [BankformData, setBankFormData] = useState({
  AccNo: '',
  BankName: '',
  Ifsc: '',
  AccHolderName:""
});
const [Gstresponse, setGstResponse] = useState(null);
const handleGstInputChange = (fieldName, value) => {

  setGstFormData((prevData) => ({
    ...prevData,
    [fieldName]: value,
  }));
};

const handleBankInputChange = (fieldName, value) => {
  setBankFormData((prevData) => ({
    ...prevData,
    [fieldName]: value,
  }));
};
const handleGstSearch = async () => {
  try {
    const gstin = GstformData.gstNo; // Replace with the GSTIN you want to search for
    const url = `https://commonapi.mastersindia.co/commonapis/searchgstin?gstin=${gstin}`;

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
      const GStData = response.data.data
      const GstAddress = GStData.pradr.addr
      const Address = `${GstAddress.bno},${GstAddress.bnm},${GstAddress.st},${GstAddress.pncd},${GstAddress.loc} ,${GstAddress.stcd}`
      // console.log("GSt Data ===>",GStData);
     
      setGstResponse(response.data);
      handleGstInputChange("companyName", GStData.lgnm)
      handleGstInputChange("companyAddress", Address)
      setIsGstVerify(true)
    } else {
      console.error('API request failed');
      ToastAndroid.show('No Data Found Check Gst Number Again', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    ToastAndroid.show('No Data Found Check Gst Number Again', ToastAndroid.SHORT);
  }
};
const isGstValid = gstNo => {
  // Define a regular expression pattern for a valid GST number
  const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  // Test if the provided GST number matches the pattern
  return gstPattern.test(gstNo);
};
const VerifyGst =()=>{
  const GSTNO = GstformData.gstNo
  if (!GSTNO) {
    // Display a toast message
    ToastAndroid.show('Please Provide GST Number', ToastAndroid.SHORT);
    return;
  }
  if (GSTNO.length < 15) {
    // Display a toast message
    ToastAndroid.show('Please Provide Valid GST Number', ToastAndroid.SHORT);
    return;
  }
  if (!isGstValid(GSTNO)) {
    ToastAndroid.show('GST number is not valid', ToastAndroid.SHORT);
    return;
  }
  handleGstSearch()
}

 const handelSubmitGSTData =()=>{

  if (!GstformData.gstNo) {
    // Display a toast message
    ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
    return;
  }
  setGstDone(true)
  setShowGST(false)
  setShowBank(true);
  // console.log("Gst Data",GstformData)
  
 }

 const handelSubmitBankData =()=>{

  if (!BankformData.AccNo || !BankformData.BankName || !BankformData.Ifsc || !BankformData.AccHolderName) {
    // Display a toast message
    ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
    return;
  }
  setBankDone(true)
  setShowBank(false)
  setShowSuccess(true)
 }

 const handelSuccess =()=>{
  setGstDone(false)
  setShowGST(true)
  setShowBank(false)
  setBankDone(false)
  setShowSuccess(false)

  navigation.navigate("Home")
  
 }
 
 

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar  style="dark"/>
       
       <Block style={[styles.Center,{padding:10,borderBottomWidth:0.5,borderColor:"grey"}]}>

        <Block style={{padding:5,width:70}}>
          <Block center style={{borderWidth:1,borderColor:`${GstDone ? "blue" : "grey"}`,borderRadius:100,width:30,height:30,flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:`${GstDone ? "lightblue" : "#fff"}`}}>
           
           {
             GstDone ? 
             <Entypo name="check" size={17} color="blue" />
             :
             <Text style={{fontSize:16,fontWeight:500}}>1</Text>
           }
           
            
          </Block>

          <Block>
            <Text center style={{fontSize:14,fontWeight:500,marginTop:3}}>GST</Text>
          </Block>
        </Block>
        
        <Block style={{borderWidth:1,width:50,borderColor:`${GstDone ? "blue" : "grey"}`,marginTop:-20}}>

        </Block>
        <Block style={{padding:5,width:70}}>
        <Block center style={{borderWidth:1,borderColor:`${BankDone ? "blue" : "grey"}`,borderRadius:100,width:30,height:30,flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:`${BankDone ? "lightblue" : "#fff"}`}}>
           
           {
             BankDone ? 
             <Entypo name="check" size={17} color="blue" />
             :
             <Text style={{fontSize:16,fontWeight:500}}>2</Text>
           }
           
            
          </Block>

          <Block>
            <Text center style={{fontSize:14,fontWeight:500,marginTop:3}}>Bank</Text>
          </Block>
        </Block>

        <Block style={{borderWidth:1,width:50,borderColor:`${BankDone ? "blue" : "grey"}`,marginTop:-20}}>

          </Block>

        <Block style={{padding:5,width:70}}>
        <Block center style={{borderWidth:1,borderColor: "grey",borderRadius:100,width:30,height:30,flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:`${BankDone ? "lightblue" : "#fff"}`}}>
           
        {
             BankDone ? 
             <Entypo name="check" size={17} color="blue" />
             :
             <Text style={{fontSize:16,fontWeight:500}}>3</Text>
           }
          
           
            
          </Block>

          <Block>
            <Text center style={{fontSize:14,fontWeight:500,marginTop:3}}>Success</Text>
          </Block>
        </Block>


       </Block>

      
      <ScrollView>
     
        {
          showGST &&  <Block style={{ padding: 10 }}>
          <Block style={{ marginTop: 20 }}>
            <Block style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="location-city" size={20} color="black" />
              <Text style={{ fontSize: 20, fontWeight: 500, marginLeft: 6 }}>GST No.</Text>
            </Block>
            <Block>
              <Input
                value={GstformData.gstNo}
                onChangeText={(text) => handleGstInputChange("gstNo", text)}
              />
            </Block>
          </Block>
    
          {
            isGstVerify && <Block>
                     <Block style={{ marginTop: 20 }}>
            <Block style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="location-city" size={20} color="black" />
              <Text style={{ fontSize: 20, fontWeight: 500, marginLeft: 6 }}>Company Name</Text>
            </Block>
            <Block>
              <Input
                value={GstformData.companyName}
                onChangeText={(text) => handleGstInputChange("companyName", text)}
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
                value={GstformData.companyAddress}
                onChangeText={(text) => handleGstInputChange("companyAddress", text)}
              />
            </Block>
          </Block>
              </Block>
          }
         
        </Block>
        }

        {
          showBank && <Block style={{padding:10}}>
               <Block style={{marginTop:40}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <FontAwesome name="bank" size={16} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Account Number</Text>
            </Block>
            <Block>
                <Input
                 value={BankformData.AccNo}
                 onChangeText={(text) => handleBankInputChange("AccNo", text)}
                />
            </Block>
        </Block>

        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <FontAwesome name="bank" size={16} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Bank Name</Text>
            </Block>
            <Block>
            <Input
                 value={BankformData.BankName}
                 onChangeText={(text) => handleBankInputChange("BankName", text)}
                />
            </Block>
        </Block>


        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <FontAwesome name="bank" size={16} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>IFSC Code</Text>
            </Block>
            <Block>
            <Input
                 value={BankformData.Ifsc}
                 onChangeText={(text) => handleBankInputChange("Ifsc", text)}
                />
            </Block>
        </Block>

        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <FontAwesome name="bank" size={16} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Account Holder Name</Text>
            </Block>
            <Block>
            <Input
                 value={BankformData.AccHolderName}
                 onChangeText={(text) => handleBankInputChange("AccHolderName", text)}
                />
            </Block>
        </Block>
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
           (showGST && isGstVerify) &&  <Button onPress={handelSubmitGSTData} color='black'>
           SUBMIT GST DATA
           </Button> 
           
          }
          {
           (showGST && !isGstVerify) &&
            <Button onPress={VerifyGst} color='black'>
            Verify Gst
            </Button>
          }

{
          showBank && 
          <Button onPress={handelSubmitBankData} color='black'>
              SUBMIT BANK DATA
              </Button>
        }

{
          showSuccess && 
          <Button onPress={handelSuccess} color='black'>
               Done
              </Button>
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