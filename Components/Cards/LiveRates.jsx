import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Block, Text } from "galio-framework";
import axios from "axios";
import MarketModal from "./MarketModal";
import logo from "./scrap-img.jpeg";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Base_url } from "../../Config/BaseUrl";
import icon from "./trend1.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../../Context/AppContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeData } from "../../Theme/Theme";
import AntDesign from '@expo/vector-icons/AntDesign';
import { CategoryAddModel3 } from "../CategoryAddModel/CategoryAddModel3";
import icon2 from "./redIcon.png";

const LiveRates = () => {
  const { favouriteMandi, setFavouriteMandi, updateMandi } = useAppContext();
  const [selectedState, setSelectedState] = useState("All"); // Default to 'All'
  const [selectedCategory, setselectedCategory] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [marketRates, setMarketRates] = useState([]);
  const [favoriteMandis, setFavoriteMandis] = useState([]);
  const [visibleItems, setVisibleItems] = useState(4);
  const [priceDifferences, setPriceDifferences] = useState({});
  const [userId, setUserId] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [CategoriesData,setCategoriesData] =useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryName , setCategoryName] = useState("")
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [categoryModel , setCategoryModel] = useState(false)
  const[selectedSubCategory,setselectedSubCategory] = useState("")
  const handelCategoryModelOpen=()=>{
    setCategoryModel(true)
  }
  const handelCategoryModelClose = ()=>{
    setCategoryModel(false)
  }
  
  const getAllData = async () => {
    try {
      const response = await axios.get(`${Base_url}mandiRates`);
      const allData = response.data;

      const latestData = Object.values(
        allData.reduce((acc, curr) => {
          const mandi = curr.mandi;
          if (mandi && mandi._id) {
            const mandiId = mandi._id;
            if (
              !acc[mandiId] ||
              new Date(acc[mandiId].updatedAt) < new Date(curr.updatedAt)
            ) {
              acc[mandiId] = curr;
            }
          }
          return acc;
        }, {})
      );

      const filteredData = latestData.filter(
        (item) => item.mandi && item.mandi.mandiname
      );
      setMarketRates(filteredData);
      setLoading(false);

      for (const item of filteredData) {
        for (const priceItem of item.categoryPrices) {
          fetchPriceDifference(item.mandi._id, priceItem.category);
        }
      }
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  };

  const getCategories = async () => {
      
    try {
      const response = await axios.get(`${Base_url}categories`);
      setCategoriesData(response.data);
      setselectedCategory(response.data[0].name)
      // console.log("All categorires ===>",response.data )
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const getSubCategoriesByCategoryName = async (categoryName) => {
    console.log('Getting SubCategories', categoryName);
  try {
    const response = await axios.post(`${Base_url}subcategories/category`,{
      categoryName:categoryName
    });
    

    console.log("sub category data of selected category ==>",response.data);
    setSubCategoryData(response.data);
    setselectedSubCategory(response.data[0].name)
    return response.data;
  } catch (error) {
    console.log("Error getting subcategory ==>",error);
    setSubCategoryData([]);
    setselectedSubCategory("")
  }
};




  const fetchPriceDifference = async (mandiId, category) => {
    try {
      // console.log("Fetching price difference for:", mandiId, category);
      const response = await axios.get(
        `${Base_url}mandiRates/difference/${mandiId}/${category}`
      );
      if (response.data) {
        setPriceDifferences((prevState) => ({
          ...prevState,
          [`${mandiId}-${category}`]: response.data,
        }));
      } else {
        setPriceDifferences((prevState) => ({
          ...prevState,
          [`${mandiId}-${category}`]: "No data available",
        }));
      }
    } catch (error) {
      console.error("Error fetching price difference:", error);
      setPriceDifferences((prevState) => ({
        ...prevState,
        [`${mandiId}-${category}`]: "Error fetching data",
      }));
    }
  };

  const getUserMandis = async (userId) => {
    try {
      const response = await axios.get(`${Base_url}b2bUser/${userId}/mandis`);
      const favoriteMandis = response.data.favoriteMandis || [];
      setIsEmpty(favoriteMandis.length === 0); // Check if the data is empty
      return favoriteMandis;
    } catch (error) {
      console.error("Error getting user Mandis:", error);
      throw error;
    }
  };

  const userDetailsFromStorage = async () => {
    try {
      const Details = (await AsyncStorage.getItem("userDetails")) || null;
      const ParseData = JSON.parse(Details);
      const data = ParseData;
      setUserId(data.id);
      // console.log("User ID  ==>", data.id);
    } catch (err) {
      console.log("Error in getting user ==.", err);
    }
  };

  useEffect(() => {
    userDetailsFromStorage();
  }, []);

  useEffect(() => {
    if (userId) {
      getAllData();
      
      getUserMandis(userId).then(setFavoriteMandis);
    }
  }, [userId, updateMandi]);

  useEffect(() => {
    getCategories();
    
  }, []);

  useEffect(() => {
    getSubCategoriesByCategoryName(selectedCategory);
  }, [selectedCategory]);

  // Add 'All' to the states array
  const states = [
    "Favourite",
    "All",
    ...new Set(
      marketRates.map((item) => item.mandi?.state).filter((state) => state)
    ),
  ];

  // Adjust the filtering logic to show all data when 'All' is selected
  const filteredData =
    selectedState === "All"
      ? marketRates
      : selectedState === "Favourite"
      ? marketRates.filter((item) =>
          favoriteMandis.some((mandi) => mandi._id === item.mandi._id)
        )
      : marketRates.filter((item) => item.mandi?.state === selectedState);

      const handleShowMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
      };

      const handleShowLess = () => {
        setVisibleItems(4);
      };

  const displayedData = filteredData.slice(0, visibleItems);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const timePart = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${day}-${month}-${year} ${timePart}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleStatePress = (state) => {
    setSelectedState(state);
    setVisibleItems(5);
  };

  const handlCategoryPress = (data) =>{
    setselectedCategory(data)
  }

  const handlSubCategoryPress = (data)=>{
    setselectedSubCategory(data)
  }
  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModel = () => {
    setModalVisible(false);
  };

  const renderMarketItem = ({ item }) =>
    item.categoryPrices.map((priceItem, index) => {
      const priceDifference =
        priceDifferences[`${item.mandi._id}-${priceItem.category}`];

      return (
        <TouchableOpacity
          key={index}
          style={{ marginTop: 10 }}
          activeOpacity={0.5}
          onPress={() => handleItemPress(item)}
        >
           
          <Block
            style={{
              width: "100%",
              borderRadius: 8,
              padding: 5,
              borderWidth: 1,
              borderColor: ThemeData.color,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: ThemeData.cardBackgroundColor,
            }}
          >
          <Block style={{flexDirection: "row"}}>
              <Image
                source={logo}
                style={{ resizeMode: "cover", width: 40, height: 40,marginLeft:5,borderRadius: 8,marginVertical:5 }}
              />
            <Block style={{ width: "60%", marginLeft: 10 }}>
              <Text
                style={{ fontWeight: "700", color: ThemeData.textColor, fontSize: 13 }}
                >
                {item.mandi?.mandiname || "Unknown Mandi"}
              </Text>
              <Text style={{ fontSize: 13, fontWeight: "600" }}>
                {priceItem.category}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="calendar" size={14} color={ThemeData.color} />
      <Text style={{ fontSize: 12, fontWeight: "600",color: ThemeData.textColor, marginLeft: 5 }}>
        {formatDate(item.updatedAt)}
      </Text>
    </View>
            </Block>
                </Block>
            <Block style={{ textAlign: "right",marginRight: 10 }}>
              <Text
                style={{ fontWeight: "700",color: ThemeData.textColor, fontSize: 13 }}
              >
                ₹ {priceItem.price}
              </Text>
              {priceDifference && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      marginRight: 5,
                      fontSize: 13,
                      color:
                        priceDifference.tag === "Increment"
                          ? ThemeData.color
                          : "#e41010",
                      fontWeight: 400,
                    }}
                  >
                     ₹ {priceDifference.difference}
                  </Text>
                                   <Image
                    source={priceDifference.tag === "Increment" ? icon : icon2}
                    style={{
                      width: 20,
                      height: 20,
                      transform: [
                        {
                          rotate: priceDifference.tag === "Increment" ? "0deg" : "60deg",
                        },
                      ],
                    }}
                  />
                </View>
              )}
            </Block>
          </Block>
        </TouchableOpacity>
      );
    });

   return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={ThemeData.color} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>

<TouchableOpacity
              onPress={handelCategoryModelOpen} 
              activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  // maxWidth: 200,
                  alignSelf: "flex-start",
                  margin:10,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  backgroundColor: ThemeData.backgroundColor,
                  borderRadius: 30,
                }}
              >
                <Text style={{ color:'#fff',fontSize:14 }}>
                  Select Category : {selectedCategory}
                </Text>
              </TouchableOpacity>



          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 10, paddingLeft: 10 }}
          >
            {states.map((state) => (
              <TouchableOpacity
                key={state}
                onPress={() => handleStatePress(state)}
                style={{
                  marginRight:8,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  backgroundColor: selectedState === state ? ThemeData.backgroundColor : "#f4f4f4",
                  borderRadius: 30,
                }}
              >
                  {
                    state === "Favourite" ?
                    <AntDesign name="hearto" size={18} color={selectedState === state ? ThemeData.activeColor : ThemeData.textColor} />
                    :
                    <Text style={{ fontWeight:"bold",color: selectedState === state ? ThemeData.activeColor : ThemeData.textColor }}>
                    {state}
                  </Text>
                  }
                

                
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 10, paddingLeft: 10 }}
          >
            {subCategoryData.map((item,index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlSubCategoryPress(item.name)}
                style={{
                  marginRight:3,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  backgroundColor: selectedSubCategory === item.name ? ThemeData.color : "#fff",
                  borderRadius: 30,
                }}
              >
                <Text style={{fontWeight:500,fontSize:15, color: selectedSubCategory === item.name ? ThemeData.backgroundColor : ThemeData.textColor }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
  
          {selectedState === "Favourite" && filteredData.length === 0 ? (
            <Image
              source={require("../../assets/media/5-dark.png")}
              style={{
                width: 300,
                height: 300,
                marginRight: 10,
                alignSelf: "center",
              }}
            />
          ) : (
            <View>
              <View style={{ height: 320,marginTop:10 }}>
                <Text style={{ fontSize: 15, fontWeight: "500", color: ThemeData.textColor, marginLeft: 15 }}>
                  Live Market rates as of <Text style={{ color: ThemeData.color }}>12.11.2024</Text>
                </Text>
  
                <FlatList
                  data={displayedData}
                  renderItem={renderMarketItem}
                  keyExtractor={(item) => item._id}
                  contentContainerStyle={{ paddingHorizontal: 10 }}
                />
              </View>
  
              {/* {filteredData.length > visibleItems ? (
                <TouchableOpacity
                  onPress={handleShowMore}
                  style={{ marginVertical: 20, alignSelf: "center" }}
                >
                  <EvilIcons
                    name="arrow-down"
                    size={32}
                    color="#239456"
                    style={{ marginBottom: 10 }}
                  />
                </TouchableOpacity>
              ) : (
                visibleItems > 4 && (
                  <TouchableOpacity
                    onPress={handleShowLess}
                    style={{ marginVertical: 20, alignSelf: "center" }}
                  >
                    <EvilIcons
                      name="arrow-up"
                      size={32}
                      color="#239456"
                      style={{ marginBottom: 10 }}
                    />
                  </TouchableOpacity>
                )
              )} */}
            </View>
          )}
  
          <MarketModal
            modalVisible={modalVisible}
            selectedItem={selectedItem}
            onClose={closeModel}
            setModalVisible={setModalVisible}
            formatDate={formatDate}
            formatTime={formatTime}
          />

<CategoryAddModel3 
          modalVisible={categoryModel}
          setModalVisible={setCategoryModel}
          categoriesData={CategoriesData}
          setCategoryName={setCategoryName}
          setSelectedCategorie={setselectedCategory}
          selectedCategorie={selectedCategory}
            />

        </View>
      )}
    </View>
  );
};

export default LiveRates;
