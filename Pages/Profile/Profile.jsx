import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput,Share } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Header } from '../../Components/Header/Header';
import { AntDesign } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { ProfileCard } from '../../Components/Cards/ProfileCard';
import { FontAwesome } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';  
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useAppContext } from '../../Context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileLogo from "../../assets/profileMenu.png"
import { ThemeData } from '../../Theme/Theme';
export const Profile = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [userDetails,setuserDetails] = useState({})
  const {CartInStorage,CartTotalAmount,CartTotalWeight,showCartSuggestion,setShowCartSuggestion} = useAppContext()
  const ProfileTabs=[
    
    // {icon:<FontAwesome name="address-book" size={24} color="#2dd36f" />,title:"Manage Address",link:"Address",color:"dark"},
    {icon:<AntDesign name="idcard" size={24} color="#65C5C4" />,title:"Kyc",link:"Update Kyc"},
    {icon:<FontAwesome name="history" size={24} color="#65C5C4" />,title:"Order History",link:"Orders"},
    {icon:<MaterialIcons name="pending-actions" size={24} color="#65C5C4" />,title:"Pending Orders",link:"Orders"},
    {icon:<FontAwesome name="building" size={24} color="#65C5C4" />,title:"About Comapny",link:"About Company"},
    {icon:<AntDesign name="infocirlce" size={24} color="#65C5C4" />,title:"Terms & Conditions",link:"Terms and Condition"},
    {icon:<MaterialIcons name="privacy-tip" size={24} color="#65C5C4" />,title:"Privacy Policy",link:"Privacy Policy"},
   
    // {icon:<Foundation name="torso-business" size={28} color="#4854e0" />,title:"Upgrade to business profile",link:"Upgrade Profile"},

  ]

  const getCurrentUser=async()=>{
    const user = await AsyncStorage.getItem('userDetails');
    const ParseUser = JSON.parse(user)
    if(user){
      setuserDetails(ParseUser);
    }
   
    }
 


  const handeClick=(link)=>{
    if(link==="About Company"){
      const Data={
        url:"https://scraponwheels.com/"
        }
      navigation.navigate("Scrap On Wheels", { Data });
      return 
    }
     
    if(link==="Terms and Condition"){
      const Data={
        url:"https://www.scraponwheels.com/terms.html"
        }
      navigation.navigate("Scrap On Wheels", { Data });
      return 
    }

    if(link==="Privacy Policy"){
      const Data={
        url:"https://www.scraponwheels.com/privacy.html"
        }
      navigation.navigate("Scrap On Wheels", { Data });
      return 
    }

    navigation.navigate(link)
  }
  const handelSellScrap =()=>{
    navigation.navigate("Schedule Pickup")
 }
 const handelCloseCartInfo =()=>{
  if(CartInStorage.length > 0){
    setTimeout(()=>{
      setShowCartSuggestion(true);
    },5000)
  }
  setShowCartSuggestion(false);
 
 }

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Hey there ! I've been using this app, and it's been great. I thought you might like it too. If you sign up using my referral code, we both get 50 rupee credits in our wallets. Here's my referral code: [ICX59908]. Give it a try",
      });
      if (result.action === Share.sharedAction) {
        // Share was successful
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        // Share was dismissed/cancelled
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  const handelLogout=async()=>{
   console.log("Log out");
   try {
    await AsyncStorage.removeItem("userDetails");
    await AsyncStorage.setItem("Auth",'false');
    console.log('AsyncStorage cleared successfully');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
  // navigation.navigate("Login")
  navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
  }

  const handelRateAppliction=()=>{
    console.log("handel Rate Appliction")
  }

  const handelDeleteAccount=()=>{
    console.log("Delete Account")
  }

  const showImagePicker = async (sourceType) => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access the gallery is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      sourceType: sourceType,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  useEffect(()=>{
    getCurrentUser();
  },[])

  return (
    <View style={styles.container}>
    {/* <Header/> */}
    <StatusBar  style="dark" hidden={true}/>
    <ScrollView >
     <Block style={{marginTop:0,backgroundColor:ThemeData.containerBackgroundColor}}>
    
        <Block style={{borderWidth:1,backgroundColor: ThemeData.backgroundColor,marginTop:0}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 10, marginLeft: 10, }}>
  <Ionicons name="arrow-back" size={24} color={ThemeData.activeColor}/>
</TouchableOpacity>

          <Block center style={[{position:'realtive',width:80,height:80,borderRadius:500,marginTop:30,borderRadius:100,backgroundColor:ThemeData.containerBackgroundColor,elevation:2}]}>
         {
          image === null &&  <Image style={{resizeMode: 'contain',width:'100%',height:'100%',borderRadius:100}}   source={ProfileLogo} />
         }
         
         
          {image && <Image source={{ uri: image }} style={{resizeMode: 'contain',width:100,height:100,borderRadius:100}} />}
          
          
          <TouchableOpacity activeOpacity={0.8} onPress={() => showImagePicker('camera')} center style={{width:25,height:25,borderRadius:100,position:'absolute',bottom:2,right:5,display:'flex',justifyContent:"center",alignItems:'center',backgroundColor:'#65C5C4'}}>
          <Feather name="edit-2" size={14}  color={ThemeData.textColor} />
          </TouchableOpacity>
          
          </Block>
          

           <Block  style={{marginTop:20,marginBottom:30}}>
            <Text center style={{fontSize:25,fontWeight:"500",color: ThemeData.activeColor}}>{userDetails && userDetails.name} </Text>
            
            <Block center style={{padding:5,borderRadius:20,marginTop:20,paddingHorizontal:20,display:'flex',justifyContent:"center",alignItems:'center',backgroundColor: ThemeData.color}} >
           {/* <Button onPress={() => showImagePicker('camera')} color='#0F2C59'>
           ,border
           
            <Text style={{color:"#fff"}}>
           
            Edit {" "} 
            <Feather name="edit-2" size={14}  color="#fff" />
            </Text>
           </Button> */}

           <Text style={{color: ThemeData.textColor}}>
            {/* {userDetails && userDetails.role} */}
            Wholesaler
            </Text>
           </Block>
           </Block>
        </Block>


        {/* <Block style={{marginTop:20,borderWidth:1,borderColor:"#DCDCDC",padding:15,backgroundColor:"#96DE20",paddingBottom:20,borderRadius:7,elevation:2}}>

<Block>
  <Block>
    <Text style={{fontSize:16}}>Total Money Earned</Text>
  </Block>
<Block style={[styles.Space_Between,{marginTop:10}]}>
  <Block>
  <Text style={{fontSize:30,fontWeight:700}}>₹ 56,569</Text>
  </Block>
 
</Block>

</Block>

</Block> */}

        <Block style={{marginTop:10,padding:20}}>
          {
            ProfileTabs.map((el,index)=>{
              return (
                <ProfileCard key={index} Link={el.link} Title={el.title} Img={el.icon} Fun={()=>handeClick(el.link)}/>
              )
            })
          }

<ProfileCard  Title={"Share App"} Img={<Entypo name="share" size={24} color={ThemeData.color} />}  Fun={handleShare}/>
<ProfileCard  Title={"Rate the app"} Img={<AntDesign name="star" size={24} color={ThemeData.color} /> } Fun={handelRateAppliction}/>
<ProfileCard  Title={"Delete account"} Img={<AntDesign name="delete" size={24} color={ThemeData.color} /> } Fun={handelDeleteAccount}/>
<Block style={{marginBottom:10}}>
<ProfileCard  Title={"Logout"} Img={<AntDesign name="logout" size={24} color={ThemeData.color} /> } Fun={handelLogout}/> 
  </Block>       
   
       
        </Block>
       
     </Block>
     </ScrollView >

  </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
   backgroundColor:"#F1F1F1"

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
    color:ThemeData.textColor,
    fontSize: 20,
    marginTop: 10,
  
    textAlign: 'left',
    lineHeight: 23,
    letterSpacing:0.3
  },
  title: {
    color: ThemeData.textColor,
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