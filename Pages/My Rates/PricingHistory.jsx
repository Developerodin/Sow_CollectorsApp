import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme, Button } from "galio-framework";

import { MarketCard } from "../../Components/Cards/MarketCard";
const { width, height } = Dimensions.get("window");
import { MaterialIcons } from "@expo/vector-icons";
import { ItemAddModel } from "../../Components/Model/ItemAddModel";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { useAppContext } from "../../Context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";

import icon from "./icon.png";
import { ThemeData } from "../../Theme/Theme";

export const PricingHistory = () => {
  const navigation = useNavigation();
  const { userDetails } = useAppContext();

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [Categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [ItemAddStatus, setItemAddStatus] = useState(false);
  const [UserCategoryData, setUserCategoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [update, setupdate] = useState(0);

  const [activeTimeFrame, setActiveTimeFrame] = useState("Today");

  const [subAddForm, setsubAddForm] = useState({
    categoryName: "",
    name: "",
    price: "",
    unit: "",
  });
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const initalModelData = {
    id: "",
    index: "",
    title: "",
    value: "",
    image: "",
    category: "",
  };
  const [ItemModelData, setItemModelData] = useState(initalModelData);
  const { Cart, setCart } = useAppContext();
  const [CategoriesData, setCategoriesData] = useState([]);



  const filterByTimeFrame = (timeFrame) => {
    console.log("Time Frame ===>", timeFrame);
    setActiveTimeFrame(timeFrame);
    // Add logic to filter data based on the selected time frame
  };


  const filterItems = (category) => {
    let filteredItems = data;
    console.log("Category ===>", category);
    filteredItems = filteredItems.filter(
      (item) => item.category === category
    );

    setFilteredData(filteredItems);
    setActiveCategory(category);
  };

  const updateSubcategoryByIndex = async (
    categoryId,
    subcategoryId,
    subcategoryData
  ) => {
    console.log(
      "Update Subcategory ========>",
      userDetails.id,
      categoryId,
      subcategoryId,
      subcategoryData
    );
    try {
      const response = await axios.put(
        `${Base_url}b2bUser/${userDetails.id}/category/${categoryId}/subcategory/${subcategoryId}`,
        subcategoryData
      );
      setupdate((prev) => prev + 1);
      return response.data;
    } catch (error) {
      console.error("Error updating subcategory:", error);
      throw error;
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const addSubcategory = async (categoryId, subcategoryData) => {
    console.log("Add Subcategory ========>");
    try {
      const response = await axios.post(
        `${Base_url}b2bUser/${userDetails.id}/category/${categoryId}/subcategory`,
        subcategoryData
      );
      setupdate((prev) => prev + 1);
      return response.data;
    } catch (error) {
      console.error("Error adding subcategory:", error);
      throw error;
    }
  };

  const fetchCategoryData = async (userId) => {
    try {
      const response = await axios.get(`${Base_url}b2bUser/${userId}/category`);
      console.log("CategoriesData 1 =====================>", response.data);
      const CategoriesData = response.data.data.categories;

      console.log("CategoriesData 2 =====================>", CategoriesData);
      // console.log("res of category and subcategory =>", CategoriesData);
      const transformedData = [].concat(
        ...CategoriesData.map((category) => {
          console.log("Category Data ==>", category);

          return (
            category.sub_category &&
            category.sub_category.map((subCategory) => ({
              id: subCategory._id,
              title: subCategory && subCategory.name.toUpperCase(),
              value: subCategory.price,
              image:
                "https://tse4.mm.bing.net/th?id=OIP.OQh1ykyaCVyCvt2aNHJ-LwHaHa&pid=Api&P=0&h=220", // Replace with the actual image URL
              category: category.name,
              updatedAt: subCategory.updatedAt,
            }))
          );
        })
      );

      // console.log("Subcategory Data ==>",transformedData)
      setData(transformedData);
      setFilteredData(transformedData);
      setUserCategoryData(CategoriesData);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setError(error.message || "An error occurred");
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${Base_url}categories`);
      setCategoriesData(response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
    const categories = [...new Set(data.map((item) => item.category))];
    console.log("Updating ===>");
    setCategories(categories);
    setActiveCategory(categories[0]); // Set the first category as active
  }, [query, update]);

  useEffect(() => {
    fetchCategoryData(userDetails.id);
  }, [update]);

  useEffect(() => {
    getCategories();
  }, [update]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
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
            <View
              style={{
                padding: 10,
                backgroundColor: "#000",
                borderRadius: 30,
                width: 50,
                height: 50,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="arrow-back-ios"
                size={22}
                color="#fff"
                style={{ marginLeft: 5 }}
              />
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
            Pricing History
          </Text>
        </View>
      </View>

      <Block style={{ paddingHorizontal: 15,paddingVertical: 10 }}>
        <Block style={styles.Space_Between}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {["Today", "Week", "Month", "3 Months"].map((timeFrame, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() => filterByTimeFrame(timeFrame)}
                style={{
                  marginRight: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 15,

                  backgroundColor:
                    activeTimeFrame === timeFrame
                      ? ThemeData.textColor
                      : ThemeData.activeBackgroundColor,
                  borderRadius: 30,
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 18,
                    color:
                      activeTimeFrame === timeFrame
                        ? ThemeData.activeColor
                        : ThemeData.textColor,
                  }}
                >
                  {timeFrame}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Block>
      </Block>
      <View style={styles3.container}>
        <Text style={styles3.text}>
          Please select your <Text style={styles3.linkText}>category</Text>
        </Text>
      </View>

      <Block style={{ paddingHorizontal: 15,paddingVertical: 5 }}>
        <Block style={styles.Space_Between}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {UserCategoryData &&
              UserCategoryData.length > 0 &&
              UserCategoryData.map((el, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  onPress={() => filterItems(el.name)}
                  style={{
                    marginRight: 10,
                    paddingVertical: 5,
                    paddingHorizontal: 15,

                    backgroundColor:
                      activeCategory === el.name
                        ? ThemeData.textColor
                        : ThemeData.activeBackgroundColor,
                    borderRadius: 30,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 18,
                      color:
                        activeCategory === el.name
                          ? ThemeData.activeColor
                          : ThemeData.textColor,
                    }}
                  >
                    {el.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </Block>
      </Block>
      

      <ScrollView
        style={{ backgroundColor: ThemeData.containerBackgroundColor }}
      >
        <Block
          style={{
            backgroundColor: ThemeData.containerBackgroundColor,
            paddingHorizontal: 10,
            marginBottom: 60,
          }}
        >
          <Block style={{ marginBottom: 100 }}>
            {filteredData.map((el, index) => {
              return (
                <MarketCard
                  key={index}
                  Id={el.id}
                  Index={index}
                  Cart={Cart}
                  setCart={setCart}
                  Title={el.title}
                  Value={el.value}
                  Img={el.image}
                  Category={el.category}
                  Date={el.updatedAt}
                  setModalVisible={setModalVisible}
                  setItemModelData={setItemModelData}
                  ItemAddStatus={ItemAddStatus}
                />
              );
            })}
          </Block>
        </Block>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    paddingLeft: 20,

    alignItems: "center",
    justifyContent: "space-between",
    // adjust size to fit design
    height: 110,
  },
  textContainer: {
    flex: 1,
  },
  mainText: {
    fontSize: 22,
    fontWeight: "700",
    color: ThemeData.textColor,
  },
  highlight: {
    color: "#65c5c4", // matching color for "Selling"
  },
  subText: {
    fontSize: 22,
    fontWeight: "700",
    color: ThemeData.textColor,
  },
  imageBackground: {
    backgroundColor: ThemeData.color,

    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: 150,
  },
  container: {
    flex: 1,
    backgroundColor: ThemeData.containerBackgroundColor,
  },
  container1: {
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 10,
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
    color: ThemeData.textColor,
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
    marginTop: 10,
  },
  shadow: {
    shadowColor: ThemeData.textColor,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    width: width,
  },
});

const styles3 = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: ThemeData.textColor, 
    fontWeight: "600",  
    marginLeft: 10,
  },
  linkText: {
    color: ThemeData.color, // Color for "sub categories" text
  },
  highlightText: {
    color: ThemeData.color, // Color for "Aluminium" text
  },
  button: {
    marginTop: 18,
    borderColor: ThemeData.color,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    width: 250,
  },
  buttonText: {
    color: ThemeData.color,
    fontSize: 16,
    fontWeight: "600",
  },
});
