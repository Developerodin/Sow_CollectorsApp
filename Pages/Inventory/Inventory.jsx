import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,Modal, 
   View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Header } from '../../Components/Header/Header';
import StockInputField from '../../Components/AddStockInput/StockInputField ';
const {width, height} = Dimensions.get('window');
export const Inventory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputFields, setInputFields] = useState([{ value: '', category: 'Category 1' }]);
  const addInputField = () => {
    const updatedInputFields = [...inputFields, { value: '', category: 'Category 1' }];
    setInputFields(updatedInputFields);
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
    <Header/>
    <ScrollView>

    <Block style={{backgroundColor:"#fffff",padding:10}}>

     
      <Block style={{marginTop:20}}>
        <Text style={{fontSize:32,fontWeight:500}}>Inventory</Text>
        <Text style={{fontSize:14,fontWeight:400,color:"#797979"}}>Time To Stock Up!</Text>
      </Block>

      <Block style={{marginTop:50,borderWidth:1,borderColor:"#DCDCDC",padding:15,backgroundColor:"#FFFFFF"}}>

        <Block>
        <Block >
          <Text style={{fontSize:21,fontWeight:500}}>Total Stock Value</Text>
        
        </Block>

        <Block style={[styles.Space_Between,{marginTop:30}]}>
           <Block>
            <Text style={{fontSize:20}}>Amount</Text>
           </Block>

           <Block>
            <Text style={{fontSize:20}}>₹ 42,300</Text>
           </Block>
        </Block>

        <Block style={[styles.Space_Between,{marginTop:15}]}>
           <Block>
            <Text style={{fontSize:20}}>Weight</Text>
           </Block>

           <Block>
            <Text style={{fontSize:20}}>105 Kgs</Text>
           </Block>
        </Block>


        <Block style={[{marginTop:30},styles.Center]}>
    <Button color='black' >View Details</Button>
    </Block>

        </Block>
       
      </Block>


      <Block style={{marginTop:20, marginBottom:60}}>
      <Block style={[styles.Center]}>
    <Button onPress={toggleModal} color='white' style={{borderWidth:1,width:width*0.9,borderColor:"#C8C8C8",backgroundColor:"#00BC84"}}>
              <Text style={{fontSize:20,fontWeight:400,color:"#fff"}}>
              Add Stock
              </Text>
            
              </Button>
    </Block>

    <Block style={[styles.Center]}>
    <Button color='white' style={{borderWidth:1,width:width*0.9,borderColor:"#E02D2D"}}>
              <Text style={{fontSize:20,fontWeight:400,color:"#E02D2D"}}>
              Remove Stock
              </Text>
            
              </Button>
    </Block>
      </Block>

         
     

       </Block>


       <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
         

          <Block
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "center",
              height: 50,

            }}
          >
            <Ionicons
              onPress={toggleModal}
              name="arrow-back-circle"
              style={{ marginLeft: 10 }}
              size={30}
              color="#65be34"
            />
            <Text style={{ fontSize: 18, fontWeight: 500, marginLeft: 10 }}>
              Add Stock
            </Text>
          </Block>

           <Block style={{marginTop:10,padding:10}}>
           <Block style={{borderWidth:1,borderColor:"#C8C8C8",padding:10,backgroundColor:"orange", marginTop:10,borderRadius:10}}>
    <Block style={styles.Space_Between}>
      <Text style={{fontSize:20,color:"#fff"}}>Enter Stock</Text>

      <Ionicons onPress={addInputField} name="add-circle-outline" size={30} color="white" />
    </Block>

         
     
    </Block>
           </Block>

           <Block center>
    <StockInputField
  inputFields={inputFields}
  setInputFields={setInputFields}
/>
    </Block>
        
        </View>
      </Modal>

        </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"#FFF",
  
    },
    modalContainer: {
      flex: 1
      
      
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