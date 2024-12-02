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

import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";
import { useAppContext } from "../../Context/AppContext";
const { width, height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import icon1 from "../../assets/business.png";
import icon2 from "../../assets/ruppee.png";
import icon3 from "../../assets/calender.png";
import icon4 from "../../assets/user.png";
import icon5 from "../../assets/tag.png";
import icon6 from "../../assets/location.png";
import Entypo from '@expo/vector-icons/Entypo';
export const RateDetails = ({ route }) => {
  const navigation = useNavigation();
  const {userId, categoryId, subCategoryId } = route.params;
  const { update, userDetails, setUpdate } = useAppContext();
  const [details, setDetails] = useState(null);
  const [weight, setWeight] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");
  const [discription, setDiscription] = useState("");
  const [selectedValue, setSelectedValue] = useState("Kg");
  const [images, setImages] = useState([]);
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
           details.category._doc.sub_category[0].price 
        );
      setTotalAmount(totalWeight);
    }
  }, [weight, selectedValue]);

  const handelDiscriptionChange = (text) => {
    setDiscription(text);
  };

  const handleBack = () => {
    navigation.goBack();
  };

   const handleSubmit = () => {
    if (weight === "" || TotalAmount === "") {
      ToastAndroid.show("Please Fill All Details", ToastAndroid.SHORT);
      return;
    }
  
   
  
    const Orderdetails = {
      
      category: details.category._doc.name,
      subCategory: details.category._doc.sub_category[0].name,
      orderBy: userDetails.id,
      orderTo: userId,
      weight: weight,
      unit: selectedValue,
      notes: discription,
      value: details.category._doc.sub_category[0].price,
      totalPrice: TotalAmount,
      photos: JSON.stringify(images),
      location: "674950d3390a9600916b98a8",
      
    };
  
    console.log("Order details >>>", Orderdetails);
  
    createOrder(Orderdetails);
  };
  
  const createOrder = async (orderDetails) => {
    try {
      const response = await axios.post(`${Base_url}b2bOrder`, orderDetails);
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
      const response = await axios.post(`${Base_url}b2bOrder/getratedetails`, {
        userId,
        categoryId,
        subCategoryId
      });

      if (response.status === 200) {
        console.log("Data of vendor =====>", response.data);
        setDetails(response.data.data);
      } else {
        console.log("Error fetching data =>>:", response.data.message);
      }
    } catch (error) {
      console.log("Error fetching data: =>>", error.message);
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

  const showImagePicker = async (sourceType) => {
    // Request media library permission
    if(images.length < 1){
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access the gallery is required!');
      return;
    }
  
    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      sourceType: sourceType,
      base64: true,  // Request base64 encoding
    });
  
    // Check if the user selected an image
    if (!result.canceled) {
      // console.log("URI of image library ==> ", result.assets[0]);
      const dataImage = result.assets[0]

      if(dataImage){
        // console.log("Base64 of selected image ==> ", result.assets[0].base64);
      const base64data = `data:${dataImage.mimeType};base64,${dataImage.base64}`  // Base64 string
      setImages((prev)=>[...prev,base64data]); 
     
      
        // Or you can set the base64 if needed
      // updateUserImage(userDetails.id,base64data)
      }
      
    }
  }
  else{
    ToastAndroid.show("You can uplode only 1 Image", ToastAndroid.SHORT);
  }
  };

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("Id ===>", userId, categoryId, subCategoryId);
    fetchData();
  }, [update]);
  return (
    <View style={styles.container}>
      <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginTop: 65,
        height: 50,
      }}
    >
      
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => {
          // Add back navigation logic here
          console.log("Back pressed");
        }}
      >  
      <TouchableOpacity onPress={handleBack} activeOpacity={0.9}>
        <View style={{padding: 10,backgroundColor:'#000',borderRadius:30,width: 50, height: 50,flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

        <MaterialIcons name="arrow-back-ios" size={22} color="#fff" style={{ marginLeft: 5 }}/>
        </View>
      </TouchableOpacity>
        <Text
          style={{
            color: "#000",
            fontSize: 25,
            marginLeft: 10,
            fontWeight: 500,
          }}
        >
          Rate Details
        </Text>
      </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block
          style={{
            padding: 15,
            backgroundColor: "#fff",
            marginTop: 15,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Block>
            <Block>
              <Text style={{ fontSize: 22, fontWeight: 700 }}>
                {details && details.category._doc.name}
              </Text>
            </Block>
          </Block>

          <Block
            style={[
              { marginTop: 10, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Block style={{ marginRight: 8 }}>
              
              <Image source={icon4} style={{height:16,width:16}} />
            </Block>
            <Block>
              <Text style={{ fontSize: 15,fontWeight: 500 }}>{details && details.userDetails.name}</Text>
            </Block>
          </Block>

          <Block
            style={[
              { marginTop: 20, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Block style={{ marginRight: 8 }}>
              {/* <Ionicons name="person" size={20} color="black" /> */}
              <Image source={icon1} style={{height:16,width:16}} />
            </Block>
            <Block>
              <Text style={{ fontSize: 15,fontWeight: 500 }}>{details && details.userDetails.businessName}</Text>
            </Block>
          </Block>

          <Block
            style={[
              { marginTop: 15, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Block style={{ marginRight: 8 }}>
            <Image source={icon6} style={{height:16,width:13}} />
            </Block>
            <Block>
              <Text style={{ fontSize: 14,fontWeight: 500  }}>
              {details && details.addresses.length > 0 ? `${details.addresses[0].Address}, ${details.addresses[0].pincode}, ${details.addresses[0].city}, ${details.addresses[0].country}` : "No Address Available"}
              </Text>
            </Block>
          </Block>

          <Block
            style={[
              { marginTop: 15, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Block style={{ marginRight: 8 }}>
            <Image source={icon5} style={{height:14,width:14}} />
            </Block>
            <Block>
              <Text style={{ fontSize: 15,fontWeight: 500  }}>
              {details && details.category._doc.sub_category.length > 0 ? details.category._doc.sub_category[0].name : "No Subcategory Available"}
              </Text>
            </Block>
          </Block>

          <Block
            style={[
              { marginTop: 15, flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Block style={{ marginRight: 8 }}>
            <Image source={icon2} style={{height:16,width:16}} />
            </Block>
            <Block>
              <Text style={{ fontSize: 15,fontWeight: 700 }}> ₹
              {details && details.category._doc.sub_category.length > 0 ? details.category._doc.sub_category[0].price : "N/A"}
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
            <Image source={icon3} style={{height:16,width:16}} />
            </Block>
            <Block>
              <Text style={{ fontSize: 15,fontWeight: 500  }}>
                               {details && convertUTCToIST(details.category._doc.sub_category[0].updatedAt)}
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
                      borderColor: '#A6A6A6',
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
                    borderColor: '#A6A6A6',
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
                    borderColor: "#A6A6A6",
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
                    borderColor: "#A6A6A6",
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

        <View style={styles.boxContainer}>
            <View style={styles.row}>
              {
                images.map((img,index)=>{
                  return img && <View style={[styles.box,{position:"relative"}]}>
                     <Image key={index} source={{ uri: img }} style={{height:"100%",width:"100%",borderRadius:8}} />
                     <Entypo onPress={()=>deleteImage(index)} name="circle-with-cross" size={24} color="red" style={{position:"absolute",top:0,right:-4}} />
                  </View>
                })
              }
              
              
            </View>
            
          </View>
        





        <Block style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 22, padding: 10, fontWeight: 600 }}>
            Upload Photos
          </Text>
          <Button onPress={() => showImagePicker('camera')} color="white" style={styles.button1}>
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
          {/* <Button color="white" style={styles.button1}>
            <Ionicons
              name="images"
              size={24}
              color="#000"
              style={styles.icon}
            />
            <Text style={{ fontSize: 18, fontWeight: 400, color: "#000" }}>
              Open Gallary
            </Text>
          </Button> */}
        </Block>

        <Block style={[{ marginTop: 15 }, styles.Center]}>
          <Button
            onPress={handleSubmit}
            color="white"
            style={{
              borderWidth: 1,
              width: width * 0.9,
              height: 54,
              borderRadius: 8,
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
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  box: {
    width: '25%', // Adjusts the width of each box in the row
    aspectRatio: 1, // Ensures boxes are square
    backgroundColor: '#D3D3D3', // Light grey color
    borderRadius: 8,
  },
  text1: {
    fontSize: 14,
    color: "#9B9B9B",
  },
  text2: {
    fontSize: 22,
    color: "#040404",
    fontWeight: "600",
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
