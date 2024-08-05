import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";

import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');

export const OrderDetail = ({route}) => {
  const { id } = route.params;
  const [orderDetails,setOrderDetails] = useState(null)
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

  useEffect(()=>{
    getOrdersById()
  },[])
  return (
   <View style={styles.container}>
    <ScrollView>

   
    <Block style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:10}}>
    
    
    
    
     <Block >
        <Block style={styles.Space_Between}>
        <Text style={{ fontSize: 20, color: "grey" }}>Status</Text>
         <Button  style={{backgroundColor:"#45FFCA",borderRadius:10}}>
              <Text style={{fontSize:16,fontWeight:400,color:"green"}}>
              Completed
              </Text>
            
              </Button>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={styles.text1}>Category</Text>
        <Text style={styles.text2}>Electronics</Text>
        </Block>
        
     </Block>

     <Block style={{marginTop:20}} >
        <Block>
         <Text style={styles.text1}>Sub-Category</Text>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={styles.text2}>Television</Text>
        </Block>
        
     </Block>

     <Block style={{marginTop:20}} >
        <Block>
         <Text style={styles.text1}>Weight</Text>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={styles.text2}> {orderDetails && orderDetails.details.quantity} {orderDetails && orderDetails.details && orderDetails.details.unit}</Text>
        </Block>
        
     </Block>

     <Block style={{marginTop:20}} >
        <Block>
         <Text style={styles.text1}>Pick Up Location</Text>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={{fontSize:20}}>{orderDetails && orderDetails.from && orderDetails.from.Address}, {orderDetails && orderDetails.from && orderDetails.from.pincode}, {orderDetails && orderDetails.from && orderDetails.from.city} </Text>
        </Block>
        
     </Block>
     {
  orderDetails && orderDetails.details && orderDetails.details.discription &&<Block style={{marginTop:20}} >
  <Block>
   <Text style={styles.text1}>Discription</Text>
  </Block>
  <Block style={{marginTop:10}}>
  <Text style={{fontSize:20}}>{orderDetails && orderDetails.details && orderDetails.details.discription}</Text>
  </Block>
  
</Block>

}
     


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
         <Text style={styles.text1}>Pick Up Date</Text>
        </Block>
        <Block style={{marginTop:10}}>
        <Text style={styles.text2}>{orderDetails && new Date(orderDetails.orderDate).toLocaleDateString('en-GB')}</Text>
        </Block>
        
     </Block>
    </Block>

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