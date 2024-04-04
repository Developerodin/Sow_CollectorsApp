import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
} from "react-native";
import { Block, Text, Input, theme,Button } from "galio-framework";

import { Ionicons } from "@expo/vector-icons";

import Modal from "react-native-modal";

import { TextInput } from "@react-native-material/core";


const { width, height } = Dimensions.get("screen");
export const ItemAddModel = ({
  modalVisible,
  ItemModelData,
  setModalVisible,
  handelComplete,
  handelDelete
}) => {

  const animationRef = useRef(null);

 
  const [formData, setFormData] = useState({
    name:ItemModelData.title,
    price: ItemModelData.value,
    unit: "",
  });


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
      swipeDirection={["down"]}
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

          <Block
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "start",
              width: width * 0.9,
              padding: 10,
            }}
          >
            <Image
              source={{ uri: ItemModelData.image }}
              style={{
                resizeMode: "contain",
                width: 30,
                height: 30,
                marginRight: 10,
              }}
            />
            <Text style={{ fontSize: 20 }}>
              {ItemModelData.title} {"( ₹" + ItemModelData.value + " / KG)"}
            </Text>
          </Block>

          <Block
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "start",
              width: width * 0.9,
              padding: 10,
            }}
          >
            <Block>
              <TextInput
                variant="standard"
                
                label="Price"
                value={formData.value}
                onChangeText={(text) => handleInputChange("price", text)}
                color={"grey"}
                inputStyle={{
                  borderWidth: 0,
                  paddingBottom: 0,
                  color: "black",
                  fontSize: 20,
                  letterSpacing: 3,
                }}
                // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
                style={{ width: 200 }}
              />
            </Block>

            <Block>
              <TextInput
                variant="standard"
                keyboardType="numeric"
                label="unit"
                value={formData.unit}
                onChangeText={(text) => handleInputChange("unit", text)}
                color={"grey"}
                inputStyle={{
                  borderWidth: 0,
                  paddingBottom: 0,
                  color: "black",
                  fontSize: 20,
                  letterSpacing: 3,
                }}
                // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
                style={{ width: 80, marginLeft: 10 }}
              />
            </Block>
          </Block>

          <Block style={{flexDirection:"row",marginTop:20}}>
            {/* <Button onPress={()=>handelDone(otp)} color="success"> Done</Button> */}
            <Button
             
              
              color="crimson"
              onPress={() => handelDelete(ItemModelData.index)}
           
              size="small"
            > Delete</Button>

            <Button
            color="teal"
             
             onPress={() => handelComplete(formData)}
          
             size="small"
           > Update</Button>
           
          </Block>
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
    height: height - 500,
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
