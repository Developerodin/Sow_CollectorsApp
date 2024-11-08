import React, { useEffect, useRef, useState } from 'react'
import { FlatList,RefreshControl, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";

import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { Header } from '../../Components/Header/Header';
import { OrdersCard } from '../../Components/Cards/OrdersCard';
const {width, height} = Dimensions.get('window');
import { TabView, SceneMap } from 'react-native-tab-view';
import { PendingOrderCard } from '../../Components/Cards/PendingOrderCard';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { useAppContext } from '../../Context/AppContext';
import { InCommingOrderCard } from '../../Components/Cards/InCommingOrderCard';
import { RejectedOrderCard } from '../../Components/Cards/RejectedOrderCard';



export const Orders = () => {
  const {  userDetails,update } = useAppContext();
  const [index, setIndex] = useState(0);
  const [orders, setOrders] = useState([]);
  const [InCommingOrders, setInCommingOrders] = useState([]);
  const [pendingOrders,setPendingOrders] = useState([]);
  const [completedOrders,setCompletedOrders] = useState([]);
  const [rejectedOrders,setRejectedOrders] = useState([]);
  const [InCommingpendingOrders,setInCommingPendingOrders] = useState([]);
  const [InCommingcompletedOrders,setInCommingCompletedOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Call your functions here
    getOrders();
    getInCommingOrders();
    // After fetching data, set refreshing to false
    setRefreshing(false);
  };

  const handleIndexChange = (newIndex) => setIndex(newIndex);

  const getOrders = async () => {
    try {
      const response = await axios.get(`${Base_url}api/b2b_orders/from/${userDetails._id}`);
      const data = response.data;
      const Orders = data.orders;
  
      
      Orders.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      console.log("All Orders ==>", Orders);
      setOrders(Orders);
  
      const PendingOrders = Orders.filter((el) => {
        return (el.status === "pending" || el.status === "in-progress" || el.status === "canceled") && el.from !== null && el.to !== null;
      });
      const CompletedOrders = Orders.filter((el) => {
        return el.status === "completed" && el.from !== null && el.to !== null;
      });
      const RejectedOrders = Orders.filter((el) => {
        return el.status === "rejected" && el.from !== null && el.to !== null;
      });
  
      setPendingOrders(PendingOrders);
      setCompletedOrders(CompletedOrders);
      setRejectedOrders(RejectedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  const getInCommingOrders = async () => {
    try {
      const response = await axios.get(`${Base_url}api/b2b_orders/to/${userDetails._id}`);
      const data = response.data;
      const Orders = data.orders;
  
      // Sort orders by date and time in descending order
      Orders.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      console.log("Incoming Orders ==>", Orders);
      setInCommingOrders(Orders);
  
      const PendingOrders = Orders.filter((el) => {
        return el.status === "pending"  && el.from !== null && el.to !== null;
      });
      const CompletedOrders = Orders.filter((el) => {
        return el.status === "completed" && el.from !== null && el.to !== null;
      });
      const RejectedOrders = Orders.filter((el) => {
        return el.status === "rejected" && el.from !== null && el.to !== null;
      });
  
      setRejectedOrders(RejectedOrders);
      setInCommingPendingOrders(PendingOrders);
      setInCommingCompletedOrders(CompletedOrders);
    } catch (error) {
      console.error('Error fetching incoming orders:', error);
    }
  };

  const ZeroRoute = () => (
    <ScrollView style={{flex:1}}>
     
      <Block style={{padding:10,marginBottom:60}}>
           {
           InCommingpendingOrders && InCommingpendingOrders.length>0 ? InCommingpendingOrders.map((el,index)=>{
              return    <InCommingOrderCard key={index} data={ el.from && el} />
            })
            :
            <Block center style={{marginTop:40}}>
            <Image
     source={require('../../assets/media/5-dark.png')}
     style={{
       width: 300,
       height: 300,
       marginRight: 10,
     }}
   />
           
         </Block>
           }
        

          </Block>
          </ScrollView>
  );
  const FirstRoute = () => (
    <ScrollView style={{flex:1}}>
     
      <Block style={{padding:10,marginBottom:60}}>
           {
           pendingOrders && pendingOrders.length > 0 ?pendingOrders.map((el,index)=>{
              return    <PendingOrderCard key={index} data={ el.from && el} />
            })
            :
            <Block center style={{marginTop:40}}>
               <Image
        source={require('../../assets/media/5-dark.png')}
        style={{
          width: 300,
          height: 300,
          marginRight: 10,
        }}
      />
              
            </Block>
           }
        

          </Block>
          </ScrollView>
  );
  const SecondRoute = () => (
    <ScrollView style={{flex:1}}>
     
      <Block style={{padding:10,marginBottom:60}}>
           
           {
            completedOrders && completedOrders.length>0 ? completedOrders.map((el,index)=>{
              return  <OrdersCard key={index} data={el.from && el} />
            })
            :
            <Block center style={{marginTop:40}}>
            <Image
     source={require('../../assets/media/5-dark.png')}
     style={{
       width: 300,
       height: 300,
       marginRight: 10,
     }}
   />
           
         </Block>
           }
          
          
          </Block>
          </ScrollView>
  );

   const ThirdRoute = () => (
    <ScrollView style={{flex:1}}>
      <Block style={{padding:10,marginBottom:60}}>
            {
            rejectedOrders && rejectedOrders.length>0 ? rejectedOrders.map((el,index)=>{
              return  <RejectedOrderCard key={index} data={el.from && el} />
            })
            :
            <Block center style={{marginTop:40}}>
            <Image
      source={require('../../assets/media/5-dark.png')}
      style={{
        width: 300,
        height: 300,
        marginRight: 10,
      }}
    />
           
          </Block>
            }
          </Block>
          </ScrollView>
  );



  const routes = [
    {key:"zero",title:"Purchase"},
    { key: 'first', title: 'Sell' },
    // { key: 'second', title: 'Completed' },
    // { key: 'third', title: 'Rejected' },
  ];

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View>
     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, marginLeft: 30, marginRight: 30 }}>
    <Text style={{ fontSize: 22, fontWeight: 'bold'  }}>
      Your Orders
    </Text>
    <Ionicons name="filter" size={26} color="#000" />
  </View>

  <View style={styles.tabContainer}>
      <View style={[styles.tab, styles.leftTab]}>
        <Text style={styles.tabText}>Upcoming</Text>
      </View>
      <View style={[styles.tab, styles.rightTab]}>
        <Text style={{fontSize: 16,
      color: '#fff',}}>Previous</Text>
      </View>
    </View>
  
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
        const isTabActive = i === index;
        const tabBackgroundColor = isTabActive ? '#000' : '#F4F4F4';
        const textColor = isTabActive ? '#65C5C4' : '#000';
        const borderWidth = isTabActive ? 2 : 0;
        const borderColor = isTabActive ? '#239456' : 'grey'; 
            
        const tabStyle = [
          styles.tabItem,
          { borderRadius:30,padding:10 ,backgroundColor:tabBackgroundColor},
        ];

        const textStyles = [
         
          { color: textColor,fontWeight:"bold",fontSize:14 },
        ];

        return (
          <TouchableOpacity
          activeOpacity={0.8}
            key={i}
            style={tabStyle}
            onPress={() => setIndex(i)}>
            <Animated.Text style={[textStyles,{fontSize:13}]}>{route.title}</Animated.Text>
          </TouchableOpacity>
        );
      })}
      </View>
      </View>
    );
  };

  const renderScene = SceneMap({
    zero: ZeroRoute,
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });


 useEffect(()=>{
  getOrders();
  getInCommingOrders()
 },[update])


  return (
     <ScrollView
      contentContainerStyle={{ flex: 1 ,backgroundColor:"#ffffff"}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
    {/* <Header/> */}
   <Block style={{marginTop:30}}></Block>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
    />
   
    
    
    </ScrollView>
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
    backgroundColor:"#fff",
    width: '60%',
    alignSelf: 'center',
    
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
    borderBottomWidth: 1,
    borderColor: 'transparent', 
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

    tabContainer: {
      flexDirection: 'row',
      width: '100%',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      overflow: 'hidden',
      alignSelf: 'center',
      marginTop: 20
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
    },
    leftTab: {
      backgroundColor: '#fff',
      borderRightWidth: 1,
      borderRightColor: '#ddd',
    },
    rightTab: {
      backgroundColor: '#000',
    },
    tabText: {
      fontSize: 16,
      color: '#000',
    },

  });