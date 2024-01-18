import { Block, Button } from 'galio-framework';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, View,Dimensions,Text, Image } from 'react-native'
const {width, height} = Dimensions.get('window');
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';
export const OrderStatus = ({ route }) => {
    const { status } = route.params;
    const navigation = useNavigation();
    const animationRef = useRef(null);

    const handelSuccessClick = ()=>{
        navigation.navigate("Orders");
    }

    const handelTryAgainClick = () => {
        navigation.navigate("Market");
    }

    useEffect(() => {
        animationRef.current?.play();
    
        // Or set a specific startFrame and endFrame with:
        animationRef.current?.play(10, 80);
      }, []);
  return (
    <View style={styles.container}>

        <Block center >
            {
                status === "success" && <View>
                <LottieView
           ref={animationRef}
           style={styles.lottie}
          
           
           source={require('../.././assets/Animations/Animation - 1695899165253.json')}
           autoPlay={true} loop={true}
         />
              
               
             </View>
            }
        
        {
                status === "fail" && <View>
                <LottieView
           ref={animationRef}
           style={styles.lottie}
          
           
           source={require('../.././assets/Animations/Animation - 1705488976713.json')}
           autoPlay={true} loop={true}
         />
              
               
             </View>
            }

{
    status === "success" && <Block center style={{marginTop:20}}>
    <Text style={{fontSize:18,fontWeight:600,marginTop:20,letterSpacing:1}}>Order Placed Successfully</Text>
                <Button onPress={handelSuccessClick} color='success' style={{marginTop:20}}>Orders</Button>
             </Block>
}

{
    status === "fail" && <Block center style={{marginTop:20}}>
    <Text style={{fontSize:18,fontWeight:600,marginTop:20,letterSpacing:1}}>Order Placed Failed</Text>
                <Button onPress={handelTryAgainClick} color='danger' style={{marginTop:20}}>Try Again</Button>
             </Block>
}
         


        </Block>
         
       

    </View>
    
  )
}


const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"#ffffff",
      padding:10,
      flexDirection:"row",
      justifyContent:"center",
      alignItems: "center",
  
    },
    lottie:{
        width:width*0.9,
        height:width
        },
    text1:{
     fontSize:14,
     color:"#9B9B9B"
    },
    text2:{
        fontSize:24,
        color:"#040404"
    },
    tabBar: {
      flexDirection: 'row',
      // paddingTop: StatusBar.currentHeight,
      padding:10,
      
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
      marginTop:10
      
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