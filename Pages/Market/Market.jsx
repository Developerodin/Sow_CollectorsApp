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
import { Block, Text, Input, theme, Button, Checkbox } from "galio-framework";
import { Header } from "../../Components/Header/Header";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../Context/AppContext";
import { MarketRatesCard } from "../../Components/Cards/MarketRatesCard";
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";
import Modal from "react-native-modal";
import { ThemeData } from "../../Theme/Theme";

export const Market = () => {
  const navigation = useNavigation();
  const City = [
    "Jaipur",
    "Hayderabad",
    "Delhi",
    "Uttar Pradesh",
    "Mumbai",
    "Ranchi",
    "Udaipur",
  ];
  const Category = ["Glass", "Electronic"];
  const { update, userDetails } = useAppContext();
  const [expanded, setExpanded] = useState(false);
  const [expanded4, setExpanded4] = useState(false);
  const [CityExpand, setCityExpand] = useState(false);
  const [Timeexpanded, setTimeExpanded] = useState(false);
  const [Addressexpanded, setAddressExpanded] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const [selectedCity, setselectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [AllVendorsData, setVendorsData] = useState([]);
  const [CollectorsData, setCollectorsData] = useState([]);
  const [WholesalersData, setWholesalersData] = useState([]);
  const [MediatorsData, setMediatorsData] = useState([]);
  const [FactoryData, setFactoryData] = useState([]);
  const [CategoriesData, setCategoriesData] = useState([]);
  const [selectedSubCategoriesData, setSelectedSubCategoriesData] = useState([]);
  const [refreshData, setRefreshData] = useState(0);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [subCategoryModalVisible, setSubCategoryModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [city, setCity] = useState([]);
  const [uniqueCity, setUniqueCity] = useState([]);
  const [userId, setUserId] = useState("");
  

  useEffect(() => {
    getCategories();
  }, []);

  // const getCategories = async () => {
  //   try {
  //     const response = await axios.get(`${Base_url}api/category`);
  //     setCategoriesData(response.data);
  //     // console.log("Categories all", response.data)
  //     return response.data;
  //   } catch (error) {
  //     throw error.response.data;
  //   }
  // };

  const getCategories = async () => {
      
    try {
      const response = await axios.get(`${Base_url}categories`);
      setCategoriesData(response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const getSubCategoryById = async (id) => {
    console.log('getSubCategoryById ==>', id);
    try {
      const response =  await axios.get(`${Base_url}subcategories/category/${id}`);;
      console.log("SubCategory data", response.data)
      setSelectedSubCategoriesData(response.data);
     
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handeViewDetail = (id, subIndex, categoryIndex) => {
    navigation.navigate("Rate Details", {
      itemId: id,
      subIndex: subIndex,
      categoryIndex: categoryIndex,
    });
  };

  const handelSubmit =( userId, selectedCategory, selectedSubCategory, selectedCity) => {
    console.log("button clicked");
    
    navigation.navigate("MediatorRates", {
      userId: userId,
      categoryName: selectedCategory,
      subCategoryName: selectedSubCategory,
      city: selectedCity,
    });
    resetFilterData();
  };

  //  const data = {
  //   userId : userDetails.id,
  //   categoryName: selectedCategory,
  //   subCategoryName: selectedSubCategory,
  //   city: selectedCity,
  // };
  
  // console.log("Data ==>", data);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };
  const toggleAccordion4 = () => {
    setExpanded4(!expanded4);
  };
  const toggleCityAccordion = () => {
    setCityExpand(!CityExpand);
  };

  const handelCity = (city) => {
    setselectedCity(city);
    toggleCityAccordion();
  };


  const handleCategorySelection = (name, id) => {
    // console.log(`Category selected: ${name}, ID: ${id}`);
    setSelectedSubCategoriesData([]);
    setSelectedCategory(name);  // Set the selected category name
    setSelectedCategories([id]);  // Store the selected category ID (you can allow multiple selections if needed)
    getSubCategoryById(id);  // Fetch subcategories after selecting the category
    toggleAccordion();  // Close the category accordion after selection
    setCategoryModalVisible(false);
    setSelectedSubCategory("");  // Clear the selected subcategory name
  setSelectedSubCategories([]);

  };
  
  
  
  const handleSubCategorySelection = (name, id) => {
    // console.log(`Subcategory selected: ${name}, ID: ${id}`);
    setSelectedSubCategory(name);  // Set the selected subcategory name
    setSelectedSubCategories([id]);  // Store the selected subcategory ID
    toggleAccordion4();  // Close the subcategory accordion after selection
    setSubCategoryModalVisible(false);
  };



  const handelClose = () => {
    setCategoryModalVisible(false);
  };

  const handelClosetwo = () => {
    setSubCategoryModalVisible(false);
  };

  const fetchCities = async () => {
    try {
      const response = await axios.post(`${Base_url}b2bUser/address/citystate`);
      // console.log("City data before filtering", response.data.data.uniqueCities);
      
      // Filter out null values
      const filteredCities = response.data.data.uniqueCities.filter(city => city !== null);
      
      // console.log("City data after filtering", filteredCities);
      setCity(filteredCities);
      return filteredCities;
    } catch (error) {
      console.log("Error in fetching cities", error);
      throw error.response.data;
    }
  };

 

  const fetchB2BUser = async () => {
    try {
      const response = await axios.get(`${Base_url}api/b2b`);

      if (response.status === 200) {
        const fetchedB2BUsers = response.data;

        setVendorsData(fetchedB2BUsers);
        const MediatorsData = fetchedB2BUsers.filter((el) => {
          return el.registerAs === "Mediators";
        });

        const WholesalersData = fetchedB2BUsers.filter((el) => {
          return el.registerAs === "Wholesalers";
        });

        const FactoryData = fetchedB2BUsers.filter((el) => {
          return el.registerAs === "Factory";
        });

        const CollectorsData = fetchedB2BUsers.filter((el) => {
          return el.registerAs === "Collectors";
        });
        // console.log("MediatorsData ===>", MediatorsData);

        setMediatorsData(MediatorsData);
        // setWholesalersData(WholesalersData);
        // setFactoryData(FactoryData);
        // setCollectorsData(CollectorsData);
      } else {
        console.error("Error fetching categories:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const filterData = (category, subCategory, city) => {
    // Filter data based on selectedCategory, selectedSubCategory, and selectedCity
    let filteredData = AllVendorsData;

    if (category && subCategory) {
      filteredData = filteredData.filter((vendor) => {
        // Check if the vendor has the specified category

        const hasCategory = vendor.categories.some(
          (cat) => cat.name === category
        );

        if (hasCategory) {
          // If the vendor has the specified category, filter the subcategories
          const filteredSubCategories = vendor.categories
            .filter((cat) => cat.name === category)
            .flatMap((cat) => cat.sub_category) // Adjust the property name here
            .filter((sub) => sub.name === subCategory);

          // Return true only if there is at least one matching subcategory
          // console.log("Vendor data in filter  ==>", filteredSubCategories);
          return filteredSubCategories.length > 0;
        }

        return false;
      });

      // console.log("Vendor data in filter  ==>", filteredData);
    }

    if (city) {
      filteredData = filteredData.filter(
        (vendor) => vendor.city && vendor.city.toLowerCase() === city && city.toLowerCase()
      );
      // console.log("Filter data  cat and subcategory ==>",filteredData)
    }
    // console.log("filer data >>  ", filteredData);
    const MediatorsData = filteredData.filter((el) => {
      return el.registerAs === "Mediators";
    });

    const WholesalersData = filteredData.filter((el) => {
      return el.registerAs === "Wholesalers";
    });

    const FactoryData = filteredData.filter((el) => {
      return el.registerAs === "Factory";
    });

    const CollectorsData = filteredData.filter((el) => {
      return el.registerAs === "Collectors";
    });

    if (category && subCategory) {
      setMediatorsData(MediatorsData);
      setWholesalersData(WholesalersData);
      setFactoryData(FactoryData);
      setCollectorsData(CollectorsData);
    }
    return filteredData;
  };

  const resetFilterData = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setselectedCity("");
    
    setSelectedCategories([]);
    setMediatorsData([]);
    setWholesalersData([]);
    setFactoryData([]);
    setCollectorsData([]);
    setRefreshData((prev) => prev + 1);
    return;
  };

  const userDetailsFromStorage = async (token) => {
    // console.log("Token in user details check ===>",token)
    try {
      const Details = (await AsyncStorage.getItem("userDetails")) || null;
      // console.log("step 6 ===>",Details)
      const ParseData = JSON.parse(Details);
      setUserId(ParseData.id);
      // console.log("User Data 1 ==>", userId);

      // console.log("Parse Data of user  ===>", ParseData);
      const data = ParseData;
      // console.log("User Data 2 ==>", data);
      if (data) {
        setselectedCity(data.city);
        // handelCategory('Iron','66910a952bc19d639b4f2a9c')
        // handelSubCategory('Iron - HMS')
        // setselectedCategory('Iron')
        // setselectedSubCategory('')
      }

      return;
    } catch (err) {
      console.log("Error in getting user ==.", err);
    }
  };

  useEffect(() => {
    fetchB2BUser();
    getCategories();
    userDetailsFromStorage();
    fetchCities();
    // console.log("User Data ", userDetails);
  }, [refreshData, update]);

  useEffect(() => {
    // console.log("Selected Data",selectedCategory,selectedSubCategory,selectedCity)
    filterData(selectedCategory, selectedSubCategory, selectedCity);
  }, [selectedCategory, selectedSubCategory, selectedCity]);

  const uniqueCitySet = new Set();

  const sortSubCategories = (subCategories) => {
    return subCategories.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  const sortData = (data) => {
    return data.sort((a, b) => {
      const aSubCategory = a.categories
        .flatMap((cat) => cat.sub_category)
        .find((sub) => sub.name === selectedSubCategory);
      const bSubCategory = b.categories
        .flatMap((cat) => cat.sub_category)
        .find((sub) => sub.name === selectedSubCategory);

      if (!aSubCategory || !bSubCategory) return 0;

      if (sortOrder === "asc") {
        return aSubCategory.price - bSubCategory.price;
      } else {
        return bSubCategory.price - aSubCategory.price;
      }
    });
  };

  const handleSortPress = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleResetPress = () => {
    setSortOrder("asc");
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

  return (
    <View style={styles.container}>
      
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* <Block style={{ padding: 10 }}> */}
          <Block
            style={{
              marginTop: 40,
              padding: 20,
              borderColor: "#E4E4E4",
            }}
          >
            <Block
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 23, marginTop: 10,color: ThemeData.textColor,fontWeight: 600 }}>Sell your Scrap</Text>

              <Block style={{ marginTop: 10 ,borderRadius:50 ,borderColor:ThemeData.textColor,borderWidth: 1 ,backgroundColor: 'black' ,padding: 5}}>
                <TouchableOpacity>
                  <Ionicons
                    name="refresh"
                    size={24}
                    color={ThemeData.buttonColor}
                    onPress={resetFilterData}
                    style={{ transform: [{ rotate: "45deg" }] }}
                  />
                </TouchableOpacity>
              </Block>
            </Block>
            <Block style={{ marginTop: 20 }}>
            <Text style={styles.subtitle1}>Category</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#A6A6A6",
                  padding: 10,
                  backgroundColor: ThemeData.containerBackgroundColor,

                  borderRadius: 10,
                }}
              >
               <TouchableOpacity activeOpacity={0.7} onPress={() => setCategoryModalVisible(true)}>
               
        <View style={styles.Space_Between}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: `${selectedCategory !== "" ? ThemeData.textColor : "#B7B7B7"}` }}>
              {selectedCategory !== "" ? selectedCategory : "Select Category"}
            </Text>
          </View>
          <View>
            {expanded ? (
            <MaterialIcons name="keyboard-arrow-up" size={28} color={ThemeData.textColor} />
            ) : (
              <MaterialIcons name="keyboard-arrow-down" size={28} color={ThemeData.textColor}  />
            )}
          </View>
        </View>
      </TouchableOpacity>
      </View>

      <Modal isVisible={categoryModalVisible} animationType="slide" transparent={true}
      
      onSwipeComplete={() => setCategoryModalVisible(false)}
      backdropOpacity={0.1}
      onBackdropPress={() => setCategoryModalVisible(false)}
      swipeDirection={["down"]}
      style ={styles.viewHalf}>
        <View >

  <View style={styles.modalContainer}>
    <Text style={{fontSize:25 ,alignSelf : 'flex-start',marginLeft: 22,fontWeight: 700}}>Select Category</Text>
  <Block right style={{ width: width * 0.8 }}>
            <Ionicons
              onPress={handelClose}
              name="close-circle"
              size={26}
              color={ThemeData.textColor} 
              style={{marginTop: -25}}
            />
          </Block>
          <Block
            style={{
             
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "start",
              width: width * 0.9,
              padding: 12,
              marginBottom: 40,
            }}
          >
        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',marginBottom : 30 }}>
      {CategoriesData.map((el, index) => (
        <TouchableOpacity key={index} onPress={() => handleCategorySelection(el.name, el._id)}>
          <View style={[styles.categoryItem, selectedCategories.includes(el._id) && styles.selectedCategory]}>
            <Text style={{ fontSize: 14,fontWeight: 500, color: selectedCategories.includes(el._id) ? "#fff" : "#000" }}>
              {el.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </Block>
    {/* <TouchableOpacity onPress={handleSaveCategory} style={styles.saveButton}>
      <Text style={styles.saveButtonText}>Done</Text>
    </TouchableOpacity> */}
  </View>
  </View>
</Modal>

<Block >
              <View>

      {selectedCategory !== "" && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.subtitle1}>Sub-Category</Text>
          <View style={styles.subCategoryContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setSubCategoryModalVisible(true)}>
              <View style={styles.Space_Between}>
                
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 18, color: `${selectedSubCategory !== "" ? ThemeData.textColor  : "#B7B7B7"}` }}>
                    {selectedSubCategory !== "" ? selectedSubCategory : "Select Sub Category"}
                  </Text>
                </View>
                <View>
                  {expanded4 ? (
                    <MaterialIcons name="keyboard-arrow-up" size={28} color={ThemeData.textColor}  />
                  ) : (
                    <MaterialIcons name="keyboard-arrow-down" size={28} color={ThemeData.textColor}  />
                  )}
                </View>
              </View>
            </TouchableOpacity>

            <Modal isVisible={subCategoryModalVisible} animationType="slide" 
            transparent={true}
      
            onSwipeComplete={() => setSubCategoryModalVisible(false)}
            backdropOpacity={0.1}
            onBackdropPress={() => setSubCategoryModalVisible(false)}
            swipeDirection={["down"]} 
            style={styles.viewHalf}>
        <View >
  <View style={styles.modalContainer}>
  <Block right style={{ width: width * 0.8 }}>
    <Text style={{fontSize: 20,fontWeight: 700,alignSelf : 'flex-start',marginLeft: 20}}>Select Sub Category</Text>
            <Ionicons
              onPress={handelClosetwo}
              name="close-circle"
              size={24}
              color={ThemeData.textColor} 
              style={{marginTop: -25}}
            />
          </Block>
          <Block
            style={{
             
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "start",
              width: width * 0.9,
              padding: 12,
              marginBottom: 40,
            }}
          >
        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',marginBottom : 50 }} showsVerticalScrollIndicator={false}>
          {selectedSubCategoriesData.length > 0 ? (
        selectedSubCategoriesData.map((el, index) => (
          (el.isTradable || el.isTradable==="true")  &&
          <TouchableOpacity key={index} onPress={() => handleSubCategorySelection(el.name, el._id)}>
            <View style={[styles.categoryItem, selectedSubCategories.includes(el._id) && styles.selectedCategory]}>
              <Text style={{ fontSize: 14, fontWeight: 600, color: selectedSubCategories.includes(el._id) ? ThemeData.activeColor : ThemeData.textColor }}>
                {el.name}
              </Text>
            </View>
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
    {/* <TouchableOpacity onPress={handleSaveSubCategory} style={styles.saveButton}>
      <Text style={styles.saveButtonText}>Done</Text>
    </TouchableOpacity> */}
  </View>
  </View>
</Modal>

          </View>
        </View>
      )}
      </View>
    </Block>
    
            

            <Block style={{ marginTop: 20 }}>
            <Text style={styles.subtitle1}>Select City</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#A6A6A6",
                  padding: 10,
                  backgroundColor: "#fff",

                  borderRadius: 10,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={toggleCityAccordion}
                >
                  <Block style={styles.Space_Between}>
                    <Block
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontSize: 18, color: "black" }}>
                        {selectedCity !== "" ? selectedCity : "Select City"}
                      </Text>
                    </Block>

                    <Block>
                      {CityExpand ? (
                        <MaterialIcons
                          name="keyboard-arrow-up"
                          size={28}
                          color="black"
                        />
                      ) : (
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={28}
                          color="black"
                        />
                      )}
                    </Block>
                  </Block>
                </TouchableOpacity>
                {CityExpand && (
                  <View style={{ height: `${city && city.length < 3 ? 100 : 300}` }}>
                                       <ScrollView showsVerticalScrollIndicator={false}>
                      {city.map((el, index) => (
                        <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={() => handelCity(el)}
                          key={index}
                          style={[styles.Space_Between, { marginTop: 10 }]}
                        >
                          <Text style={{ fontSize: 18 }}>
                            {el}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </Block>
          </Block>

          <Block style={{ marginBottom: 60 }}>
            

            <Block style={{ marginTop: 40 }}>
              <TouchableOpacity onPress={() => handelSubmit(userId, selectedCategory, selectedSubCategory, selectedCity)}>
              <Block style={styles.btn}>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                Submit
                </Text>
              </Block>
              </TouchableOpacity>
              </Block>

            {userDetails.registerAs === "Collectors" &&
              WholesalersData &&
              (sortData([...WholesalersData]).length > 0 ? ( // Use sortData here
                sortData([...WholesalersData]).map((el, index) => {
                  // Use the sorted data for mapping
                  if (el.categories && el.categories.length > 0) {
                    return el.categories.map((category, categoryIndex) => {
                      if (
                        category.sub_category &&
                        category.sub_category.length > 0
                      ) {
                        const sortedSubCategories = sortSubCategories([
                          ...category.sub_category,
                        ]); // Sort sub-categories if needed
                        return sortedSubCategories.map((item, subIndex) => {
                          if (selectedSubCategory === item.name) {
                            return (
                              <TouchableOpacity
                                key={`${el._id}-${categoryIndex}-${subIndex}`}
                                onPress={() =>
                                  handeViewDetail(
                                    el._id,
                                    subIndex,
                                    categoryIndex
                                  )
                                }
                              >
                                <MarketRatesCard
                                  Title={el.name}
                                  Value={item.price}
                                  CreatedAt={convertUTCToIST(el.updatedAt)}
                                />
                              </TouchableOpacity>
                            );
                          }
                          return null;
                        });
                      }
                      return null;
                    });
                  }
                  return null;
                })
              ) : (
                <Block center>
                  <Text style={{ fontSize: 16, color: "grey", marginTop: 30 }}>
                    No Wholesalers Available Right Now
                  </Text>
                </Block>
              ))}

            {userDetails.registerAs === "Wholesalers" &&
              MediatorsData &&
              (sortData(MediatorsData).length > 0 ? (
                sortData(MediatorsData).map((el, index) => {
                  if (el.categories && el.categories.length > 0) {
                    return el.categories.map((category, categoryIndex) => {
                      if (
                        category.sub_category &&
                        category.sub_category.length > 0
                      ) {
                        return category.sub_category.map((item, subIndex) => {
                          if (selectedSubCategory === item.name) {
                            return (
                              <TouchableOpacity
                                key={`${el._id}-${categoryIndex}-${subIndex}`}
                                onPress={() =>
                                  handeViewDetail(
                                    el._id,
                                    subIndex,
                                    categoryIndex
                                  )
                                }
                              >
                                <MarketRatesCard
                                  Title={el.name}
                                  Value={item.price}
                                  CreatedAt={convertUTCToIST(item.updatedAt)}
                                  subCategory={item.name}
                                />
                              </TouchableOpacity>
                            );
                          }
                          return null;
                        });
                      }
                      return null;
                    });
                  }
                  return null;
                })
              ) : (
                <Block center>
                  <Text style={{ fontSize: 16, color: "grey", marginTop: 30 }}>
                    No Mediators Available Right Now
                  </Text>
                </Block>
              ))}

            {userDetails.registerAs === "Mediators" &&
              FactoryData &&
              (sortData([...FactoryData]).length > 0 ? ( // Sort the FactoryData before mapping
                sortData([...FactoryData]).map((el, index) => {
                  // Use the sorted data for mapping
                  // Check if categories is an array and not empty
                  if (el.categories && el.categories.length > 0) {
                    return el.categories.map((category, categoryIndex) => {
                      // Check if sub_category exists in the current category
                      if (
                        category.sub_category &&
                        category.sub_category.length > 0
                      ) {
                        const sortedSubCategories = sortSubCategories([
                          ...category.sub_category,
                        ]); // Sort sub-categories if needed
                        return sortedSubCategories.map((item, subIndex) => {
                          if (selectedSubCategory === item.name) {
                            return (
                              <TouchableOpacity
                                key={`${el._id}-${categoryIndex}-${subIndex}`}
                                onPress={() =>
                                  handeViewDetail(
                                    el._id,
                                    subIndex,
                                    categoryIndex
                                  )
                                }
                              >
                                <MarketRatesCard
                                  Title={el.name}
                                  Value={item.price}
                                  CreatedAt={convertUTCToIST(el.updatedAt)}
                                />
                              </TouchableOpacity>
                            );
                          }
                          return null;
                        });
                      }
                      return null;
                    });
                  }
                  return null;
                })
              ) : (
                <Block center>
                  <Text style={{ fontSize: 16, color: "grey", marginTop: 30 }}>
                    No Factory Available Right Now
                  </Text>
                </Block>
              ))}

            {userDetails.registerAs === "Factory" &&
              FactoryData &&
              (sortData([...FactoryData]).length > 0 ? ( // Sort the FactoryData before mapping
                sortData([...FactoryData]).map((el, index) => {
                  // Use the sorted data for mapping
                  // Check if categories is an array and not empty, and if the current item is not the user's own data
                  if (
                    el.categories &&
                    el.categories.length > 0 &&
                    el._id !== userDetails._id
                  ) {
                    return el.categories.map((category, categoryIndex) => {
                      // Check if sub_category exists in the current category
                      if (
                        category.sub_category &&
                        category.sub_category.length > 0
                      ) {
                        const sortedSubCategories = sortSubCategories([
                          ...category.sub_category,
                        ]); // Sort sub-categories if needed
                        return sortedSubCategories.map((item, subIndex) => {
                          if (selectedSubCategory === item.name) {
                            return (
                              <TouchableOpacity
                                key={`${el._id}-${categoryIndex}-${subIndex}`}
                                onPress={() =>
                                  handeViewDetail(
                                    el._id,
                                    subIndex,
                                    categoryIndex
                                  )
                                }
                              >
                                <MarketRatesCard
                                  Title={el.name}
                                  Value={item.price}
                                  CreatedAt={convertUTCToIST(el.updatedAt)}
                                />
                              </TouchableOpacity>
                            );
                          }
                          return null;
                        });
                      }
                      return null;
                    });
                  }
                  return null;
                })
              ) : (
                <Block center>
                  <Text style={{ fontSize: 16, color: "grey", marginTop: 30 }}>
                    No Factory Available Right Now
                  </Text>
                </Block>
              ))}
          </Block>
        </Block>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
  subtitle1: {
    color: "black",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,  

    textAlign: "left",
    
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
    height: 55,
    borderRadius: 8,
    backgroundColor: "#000",
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
  modalContainer: {
    
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 1,
    height: height - 380,
  },
  
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#239456",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  subCategoryContainer: {
    borderWidth: 1,
    borderColor: "#A6A6A6",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -50,
  },
  viewHalf: {
    
    justifyContent: "flex-end",
    margin: 0,
  },
  saveButton: {
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    borderRadius: 5,
    alignItems: "center",
    
    alignSelf:'flex-end',
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  categoryItem : {
    flexBasis: '30%', // Adjust the percentage to fit the number of items per row
    padding: 10,
    margin: 5,
    backgroundColor: '#DBDBDB4D', // Normal box color
    borderRadius: 15,
    
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#000', // Selected box color
    
  },
});
