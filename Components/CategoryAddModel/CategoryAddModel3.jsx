import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Block, Text } from "galio-framework";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("screen");

export const CategoryAddModel3 = ({
  modalVisible,
  setModalVisible,
  categoriesData,
  setCategoryName
}) => {
  const animationRef = useRef(null);

  const handleCategorySelect = (category) => {
    setCategoryName(category.name);
    setModalVisible(false);
  };

  useEffect(() => {
    animationRef.current?.play();
    animationRef.current?.play(10, 80);
  }, []);

  const handelClose = () => {
    setModalVisible(false);
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
              color="black"
            />
          </Block>
          <Text style={{ fontSize: 17 }}>Select Categories</Text>
          <Block
            style={{
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "start",
              width: width * 0.9,
              padding: 12,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.container}>
                {categoriesData.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.categoryBox}
                    onPress={() => handleCategorySelect(category)}
                  >
                    <Text style={styles.categoryText}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Block>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row"
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 50,
  },
  categoryBox: {
    padding: 10,
    margin: 5,
    backgroundColor: '#f0f0f0', // Normal box color
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedCategoryBox: {
    backgroundColor: 'black', // Grey color when selected
  },
  categoryText: {
    fontSize: 16,
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
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: -50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width,
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
  doneButton: {
    marginTop: 20,
    backgroundColor: '#65be34',
    borderRadius: 5,
    padding: 10,
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
  },
});