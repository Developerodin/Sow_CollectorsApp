import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import Logo from "../../Images/Logo_1.png";
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
export const UplodeShopImage = () => {
 
    const navigation = useNavigation();

    const handelContinue=()=>{
        navigation.navigate("RegisterSuccessfull")
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
         
   
       
     
         <View style={{alignItems:"left",padding:10,justifyContent:"center"}}>
        
        <Block style={[styles.Center,{marginTop:30}]}>
            <Text style={{fontSize:24,fontWeight:500,color:"#4B4B4B",marginRight:10}}>Upload Shop Photo</Text> 
            <FontAwesome5 name="image" size={24}  color="orange" />
        </Block>
         
         </View>
   
       </View>
         
         <Block style={{padding:10,marginTop:20}} >
         <Block style={{height:155,backgroundColor:"#F5F5F5",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
              <Block center>
              <Feather name="camera" size={29} color="#C0C0C0" />
              <Text style={{fontSize:14,color:"#B6B6B6",marginTop:10}}>Only PNG or JPG</Text>
              <Text style={{fontSize:12,color:"#B6B6B6"}}>Less Than 15 MB</Text>
              </Block>
             
         </Block>
         </Block>
       
      
       <Block style={{padding:10}}>
        <Block style={[styles.Center]} >
        <Block style={[styles.Center,{marginTop:10}]} >
        <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor:"black",
                    borderWidth: 1,
                    backgroundColor: 'black',
                    flexDirection:"row",
                    alignItems:"center"
                  },
                ]}
                // onPress={handelSignUp}
                >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color:"#fff",
                   
                  }}>
                  Upload From Device
                  
                </Text>
                <Entypo style={{marginLeft:10}} name="upload-to-cloud" size={20} color="white" />
               
        </TouchableOpacity>
        </Block>
        </Block>
        <Block style={[styles.Center,{marginTop:10}]} >
        <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor:"black",
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                    flexDirection:"row",
                    alignItems:"center"
                  },
                ]}
                // onPress={handelSignUp}
                >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color:"black",
                   
                  }}>
                  Click From Camera
                  
                </Text>
                <MaterialIcons  style={{marginLeft:10}}name="camera" size={20} color="black" />
              </TouchableOpacity>
        </Block>
      
    </Block>
      

      
       
   

      
        <Block style={{padding:10 ,marginTop:100}}>
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