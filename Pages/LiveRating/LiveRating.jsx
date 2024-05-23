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
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
export const LiveRating = () => {
  const animationRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { value } = route.params;
  const {userDetails,update} = useAppContext()
  const [CategoriesData, setCategoriesData] = useState([]);
  const [categoryLength,setCategoryLength] = useState(4)
  const [categorySeetype,setCategorySeetype] = useState(false);
  const [Data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [marketRateLength,setmarketRateLength] = useState(2)
  const [marketRateSeetype,setmarketRateSeetype] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Call your functions here
    getCategories();
    fetchMarketRates()
    // After fetching data, set refreshing to false
    setRefreshing(false);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${Base_url}api/category`);
      setCategoriesData(response.data);
      console.log("Categories all", response.data)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handelMarketRateLength =  () => {
    setmarketRateSeetype(true)
    setmarketRateLength(CategoriesData.length)
  }
  const handelMarketRateLength2 =  () => {
    setmarketRateSeetype(false)
    setmarketRateLength(2)
  }
  const handelCategoryPress= ()=>{
    if(userDetails.registerAs === "Collectors"){
      navigation.navigate("Market");
      return
    }
    
    navigation.navigate("My Rates")
  }

  const fetchMarketRates = async () => {
    try {
      const response = await axios.get(`${Base_url}api/market_rates`); 
      console.log('Fetched plans:', response.data);
      const Data = response.data;
      const res = Data.filter((el,index)=>el.category === value)
      setData(res);
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
  const filterData = () => {
    if (searchQuery === '') {
      setFilteredData(Data);
    } else {
      const filtered = Data.filter(el =>
        el.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const sortData = () => {
    let sortedData = [...filteredData];
    if (sortOrder === 'lowToHigh') {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      sortedData.sort((a, b) => b.price - a.price);
    }
    setFilteredData(sortedData);
  };

  const handleSortPress = () => {
    if (sortOrder === null || sortOrder === 'highToLow') {
      setSortOrder('lowToHigh');
    } else {
      setSortOrder('highToLow');
    }
  };

  const handleResetPress = () => {
    setSearchQuery('');
    setSortOrder(null);
    setFilteredData(Data);
  };

  useEffect(() => {
    sortData();
  }, [sortOrder]);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);
  useEffect(() => {
    filterData();
  }, [searchQuery, Data]);

  useEffect(()=>{
    getCategories();
    fetchMarketRates()
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

      <Block style={{marginTop:10,flexDirection:"row",justifyContent:"left",alignItems:"center"}}>

        <Block>
        <TextInput
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10,width:width*0.7,borderRadius:20 }}
      />
        </Block>
      
      <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginLeft:10}}>
      <TouchableOpacity onPress={handleSortPress} style={{padding:6,backgroundColor:"teal",borderRadius:12,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        {/* <Text style={{fontSize:16,marginRight:10,color:"#fff"}}>Sort</Text> */}
      <FontAwesome5 name="sort" size={22} color="#fff" />
</TouchableOpacity>
<TouchableOpacity onPress={handleResetPress} style={{marginLeft:10,marginRight:20,padding:6,backgroundColor:"teal",borderRadius:12,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        {/* <Text style={{fontSize:16,marginRight:10,color:"#fff"}}>Reset</Text> */}
        <Feather name="refresh-ccw" size={22} color="#fff" />
</TouchableOpacity>

      </Block>
    
       
        
      </Block>

{
  Data && Data.length >0 ? 
  <Block style={{marginTop:20}}>

  
  <Block >
  <View style={styles.gridcontainer}>
{filteredData && filteredData.map((el, index) => {

return <TouchableOpacity style={{marginTop:20}} onPress={handelCategoryPress} activeOpacity={0.5}  key={index} >
<Block style={{width:width*0.93,borderRadius:10,padding:0,borderWidth:1,borderColor:"#C8C8C8",flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
<Block> 
<Image
source={logo}
style={{resizeMode: 'cover',width:50,height:50,borderTopLeftRadius:10,borderBottomLeftRadius:10}}
/>
</Block>
<Block style={{width:"60%",marginLeft:20}}> 
  <Text style={{fontWeight:500,color:"#002379",fontSize:14}}>{el.name.toUpperCase()}</Text>
  <Text style={{fontSize:12}}>{el.category}</Text>
  <Text style={{fontSize:11}}>{formatDate(el.date)}  {el.time} </Text>
</Block>
<Block> 
  <Text style={{fontWeight:500,color:"#002379",fontSize:14}}>₹ {el.price}</Text>
</Block>
</Block>
</TouchableOpacity>


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
<Text>No Rates Availabel For {value}</Text>

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