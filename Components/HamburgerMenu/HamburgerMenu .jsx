import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import { useAppContext } from '../../Context/AppContext';
import Modal from "react-native-modal";
const {width, height} = Dimensions.get('window');
const HamburgerMenu = ({ isVisible, onClose }) => {
    const {toggleDrwerMenu,isDrwerMenuVisible, setDrawerMenuVisible} =useAppContext()
  if (!isDrwerMenuVisible) {
    return null;
  }

  // const handelDeleteCustomer=async(id)=>{
  //   console.log("delete Customer",id)
   
  //   try {
  //     const res = await axios.delete(`${Base_url}api/users/${id}`, {
  //       // headers: { "Authorization": `${token}` }
  //     });
  //     console.log("res Customer delete === ==>", res);
  //     setupdate((prev)=>prev+1)
  //   } catch (err) {
  //     console.log("error in Customer delete", err);
  //   }
  // }

  return (
    <View>
      

      <Modal
        isVisible={isDrwerMenuVisible}
        onBackdropPress={toggleDrwerMenu}
        animationIn="slideInLeft" 
        animationOut="slideOutLeft" 
        swipeDirection="left" 
        backdropOpacity={0.5}
        style={{
          justifyContent: 'flex-start',
          margin: 0,
        }}
      >
        {/* Content inside the modal */}
        <View
          style={{
            flex:1,
            backgroundColor: 'white',
            padding: 16,
            height: 300,
            width:200, // Adjust the height as needed,
            borderWidth:1
          }}
        >
          <Text>Hamburger Menu</Text>
          {/* Add your modal content here */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flex:1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 200, // Adjust the width as needed
    backgroundColor: 'black',
    padding: 20,
    minHeight:height
  },
});

export default HamburgerMenu;