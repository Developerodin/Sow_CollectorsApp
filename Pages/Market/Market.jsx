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

  const [selectedCity, setselectedCity] = useState("");
  const [selectedCategory, setselectedCategory] = useState("");
  const [selectedSubCategory, setselectedSubCategory] = useState("");
  const [AllVendorsData, setVendorsData] = useState([]);
  const [CollectorsData, setCollectorsData] = useState([]);
  const [WholesalersData, setWholesalersData] = useState([]);
  const [MediatorsData, setMediatorsData] = useState([]);
  const [FactoryData, setFactoryData] = useState([]);
  const [CategoriesData, setCategoriesData] = useState([]);
  const [SelectedSubCategoriesData, setSelectedSubCategoriesData] = useState([]);
  const [refreshData,setRefreshData] = useState(0)
  const getCategories = async () => {
    try {
      const response = await axios.get(`${Base_url}api/category`);
      setCategoriesData(response.data);
      console.log("Categories all", response.data)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const getCategoryById = async (id) => {
    try {
      const response = await axios.get(`${Base_url}api/category/${id}`);
      // setUpdate((prev) =>prev+1)
      setSelectedSubCategoriesData(response.data[0].sub_category)
      console.log("SubCategory data", response.data[0].sub_category)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handeViewDetail = (id,value) => {
    navigation.navigate("Rate Details", { itemId: id,index : value });
  };

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };
  const toggleAccordion4 = () => {
    setExpanded4(!expanded4);
  };
  const toggleCityAccordion = () => {
    setCityExpand(!CityExpand);
    
  };

  const handelCity = (data) => {
    setselectedCity(data);
    toggleCityAccordion();
  };
  const handelCategory = (data,id) => {
    setselectedCategory(data);
    if(id !== "0"){
      getCategoryById(id)
    }
    setselectedSubCategory("")
    setSelectedSubCategoriesData([])
    toggleAccordion();
  };

  const handelSubCategory = (data) => {
    setselectedSubCategory(data);
  
    toggleAccordion4();
  };

  const fetchB2BUser = async () => {
    try {
      const response = await axios.get(`${Base_url}api/b2b`);

      if (response.status === 200) {
        const fetchedB2BUsers = response.data;
        // setCategories(fetchedCategories);

        console.log("Fetch users == >", fetchedB2BUsers);

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

        // setMediatorsData(MediatorsData);
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
      filteredData = filteredData.filter((vendor) => vendor.category === category);

      filteredData = filteredData.map((vendor) => ({
        ...vendor,
        sub_category: vendor.sub_category.filter(sub => sub.name === subCategory)
      })).filter((vendor) => vendor.category === category && vendor.sub_category.length > 0);
    }
    
    if (city) {
      filteredData = filteredData.filter((vendor) => vendor.city.toLowerCase() === city.toLowerCase());
    }
    console.log(filteredData);
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

  const resetFilterData = ()=>{
 
    setselectedCategory("");
    setselectedSubCategory("")
    setselectedCity("")
    setMediatorsData([]);
    setWholesalersData([]);
    setFactoryData([]);
    setCollectorsData([]);
    setRefreshData((prev)=>prev+1)
    return ;
  }

  useEffect(() => {
    fetchB2BUser();
    getCategories()
    console.log("User Data ", userDetails);
  }, [refreshData,update]);


  useEffect(()=>{
    console.log("Selected Data",selectedCategory,selectedSubCategory,selectedCity)
    filterData(selectedCategory,selectedSubCategory,selectedCity);
  },[selectedCategory,selectedSubCategory,selectedCity])
         
  const uniqueCitySet = new Set();

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: "#F1F1F1" }}>
        <Block style={{ padding: 10 }}>
          <Block style={{borderBottomWidth:1,paddingBottom:20,borderColor:"#E4E4E4"}}>
            <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <Text style={{ fontSize: 23, marginTop: 20 }}>
                Live Market Rates
              </Text>

              <Block style={{marginTop:18}}>
                <TouchableOpacity >
                <Ionicons name="refresh" size={24} color="crimson" onPress={resetFilterData} />
                </TouchableOpacity>
              
              </Block>
            </Block>
            <Block style={{ marginTop: 20 }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#E4E4E4",
                  padding: 10,
                  backgroundColor: "#fff",
            
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity activeOpacity={0.7} onPress={toggleAccordion}>
                  <Block style={styles.Space_Between}>
                    <Block
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontSize: 20 }}>
                        {selectedCategory !== ""
                          ? selectedCategory
                          : "Select Category"}
                      </Text>
                    </Block>

                    <Block>
                      {expanded ? (
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
                {expanded && (
                  <View style={{ marginTop: 20 }}>
                    <Block style={[styles.Space_Between, { marginTop: 10 }]}>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => handelCategory("","0")}
                      >
                        <Text style={{ fontSize: 20 }}>None</Text>
                      </TouchableOpacity>
                    </Block>
                    {CategoriesData.map((el, index) => {
                      
                     
                         return (
                          <Block
                          key={index}
                          style={[styles.Space_Between, { marginTop: 10 }]}
                        >
                          <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => handelCategory(el.name,el._id)}
                          >
                            <Text style={{ fontSize: 20 }}>{el.name}</Text>
                          </TouchableOpacity>
                        </Block>
                         );
                     
                    
                    })}
                  </View>
                )}
              </View>
            </Block>

            <Block style={{ marginTop: 20 }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#E4E4E4",
                  padding: 10,
                  backgroundColor: "#fff",
               
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity activeOpacity={0.7} onPress={toggleAccordion4}>
                  <Block style={styles.Space_Between}>
                    <Block
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontSize: 20 }}>
                        {selectedSubCategory !== ""
                          ? selectedSubCategory
                          : "Select Sub Category"}
                      </Text>
                    </Block>

                    <Block>
                      {expanded4 ? (
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
                {expanded4 && (
                  <View style={{ marginTop: 20 }}>
                    <Block style={[styles.Space_Between, { marginTop: 10 }]}>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => handelSubCategory("")}
                      >
                        <Text style={{ fontSize: 20 }}>None</Text>
                      </TouchableOpacity>
                    </Block>
                    {SelectedSubCategoriesData && SelectedSubCategoriesData.map((el, index) => {
                      
                     
                         return (
                          <Block
                          key={index}
                          style={[styles.Space_Between, { marginTop: 10 }]}
                        >
                          <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => handelSubCategory(el.name)}
                          >
                            <Text style={{ fontSize: 20 }}>{el.name}</Text>
                          </TouchableOpacity>
                        </Block>
                         );
                     
                    
                    })}
                  </View>
                )}
              </View>
            </Block>

            <Block style={{ marginTop: 20 }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#E4E4E4",
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
                      <Text style={{ fontSize: 20 }}>
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
                  <View style={{ marginTop: 20 }}>
                    <Block style={[styles.Space_Between, { marginTop: 10 }]}>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => handelCity("")}
                      >
                        <Text style={{ fontSize: 20 }}>None</Text>
                      </TouchableOpacity>
                    </Block>
                    {AllVendorsData.map((el, index) => {
                       const lowerCaseCity = el.city.toLowerCase();

                       // Check if the lowercased category is not in the set, then add it to the set and render the JSX
                       if (!uniqueCitySet.has(lowerCaseCity)) {
                        uniqueCitySet.add(lowerCaseCity);
                     
                         return (
                          <Block
                          key={index}
                          style={[styles.Space_Between, { marginTop: 10 }]}
                        >
                          <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => handelCity(el.city)}
                          >
                            <Text style={{ fontSize: 20 }}>{el.city.toLowerCase()}</Text>
                          </TouchableOpacity>
                        </Block>
                         );
                       } else {
                         // If the lowercased category is already in the set, return null (no rendering)
                         return null;
                       }
                     
                    })}
                  </View>
                )}
              </View>
            </Block>
          </Block>

          <Block>
            {
              userDetails.registerAs === "Collectors" && WholesalersData && (WholesalersData.length > 0 ?
                WholesalersData.map((el, index) => {
                  return el.sub_category.length > 0 && el.sub_category.map((item,index)=>{
                    return  <TouchableOpacity key={index} onPress={()=>handeViewDetail(el._id,index)}>
                    <MarketRatesCard Title={el.name} Value={item.price} />
                  </TouchableOpacity>
              } 
               
              );
                })
              :
              <Block center>
                <Text style={{ fontSize: 18, marginTop: 30 }}>
                    No Wholesalers Data
                  </Text>
              </Block>
              )
            }

            {
              userDetails.registerAs === "Wholesalers" && MediatorsData && (MediatorsData.length>0 ?
                MediatorsData.map((el, index) => {
                  return el.sub_category.length > 0 && el.sub_category.map((item,index)=>{
                        return  <TouchableOpacity key={index} onPress={()=>handeViewDetail(el._id,index)}>
                        <MarketRatesCard Title={el.name} Value={item.price} />
                      </TouchableOpacity>
                  } 
                   
                  );
                })
              :
              <Block center>
                <Text style={{ fontSize: 18, marginTop: 30 }}>
                    No Mediators Data
                  </Text>
              </Block>
              )
            }

            {
              userDetails.registerAs === "Mediators" && (FactoryData.length > 0 ?
                FactoryData.map((el, index) => {
                  return el.sub_category.length > 0 && el.sub_category.map((item,index)=>{
                    return  <TouchableOpacity key={index} onPress={()=>handeViewDetail(el._id,index)}>
                    <MarketRatesCard Title={el.name} Value={item.price} />
                  </TouchableOpacity>
              } 
               
              );
                })
              :
              <Block center>
                <Text style={{ fontSize: 18, marginTop: 30 }}>
                    No Factory Data
                  </Text>
              </Block>
              )
            }
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
});
