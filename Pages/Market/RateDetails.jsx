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

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";
import { useAppContext } from "../../Context/AppContext";
const { width, height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import { Picker } from "@react-native-picker/picker";
import icon1 from "./profile.png";
import icon2 from "./company.png";
import icon3 from "./location.png";
import icon4 from "./cat.png";
import icon5 from "./price.png";
import icon6 from "./calender.png";

export const RateDetails = ({ route }) => {
  const navigation = useNavigation();
  const { itemId, subIndex, categoryIndex } = route.params;
  const { update, userDetails, setUpdate } = useAppContext();
  const [details, setDetails] = useState(null);
  const [weight, setWeight] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");
  const [discription, setDiscription] = useState("");
  const [selectedValue, setSelectedValue] = useState("Kg");
  const handleInputChange = (text) => {
    setWeight(text);
  };

  useEffect(() => {
    if (weight !== "") {
      let w = weight;
      if (selectedValue === "Ton") {
        w = `${1000 * parseInt(w)}`;
      }
      const totalWeight =
        parseInt(w) *
        parseInt(
          details.categories[categoryIndex].sub_category[subIndex].price
        );
      setTotalAmount(totalWeight);
    }
  }, [weight, selectedValue]);

  const handelDiscriptionChange = (text) => {
    setDiscription(text);
  };

  const handleSubmit = () => {
    if (weight === "" || TotalAmount === "") {
      ToastAndroid.show("Please Fill All Details", ToastAndroid.SHORT);
      return;
    }

    const Orderdetails = {
      category: details.categories[categoryIndex].name,
      sub_category:
        details.categories[categoryIndex].sub_category[subIndex].name,
      quantity: weight,
      discription: discription,
      unit: selectedValue,
    };
    console.log("data >>>", Orderdetails);

    console.log(userDetails._id, details._id, Orderdetails, TotalAmount);
    createOrder(
      userDetails._id,
      details._id,
      Orderdetails,
      TotalAmount,
      discription
    );
  };

  const createOrder = async (from, to, details, totalAmount, discription) => {
    try {
      const response = await axios.post(`${Base_url}api/b2b_orders`, {
        from,
        to,
        details,
        totalAmount,
        discription,
      });
      navigation.navigate("Order Status", { status: "success" });
      setUpdate((prev) => prev + 1);
      return response.data;
    } catch (error) {
      navigation.navigate("Order Status", { status: "fail" });
      console.log("error", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Base_url}api/b2b/${itemId}`);

      if (response.status === 200) {
        console.log("Data of vender =====>", response.data);
        setDetails(response.data);
      } else {
        console.log("Error fetching data:", response.data.message);
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  const convertUTCToIST = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const year = date.getFullYear();

    const options = {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const timeString = date.toLocaleTimeString("en-IN", options).toUpperCase();

    return `${day}-${month}-${year} ${timeString}`;
  };

  useEffect(() => {
    console.log("Id ===>", itemId);
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block
          style={{
            padding: 15,
            backgroundColor: "#fff",
            marginTop: 10,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Block>
            <Block>
              <Text style={{ fontSize: 22, fontWeight: 700 }}>
                {details && details.categories[categoryIndex].name}
              </Text>
            </Block>
          </Block>

          <Block
            style={[
              { marginTop: 20, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Block style={{ marginRight: 8 }}>
              <Ionicons name="person" size={20} color="black" />
              {/* <Image source={icon1} style={{height:14,width:14}} /> */}
            </Block>
            <Block>
              <Text style={{ fontSize: 15,fontWeight: 500 }}>{details && details.name}</Text>
            </Block>
          </Block>

          <Block
            style={[
              { marginTop: 15, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Block style={{ marginRight: 8 }}>
              <Ionicons name="location-sharp" size={20} color="black" />
            </Block>
            <Block>
              <Text style={{ fontSize: 14,fontWeight: 500  }}>
                {details && details.Address}, {details && details.pincode}, {details && details.city}, {details && details.country}
              </Text>
            </Block>
          </Block>

          <Block
            style={[
              { marginTop: 15, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Block style={{ marginRight: 8 }}>
              <FontAwesome name="tags" size={16} color="black" />
            </Block>
            <Block>
              <Text style={{ fontSize: 15,fontWeight: 500  }}>
                {details &&
                  details.categories[categoryIndex].sub_category[subIndex].name}
              </Text>
            </Block>
          </Block>

          <Block
            style={[
              { marginTop: 15, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Block style={{ marginRight: 8 }}>
              <FontAwesome name="money" size={16} color="black" />
            </Block>
            <Block>
              <Text style={{ fontSize: 15,fontWeight: 700 }}> ₹
                {details &&
                  details.categories[categoryIndex].sub_category[subIndex]
                    .price}
                /KG
              </Text>
            </Block>
          </Block>

          <Block
            style={[
              { marginTop: 15, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Block style={{ marginRight: 8 }}>
              <FontAwesome name="calendar" size={16} color="black" />
            </Block>
            <Block>
              <Text style={{ fontSize: 15,fontWeight: 500  }}>
                {details &&
                  convertUTCToIST(
                    details.categories[categoryIndex].sub_category[subIndex]
                      .updatedAt
                  )}
              </Text>
            </Block>
          </Block>

          <Block style={{ marginTop: 20 }}>
            <Text style={styles.text2}>Enter Approx Weight</Text>

            <Block style={[styles.Space_Between, { marginTop: 10, flexDirection: 'row' }]}>
              <Block style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Enter Weight</Text>
                <Block style={{ flexDirection: 'row' }}>
                  <Input
                    style={{
                      height: 60,
                     width: width * 0.5,
                      borderColor: 'black',
                    }}
                    placeholder="Enter Weight ..."
                    value={weight}
                    onChangeText={handleInputChange}
                    keyboardType="numeric"
                  />
                </Block>
              </Block>
              <Block >
                <Text style={{ fontSize: 15, marginBottom: 5 }}>Unit</Text>
                <Block
                  style={{
                    height: 60,
                    width: width * 0.35,
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                >
                  <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    style={{ color: 'black', height: 50, fontSize: 18 }}
                  >
                    <Picker.Item label="Select Unit" value="" />
                    <Picker.Item label="Kg" value="Kg" />
                    <Picker.Item label="Ton" value="Ton" />
                  </Picker>
                </Block>
              </Block>
            </Block>

            <Block style={ { marginTop: 10 }}>
              <Text style={{fontSize:15}}>Notes</Text>
              <Block style={{ flexDirection: "row" }}>
                <Input
                  style={{
                    height: 80,
                    width: width * 0.9,
                    borderColor: "black",
                  }}
                  placeholder="Add notes ..."
                  value={discription}
                  onChangeText={handelDiscriptionChange}
                />
              </Block>
            </Block>

            {/* <Block style={{marginTop:10}}>
            <Text style={{fontSize:15}}>Weight need not to be Accurate, We </Text>
            <Text style={{fontSize:15}}>Just need an Idea.</Text>
        </Block> */}
          </Block>

          <Block style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 15 }}>Approx Scrap Value</Text>
            <Block style={{ flexDirection: "row" }}>
              <Block
                style={[
                  {
                    marginTop: 13,
                    height: 60,
                    width: width * 0.9,
                    borderColor: "black",
                    fontSize: 20,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                  },
                ]}
              >
                <Text style={{ fontSize: 25 }}>{TotalAmount}</Text>
              </Block>
              {/* <Block style={[{marginTop:10,height:60,fontSize:20,padding:10}]}>
             <Text style={{fontSize:25,color:"grey"}}>Rs</Text>
        </Block> */}
            </Block>
          </Block>
        </Block>

        <Block style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 22, padding: 10, fontWeight: 600 }}>
            Upload Photos
          </Text>
          <Button color="white" style={styles.button1}>
            <Ionicons
              name="camera"
              size={24}
              color="#000"
              style={styles.icon}
            />
            <Text style={{ fontSize: 18, fontWeight: 400, color: "#000" }}>
              Open Camera
            </Text>
          </Button>
          <Button color="white" style={styles.button1}>
            <Ionicons
              name="images"
              size={24}
              color="#000"
              style={styles.icon}
            />
            <Text style={{ fontSize: 18, fontWeight: 400, color: "#000" }}>
              Open Gallary
            </Text>
          </Button>
        </Block>

        <Block style={[{ marginTop: 15 }, styles.Center]}>
          <Button
            onPress={handleSubmit}
            color="white"
            style={{
              borderWidth: 1,
              width: width * 0.9,
              height: 60,
              backgroundColor: "black",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 400, color: "#fff" }}>
              Sell your Scrap
            </Text>
          </Button>
        </Block>

        {/* <Block center style={{marginTop:20,marginBottom:20}}>
        <Text style={styles.text1}>Note : By Proceeding You Accept our <Text style={{color:"#EA5932"}}>Privacy Policy</Text> and </Text>
        <Text style={[{color:"#EA5932"}]}>Terms & Conditions</Text>
    </Block> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  text1: {
    fontSize: 14,
    color: "#9B9B9B",
  },
  text2: {
    fontSize: 24,
    color: "#040404",
  },
  tabBar: {
    flexDirection: "row",
    // paddingTop: StatusBar.currentHeight,
    padding: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginTop: 10,
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
    width: "95%",
    height: 55,
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
  button1: {
    borderWidth: 1,
    width: width * 0.9,
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "black",
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
});
