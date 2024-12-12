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

import WholesalerMarketModal from "./WholesalerMarketModal";
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

const WholesalerRates = () => {
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
  const [CategoryData,setCategoryData] =useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryName , setCategoryName] = useState("")
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [categoryModel , setCategoryModel] = useState(false)
  const[selectedSubCategory,setselectedSubCategory] = useState("")
    const [uniqueStates, setUniqueStates] = useState([]);
  const handelCategoryModelOpen=()=>{
    setCategoryModel(true)
  }
  const handelCategoryModelClose = ()=>{
    setCategoryModel(false)
  }
  
  const getAllData = async () => {
  try {
    const response = await axios.get(`${Base_url}b2bUser/wholesalers`);
    const { userData, uniqueCategories, uniqueSubCategories, uniqueStates } = response.data;

    // Set the market rates with the userData
    setMarketRates(userData);

    // Set the categories and subcategories
    setCategoryData(uniqueCategories);
    setSubCategoryData(uniqueSubCategories);
    setUniqueStates(uniqueStates.length > 0 ? uniqueStates : ["No states available"]);
    

    // Set loading to false after data is fetched
    setLoading(false);

    console.log("All data ===> 125", response.data);
  } catch (error) {
    console.error("Error fetching all data:==>", error);
    setLoading(false);
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
    ...uniqueStates,
  ];
  
  // Adjust the filtering logic to show all data when 'All' is selected
  const filteredData = marketRates.filter((item) =>
    item.category.some((category) =>
      category.sub_category.some((subCategory) => subCategory.name === selectedSubCategory)
    )
  );
  

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
    console.log("Selected Item:", item);
    setSelectedItem(item);
    // setModalVisible(true);
  };

  const closeModel = () => {
    setModalVisible(false);
  };

  const renderMarketItem = ({ item }) =>
  item.category.map((category, index) => {
    return category.sub_category.map((subCategory, subIndex) => (
      <TouchableOpacity
        key={`${index}-${subIndex}`}
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
          <Block style={{ flexDirection: "row" }}>
            <Image
              source={logo}
              style={{ resizeMode: "cover", width: 40, height: 40, marginLeft: 5, borderRadius: 8, marginVertical: 5 }}
            />
            <Block style={{ width: "60%", marginLeft: 10 }}>
              <Text style={{ fontWeight: "700", color: ThemeData.textColor, fontSize: 13 }}>
                {item.name || "Unknown Wholesaler"}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "600" }}>
                {subCategory.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="calendar" size={14} color={ThemeData.color} />
                <Text style={{ fontSize: 12, fontWeight: "600", color: ThemeData.textColor, marginLeft: 5 }}>
                  {formatDate(subCategory.updatedAt)}
                </Text>
              </View>
            </Block>
          </Block>
          <Block style={{ textAlign: "right", marginRight: 10 }}>
            <Text style={{ fontWeight: "700", color: ThemeData.textColor, fontSize: 13 }}>
              ₹ {subCategory.price}
            </Text>
            {/* <Text style={{ fontWeight: "700", color: ThemeData.textColor, fontSize: 13 }}>
              {subCategory.unit}
            </Text> */}
          </Block>
        </Block>
      </TouchableOpacity>
    ));
  });

    const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${today.getFullYear()}`;

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



          {/* <ScrollView
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
          </ScrollView> */}

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
  
          { filteredData.length === 0 ? (
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
                  Live Market rates as of <Text style={{ color: ThemeData.color }}>{formattedDate}</Text>
                </Text>
  
                <FlatList
                  data={displayedData}
                  renderItem={renderMarketItem}
                  keyExtractor={(item) => item._id}
                  contentContainerStyle={{ paddingHorizontal: 10 }}
                />
              </View>
  
             
            </View>
          )}
  
          <WholesalerMarketModal
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

export default WholesalerRates;
