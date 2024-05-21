import React, { useEffect, useRef, useState } from 'react'
import { FlatList,RefreshControl, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Header } from '../../Components/Header/Header';
import HamburgerMenu from '../../Components/HamburgerMenu/HamburgerMenu ';
const {width, height} = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import { useAppContext } from '../../Context/AppContext';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import { useNavigation, useRoute } from '@react-navigation/native';
import logo from "./scrap-img.jpeg"

export const DailyRates = () => {
  const animationRef = useRef(null);
  const navigation = useNavigation();
//   const route = useRoute();
//   const { value } = route.params;
  const {userDetails,update} = useAppContext()
  const [CategoriesData, setCategoriesData] = useState([]);
  const [categoryLength,setCategoryLength] = useState(4)
  const [categorySeetype,setCategorySeetype] = useState(false);
  const [Data, setData] = useState([]);
  const [marketRateLength,setmarketRateLength] = useState(2)
  const [marketRateSeetype,setmarketRateSeetype] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
 
    fetchDailyRates()
    // After fetching data, set refreshing to false
    setRefreshing(false);
  };


  const fetchDailyRates = async () => {
    try {
      const response = await axios.get(`${Base_url}api/daily_rates`); 
      console.log('Fetched plans:', response.data);
      const Data = response.data;
      
      setData(Data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100; // Get last two digits of the year
  
    // Add leading zeros if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year < 10 ? `0${year}` : year;
  
    return `${formattedDay}:${formattedMonth}:${formattedYear}`;
  }

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);

  useEffect(()=>{
  
    fetchDailyRates()
  },[update])

  return (
    <View style={styles.container}>
{/* 
      <Header/> */}
      {/* <StatusBar hidden={false} color={"light"} /> */}
    <ScrollView  refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>

      <Block style={{backgroundColor:"#FFF",padding:10}}>

     

{
  Data && Data.length >0 ? 
  <Block style={{marginTop:10}}>

  
  <Block style={{marginTop:10}}>
  <View style={styles.gridcontainer}>
{Data && Data.reverse().map((el, index) => {

return <Block style={{marginTop:15}} activeOpacity={0.5}  key={index} >
<Block style={{width:width*0.93,borderRadius:15,borderWidth:1,borderColor:"#C8C8C8"}}>

<Block >
    <Block style={{padding:10,backgroundColor:"teal",borderTopLeftRadius:15,borderTopRightRadius:15}}>
    <Text left style={{fontWeight:500,color:"#fff",fontSize:16}}>Price Update : {el.name}</Text>
        </Block> 
        <Block style={{padding:10}}>
        <Text style={{fontSize:14,fontWeight:"bold",color:"grey"}}>Date : {formatDate(el.date)} </Text>
        </Block>

        <ScrollView >
        <Block style={{padding:10}}>
        {el.text.split(',').map((textPart, idx) => (
                       <Text key={idx} style={{fontSize:14,fontWeight:"bold",color:"grey"}}>{textPart} </Text>
                    ))}
        
        </Block>

        </ScrollView>
        <Block style={{marginTop:5,padding:5}}>
            
        </Block>
 
</Block>

</Block>
</Block>


})}
</View>


  </Block>
</Block>

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
<Text>No Rates Availabel For</Text>

</Block>
}

       </Block>


    </ScrollView>
     
        
    </View>
  )
}

const styles = StyleSheet.create({
  gridcontainer: {
    flexDirection: 'row',  // This makes the children align in a row
    flexWrap: 'wrap',  // This allows items to wrap to the next line if there's not enough space
    justifyContent: 'space-between',  // This distributes the items along the row
  },
  gridcolumn: {
    width: '48%',  // You can adjust the width based on your preference
    marginBottom: 10,  // Add some margin between columns
  },
  gridItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  itemText: {
    textAlign: 'center',
  },
  container:{
    flex: 1,
    backgroundColor:"#FFFFFF",
   

  },
  lottie:{
    width:150,
    height:150
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
    row: {
      flexDirection: 'row',
      marginTop:10 // This will create a row of items
    },
    column: {
      flex: 1, // Each column should take up equal space
      alignItems: 'center', // Center items horizontally
      justifyContent:"space-between",
      // Center items vertically
    },
    gridItem: {
      width:170,
      height: 75,
      backgroundColor: '#fff',
       margin:5,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth:2,
      borderColor:"#ea5932",
      borderRadius:10
    },
    itemText:{
      color:"#ea5932",
      fontSize:17
    }
  });