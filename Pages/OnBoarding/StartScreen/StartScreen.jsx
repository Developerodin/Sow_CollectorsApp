import React, { useRef } from 'react'
import { FlatList, SafeAreaView, StyleSheet,  View,Dimensions,TouchableOpacity, Image,Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import Img from "../../Images/Onbording.png"
import Logo from "../../Images/Logo_1.png"
import Line1 from "../../Images/Line1.png"
export const StartScreen = ({navigation}) => {
    const handelLogin=()=>{
        navigation.navigate('Login')
    }
    const handelSignUp=()=>{
        navigation.navigate('SignUp')
    }
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar style="dark" />
    <View style={{alignItems:"left",marginTop:50,width:width}}>
      
    <View style={{alignItems:"center",height:"20%"}}>
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

      <View style={{alignItems:"left",padding:10,justifyContent:"center"}}>
      <Text style={{fontSize:48,fontWeight:400}}>Scraper's</Text>
      <Block style={{flexDirection:"row",alignItems:"center"}}>
      <Text style={{fontSize:48,fontWeight:400,marginRight:10}}>App</Text>
        <Image source={Line1} style={{marginTop:10}} />
      </Block>
      
      
      </View>
    </View>

    <Block>
        <Block style={[styles.Center,{marginTop:60}]} >
        <Button color='black' style={{width:"95%",height:55}} onPress={handelLogin}>Let's Start</Button>
        </Block>
       
      
    </Block>
   
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"#FFF"
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