import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  RefreshControl,
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
import { Header } from "../../Components/Header/Header";
import HamburgerMenu from "../../Components/HamburgerMenu/HamburgerMenu ";
const { width, height } = Dimensions.get("window");
import LottieView from "lottie-react-native";
import { useAppContext } from "../../Context/AppContext";
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";
import { useNavigation, useRoute } from "@react-navigation/native";
import logo from "./scrap-img.jpeg";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import icon from "./trend.png";
import Marketmodal from "./Marketmodal";


export const LiveRating = () => {
  const animationRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { value } = route.params;
  const { userDetails, update } = useAppContext();
  const [CategoriesData, setCategoriesData] = useState([]);
  const [categoryLength, setCategoryLength] = useState(4);
  const [categorySeetype, setCategorySeetype] = useState(false);
  const [Data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [marketRateLength, setmarketRateLength] = useState(2);
  const [marketRateSeetype, setmarketRateSeetype] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [mandiId, setMandiId] = useState(null);
  const [priceDifferences, setPriceDifferences] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
   
   

  const onRefresh = () => {
    setRefreshing(true);
    // Call your functions here
    getCategories();
    fetchMarketRates();
    // After fetching data, set refreshing to false
    setRefreshing(false);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${Base_url}api/category`);
      setCategoriesData(response.data);
      console.log("Categories all", response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handelMarketRateLength = () => {
    setmarketRateSeetype(true);
    setmarketRateLength(CategoriesData.length);
  };
  const handelMarketRateLength2 = () => {
    setmarketRateSeetype(false);
    setmarketRateLength(2);
  };
  const handelCategoryPress = () => {
    if (userDetails.registerAs === "Collectors") {
      navigation.navigate("Market");
      return;
    }

    navigation.navigate("My Rates");
  };

  const fetchPriceDifference = async (mandiId, value) => {
    try {
      const response = await axios.get(
        `${Base_url}api/mandi_rates/price-difference/${mandiId}/${value}`
      );
      console.log("Response data:", response.data);
      if (response.data) {
        setPriceDifferences((prevState) => ({
          ...prevState,
          [`${mandiId}-${value}`]: response.data,
        }));
      } else {
        setPriceDifferences((prevState) => ({
          ...prevState,
          [`${mandiId}-${value}`]: "No data available",
        }));
      }
    } catch (error) {
     
      setPriceDifferences((prevState) => ({
        ...prevState,
        [`${mandiId}-${value}`]: "Error fetching data",
      }));
    }
  };

  const fetchMarketRates = async ({ value }) => {
    try {
      const response = await axios.get(
        `${Base_url}api/mandi_rates/mandi/category/${value}`
      );
      console.log("Fetched Market Rates:", response.data);
      const Data = response.data;
  
      // Step 1: Filter the data based on the category
      const filteredData = Data.filter(
        (el) => el.mandi !== null && el.categoryPrices.some((cat) => cat.category === value)
      );
  
      // Step 2: Create a map to track the latest price for each mandi and category
      const latestPriceMap = {};
  
      filteredData.forEach((item) => {
        item.categoryPrices.forEach((catPrice) => {
          if (catPrice.category === value) {
            const key = `${item.mandi._id}-${catPrice.category}`;
            if (!latestPriceMap[key] || new Date(latestPriceMap[key].updatedAt) < new Date(item.updatedAt)) {
              latestPriceMap[key] = { ...item, categoryPrice: catPrice };
            }
          }
        });
      });
  
      // Step 3: Convert the map back to an array
      const latestData = Object.values(latestPriceMap).map((entry) => ({
        ...entry,
        categoryPrices: [entry.categoryPrice],
      }));
  
      setMandiId(latestData[0]?.mandi?._id);
      setData(latestData);
      setFilteredData(latestData);
  
      
      for (const item of latestData) {
        for (const priceItem of item.categoryPrices) {
          fetchPriceDifference(item.mandi._id, priceItem.category);
        }
      }
    } catch (error) {
      
    }
  };
  

  useEffect(() => {
    fetchMarketRates({ value });
  }, [value]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year < 10 ? `0${year}` : year;

    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filterData = () => {
    console.log("Data:", Data);
    console.log("Search Query:", searchQuery);

    if (searchQuery.trim() === "") {
      setFilteredData(Data);
    } else {
      const filtered = Data.filter(
        (el) =>
          el.mandi &&
          el.mandi.mandiname &&
          el.mandi.mandiname
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase())
      );
      console.log("Filtered Data:", filtered);
      setFilteredData(filtered);
    }
  };

  const handleItemPress = (item) => {
    console.log("Selected Item:", item);
    setSelectedItem(item);
    setModalVisible(true);

  };

  const closeModel = () => {
    setModalVisible(false);
  };


  const sortData = () => {
    let sortedData = [...filteredData];

    if (sortOrder === "lowToHigh") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      sortedData.sort((a, b) => b.price - a.price);
    }

    setFilteredData(sortedData);
  };

  const handleSortPress = () => {
    if (sortOrder === null || sortOrder === "highToLow") {
      setSortOrder("lowToHigh");
    } else {
      setSortOrder("highToLow");
    }
  };

  const sortedData = [...Data].sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.categoryPrices[0].price - b.categoryPrices[0].price;
    } else if (sortOrder === "highToLow") {
      return b.categoryPrices[0].price - a.categoryPrices[0].price;
    }
    return 0;
  });

  const handleResetPress = () => {
    setSearchQuery("");
    setSortOrder(null);
    setFilteredData(Data);
  };

  useEffect(() => {
    sortData();
  }, [sortOrder]);

  useEffect(() => {
    animationRef.current?.play();

    
    animationRef.current?.play(10, 80);
  }, []);

  useEffect(() => {
    filterData();
  }, [searchQuery, Data]);

  useEffect(() => {
    getCategories();
  }, [update]);

  const dataToDisplay = searchQuery.trim() === "" ? sortedData : filteredData;

  const priceDifference = priceDifferences[`${mandiId}-${value}`];

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Block style={{ backgroundColor: "#FAFAFA", padding: 10 }}>
          <Block
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Block>
              <TextInput
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  paddingLeft: 10,
                  width: width * 0.7,
                  borderRadius: 20,
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Block>

            <Block
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
                onPress={handleSortPress}
                style={{
                  padding: 6,
                  backgroundColor: "teal",
                  borderRadius: 12,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Text style={{fontSize:16,marginRight:10,color:"#fff"}}>Sort</Text> */}
                <FontAwesome5 name="sort" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleResetPress}
                style={{
                  marginLeft: 10,
                  marginRight: 20,
                  padding: 6,
                  backgroundColor: "teal",
                  borderRadius: 12,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Text style={{fontSize:16,marginRight:10,color:"#fff"}}>Reset</Text> */}
                <Feather name="refresh-ccw" size={22} color="#fff" />
              </TouchableOpacity>
            </Block>
          </Block>

          {dataToDisplay && dataToDisplay.length > 0 ? (
            dataToDisplay.map((item, index) => (
              <TouchableOpacity onPress={() => handleItemPress(item)} key={index} style={{ marginTop: 20, flex: 1 }}>
                <Block
                  
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    padding: 5,
                    borderWidth: 1,
                    borderColor: "#C8C8C8",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Block>
                    <Image
                      source={logo}
                      style={{ resizeMode: "cover", width: 50, height: 50 }}
                      
                    />
                  </Block>
                  <Block style={{ width: "60%", marginLeft: 15 }}>
                    <Text
                      style={{
                        fontWeight: "700",
                        color: "#002379",
                        fontSize: 13,
                      }}
                    >
                      {item.mandi ? item.mandi.mandiname : "N/A"}
                    </Text>
                    <Text style={{ fontSize: 13, fontWeight: "600" }}>
                      {item.categoryPrices[0].category}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: "600" }}>
                      {item.mandi ? formatDate(item.mandi.createdAt) : "N/A"}
                    </Text>
                  </Block>
                  <Block style={{ textAlign: "right" }}>
                    <Text
                      style={{
                        fontWeight: "500",
                        color: "#002379",
                        fontSize: 13,
                      }}
                    >
                      ₹ {item.categoryPrices[0].price}
                    </Text>
                    {priceDifference && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      marginRight: 5,
                      fontSize: 13,
                      color:
                        priceDifference.tag === "Increment"
                          ? "#239456"
                          : "#e41010",
                      fontWeight: 400,
                    }}
                  >
                    {priceDifference.percentChange}%
                  </Text>
                  <Image
                    source={icon}
                    style={{
                      width: 20,
                      height: 20,
                      transform: [
                        {
                          rotate:
                            priceDifference.tag === "Increment"
                              ? "0deg"
                              : "60deg",
                        },
                      ],
                    }}
                  />
                </View>
              )}
                  </Block>
                </Block>
              </TouchableOpacity>
            ))
          ) : (
            //   : <Text>No Data Available</Text>
            // }

            <Block center style={{ marginTop: 40 }}>
              <Image
                source={require("../../assets/media/5-dark.png")}
                style={{
                  width: 300,
                  height: 300,
                  marginRight: 10,
                }}
              />
              <Text>No Rates Availabel For {value}</Text>
            </Block>
          )}
        </Block>
      </ScrollView>
      <Marketmodal
        modalVisible={modalVisible}
        selectedItem={selectedItem}
        onClose={closeModel}
        setModalVisible={setModalVisible}
        formatDate={formatDate}
        formatTime={formatTime}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gridcontainer: {
    flexDirection: "row", // This makes the children align in a row
    flexWrap: "wrap", // This allows items to wrap to the next line if there's not enough space
    justifyContent: "space-between",
  },
  gridcolumn: {
    width: "48%", // You can adjust the width based on your preference
    marginBottom: 10, // Add some margin between columns
  },
  gridItem: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
  },
  itemText: {
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  lottie: {
    width: 150,
    height: 150,
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
  row: {
    flexDirection: "row",
    marginTop: 10, // This will create a row of items
  },
  column: {
    flex: 1, // Each column should take up equal space
    alignItems: "center", // Center items horizontally
    justifyContent: "space-between",
    // Center items vertically
  },
  gridItem: {
    width: 170,
    height: 75,
    backgroundColor: "#fff",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ea5932",
    borderRadius: 10,
  },
  itemText: {
    color: "#ea5932",
    fontSize: 17,
  },
});
