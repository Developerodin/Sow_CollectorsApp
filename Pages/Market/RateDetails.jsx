import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import { useAppContext } from '../../Context/AppContext';
const {width, height} = Dimensions.get('window');
import { useNavigation } from "@react-navigation/native";
export const RateDetails = ({ route }) => {
  const navigation = useNavigation();
  const { itemId,index } = route.params;
  const { update, userDetails } = useAppContext();
 const [details,setDetails] = useState(null);
 const [weight, setWeight] = useState('');
 const [TotalAmount, setTotalAmount] = useState('')

 const handleInputChange = (text) => {
  setWeight(text);
  const totalWeight =  parseInt(text) * parseInt(details.sub_category[index].price);
  setTotalAmount(totalWeight)
};

const handleSubmit = () => {
  const Orderdetails ={
    category:details.category,
    sub_category:details.sub_category[index].name,
    quantity:weight,
  }

  console.log(userDetails._id, details._id,Orderdetails,TotalAmount);
  createOrder(userDetails._id, details._id,Orderdetails,TotalAmount);
};

const createOrder = async (from, to, details, totalAmount) => {
  try {
    const response = await axios.post(`${Base_url}api/b2b_orders`, { from, to, details, totalAmount });
    navigation.navigate("Order Status", { status: "success" });
    return response.data;
  } catch (error) {
    navigation.navigate("Order Status", { status: "fail" });
    console.log("error",error)
  }
};

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Base_url}api/b2b/${itemId}`);

      if (response.status === 200) {
        console.log("Data =====>",response.data);
        setDetails(response.data);
      } else {
        console.log('Error fetching data:', response.data.message);
      }
    } catch (error) {
      console.log('Error fetching data:', error.message);
    }
  };

  useEffect(()=>{
    console.log("Id ===>",itemId)
    fetchData()
  },[])
  return (
   <View style={styles.container}>
    <ScrollView>

   
    <Block style={{padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:10,padding:10}}>
     <Block >
        
        <Block>
        <Text style={{fontSize:28,fontWeight:400}}>{details && details.category}</Text>
        </Block>
        
     </Block>

     <Block style={[{marginTop:20,flexDirection:"row",alignItems:"center"}]} >
        <Block style={{marginRight:20}}>
        <Ionicons name="person" size={20} color="black" />
        </Block>
        <Block >
        <Text style={{fontSize:16}}>{details && details.name}</Text>
        </Block>
        
     </Block>

     <Block style={[{marginTop:15,flexDirection:"row",alignItems:"center"}]} >
        <Block style={{marginRight:20}}>
        <Ionicons name="location-sharp" size={20} color="black" />
        </Block>
        <Block >
        <Text style={{fontSize:16}}>Location : {details && details.Address},{details && details.pincode},{details && details.city},{details && details.country}</Text>
        </Block>
        
     </Block>

     <Block style={[{marginTop:15,flexDirection:"row",alignItems:"center"}]} >
        <Block style={{marginRight:20}}>
        <FontAwesome name="money" size={16} color="black" />
        </Block>
        <Block >
        <Text style={{fontSize:18}}>sub category : {details && details.sub_category[index].name}</Text>
        </Block>
        
     </Block>
    
     <Block style={[{marginTop:15,flexDirection:"row",alignItems:"center"}]} >
        <Block style={{marginRight:20}}>
        <FontAwesome name="money" size={16} color="black" />
        </Block>
        <Block >
        <Text style={{fontSize:18}}>₹ {details && details.sub_category[index].price}/KG</Text>
        </Block>
        
     </Block>


     <Block style={{marginTop:20}}>
        <Text style={styles.text2}>Enter Approx Weight of Scrap</Text>

        <Block style={[styles.Space_Between,{marginTop:10}]}>
            <Input style={{height:60,width:width*0.55,borderColor:"black"}} 
            placeholder='Enter Weight ...' 
            value={weight}
        onChangeText={handleInputChange}
            />

            <Input style={{height:60,width:width*0.3,borderColor:"black"}} value='Kilograms' />
        </Block>

        <Block style={{marginTop:10}}>
            <Text style={{fontSize:15}}>Weight need not to be Accurate, We </Text>
            <Text style={{fontSize:15}}>Just need an Idea.</Text>
        </Block>

        
     </Block>


     <Block style={{marginTop:15}}>
        <Text style={{fontSize:22}}>Approx Scrap Value</Text>
        <Block style={{flexDirection:"row"}}>
        <Block style={[{marginTop:13,height:60,width:width*0.5,borderColor:"black",fontSize:20,borderWidth:1,padding:10,borderRadius:5}]}>
             <Text style={{fontSize:25}}>{TotalAmount}</Text>
        </Block>
        <Block style={[{marginTop:10,height:60,fontSize:20,padding:10}]}>
             <Text style={{fontSize:25,color:"grey"}}>Rs</Text>
        </Block>
        </Block>
      
     </Block>

   
    </Block>

    <Block style={[{marginTop:15},styles.Center]}>
             <Button onPress={handleSubmit} color='white' style={{borderWidth:1,width:"100%",borderColor:"#C8C8C8",height:63,backgroundColor:"#EA5932"}}>
              <Text style={{fontSize:20,fontWeight:400,color:"#fff"}}>
              Sell My Scrap
              </Text>
            
              </Button>
    </Block>

    <Block center style={{marginTop:20,marginBottom:20}}>
        <Text style={styles.text1}>Note : By Proceeding You Accept our <Text style={{color:"#EA5932"}}>Privacy Policy</Text> and </Text>
        <Text style={[{color:"#EA5932"}]}>Terms & Conditions</Text>
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