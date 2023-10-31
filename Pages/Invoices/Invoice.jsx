import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Header } from '../../Components/Header/Header';
import { AntDesign } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');

export const Invoice = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView style={{flex:1,backgroundColor:"#F1F1F1"}}>

      <Block style={{padding:10}}>
      <Block style={[styles.Space_Between,{marginTop:30}]}>
        <Block>
        <Text style={{fontSize:32,fontWeight:500}}>Invoices</Text>
        </Block>
       <Block>
       <Button color='black'>+Create Invoice</Button>
       </Block>
        
      </Block>

      <Block style={{marginTop:20,borderWidth:1,borderColor:"#DCDCDC",padding:10,backgroundColor:"#FFFFFF"}}>

<Block>
<Block style={styles.Space_Between}>
  <Text style={{fontSize:28,fontWeight:400}}>My Wallet : <Text style={{fontWeight:500,fontSize:32}}>₹ 45,000</Text></Text>

</Block>

<Block style={[styles.Space_Between,{marginTop:30,marginBottom:20}]}>
  
  <Button color="#00BC84" >+ Deposit Money</Button>

  <Button color='white' style={{borderWidth:1,borderColor:"#BC0000"}}>
              <Text style={{fontSize:16,fontWeight:400,color:"#BC0000"}}>
              Withdraw Money
              </Text>
            
              </Button>
  
  
</Block>
</Block>

       </Block>

      <Block style={{marginTop:20,borderWidth:1,borderColor:"#DCDCDC",padding:10,backgroundColor:"#FFFFFF"}}>

        <Block>
        <Block style={styles.Space_Between}>
          <Text style={{fontSize:20,fontWeight:400,color:"#767676"}}>My Collection</Text>
          <Text style={{fontSize:18,fontWeight:400,color:"#00BC84"}}>+ ₹ 40,000</Text>
        </Block>

        <Block style={[styles.Space_Between,{marginTop:30,marginBottom:20}]}>
          <Block style={{padding:5,backgroundColor:"#F2FFF9",width:160}}>
            <Text style={{fontSize:14,fontWeight:400,color:"#00BC84"}}>In</Text>
            <Text style={{fontSize:24,fontWeight:400,color:"#00BC84"}}>₹ 45,000</Text>
          </Block>
          <Block style={{padding:5,backgroundColor:"#FFF2F2",width:160}}>
            <Text style={{fontSize:14,fontWeight:400,color:"#BC0000"}}>Out</Text>
            <Text style={{fontSize:24,fontWeight:400,color:"#BC0000"}}>₹ 5,000</Text>
          </Block>
        </Block>
        </Block>
       
      </Block>


      <Block style={{marginTop:20,marginBottom:60}}>
        <Block style={styles.Space_Between}>
          <Text style={{fontSize:28,fontWeight:400}}>Transaction History</Text>
          <Text style={{fontSize:14,fontWeight:500,color:"#6096FF"}}>View All</Text>
        </Block>

        <Block style={{marginTop:20}}>

          <Block style={[styles.Space_Between,{marginTop:15}]}>
          <AntDesign name="upload" size={24} color="black" />
          <Text style={{fontSize:16,fontWeight:400}}>20 March 2023</Text>

          <Text style={{fontSize:16,fontWeight:400,color:"#00BC84"}}>+ ₹ 45,000</Text>
          </Block>

          <Block style={[styles.Space_Between,{marginTop:15}]}>
          <AntDesign name="download" size={24} color="black" />
          <Text style={{fontSize:16,fontWeight:400}}>20 March 2023</Text>

          <Text style={{fontSize:16,fontWeight:400,color:"#BC0000"}}>- ₹ 45,000</Text>
          </Block>
        </Block>
      </Block>

      </Block>
      </ScrollView >
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#FFF",

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