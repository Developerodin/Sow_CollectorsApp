import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme, Button } from "galio-framework";
const { width, height } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../Context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const MarketCard = (props) => {
  const navigation = useNavigation();
  const {
    Id,
    Index,
    Title,
    Value,
    Img,
    setModalVisible,
    setItemModelData,
    Category,
    setCart,
    Cart,
    Date: dateProp,
  } = props;
  const [AddStatus, setAddStatus] = useState(false);
  const { CartInStorage, setUpdate, update } = useAppContext();

  const handeViewDetail = () => {
    navigation.navigate("Order Details");
  };

  const handelAddClick = () => {
    setItemModelData({
      id: Id,
      index: Index,
      title: Title,
      value: Value,
      image: Img,
      category: Category,
      date: dateProp,
      Fun: () => {
        setAddStatus(true);
      },
    });
    setModalVisible(true);
  };
  const handelCartToStorage = async (Data) => {
    try {
      const cartArrayJSON = JSON.stringify(Data);
      await AsyncStorage.setItem("cart", cartArrayJSON);
      setUpdate((prev) => prev + 1);
      // console.log('Cart saved to AsyncStorage');
    } catch (error) {
      console.error("Error saving cart to AsyncStorage:", error);
    }
  };
  const handelRemoveClick = () => {
    const updatedCart = CartInStorage.filter((item) => item.id !== Id);
    handelCartToStorage(updatedCart);
    setAddStatus(false);
    setCart(updatedCart);
  };

  useEffect(() => {
    if (Cart.length === 0) {
      setAddStatus(false);
    }
    //  console.log("Market card=====>",Id,CartInStorage)
    CartInStorage &&
      CartInStorage.map((el) => {
        if (el.id === Id) {
          setAddStatus(true);
        }
        return "";
      });
  }, [CartInStorage]);

  const dateObj = new Date(dateProp);

  // Extract day, month, year, hours, and minutes
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = dateObj.getFullYear();
  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  // Convert 24-hour format to 12-hour format and determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const formattedHours = String(hours).padStart(2, "0");

  // Format the date as 'dd-MM-yyyy'
  const formattedDate = `${day}-${month}-${year}`;

  // Format the time as 'hh:mm AM/PM'
  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

  // Combine date and time
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return (
    <View
      style={{
        borderRadius: 8,
              padding: 5,
              borderWidth: 1,
              borderColor: "#65C5C4",
        backgroundColor: "#fff",
        marginTop: 10,
       
      }}
    >
      <Block style={{ flexDirection: "row" }}>
       

        <Block style={[styles.Space_Between, { width: "80%", marginLeft: 10 }]}>
          <Block>
            <Block>
              <Text
                style={{ fontSize: 14, color: "#000", fontWeight: "bold" }}
              >
                {Title}
              </Text>
            </Block>

                      <Block style={{ marginRight: 30, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="calendar" size={14} color="#65C5C4" />
              <Text style={{ color: "#000", fontSize: 14, fontWeight: 600, marginLeft: 8 }}>
                {formattedDateTime}
              </Text>
            </Block>
          </Block>
                

          
        </Block>
        <Text style={{ color: "#000", fontSize: 15, fontWeight: 700 ,marginTop: 10 }}>
            ₹ {Value}/kg
          </Text>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  displayF: {
    flexDirection: "row",
    alignItems: "center",
  },
  text1: {
    fontSize: 15,
    marginLeft: 10,
  },
  inputContainer: {
    width: "100%",
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: "transparent", // Make the border color transparent
  },
  input: {
    flex: 1,
    textAlign: "center",
    padding: 0,
    fontSize: 22,
    // Remove padding to make it look borderless
  },
  subtitle: {
    color: "black",
    fontSize: 20,
    marginTop: 10,

    textAlign: "left",
    lineHeight: 23,
    letterSpacing: 0.3,
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 52,
  },
  btn: {
    width: "100%",
    height: 46,
    borderRadius: 5,
    backgroundColor: "#40A99E",
    justifyContent: "center",
    alignItems: "center",
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
