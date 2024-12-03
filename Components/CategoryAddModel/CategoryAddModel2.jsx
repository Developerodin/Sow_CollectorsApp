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
import { TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("screen");
export const CategoryAddModel2 = ({
  modalVisible,
  setModalVisible,
  categoriesData,
  setSelectedCategories,
  selectedCategories,
  handelComplete
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
    handelData()
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  
  };

  const handelClose = () => {
    setSelectedCategories([])
    setModalVisible(false);
    // setFormData(initalValuesForm);
  };

  const handelData  = ()=>{
    // console.log("Data of category ==> add",categoriesData)
  }


  // console.log("selectedCategories===>",selectedCategories)
  // console.log("Data of category ==> add",categoriesData)
  return (
    <Modal
   
      animationType="slide"
      transparent={true}
      isVisible={modalVisible}
      onSwipeComplete={() => setModalVisible(false)}
      backdropOpacity={0.1}
      onBackdropPress={() => setModalVisible(false)}
      swipeDirection={["down"]}
      style={styles.viewHalf}
    >
      <View >
        <View style={styles.modalView}>
          <Block right style={{ width: width * 0.8 }}>
            <Ionicons
              onPress={handelClose}
              name="close-circle"
              size={26}
              color="#000"
            />
          <Text style={{fontSize:18}}>Select Categories </Text>
          </Block>
          <Block
            style={{
             
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "start",
              width: width * 0.9,
              padding: 12,
            }}
          >
            
          <ScrollView style={{ marginTop: 0,height:270,paddingBottom:5 }}>
  
          <View style={styles.categoriesContainer}>
          {categoriesData && categoriesData.map((category, index) => (
  <TouchableOpacity
    key={index}
    style={[
      styles.categoryContainer,
      Array.isArray(selectedCategories) && selectedCategories.some(
        (selectedCategory) => selectedCategory.name === category.name
      ) && styles.selectedCategory,
    ]}
    onPress={() => handleCategorySelect(category)}
  >
    <Text
      style={[
        styles.categoryName,
        Array.isArray(selectedCategories) && selectedCategories.some(
          (selectedCategory) => selectedCategory.name === category.name
        ) && styles.selectedCategoryText,
      ]}
    >
      {category.name}
    </Text>
  </TouchableOpacity>
))}
          </View>
</ScrollView>
           
          </Block>

          
          <TouchableOpacity onPress={handelComplete}>
            <Text style={{color:"#fff",marginTop:10,backgroundColor: 'black',fontSize: 18,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.content}>
    <Text style={styles.contentTitle}>Hi 👋!</Text>
    <Button testID={'close-button'}  title="Close" />
  </View> */}
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
    
    backgroundColor: "white",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
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
    width: width * 1,
    height: height - 450,
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
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  categoryContainer: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 10,
  },
  selectedCategory: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  categoryName: {
    fontSize: 18,
    color: "#000",
  },
  selectedCategoryText: {
    color: "#fff",
  },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  AlignCenter: {
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "grey",
    borderBottomWidth: 0.5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  borderView: {
    borderWidth: 1,
    borderColor: "red",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBlock: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  textContainer: {
    position: "absolute",
    bottom: 40, // Adjust as needed
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
