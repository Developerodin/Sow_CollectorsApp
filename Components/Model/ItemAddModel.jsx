import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Pressable, View, Dimensions,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAppContext } from "../../Context/AppContext";

import { AntDesign } from "@expo/vector-icons";
import { Block, Text, Input, theme } from "galio-framework";
import { NavigationActions } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneInput from "react-native-phone-number-input";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import axios from "axios";
import { TextInput, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ToastAndroid } from "react-native";

const { width, height } = Dimensions.get("screen");
export const ItemAddModel = ({setItemAddStatus,setCart,modalVisible,ItemModelData,setModalVisible,handelComplete,orderCompleteStatus}) => {
  const navigation = useNavigation();
  const animationRef = useRef(null);

  const handelModelClose = () => {
    // console.log("Model CLick");
    setModalVisible(!modalVisible);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const phoneInput = useRef(null);
  const initalValuesForm = {
    price:"50",
    qty:"Kg"
  }
  const [formData, setFormData] = useState(initalValuesForm);
  const [otp, setOtp] = useState("");
  const [mobileNumber, setmobileNumber] = useState();
  const [formattedValue, setFormattedValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [Loading,setLoading] = useState(false);
  const [TotalAmount,setTotalAmount] = useState(0);
  const {CartInStorage,setUpdate} = useAppContext();
  
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);
  const handleInputChange = (field, value) => {
   
    setFormData({ ...formData, [field]: value });
    if(field === "value"){
      const IntValue = parseInt(value) * parseInt(ItemModelData.value) ;
      
      setTotalAmount(IntValue)
    }
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
  const handelCartToStorage = async (Data)=>{
    try {
      const cartArrayJSON = JSON.stringify(Data);
      await AsyncStorage.setItem('cart', cartArrayJSON);
      setUpdate((prev)=>prev+1)
      // console.log('Cart saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving cart to AsyncStorage:', error);
   }
  }
  const handelDone = ()=>{

    if(TotalAmount > 0){
      const Data ={
        id:ItemModelData.id,
        title:ItemModelData.title,
        value:ItemModelData.value,
        image:ItemModelData.image,
        category:ItemModelData.category,
        totalValue:TotalAmount,
        Weight:formData.value
        }
        ItemModelData.Fun()
        setModalVisible(false)
        setCart((prev)=>[...prev,Data]);
        const ItemData = [...CartInStorage,Data]
        handelCartToStorage(ItemData)
        setTotalAmount(0);
        setFormData(initalValuesForm)
    }
   else{
    ToastAndroid.show("Please Enter A Value", ToastAndroid.SHORT);
   }
    
    
  }

  const handelClose=()=>{
    setModalVisible(false)
    setTotalAmount(0);
        setFormData(initalValuesForm)
  }

  useEffect(()=>{
    setFormData({
      price:ItemModelData.value,
      qty:"Kg"
    })
  },[])
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
      <View style={styles.modalView}>
          
           <Block right style={{width:width*0.8}}>
           <Ionicons onPress={handelClose} name="close-circle" size={24} color="#65be34" />
            </Block> 
  
          <Block style={{ marginTop:10,flexDirection:"row",justifyContent:"left",alignItems:"start",width:width*0.9,padding:10}}>
          <Image
    
    source={{uri:ItemModelData.image}}
    style={{resizeMode: 'contain',width:30,height:30,marginRight:10}}
  />
              <Text style={{fontSize:20}}>{ItemModelData.title} {"( ₹"+ItemModelData.value+" / KG)"}</Text>
        
              
            </Block>
            
            <Block style={{ marginTop:20,flexDirection:"row",justifyContent:"left",alignItems:"start",width:width*0.9,padding:10}}>
                 
                 <Block>
                 <TextInput

variant="standard"
keyboardType="numeric"
label="Price"

value={formData.value}
onChangeText={(text) => handleInputChange("value", text)}
color={ 'grey'}
inputStyle={{ borderWidth: 0, paddingBottom:0,color:"black",fontSize:20,letterSpacing:3 }}
// inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
style={{width:200}}
/>
                 </Block>
         
                 <Block>
                 <TextInput

variant="standard"
keyboardType="numeric"
label="Per"
value={"Kg"}
onChangeText={(text) => handleInputChange("qty", text)}
color={ 'grey'}
inputStyle={{ borderWidth: 0, paddingBottom:0,color:"black",fontSize:20,letterSpacing:3 }}
// inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
style={{width:80,marginLeft:10}}
/>
                 </Block>
        
              
            </Block>

           
           

          
            <Block style={{position:"absolute",bottom:30}}>
              {/* <Button onPress={()=>handelDone(otp)} color="success"> Done</Button> */}
              <Button
                  title="Update"
                  color="#65be34"
                  style={{ width: 150, padding: 5 }}
                  onPress={()=>handelDone()}
                
                  tintColor="#fff"
                />
            </Block>

         
        </View>
       
        
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
     borderRadius:10,
    padding:20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width*0.9,
    height: height - 500,
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
