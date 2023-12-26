import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput,Modal } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import DynamicInputField from '../../Components/DynamicInput/DynamicInputField ';
import { OTPModel } from '../../Components/Model/OTPModel';
import { ToastAndroid } from 'react-native';
import { NavigationMap } from '../../Components/Maps/NavigationMap';
import { useNavigation } from "@react-navigation/native";
const {width, height} = Dimensions.get('window');

export const PendingOrderDetails = () => {
  const navigation = useNavigation();
  const [inputFields, setInputFields] = useState([{ value: '', category: 'Category 1' }]);
  const [modalVisible,setModalVisible] = useState(false)
  const [orderCompleteStatus,setOrderCompleteStatus] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const addInputField = () => {
    const updatedInputFields = [...inputFields, { value: '', category: 'Category 1' }];
    setInputFields(updatedInputFields);
  };

  const handelSubmit =()=>{
    console.log("Values",inputFields )
    setModalVisible(true);
  }
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handelComplete =(otp)=>{
   console.log("OTP =>",otp);
    if(otp === ""){
      ToastAndroid.show('OTP Required', ToastAndroid.SHORT);
      return
    }
   if(otp === "1234"){
    setOrderCompleteStatus(true);
   }
   else{
    ToastAndroid.show('Wrong OTP', ToastAndroid.SHORT);
   }

  }
  
  return (
   <View style={styles.container}>
    <ScrollView>

   
    <Block style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:10}}>
    

    <Block style={[styles.border,{width:"100%",height:300,justifyContent:"center",alignItems:"center"}]}>
      <TouchableOpacity onPress={toggleModal}>
      <Text style={{fontSize:24}}>Map</Text>
      </TouchableOpacity>
      
    </Block>

     

    

     <Block style={{marginTop:20}} >
        <Block>
         <Text style={styles.text1}>Pick Up Location</Text>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={{fontSize:20}}>Plot Number 116, Lane Number 4, Rathore Nagar, Vaishali Nagar</Text>
        </Block>
        
     </Block>

     <Block style={{marginTop:20}} >
        <Block>
         <Text style={[styles.text1,{color:"#4B4B4B"}]}>PIN 302021</Text>
        </Block>
        <Block style={{marginTop:10,flexDirection:"row", alignItems:"center"}}>
        <Text style={[styles.text1,{color:"#040404"}]}>District Jaipur</Text>
        <Text style={[styles.text1,{color:"#040404",marginLeft:30}]}>State Rajasthan</Text>
        </Block>
        
     </Block>

     <Block style={{marginTop:20}} >
        <Block>
         <Text style={styles.text1}>Pick Up Date</Text>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={styles.text2}>03 Mar 2023</Text>
        </Block>
        
     </Block>
    </Block>

    <Block style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:10}}>
    <Block style={styles.Space_Between}>
      <Text style={{fontSize:20}}>List Down Items</Text>

      <Ionicons onPress={addInputField} name="add-circle-outline" size={34} color="black" />
    </Block>

    <Block style={{marginTop:20}}>
    <DynamicInputField
  inputFields={inputFields}
  setInputFields={setInputFields}
/>
    </Block>
         
     
    </Block>


    <Block style={[{marginTop:30,marginBottom:30},styles.Center]}>
    <Button  color='black' onPress={handelSubmit} style={{height:63}}>
              
              Submit
             
            
              </Button>
    <Button color='white' style={{borderWidth:1,borderColor:"#C8C8C8",height:63}}>
              <Text style={{fontSize:20,fontWeight:400}}>
              Cancel Order
              </Text>
            
              </Button>
    </Block>

    <OTPModel modalVisible ={modalVisible} setModalVisible={setModalVisible} handelComplete={handelComplete} orderCompleteStatus={orderCompleteStatus} />
    
    <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <NavigationMap navigation={navigation} />

          <Block
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "center",
              height: 50,
            }}
          >
            <Ionicons
              onPress={toggleModal}
              name="arrow-back-circle"
              style={{ marginLeft: 10 }}
              size={30}
              color="#65be34"
            />
            <Text style={{ fontSize: 18, fontWeight: 500, marginLeft: 10 }}>
              Direction
            </Text>
          </Block>

          {/* {SelectedAddressFromMap && (
            <Block
              style={{
                padding: 11,
                backgroundColor: "#fff",
                height: 200,
                position: "absolute",
                bottom: 0,
                width: width,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <Block>
                <Text
                  style={{
                    color: "grey",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: 1,
                  }}
                >
                  SELECT PICKUP LOCATION
                </Text>
              </Block>

              {SelectedAddressFromMap.name !== "null" ? (
                <Block>
                  <Block
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop:2,
                    }}
                  >
                    <Block
                      style={{
                        flexDirection: "row",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="md-location" size={24} color="crimson" />
                      <Text
                        style={{
                          fontSize:16,
                          fontWeight: "bold",
                          letterSpacing: 1,
                          marginLeft: 5,
                        }}
                      >
                        {SelectedAddressFromMap.street}
                      </Text>
                    </Block>

                    <Block>
                      <Button
                        color="#65be34"
                        size={"small"}
                        style={{ width: 80, height: 26 }}
                      >
                        CHANGE
                      </Button>
                    </Block>
                  </Block>
                  <Block left style={{ width: width * 0.7, marginTop: 0 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        letterSpacing: 1,
                      }}
                    >
                      {SelectedAddressFromMap.name},
                      {SelectedAddressFromMap.district}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        letterSpacing: 1,
                        marginTop: 4,
                      }}
                    >
                      {SelectedAddressFromMap.city},
                      {SelectedAddressFromMap.region}{" "}
                      {SelectedAddressFromMap.postalCode},
                      {SelectedAddressFromMap.country}
                    </Text>
                  </Block>
                </Block>
              ) : (
                <Block></Block>
              )}

              <Block style={[styles2.AlignCenter, { marginTop: 10 }]}>
                <Button
                  onPress={saveAddress}
                  color="#65be34"
                  style={{ width: width * 0.9 }}
                >
                  CONFIRM LOCATION
                </Button>
              </Block>
            </Block>
          )} */}

        
        </View>
      </Modal>
    </ScrollView>
   </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"#ffffff",
      padding:10
  
    },
    text1:{
     fontSize:14,
     color:"#9B9B9B"
    },
    text2:{
        fontSize:24,
        color:"#040404"
    },
    tabBar: {
      flexDirection: 'row',
      // paddingTop: StatusBar.currentHeight,
      padding:10,
      
    },
    modalContainer: {
      flex: 1,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
      marginTop:10
      
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
        borderColor: "pink",
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