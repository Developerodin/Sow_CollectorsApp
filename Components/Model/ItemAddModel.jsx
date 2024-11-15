import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TextInput
} from "react-native";
import { Block, Text, Input, theme,Button } from "galio-framework";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native";
import { ThemeData } from "../../Theme/Theme";




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
    unit: "Kg",
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

  console.log("Item model data==.",ItemModelData.value)

  useEffect(()=>{
    setFormData({
      name:ItemModelData.title,
      price:ItemModelData.value,
      unit: "Kg",
    })
  },[ItemModelData])
  

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
              color={ThemeData.textColor}
            />
          </Block>

          <Block
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "start",
              width: width * 0.9,
              padding: 10,
            }}
          >
           <MaterialIcons name="category" size={24} color={ThemeData.color} />
            <Text style={{ fontSize: 18,marginLeft:10,color: ThemeData.textColor }}>
              {ItemModelData.title} {"( ₹" + ItemModelData.value + " / KG)"}
            </Text>
          </Block>

          <Block
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "start",
              width: width * 0.9,
              padding: 10,
            }}
          >
            <Block>
              <TextInput
                variant="standard"
                 keyboardType="numeric"
                // label="Price"
                value={formData.price}
                onChangeText={(text) => handleInputChange("price", text)}
                color={"black"}
                // inputStyle={{
                //   borderWidth: 0,
                //   paddingBottom: 0,
                //   color: "black",
                //   fontSize: 20,
                //   letterSpacing: 3,
                // }}
                // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
                style={{ width: 150,borderWidth:1,borderRadius:8,paddingHorizontal:15,paddingVertical:5 }}
              />
            </Block>

            <Block>
              <TextInput
                variant="standard"
                // keyboardType="numeric"
                label="unit"
                value={formData.unit}
                onChangeText={(text) => handleInputChange("unit", text)}
                color={ThemeData.textColor}
                inputStyle={{
                  borderWidth: 0,
                  paddingBottom: 0,
                  color: "black",
                  fontSize: 20,
                  letterSpacing: 3,
                }}
                
                style={{ width: 150,borderWidth:1,borderRadius:8,marginLeft: 10,paddingHorizontal:15,paddingVertical:5  }}
              />
            </Block>
          </Block>

          <Block style={{flexDirection:"row",marginTop:20,gap: 10}}>
            {/* <Button onPress={()=>handelDone(otp)} color="success"> Done</Button> */}
            {/* <Button
             
              
              color="black"
              onPress={() => handelDelete(ItemModelData.index)}
           
              size="small"
            > Delete</Button> */}

            <TouchableOpacity onPress={() => handelDelete(ItemModelData.index)}>
              <Text style={{color: ThemeData.activeColor,marginTop:10,backgroundColor: ThemeData.textColor,fontSize: 18,
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 30,
      }}>Delete</Text>
            </TouchableOpacity>

            {/* <Button
            color="black"
             
             onPress={() => handelComplete(formData)}
          
             size="small"
           > Update</Button> */}
            <TouchableOpacity onPress={() => handelComplete(formData)}>
              <Text style={{color:ThemeData.activeColor,marginTop:10,backgroundColor: ThemeData.textColor,fontSize: 18,
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 30,
      }}>Update</Text>
            </TouchableOpacity>


           
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
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    
    width: width * 0.9,
    height: height - 600,
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
    color: ThemeData.activeColor,
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
    backgroundColor: ThemeData.containerBackgroundColor,
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
    color: ThemeData.activeColor,
    fontSize: 16,
    fontWeight: "bold",
  },
});
