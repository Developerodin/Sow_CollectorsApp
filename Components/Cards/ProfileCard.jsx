import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const ProfileCard = (props) => {
    const navigation = useNavigation();
   const {Title,Img,Link,Fun} = props
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={Fun}>
 <View style={{borderBottomWidth:0.5,borderColor:"#C8C8C8",padding:10,backgroundColor:"#fff", marginTop:20,borderRadius:5}}>
    <Block  style={{flexDirection:"row",marginBottom:10}}>

      <Block style={{flexDirection:"row",alignItems:"center",width:"10%",}}>
        <Block >
        {/* <Image
    
        source={{uri:Img}}
        style={{resizeMode: 'contain',width:50,height:50}}
      /> */}
      {Img}
        </Block>
      </Block>
      

      <Block style={[styles.Space_Between,{width:"85%",marginLeft:10}]}>
        <Block>
        <Block>
        <Text style={{fontSize:16,color:"#424242",fontWeight:"bold"}}>{Title}</Text>
      </Block>

        </Block>
       

        <Block>
        <AntDesign name="right" size={14} color="black" />
        </Block>
      </Block>
    </Block>
 
</View>
    </TouchableOpacity>
   
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"#FFF"
    },
    displayF:{
    flexDirection:"row",
    alignItems:"center"
    },
    text1:{
      fontSize:15,
       marginLeft:10
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
      height: 46,
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