import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  ActivityIndicator
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Block, Text } from "galio-framework";
import axios from "axios";
import { useAppContext } from '../../Context/AppContext';
import { ThemeData } from '../../Theme/Theme';
import { Base_url } from "../../Config/BaseUrl";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export const PricingHistory = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("");
  const [UserCategoryData, setUserCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [update, setupdate] = useState(0);
  const [categoryHistory, setCategoryHistory] = useState([]);
  const [activeTimeFrame, setActiveTimeFrame] = useState("Today");
  const [categories, setCategories] = useState([]);
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
  const { Cart, setCart, userDetails } = useAppContext();
  const [CategoriesData, setCategoriesData] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");

  const timeFrameMapping = {
    "Today": "today",
    "Last week": "week",
    "Last month": "month",
    "Last 3 month": "3month",
    "Last 6 month": "6month",
    "Last year": "year"
  };
  
  const filterByTimeFrame = (timeFrame) => {
    const apiTimeFrame = timeFrameMapping[timeFrame];
    console.log("Time Frame ===>", apiTimeFrame);
    setActiveTimeFrame(timeFrame);
    fetchCategoryHistory(userDetails.id, activeCategory, apiTimeFrame);
  };

  const filterItems = (category) => {
    let filteredItems = data;
    console.log("Category ===>", category);
    filteredItems = filteredItems.filter((item) => item.category === category);

    setFilteredData(filteredItems);
    setActiveCategory(category);
    fetchCategoryHistory(userDetails.id, category, activeTimeFrame);
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

      setData(transformedData);
      setFilteredData(transformedData);
      setUserCategoryData(CategoriesData);
      setLoading(false);

      // Set the first category as active
      if (CategoriesData.length > 0) {
        setActiveCategory(CategoriesData[0].name);
        fetchCategoryHistory(userDetails.id, CategoriesData[0].name, activeTimeFrame);
      }
    } catch (error) {
      console.log("error", error);
      setError(error.message || "An error occurred");
      setLoading(false);
    }
  };

  const fetchCategoryHistory = async (userId, categoryName, timePeriod) => {
    try {
      const response = await axios.post(`${Base_url}b2bUser/rateshistory`, {
        userId,
        categoryName,
        timePeriod
      });
      console.log("Fetched Filter category =>:", response.data.data);
      console.log("Fetched Filter User Date =>:", response.data);
      const historyData = response.data.data.map(item => {
        return item.history.map(historyItem => ({
          date: historyItem.updatedAt,
          price: historyItem.price,
          subCategoryName: item.subCategoryName
        }));
      }).flat();
  
      setCategoryHistory(historyData);
    } catch (error) {
      console.error("Error fetching Rates:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-IN', options);
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
            console.log("Back pressed");
          }}
        >
          <TouchableOpacity onPress={handleBack} activeOpacity={0.9}>
            <View
              style={{
                padding: 10,
                backgroundColor: "#000",
                borderRadius: 30,
                width: 40,
                height: 40,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="arrow-back-ios"
                size={18}
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

      <Block style={{ paddingHorizontal: 15, paddingVertical: 10, marginTop: 10 }}>
        <Block style={styles.Space_Between}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {["Today", "Last week", "Last month", "Last 3 month", "Last 6 month", "Last year"].map((timeFrame, index) => (
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
                    fontSize: 15,
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

      <Block style={{ paddingHorizontal: 15, paddingVertical: 5,marginTop:5 }}>
        <Block style={styles.Space_Between}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {UserCategoryData && UserCategoryData.length > 0 ? (
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
                      fontSize: 15,
                      color:
                        activeCategory === el.name
                          ? ThemeData.activeColor
                          : ThemeData.textColor,
                    }}
                  >
                    {el.name}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Block center style={{ marginTop: 40 }}>
                <Image
                  source={require("../../assets/media/5-dark.png")}
                  style={{
                    width: 300,
                    height: 300,
                    marginRight: 10,
                  }}
                />
              </Block>
            )}
          </ScrollView>
        </Block>
      </Block>
      
      <ScrollView
        style={{ backgroundColor: ThemeData.containerBackgroundColor, padding: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {categoryHistory.length > 0 ? (
          categoryHistory.map((historyItem, index) => (
            <View
              key={index}
              style={{
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: ThemeData.color,
                backgroundColor: ThemeData.containerBackgroundColor,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Block style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="calendar" size={14} color={ThemeData.color} />
                <Text
                  style={{
                    color: ThemeData.textColor,
                    fontSize: 14,
                    fontWeight: 600,
                    marginLeft: 8,
                  }}
                >
                  {formatDate(historyItem.date)}
                </Text>
              </Block>
              <Text
                style={{
                  color: ThemeData.textColor,
                  fontSize: 15,
                  fontWeight: 700,
                  marginRight: 10,
                }}
              >
                ₹{historyItem.price}
              </Text>
            </View>
          ))
        ) : (
          <Block center style={{ marginTop: 40 }}>
            <Image
              source={require("../../assets/media/5-dark.png")}
              style={{
                width: 300,
                height: 300,
                marginRight: 10,
              }}
            />
          </Block>
        )}
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeData.containerBackgroundColor,
    padding: 10
  },
  Space_Between: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
});

const styles3 = StyleSheet.create({
  container: {
    marginLeft: 25,

  },
  text: {
    fontWeight: "500",
    fontSize: 16,
    color: ThemeData.textColor, // Black color for the main text
  },
  linkText: {
    color: ThemeData.color // Color for "category" text
  },
});

export default PricingHistory;