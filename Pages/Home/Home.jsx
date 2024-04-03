import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
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

export const Home = () => {
  const animationRef = useRef(null);
  const navigation = useNavigation();
  const {userDetails,update} = useAppContext()
  const [CategoriesData, setCategoriesData] = useState([]);
  const [categoryLength,setCategoryLength] = useState(4)
  const [categorySeetype,setCategorySeetype] = useState(false);

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

  const handelCategoryLength =  () => {
    setCategorySeetype(true)
    setCategoryLength(CategoriesData.length)
  }
  const handelCategoryLength2 =  () => {
    setCategorySeetype(false)
    setCategoryLength(4)
  }
  const handelSellScrap = ()=>{
    navigation.navigate("Market")
  }
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);

  useEffect(()=>{
    getCategories()
  },[update])

  return (
    <View style={styles.container}>

      <Header/>
    <ScrollView >

      <Block style={{backgroundColor:"#FFF",padding:10}}>

     
      <Block style={{marginTop:20}}>
        <Text style={{fontSize:25,fontWeight:500,color:"#4b4b4b"}}>Hey {userDetails.name} !!</Text>

        <Block style={[{marginTop:10},styles.Space_Between]}>
          <Block>
          <Text style={{fontSize:14,color:"#797979",letterSpacing:1}}>Let’s Save Environment &</Text>
          <Text style={{fontSize:14,color:"#797979",letterSpacing:1,marginTop:5}}>Make Some Money</Text>
          </Block>

          <Block>
          <Button onPress={handelSellScrap} color='white' style={{borderWidth:1,width:120}}>
              <Text style={{fontSize:16,fontWeight:400}}>
              Sell Scraps
              </Text>
            
              </Button>
          </Block>
        </Block>
       
      </Block>

      <Block style={{marginTop:20,borderWidth:1,borderColor:"#DCDCDC",padding:10,backgroundColor:"#96DE20",paddingBottom:20,borderRadius:7,elevation:2}}>

<Block>
  <Block>
    <Text style={{fontSize:16}}>We Buy</Text>
  </Block>
<Block style={[styles.Space_Between,{marginTop:-10}]}>
  <Block>
  <Text style={{fontSize:30,fontWeight:700}}>Over 10 +</Text>
  </Block>
 
  <Block>
          <Button color='white' style={{width:120}}>
              <Text style={{fontSize:16,fontWeight:400}}>
             Scraps
              </Text>
            
              </Button>
          </Block>
</Block>

<Block>
  <Text style={{fontSize:16}}>Types of Scrap</Text>
</Block>
</Block>

</Block>




<Block style={{marginTop:30}}>
        <Text style={{fontSize:16,fontWeight:500}}>Latest from Us</Text>
        
        <Block style={{marginTop:20,flexDirection:"row",justifyContent:"center",alignItem:"center"}}>
  <Image style={{width:"100%",height:200}} 
  source={{ uri: "https://img.freepik.com/premium-vector/mega-sale-discount-banner-set-promotion-with-yellow-background_497837-702.jpg" }} />
</Block>
      </Block>


      <Block style={{marginTop:30}}>

        <Block style={styles.Space_Between}>
        <Text style={{fontSize:16,fontWeight:500}}>Scrap Categories</Text>
        {
          categorySeetype ? <TouchableOpacity onPress={handelCategoryLength2}>
          <Text style={{fontSize:12,fontWeight:500,color:"#00a56a"}}>View Less</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={handelCategoryLength}>
          <Text style={{fontSize:12,fontWeight:500,color:"#00a56a"}}>View All</Text>
          </TouchableOpacity>
        }
       

        
        
        </Block>
     
        
        <Block style={{marginTop:10}}>
        <View style={styles.gridcontainer}>
  {CategoriesData && CategoriesData.map((el, index) => {
    if(index < parseInt(categoryLength)){
      return <View style={styles.gridcolumn} key={index}>
      <View style={styles.gridItem}>
        <Text style={styles.itemText}>{el.name}</Text>
      </View>
    </View>
    }
   
})}
</View>
     

        </Block>
      </Block>


      <Block style={{marginTop:20,borderWidth:1,borderColor:"#DCDCDC",padding:10,backgroundColor:"#3333ef",paddingBottom:20,borderRadius:7,elevation:2}}>

<Block>
  <Block>
    <Text style={{fontSize:16,color:"#fff"}}>We Give</Text>
  </Block>
<Block style={[styles.Space_Between,{marginTop:-10}]}>
  <Block>
  <Text style={{fontSize:30,fontWeight:700,color:"#fff"}}>Max Price</Text>
  </Block>
 
  <Block>
          <Button color='white' style={{width:120}}>
              <Text style={{fontSize:16,fontWeight:400}}>
              Sell Scraps
              </Text>
            
              </Button>
          </Block>
</Block>

<Block>
  <Text style={{fontSize:16,color:"#fff"}}>For Your Scrap</Text>
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
          <Button color='white' style={{borderWidth:1,height:80,borderBottomWidth:5,marginLeft:-3}}>
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