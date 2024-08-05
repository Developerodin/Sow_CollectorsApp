import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../Context/AppContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
export const MarketCard = (props) => {
    const navigation = useNavigation();
   const {Id,Index,Title,Value,Img,setModalVisible,setItemModelData,Category,setCart,Cart} = props
   const [AddStatus,setAddStatus] = useState(false)
   const {CartInStorage,setUpdate,update} = useAppContext();

  const handeViewDetail=()=>{
    navigation.navigate("Order Details")
  }

  const handelAddClick =()=>{
    setItemModelData({
        id:Id,
        index:Index,
        title:Title,
        value:Value,
        image:Img,
        category:Category,
        Fun : ()=>{
          setAddStatus(true)
        }
    })
    setModalVisible(true);
  }
  const handelCartToStorage = async (Data)=>{
    try {
      const cartArrayJSON = JSON.stringify(Data);
      await AsyncStorage.setItem('cart', cartArrayJSON);
      setUpdate((prev)=>prev+1)
      // console.log('Cart saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving cart to AsyncStorage:', error);
   }
  }
  const handelRemoveClick=()=>{
    const updatedCart = CartInStorage.filter(item => item.id !== Id);
    handelCartToStorage(updatedCart);
    setAddStatus(false)
  setCart(updatedCart);
    
  }

  useEffect(()=>{
    if(Cart.length === 0){
      setAddStatus(false)
    }
    //  console.log("Market card=====>",Id,CartInStorage)
    CartInStorage && CartInStorage.map((el)=>{
      if(el.id === Id){
        setAddStatus(true)
      }
      return "";
    })
  },[CartInStorage])
  return (
    <View style={{borderWidth:1,borderColor:"#C8C8C8",padding:10,backgroundColor:"#fff", marginTop:10,borderRadius:5}}>
    <Block  style={{flexDirection:"row"}}>

      <Block style={{flexDirection:"row",alignItems:"center"}}>
        <Block>
        <Image
    
        source={{uri:Img}}
        style={{resizeMode: 'contain',width:40,height:40}}
      />
        </Block>
      </Block>
      

      <Block style={[styles.Space_Between,{width:"80%",marginLeft:10}]}>
        <Block>
        <Block>
        <Text style={{fontSize:14,color:"#424242",fontWeight:"bold"}}>{Title}</Text>
      </Block>

      <Block style={{marginRight:30}}>
          <Text style={{color:"#29BD7F",fontSize:15,fontWeight:600}}>₹ {Value} / KG</Text>
        </Block>
        </Block>
       

        <Block>
          {/* {
            AddStatus ? 
            <Ionicons onPress={handelRemoveClick} name="ios-remove-circle" size={27} color="crimson" />
            :
       
            <AntDesign onPress={handelAddClick} name="edit" size={24} color="#29BD7F" />
          } */}
        <AntDesign onPress={handelAddClick} name="edit" size={24} color="#29BD7F" />
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