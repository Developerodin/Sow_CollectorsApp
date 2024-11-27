import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import Logo from "../../Images/Logo_1.png";
import Collector from "../../Images/scrapRetailer.png";
import Mediator from "../../Images/scrapMediator.png";
import Factory from "../../Images/recyclingFactory.png";
import Wholesaler from "../../Images/scrapWholesaler.png";
import Bg from "../../Images/BgRegisterAs.png";
import { Feather } from '@expo/vector-icons';
import { RegisterCard } from '../../../Components/Cards/RegisterCard';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const RegisterAs = () => {
  const navigation = useNavigation()
  const [Selected,setSelected] = useState()
  const saveRegisterDetails = async (title) => {
    try {
      // You can use any key you like to store the authentication status
      const key = 'RegisterAs';
      const value = title
      await AsyncStorage.setItem(key, value);
      console.log('RegisterAs Details saved successfully.');
    } catch (error) {
      console.error('Error saving RegisterAs Details :', error);
    }
  };
    const handelCardClick=(id,title)=>{
      console.log("Title",title)
      setSelected(title);
      saveRegisterDetails(title)
        navigation.navigate("FillPersonalDetails")
    }

    const login=()=>{
      navigation.navigate("Login")
    }
  return (
    <View style={styles.container}>
    <StatusBar style="dark" />
        <ScrollView showsVerticalScrollIndicator={false}>
      
       <View style={{alignItems:"left",marginTop:10,width:width}}>
         
   
       </View>
        
        <Block style={{padding:10}}>
        <TouchableOpacity activeOpacity={0.7} onPress={()=>handelCardClick(1,"Retailer")} style={{marginTop:20}}>
           <RegisterCard Img={Collector} Title={"Scrap"} SubTitle={"Retailer"} BG={Bg} />
       </TouchableOpacity>

       <TouchableOpacity activeOpacity={0.7} onPress={()=>handelCardClick(1,"Wholesaler")} style={{marginTop:30}}>
           <RegisterCard Img={Wholesaler} Title={"Scrap"} SubTitle={"Wholesaler"} BG={Bg} />
       </TouchableOpacity>

       <TouchableOpacity activeOpacity={0.7} onPress={()=>handelCardClick(1,"Mediator")}style={{marginTop:30}}>
           <RegisterCard Img={Mediator} Title={"Scrap"} SubTitle={"Mediator"} BG={Bg} />
       </TouchableOpacity>

       <TouchableOpacity activeOpacity={0.7} onPress={()=>handelCardClick(1,"Factory")}style={{marginTop:30}}>
           <RegisterCard Img={Factory} Title={"Recycling"} SubTitle={"Factory"}  BG={Bg}/>
       </TouchableOpacity>


        </Block>
      
       <Block center style={{marginTop:50,marginBottom: 100}}>
         <Text style={{fontSize:16,color:"#4C4C4C"}} >
          Want to login from a different accounts?
         </Text>

         <TouchableOpacity activeOpacity={0.8} onPress={login} style={{marginTop:10}}>
          <Text style={{color:"#65C5C4"}}>Login or Signup</Text>
         </TouchableOpacity>
       </Block>
      
       </ScrollView>
       </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"#FFF"
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