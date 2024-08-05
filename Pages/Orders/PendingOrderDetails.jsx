import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput,Modal } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import DynamicInputField from '../../Components/DynamicInput/DynamicInputField ';
import { OTPModel } from '../../Components/Model/OTPModel';
import { ToastAndroid } from 'react-native';
// import { NavigationMap } from '../../Components/Maps/NavigationMap';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

export const PendingOrderDetails = ({route}) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const [orderDetails,setOrderDetails] = useState(null)
  const [inputFields, setInputFields] = useState([{ value: '', category: 'Category 1' }]);
  const [modalVisible,setModalVisible] = useState(false)
  const [orderCompleteStatus,setOrderCompleteStatus] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [update,setupdate] = useState(0)
  const getOrdersById = async () => {
    try {
      const response = await axios.get(`${Base_url}api/b2b_orders/${id}`);
      const data = response.data;
       console.log("orders by id ==>",response.data);
      // Assuming the response contains an 'orders' property
      
      setOrderDetails(data);
      
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const addInputField = () => {
    const updatedInputFields = [...inputFields, { value: '', category: 'Category 1' }];
    setInputFields(updatedInputFields);
  };
  const handleOrderUpdate = async (orderId, status, quantity) => {
    try {
      // Make API call to update order status and quantity
      await axios.put(`${Base_url}api/b2b_orders/orders/${orderId}`, {
        status,
        quantity,
      });

      // You can perform additional actions after a successful update if needed
      if(status === "completed"){
        setOrderCompleteStatus(true);
      }
   
      setupdate((prev)=>prev+1)
      console.log("Order updated successfully!");
      ToastAndroid.show("Order successfull !", ToastAndroid.SHORT);
    } catch (error) {
        ToastAndroid.show("Try Again !!", ToastAndroid.SHORT);
      console.error("Error updating order:", error.message);
    }
  };


  const handelSubmit =()=>{
    console.log("Values",inputFields )
    // setModalVisible(true);
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

  const handelCancel = async () =>{
    handleOrderUpdate(orderDetails._id,"canceled","")
    setupdate((prev)=>prev+1)
  }


  useEffect(()=>{
    getOrdersById()
  },[update])
  
  return (
   <View style={styles.container}>
    <ScrollView>

   
    <Block style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:10}}>
    <Block style={styles.Space_Between}>
         <Text style={{fontSize:20,color:"grey"}}>OTP :{orderDetails && orderDetails.otp}</Text>
         <Button  style={{backgroundColor:"crimson",borderRadius:10}}>
              <Text style={{fontSize:16,fontWeight:400,color:"#fff"}}>
              {orderDetails && (orderDetails.status).toUpperCase()}
              </Text>
            
              </Button>
        </Block>
    <Block style={{marginTop:20}} >
        <Block>
         <Text style={styles.text1}>Order Collector</Text>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={{fontSize:16}}> <Entypo name="user" size={14}  color="black" />  {orderDetails && orderDetails.to && orderDetails.to.name}</Text>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={{fontSize:16}}> <Feather name="phone" size={14} color="black" />  +91 {orderDetails && orderDetails.to && orderDetails.to.mobile}</Text>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={{fontSize:16}}> <AntDesign name="infocirlceo" size={14} color="black" />  {orderDetails && orderDetails.to && orderDetails.to.registerAs}</Text>
        </Block>
        
     </Block>

     <Block style={{marginTop:20}} >
        <Block>
         <Text style={styles.text1}>Order Details</Text>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={{fontSize:16}}> Qty :  {orderDetails && orderDetails.details && orderDetails.details.quantity} {orderDetails && orderDetails.details && orderDetails.details.unit}</Text>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={{fontSize:16}}> Category :  {orderDetails && orderDetails.details && orderDetails.details.category}</Text>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={{fontSize:16}}> Sub category : {orderDetails && orderDetails.details && orderDetails.details.sub_category}</Text>
        </Block>
       
        <Block style={{marginTop:10}}>
        <Text style={{fontSize:16}}> Amount :  ₹ {orderDetails && orderDetails.totalAmount}</Text>
        </Block>
        
     </Block>

     <Block style={{marginTop:20}} >
        <Block>
         <Text style={styles.text1}>Pick Up Location</Text>
        </Block>
        <Block style={{marginTop:10}}>
          
        <Text style={{fontSize:20}}>{orderDetails && orderDetails.from && orderDetails.from.Address}, {orderDetails && orderDetails.from && orderDetails.from.pincode}, {orderDetails && orderDetails.from && orderDetails.from.city}</Text>
        </Block>
        
     </Block>

{
  orderDetails && orderDetails.details.discription &&<Block style={{marginTop:20}} >
  <Block>
   <Text style={styles.text1}>Discription</Text>
  </Block>
  <Block style={{marginTop:10}}>
  <Text style={{fontSize:20}}>{orderDetails && orderDetails.details.discription}</Text>
  </Block>
  
</Block>

}
     


     <Block style={{marginTop:20}} >

      <Block >
      <Block>
         <Text style={styles.text1}>Booked Date</Text>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={styles.text2}>{orderDetails && new Date(orderDetails.orderDate).toLocaleDateString('en-GB')}</Text>
        </Block>
      </Block>
       

        {/* <Block right>
    <Button size={"small"} color='teal' onPress={toggleModal}>
     Address
    </Button>
        </Block> */}
        
     </Block>
    </Block>

    {/* <Block style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:10}}>
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
         
     
    </Block> */}


    <Block style={[{marginTop:30,marginBottom:30},styles.Center]}>
    {
     orderDetails && orderDetails.status === "in-progress" || "pending" && orderDetails && orderDetails.status !== "canceled" &&  <Block style={[{ marginTop: 30, marginBottom: 30 }, styles.Center]}>
    
      <Button color="black" onPress={handelCancel} style={{ height: 63 }}>
        Cancel Order
      </Button>
    </Block>
    }
    {/* <Button  color='black' onPress={handelSubmit} style={{height:63}}>
              
              Submit
             
            
              </Button> */}
    {/* <Button color='black'  style={{height:63}}>
             
              Cancel Order
             
            
              </Button> */}
    </Block>

    <OTPModel modalVisible ={modalVisible} setModalVisible={setModalVisible} handelComplete={handelComplete} orderCompleteStatus={orderCompleteStatus} />
    
    <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {/* <NavigationMap navigation={navigation} /> */}

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