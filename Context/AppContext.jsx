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
  const[update,setUpdate]= useState(0);
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
  useEffect(()=>{
    checklogin()
  },[])

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
    <AppContext.Provider value={{update,setUpdate,toggleDrwerMenu,isDrwerMenuVisible, setDrawerMenuVisible ,selectedMarker, setSelectedMarker,isMarkerModalVisible, setMarkerModalVisible,selectedTabs,setSelectedTabs, isLoggedIn, toggleLogin,modalVisible,setModalVisible,isLoggedIn,setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};