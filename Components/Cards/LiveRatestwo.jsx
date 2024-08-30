import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { Block, Text } from "galio-framework";
import axios from "axios";
import MarketModal from "./MarketModal";
import logo from "./scrap-img.jpeg";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Base_url } from "../../Config/BaseUrl";
import icon from "./trend.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../../Context/AppContext";


const LiveRatestwo = () => {
  const { favouriteMandi, setFavouriteMandi, updateMandi } = useAppContext();
  const [selectedState, setSelectedState] = useState("All"); // Default to 'All'
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [marketRates, setMarketRates] = useState([]);
  const [favoriteMandis, setFavoriteMandis] = useState([]);
  const [visibleItems, setVisibleItems] = useState(4);
  const [priceDifferences, setPriceDifferences] = useState({});
  const [userId, setUserId] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const getAllData = async () => {
    try {
      const response = await axios.get(`${Base_url}api/mandi_rates/all-data`);
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

      for (const item of filteredData) {
        for (const priceItem of item.categoryPrices) {
          fetchPriceDifference(item.mandi._id, priceItem.category);
        }
      }
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  };

  const fetchPriceDifference = async (mandiId, category) => {
    try {
      const response = await axios.get(
        `${Base_url}api/mandi_rates/price-difference/${mandiId}/${category}`
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
      const response = await axios.get(`${Base_url}api/b2b/${userId}/mandis`);
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
      setUserId(data._id);
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

  // Add 'All' to the states array
  const states = [
    "All",
    "Favourite",
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
                style={{ fontWeight: "700", color: "#002379", fontSize: 13 }}
              >
                {item.mandi?.mandiname || "Unknown Mandi"}
              </Text>
              <Text style={{ fontSize: 13, fontWeight: "600" }}>
                {priceItem.category}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "600" }}>
                {formatDate(item.updatedAt)}
              </Text>
            </Block>
            <Block style={{ textAlign: "right" }}>
              <Text
                style={{ fontWeight: "500", color: "#002379", fontSize: 13 }}
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
      );
    });

  return (
      <ScrollView>
            <View >
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
              marginRight: 10,
              padding: 10,
              backgroundColor: selectedState === state ? "#239456" : "#fff",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: selectedState === state ? "#fff" : "black" }}>
              {state}
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
       
          
          <FlatList
            data={displayedData}
            renderItem={renderMarketItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
          
        
  
        {filteredData.length > visibleItems ? (
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
        )}
        
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
    </View>
        </ScrollView>
  );
};

export default LiveRatestwo;
