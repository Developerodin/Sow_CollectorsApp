import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const PendingOrderCard = (props) => {
  const navigation = useNavigation();

  const handeViewDetail=()=>{
    navigation.navigate("Pending Order")
  }
    // const {Img,Title,SubTitle} = props
  return (
    <View style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:5}}>
      <Block>
        <Block style={[styles.displayF]}>
        <Ionicons name="person" size={18} color="black" />
        <Text style={[styles.text1]} >Ankit Dixit</Text>
        </Block>

        <Block style={{marginTop:15}}>
          <Text style={{fontSize:18,fontWeight:400}}>Estimated Value</Text>
          <Text style={{fontSize:20,fontWeight:500,marginTop:3}}>₹ 45,000</Text>
        </Block>

        <Block style={[styles.displayF,{marginTop:10}]}>
        <AntDesign name="calendar" size={20} color="black" />
        <Text style={[styles.text1]} >Pickup Date : <Text style={{color:"#6096FF"}}>20 March 2023</Text> </Text>
        </Block>

        <Block style={[styles.displayF,{marginTop:10}]}>
        <Ionicons name="location" size={20} color="black" />
        <Text style={[styles.text1]} >Pickup Location : 302039 </Text>
        </Block>

        <Block style={[styles.Center]} >
        <Block style={[styles.Center,{marginTop:20}]} >
        <TouchableOpacity
                activeOpacity={1}
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
                onPress={handeViewDetail}
                >
                <Text
                  style={{
                  
                    fontSize: 15,
                    color:"#fff",
                   
                  }}>
                   Details
                  
                </Text>
                
               
        </TouchableOpacity>
        </Block>
        </Block>
      </Block>
   
</View>
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