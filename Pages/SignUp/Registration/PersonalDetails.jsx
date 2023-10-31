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
// import CheckBox from 'react-native-check-box';

export const PersonalDetails = () => {
    const navigation= useNavigation()
    const [showShopDetails,setShowShopDetails]= useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
      setIsChecked(!isChecked);
    };
    
    const handelPersonalDetailSubmit=()=>{
        // setShowShopDetails(true);
        navigation.navigate("VerificationDetails")
    }

    const handelShopDetails=()=>{
        navigation.navigate("UplodeShopImage")
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
         {/* {
        showShopDetails ?
         <Text style={{fontSize:24,fontWeight:500}}>Enter Shop Details</Text>
         : */}
         {/* <Text style={{fontSize:24,fontWeight:500}}>Enter Details</Text> */}
{/* } */}
        
        {/* <Block style={[styles.Space_Between,{marginTop:30}]}>
            <Text style={{fontSize:14,fontWeight:500}}>Registering As: <Text style={{color:"#EA5932"}}>Scrap Collector</Text> </Text>
            <Text style={{fontSize:14,fontWeight:500,color:"#6096FF"}} >change</Text>
        </Block> */}
         
         </View>
   
       </View>

       {/* {
        showShopDetails ?
        <Block style={{padding:10}}>
          

        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <Entypo name="shop" size={20}  color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter Shop Name</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>

        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <FontAwesome name="vcard-o" size={20} color="black" />
         
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter Udhyam Adhar No.</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>

        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <FontAwesome name="credit-card" size={20} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter GST No..</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>
        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <Ionicons name="location-sharp" size={20} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter Shop Address</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>
       </Block>
        : */}
        <Block style={{padding:10}}>
          

        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <Ionicons name="person" size={18} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Name</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>

        <Block style={{marginTop:40}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <MaterialIcons name="email" size={18} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Mobile Number</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>

        <Block style={{marginTop:40}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <MaterialIcons name="location-city" size={20} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Address</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>

        <Block style={{marginTop:40}}>
            <View>
   
      {/* <CheckBox 
      
      onClick={()=>{
        toggleCheckbox()
      }}
      isChecked={isChecked}
      rightText={"Agree to terms & condition"}
      /> */}
    </View>
        </Block>
       
       </Block>
    {/* } */}

      
        
       <Block style={[styles.Center,{marginTop:30}]}>

       {/* {
            showShopDetails ?
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
                onPress={handelShopDetails}
                >
                <Text
                  style={{
                    fontWeight:500,
                    fontSize: 22,
                    color:"black",
                  }}>
                  Proceed 
                </Text>
                <Feather name="arrow-right" size={24} color="black" style={{marginLeft:10}} />
              </TouchableOpacity>
              : */}
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
                onPress={handelPersonalDetailSubmit}
                >
                <Text
                  style={{
                    fontWeight:500,
                    fontSize: 22,
                    color:"black",
                  }}>
                  Sign Up 
                </Text>
                {/* <Feather name="arrow-right" size={24} color="black" style={{marginLeft:10}} /> */}
              </TouchableOpacity>
          {/* } */}
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