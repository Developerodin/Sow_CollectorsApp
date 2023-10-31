import React from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import Logo from "../../Images/Logo_1.png";
import Img from "../../Images/Onbording.png";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
    <StatusBar  hidden={true} />
  
   
    
      
    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",flex:1}}>
      <Image
        source={Logo}
        style={{resizeMode: 'contain'}}
      />
      </View>
    


</View>
  )
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      width:width,
      height:height
    },
    Text_Container:{
      flex: 0.9,
      justifyContent:"center",
      alignItems:"left",
      padding:30
    },
    Image: {
      ...StyleSheet.absoluteFillObject,
      height:height,
      width : width
  },
  
    });