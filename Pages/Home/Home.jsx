import React, { useEffect, useRef, useState } from 'react'
import { FlatList,RefreshControl, SafeAreaView, StyleSheet,ScrollView,ImageBackground, View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Header } from '../../Components/Header/Header';
import HamburgerMenu from '../../Components/HamburgerMenu/HamburgerMenu ';
const {width, height} = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import { useAppContext } from '../../Context/AppContext';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import { useNavigation } from '@react-navigation/native';
import logo from "./scrap-img.jpeg"
import frame1 from "./Frame1.png";
import frame2 from "./Frame2.png";
import usePushNotifications from "../../usePushNotifications";
import LiveRates from '../../Components/Cards/LiveRates';
import EvilIcons from "@expo/vector-icons/EvilIcons";

export const Home = () => {
  const animationRef = useRef(null);
  const navigation = useNavigation();
  const {userDetails,update} = useAppContext()
  const [CategoriesData, setCategoriesData] = useState([]);
  const [categoryLength,setCategoryLength] = useState(4)
  const [categorySeetype,setCategorySeetype] = useState(false);
  
  const [Data, setData] = useState([]);
  const [marketRateLength,setmarketRateLength] = useState(2)
  const [marketRateSeetype,setmarketRateSeetype] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  const onRefresh = () => {
    setRefreshing(true);
    // Call your functions here
    getCategories();
    fetchMarketRates()
    // After fetching data, set refreshing to false
    setRefreshing(false);
  };

  const getAllData = async () => {
    try {
      const response = await axios.get(`${Base_url}api/mandi_rates/all-data`);
      const allData = response.data;
  
      // Filter out entries where mandi is null and get unique categories
      const validCategories = new Set();
      allData.forEach(item => {
        if (item.mandi) {
          item.mandi.categories.forEach(category => {
            validCategories.add(category);
          });
        }
      });
  
      return Array.from(validCategories);
    } catch (error) {
      throw error.response.data;
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${Base_url}api/category`);
      const allCategories = response.data;
  
      const validCategories = await getAllData();
      
      const filteredCategories = allCategories.filter(category => validCategories.includes(category.name));
  
      setCategoriesData(filteredCategories);
      return filteredCategories;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  

  const handelCategoryLength =  () => {
    setCategorySeetype(true)
    setCategoryLength(CategoriesData.length)
  }
  const handelCategoryLength2 =  () => {
    setCategorySeetype(false)
    setCategoryLength(4)
  }
  const handelMarketRateLength =  () => {
    setmarketRateSeetype(true)
    setmarketRateLength(CategoriesData.length)
  }
  const handelMarketRateLength2 =  () => {
    setmarketRateSeetype(false)
    setmarketRateLength(2)
  }
  const handelSellScrap = ()=>{
    navigation.navigate("Trading")
  }

  const handelDailyRates = ()=>{
    navigation.navigate("Daily Rates")
  }

  const handelCategoryPress= (categorie)=>{
    navigation.navigate("Live Market Rates", { value: categorie })
  }

  const handelRatePress= ()=>{
    navigation.navigate("Live Rates")
  }

  const fetchMarketRates = async () => {
    try {
      const response = await axios.get(`${Base_url}api/market_rates`); 
      // console.log('Fetched plans:', response.data);
      setData(response.data);
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
    getCategories();
    fetchMarketRates()
  },[update])

  return (
    <View style={styles.container}>

      <Header/>
      <StatusBar hidden={false} color={"light"} />
    <ScrollView  refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>

      <Block style={{backgroundColor:"#FFF",padding:10}}>
         
    
     
      <Block style={{marginTop:20}}>
        <Text style={{fontSize:25,fontWeight:500,color:"#4b4b4b"}}>Hey {userDetails && userDetails.name}</Text>

        <Block style={[{marginTop:10},styles.Space_Between]}>
          <Block>
          <Text style={{fontSize:13,color:"black",letterSpacing:1}}>Let’s Save Environment &</Text>
          <Text style={{fontSize:13,color:"black",letterSpacing:1,marginTop:5}}>Make Some Money</Text>
          </Block>

          <Block>
          <Button onPress={handelSellScrap} color='white' style={{borderWidth:1,width:120,borderColor:"#239456"}}>
              <Text style={{fontSize:16,fontWeight:600,color:"#239456"}}>
              Sell Scraps
              </Text>
            
              </Button>
          </Block>
        </Block>
       
      </Block>  
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LiveRates />
        <TouchableOpacity
        onPress={handelRatePress}
        // style={{
        //   backgroundColor: '#239456',
        //   width: 150,
        //   height: 38,
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   borderRadius: 5,
        //   marginTop: 10,
        // }}
      >
         <EvilIcons
                name="arrow-down"
                size={32}
                color="#239456"
                style={{ marginTop: 10 }}
              />
      </TouchableOpacity>
    </View>

       
      
      <Block style={{marginTop:10,width:width*0.93}}>
      <Block>
          <Image source={frame2} style={{width:width*0.93,height:115,borderRadius:7}} />
        </Block>
<Block style={{position:"absolute",top:10}}>

<Block style={{marginLeft:15,width:width*0.8}}>
<Block>
    <Text style={{fontSize:14,color:"#fff"}}>Check Out</Text>
  </Block>

<Block style={[styles.Space_Between]}>
  <Block>
  <Text style={{fontSize:28,fontWeight:700,color:"#fff"}}>Daily Markets </Text>
  </Block>
 
 
</Block>

<Block style={[styles.Space_Between,{marginTop:-15}]}>
  <Block>
  <Text style={{fontSize:14,color:"#fff"}}>For Your Scrap</Text>
  </Block>


  <Block>
          <Button onPress={handelDailyRates} color='#239456' style={{width:70,height:38}}>
              <Text style={{fontSize:16,fontWeight:400,color:"#fff"}}>
             View
              </Text>
            
              </Button>
          </Block>
</Block>

</Block>
  


</Block>

     </Block>


     




<Block style={{marginTop:20}}>
     
      </Block>


      <Block style={{marginTop:10}}>
  <Block style={styles.Space_Between}>
    <Text style={{fontSize:16,fontWeight:500}}>Live Scrap Rates</Text>
    {categorySeetype ? (
      <TouchableOpacity onPress={handelCategoryLength2}>
        <Text style={{fontSize:12,fontWeight:500,color:"#239456"}}>View Less</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={handelCategoryLength}>
        <Text style={{fontSize:12,fontWeight:500,color:"#239456"}}>View All</Text>
      </TouchableOpacity>
    )}
  </Block>
  
  <Block style={{marginTop:10}}>
    <View style={styles.gridcontainer}>
      {CategoriesData && CategoriesData.map((el, index) => {
        if(index < parseInt(categoryLength)){
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handelCategoryPress(el.name)}
              style={styles.gridcolumn}
              key={index}
            >
              <View style={styles.gridItem}>
                <Text style={styles.itemText}>{el.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  </Block>
</Block>


      <Block style={{marginTop:20,width:width*0.93}}>
      <Block>
          <Image source={frame1} style={{width:width*0.93,height:115,borderRadius:7}} />
        </Block>
<Block style={{position:"absolute",top:10}}>

<Block style={{marginLeft:15,width:width*0.8}}>
<Block>
    <Text style={{fontSize:14,color:"#fff"}}>We Buy</Text>
  </Block>

<Block style={[styles.Space_Between]}>
  <Block>
  <Text style={{fontSize:28,fontWeight:700,color:"#fff"}}>Over 10 +</Text>
  </Block>
 
 
</Block>

<Block style={[styles.Space_Between,{marginTop:-15}]}>
  <Block>
  <Text style={{fontSize:14,color:"#fff"}}>Types of Scrap</Text>
  </Block>


  <Block>
          <Button onPress={handelSellScrap} color='#96DE20' style={{width:70,height:38}}>
              <Text style={{fontSize:16,fontWeight:400,color:"#145431"}}>
              Scraps
              </Text>
            
              </Button>
          </Block>
</Block>

</Block>
  


</Block>

     </Block>



    



      

         
      <Block style={{marginBottom:60,marginTop:30,borderWidth:2,padding:20,backgroundColor:"#FFFFFF",paddingBottom:60,borderRadius:10}}>

<Block style={styles.Space_Between}>
  <Block style={{height:200}}>
    <Text style={{fontSize:30,fontWeight:500}}>Trash</Text>
    <Text style={{fontSize:30,fontWeight:500,color:"grey"}}>ko kro</Text>
    <Text style={{fontSize:30,fontWeight:500}}>Cash</Text>
    <Block style={{marginTop:10}}>
          <Button onPress={handelSellScrap} color='white' style={{borderWidth:1,height:80,borderBottomWidth:5,marginLeft:-3}}>
              <Text style={{fontSize:18,fontWeight:400}}>
                 Within
              </Text>
              <Text style={{fontSize:20,fontWeight:500,}}>
                 24 Hours
              </Text>
            
              </Button>
          </Block>
  </Block>

  <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
  <LottieView
      ref={animationRef}
      style={styles.lottie}
     
      
      source={require('../../assets/Animations/Animation - 1695806708311.json')}
      autoPlay={true} loop={true}
    />
  </Block>
</Block>

       </Block>
       <Text style={{fontSize:25,fontWeight:500,color:"#4b4b4b",textAlign:'center'}}>Hey {userDetails && userDetails.name}</Text>
      

       </Block>


    </ScrollView>
     
        
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
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
    borderWidth:1

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
      height: 40,
      backgroundColor: '#fff',
       margin:5,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth:1,
      borderColor:"#239456",
      borderRadius:5
    },
    itemText:{
      color:"#239456",
      fontSize:17
    }
  });