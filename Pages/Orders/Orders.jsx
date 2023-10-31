import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";

import { AntDesign } from '@expo/vector-icons';
import { Header } from '../../Components/Header/Header';
import { OrdersCard } from '../../Components/Cards/OrdersCard';
const {width, height} = Dimensions.get('window');
import { TabView, SceneMap } from 'react-native-tab-view';
import { PendingOrderCard } from '../../Components/Cards/PendingOrderCard';
const FirstRoute = () => (
  <ScrollView style={{flex:1}}>
   
    <Block style={{padding:10,marginBottom:60}}>
         
         <PendingOrderCard />
           
         <PendingOrderCard />
        
        
        </Block>
        </ScrollView>
);
const SecondRoute = () => (
  <ScrollView style={{flex:1}}>
   
    <Block style={{padding:10,marginBottom:60}}>
         
         <OrdersCard />
           
         <OrdersCard />
         <OrdersCard />
        
        </Block>
        </ScrollView>
);
export const Orders = () => {
  const [index, setIndex] = useState(0);
  const handleIndexChange = (newIndex) => setIndex(newIndex);
  const routes = [
    { key: 'first', title: 'Pending' },
    { key: 'second', title: 'Completed' },
  ];

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
        const isTabActive = i === index;
        const tabBackgroundColor = isTabActive ? '#F3F3F3' : '#F3F3F3';
        const textColor = isTabActive ? 'black' : 'grey';
        const borderWidth = isTabActive ? 2 : 0;
        const borderColor = isTabActive ? 'blue' : 'grey';

        const tabStyle = [
          styles.tabItem,
          { borderRadius:0,borderBottomWidth:borderWidth,borderColor:borderColor },
        ];

        const textStyles = [
         
          { color: textColor,fontWeight:"bold",fontSize:16 },
        ];

        return (
          <TouchableOpacity
          activeOpacity={0.8}
            key={i}
            style={tabStyle}
            onPress={() => setIndex(i)}>
            <Animated.Text style={[textStyles,{fontSize:20}]}>{route.title}</Animated.Text>
          </TouchableOpacity>
        );
      })}
      </View>
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  return (
    <View style={styles.container}>
    <Header/>
   
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
    />
   
    
    
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#ffffff",

  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: StatusBar.currentHeight,
    padding:10,
    backgroundColor:"#f1f1f1"
    
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