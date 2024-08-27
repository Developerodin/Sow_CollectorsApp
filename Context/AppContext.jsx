import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userDetails,setuserDetails] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTabs,setSelectedTabs]=useState("Home");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isMarkerModalVisible, setMarkerModalVisible] = useState(false);
  const [isDrwerMenuVisible, setDrawerMenuVisible] = useState(false);
  const [Cart,setCart] = useState([]);
  const [update,setUpdate]= useState(0);
  const [CartInStorage,setCartInStorage] = useState([]);
  const [showCartSuggestion,setShowCartSuggestion] = useState(false);
  const [CartTotalAmount,setCartTotalAmount] = useState(0);
  const [CartTotalWeight,setCartTotalWeight] = useState(0);
  const [SelectedAddressFromMap,setSelectedAddressFromMap] = useState({});
  const [favouriteMandi, setFavouriteMandi] = useState(null); 
  const [updateMandi,setUpdateMandi] = useState(0);
  const toggleDrwerMenu = () => {
    setDrawerMenuVisible(!isDrwerMenuVisible);
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const checklogin=async()=>{
    const isLoggedIn = await AsyncStorage.getItem('Auth');
    if(isLoggedIn === true || isLoggedIn === "true"){
        setIsLoggedIn(true);
        getCurrentUser();
    }
    else{
        setIsLoggedIn(false)
        // setModalVisible(true)
    }
  }

  const getCurrentUser=async()=>{
  const user = await AsyncStorage.getItem('userDetails');
  const ParseUser = JSON.parse(user)
  if(user){
    setuserDetails(ParseUser);
      
  }
 
  }

 const getCartFromAsyncStorage = async () => {
  try {
    const cartArrayJSON = await AsyncStorage.getItem('cart') || null;
    if (cartArrayJSON !== null) {
      const cartArray = JSON.parse(cartArrayJSON);
      // console.log('Cart retrieved from AsyncStorage:', cartArray);
      setCartInStorage(cartArray);
      return cartArray;
    } else {
      // console.log('Cart is empty in AsyncStorage');
      setCartInStorage([]);
      return [];
    }
  } catch (error) {
    setCartInStorage([]);
    console.error('Error retrieving cart from AsyncStorage:', error);
  }
 };
  useEffect(()=>{
    checklogin()
  },[])

  useEffect(()=>{
    console.log("Get user details called ==>")
    getCurrentUser();
  },[isLoggedIn])

  useEffect(()=>{
    getCartFromAsyncStorage().then((res)=>{
      let amount = 0;
let weight = 0;
if(res.length > 0){
  
res.forEach(item => {
amount += parseInt(item.totalValue);
weight += parseInt(item.Weight);
});
setCartTotalAmount(amount);
setCartTotalWeight(weight);
setShowCartSuggestion(true)
}

    })
  },[update])

  // useEffect(()=>{
  //   setInterval(()=>{
  //     getCurrentUser()
  //   },1000)
   
    
  // },[])
  

//   useEffect(()=>{
//     console.log("selectedTabs ==>",selectedTabs)
//     if(selectedTabs === "Home"){
//         setModalVisible(true)
//     }
//     else{
//         setModalVisible(false)
//     }
//   },[selectedTabs])

  return (
    <AppContext.Provider value={{updateMandi,setUpdateMandi,userDetails,setuserDetails,SelectedAddressFromMap,setSelectedAddressFromMap,CartInStorage,CartTotalAmount,CartTotalWeight,showCartSuggestion,setShowCartSuggestion,Cart,setCart,update,setUpdate,toggleDrwerMenu,isDrwerMenuVisible, setDrawerMenuVisible ,selectedMarker, setSelectedMarker,isMarkerModalVisible, setMarkerModalVisible,selectedTabs,setSelectedTabs, isLoggedIn, toggleLogin,modalVisible,setModalVisible,isLoggedIn,setIsLoggedIn,favouriteMandi,setFavouriteMandi }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};