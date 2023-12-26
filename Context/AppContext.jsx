import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTabs,setSelectedTabs]=useState("Home");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isMarkerModalVisible, setMarkerModalVisible] = useState(false);
  const [isDrwerMenuVisible, setDrawerMenuVisible] = useState(false);
  const [Cart,setCart] = useState([]);
  const[update,setUpdate]= useState(0);
  const [CartInStorage,setCartInStorage] = useState([]);
  const [showCartSuggestion,setShowCartSuggestion] = useState(false);
  const [CartTotalAmount,setCartTotalAmount] = useState(0);
    const [CartTotalWeight,setCartTotalWeight] = useState(0);
    const [SelectedAddressFromMap,setSelectedAddressFromMap] = useState({});
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
        
    }
    else{
        setIsLoggedIn(false)
        // setModalVisible(true)
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
    <AppContext.Provider value={{SelectedAddressFromMap,setSelectedAddressFromMap,CartInStorage,CartTotalAmount,CartTotalWeight,showCartSuggestion,setShowCartSuggestion,Cart,setCart,update,setUpdate,toggleDrwerMenu,isDrwerMenuVisible, setDrawerMenuVisible ,selectedMarker, setSelectedMarker,isMarkerModalVisible, setMarkerModalVisible,selectedTabs,setSelectedTabs, isLoggedIn, toggleLogin,modalVisible,setModalVisible,isLoggedIn,setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};