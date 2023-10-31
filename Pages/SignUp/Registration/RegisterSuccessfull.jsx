import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import Logo from "../../Images/Logo_1.png";
import Img from "../../Images/Onbording.png"
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
export const RegisterSuccessfull = () => {
    const navigation = useNavigation();

    const handelContinue=()=>{
        navigation.navigate("Tabs")
    }
  return (
    <View style={styles.container}>
    <StatusBar style="dark" />
  
        <ScrollView>
      
       <View style={{alignItems:"left",marginTop:35,width:width}}>
         
       <View style={{alignItems:"center"}}>
         <Image
           source={Logo}
           style={{resizeMode: 'contain'}}
         />
         </View>

         <View style={{alignItems:"center"}}>
      <Image
        source={Img}
        style={{resizeMode: 'contain'}}
      />
      </View>
   
       </View>
     
       
      <Block style={{textAlign:"center",padding:10,marginTop:30}}>
        <Block center>
        <Text style={{fontSize:36,fontWeight:600}}>Congratulations</Text>
        <Text center style={{fontSize:19,fontWeight:400,marginTop:10}}>
            Your Application Has been Successfully Submitted 
            and It Is Under Review, We Will Get back To you in 24 - 48 Hours.
            </Text>
        </Block>
        
       
      </Block>
       
      

      
       
   

      
        <Block style={{padding:10 ,marginTop:70}}>
        <Block style={[styles.Center]}>

   
<TouchableOpacity
    activeOpacity={0.8}
    style={[
      styles.btn,
      {
        flexDirection:"row",
        backgroundColor: '#96DE20',
        textAlign:"center"
      },
    ]}
    onPress={handelContinue}
    >
    <Text
      style={{
        fontWeight:500,
        fontSize: 22,
        color:"black",
      }}>
      Continue
    </Text>
    <Feather name="arrow-right" size={24} color="black" style={{marginLeft:10}} />
  </TouchableOpacity>

        </Block>
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
     width: '100%',
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