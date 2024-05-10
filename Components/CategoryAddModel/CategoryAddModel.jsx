import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { Block, Text, Input, theme,Button } from "galio-framework";

import { Ionicons } from "@expo/vector-icons";

import Modal from "react-native-modal";

import { TextInput } from "@react-native-material/core";
import { Checkbox } from 'galio-framework';
import { FlatList } from 'react-native';

const { width, height } = Dimensions.get("screen");
export const CategoryAddModel = ({
  modalVisible,
  setModalVisible,
  categoriesData,
  setSelectedCategories,
  selectedCategories
}) => {

  const animationRef = useRef(null);


  const handleCategorySelect = (category) => {
    // console.log("Category selected", selectedCategories)
    // selectedCategories.map((el)=>{
    //     console.log(el.name)
    //     return ;
    // })

    setSelectedCategories((prevSelectedCategories) => {
      const isCategorySelected = prevSelectedCategories.includes(category);
      if (isCategorySelected) {
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  useEffect(() => {
    // console.log(ItemModelData)
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  
  };

  const handelClose = () => {
    setModalVisible(false);
    // setFormData(initalValuesForm);
  };

  return (
    <Modal
   
      animationType="slide"
      transparent={true}
      isVisible={modalVisible}
      onSwipeComplete={() => setModalVisible(false)}
      backdropOpacity={0.1}
      onBackdropPress={() => setModalVisible(false)}
      swipeDirection={["right"]}
      style={styles.viewHalf}
    >
      <View style={[styles.centeredView]}>
        <View style={styles.modalView}>
          <Block right style={{ width: width * 0.8 }}>
            <Ionicons
              onPress={handelClose}
              name="close-circle"
              size={24}
              color="#65be34"
            />
          </Block>
          <Text style={{fontSize:17}}>Select Categories</Text>
          <Block
            style={{
             
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "start",
              width: width * 0.9,
              padding: 12,
            }}
          >
            
          <ScrollView style={{ height:300, width: '100%' }}>
  
          {categoriesData.map((category,index) => (
    <View key={index} style={[{marginTop:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}]}>

      <Text>{category.name}</Text>
      <Checkbox
      label=""
      color="info"
      
      initialValue={selectedCategories.some(selectedCategory => selectedCategory.name === category.name)}
        onChange={(el) => {
            
                handleCategorySelect(category)
        }}
      />
      
    </View>
  ))}
 


</ScrollView>
            
          </Block>

          
        </View>
      </View>

    
    </Modal>
  );
};

const styles = StyleSheet.create({
    checkboxContainer:{
        flexDirection:"row"
    },
  viewHalf: {
    justifyContent: "flex-end",
    margin: 0,
  },
  lottie: {
    width: 250,
    height: 250,
  },
  content: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.9,
    height: height - 350,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginTop: 5,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 45,
    fontWeight: "bold",
    color: "#2DA194",
  },
});


