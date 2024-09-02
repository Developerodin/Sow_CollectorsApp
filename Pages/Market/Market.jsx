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
  const [sortOrder, setSortOrder] = useState('asc');

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
      // console.log("Categories all", response.data)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const getCategoryById = async (id) => {
    try {
      const response = await axios.get(`${Base_url}api/category/${id}`);
      
      setSelectedSubCategoriesData(response.data[0].sub_category)
      // console.log("SubCategory data", response.data[0].sub_category)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handeViewDetail = (id,subIndex,categoryIndex) => {
    navigation.navigate("Rate Details", { itemId: id,subIndex : subIndex,categoryIndex :categoryIndex});
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
    console.log("data=== >",data,id)
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
       console.log("MediatorsData ===>",MediatorsData)
       
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
        
        const hasCategory = vendor.categories.some((cat) => cat.name === category);
       
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
      filteredData = filteredData.filter((vendor) => vendor.city.toLowerCase() === city.toLowerCase());
      // console.log("Filter data  cat and subcategory ==>",filteredData)
    }
    console.log("filer data >>  ", filteredData);
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

  const userDetailsFromStorage = async (token) => {
    // console.log("Token in user details check ===>",token)
    try{
      const Details = (await AsyncStorage.getItem("userDetails")) || null;
      // console.log("step 6 ===>",Details)
    const ParseData = JSON.parse(Details);
     
    // console.log("Parse Data of user  ===>", ParseData);
    const data = ParseData;
     console.log("User Data 2 ==>",data)
     if(data) {
      setselectedCity(data.city)
      // handelCategory('Iron','66910a952bc19d639b4f2a9c')
      // handelSubCategory('Iron - HMS')
      // setselectedCategory('Iron')
      // setselectedSubCategory('')
     }
    
    return ;
    }
    catch(err){
      console.log("Error in getting user ==.",err)
    }
   
  }; 

  useEffect(() => {
    fetchB2BUser();
    getCategories()
    userDetailsFromStorage()
    // console.log("User Data ", userDetails);
  }, [refreshData,update]);


  useEffect(()=>{
    // console.log("Selected Data",selectedCategory,selectedSubCategory,selectedCity)
    filterData(selectedCategory,selectedSubCategory,selectedCity);
  },[selectedCategory,selectedSubCategory,selectedCity])
         
  const uniqueCitySet = new Set();

  const sortSubCategories = (subCategories) => {
    return subCategories.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  const sortData = (data) => {
    return data.sort((a, b) => {
      
      const aSubCategory = a.categories.flatMap(cat => cat.sub_category).find(sub => sub.name === selectedSubCategory);
      const bSubCategory = b.categories.flatMap(cat => cat.sub_category).find(sub => sub.name === selectedSubCategory);
  
      if (!aSubCategory || !bSubCategory) return 0; 
  
      if (sortOrder === 'asc') {
        return aSubCategory.price - bSubCategory.price;
      } else {
        return bSubCategory.price - aSubCategory.price;
      }
    });
  };

  const handleSortPress = () => {
    
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleResetPress = () => {
    setSortOrder('asc');
  };
 
  const convertUTCToIST = (dateString) => {
    const date = new Date(dateString);
  
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
  
    
    const options = { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true };
    const timeString = date.toLocaleTimeString('en-IN', options).toUpperCase();
  
    return `${day}-${month}-${year} ${timeString}`;
  };
  
  

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: "#F1F1F1" }}>
        <Block style={{ padding: 10 }}>
          <Block style={{borderBottomWidth:1,paddingBottom:20,borderColor:"#E4E4E4"}}>
            <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <Text style={{ fontSize: 23, marginTop: 10 }}>
              Scrap Market 
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
                      <Text style={{ fontSize:18,color:`${selectedCategory !== "" ? "#239456" : "black"}` }}>
                        {selectedCategory !== "" ? selectedCategory : "Select Category"}
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
                  <View style={{height:200 }}>
                    <ScrollView>
{/*                    
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => handelCategory("","0")} 
                        style={[styles.Space_Between, { marginTop: 10 }]}>
                      
                        <Text style={{ fontSize: 20 }}>None</Text>
                 
                    </TouchableOpacity> */}
                    {CategoriesData.map((el, index) => {
                      
                     
                         return (
                          <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={() => handelCategory(el.name,el._id)}
                          key={index}
                          style={[styles.Space_Between, { marginTop: 10 }]}
                        >
                         
                            <Text style={{ fontSize:18 }}>{el.name}</Text>
                          
                        </TouchableOpacity>
                         );
                     
                    
                    })}

                       
                </ScrollView>
                  </View>
                )}
              </View>
            </Block>
            { 
              selectedCategory !== "" &&   <Block style={{ marginTop: 20 }}>
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
                      <Text style={{ fontSize:18,color:`${selectedSubCategory !== "" ? "#239456" : "black"}` }}>
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
                  <View style={{height:200}}>
                    <ScrollView>

                    
                    {/* <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => handelSubCategory("")} style={[styles.Space_Between, { marginTop: 10 }]}>
                     
                        <Text style={{ fontSize: 20 }}>None</Text>
                     
                    </TouchableOpacity> */}
                    {SelectedSubCategoriesData && SelectedSubCategoriesData.map((el, index) => {
                      
                     
                         return (
                          <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={() => handelSubCategory(el.name)}
                          key={index}
                          style={[styles.Space_Between, { marginTop: 10 }]}
                        >
                         
                            <Text style={{ fontSize:18 }}>{el.name}</Text>
                          </TouchableOpacity>
                      
                         );
                     
                    
                    })}
                    </ScrollView>
                  </View>
                )}
              </View>
            </Block>
            }

           

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
                      <Text style={{ fontSize:18,color:"#239456" }}>
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
                  <View style={{height:200 }}>
                    <ScrollView>

                  

                    
                    {AllVendorsData.map((el, index) => {
                       const lowerCaseCity = el.city.toLowerCase();

                       // Check if the lowercased category is not in the set, then add it to the set and render the JSX
                       if (!uniqueCitySet.has(lowerCaseCity)) {
                       
                        uniqueCitySet.add(lowerCaseCity);
                        console.log("Lower city not prsent   ===>",lowerCaseCity,uniqueCitySet)
                         return (
                          <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={() => handelCity(el.city)}
                          key={index}
                          style={[styles.Space_Between, { marginTop: 10 }]}
                        >
                          
                            <Text style={{ fontSize:18 }}>{el.city.toUpperCase()}</Text>
                          </TouchableOpacity>
                       
                         );
                       } else {
                         // If the lowercased category is already in the set, return null (no rendering)
                        //  console.log("City alred prsent  ==>",lowerCaseCity)
                         return null;
                       }
                     
                    })}
                     </ScrollView>
                  </View>
                 
                )}
              </View>
            </Block>
          </Block>

          <Block style={{marginBottom:60}}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10,alignItems:'center' }}>
          <Text style={{marginRight: 8,fontSize: 16,color:'teal'}}>
          {/* {sortOrder === 'asc' ? 'Sort' : 'Sort '} */} Sort
        </Text>
      <TouchableOpacity onPress={handleSortPress} style={{ padding: 6, backgroundColor: "teal", borderRadius: 12, flexDirection: "row", justifyContent: "center", alignItems: "center", width: 30 }}>
        <FontAwesome5 name="sort" size={22} color="#fff" />
      
      </TouchableOpacity>
      
    </View>

    {
  userDetails.registerAs === "Collectors" && WholesalersData && (
    sortData([...WholesalersData]).length > 0 ?  // Use sortData here
      sortData([...WholesalersData]).map((el, index) => {  // Use the sorted data for mapping
        if (el.categories && el.categories.length > 0) {
          return el.categories.map((category, categoryIndex) => {
            if (category.sub_category && category.sub_category.length > 0) {
              const sortedSubCategories = sortSubCategories([...category.sub_category]); // Sort sub-categories if needed
              return sortedSubCategories.map((item, subIndex) => {
                if (selectedSubCategory === item.name) {
                  return (
                    <TouchableOpacity
                      key={`${el._id}-${categoryIndex}-${subIndex}`}
                      onPress={() => handeViewDetail(el._id, subIndex, categoryIndex)}
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
      :
      <Block center>
        <Text style={{ fontSize: 16,color:'grey', marginTop: 30 }}>No Wholesalers Available Right Now</Text>
      </Block>
  )
}

         

         {
  userDetails.registerAs === "Wholesalers" && MediatorsData && (
    sortData(MediatorsData).length > 0 ? (
      sortData(MediatorsData).map((el, index) => {
        if (el.categories && el.categories.length > 0) {
          return el.categories.map((category, categoryIndex) => {
            if (category.sub_category && category.sub_category.length > 0) {
              return category.sub_category.map((item, subIndex) => {
                if (selectedSubCategory === item.name) {
                  return (
                    <TouchableOpacity
                      key={`${el._id}-${categoryIndex}-${subIndex}`}
                      onPress={() => handeViewDetail(el._id, subIndex, categoryIndex)}
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
        <Text style={{ fontSize: 16,color:'grey', marginTop: 30 }}>
          No Mediators Available Right Now
        </Text>
      </Block>
    )
  )
}

            

{
  userDetails.registerAs === "Mediators" && FactoryData && (
    sortData([...FactoryData]).length > 0 ?  // Sort the FactoryData before mapping
      sortData([...FactoryData]).map((el, index) => {  // Use the sorted data for mapping
        // Check if categories is an array and not empty
        if (el.categories && el.categories.length > 0) {
          return el.categories.map((category, categoryIndex) => {
            // Check if sub_category exists in the current category
            if (category.sub_category && category.sub_category.length > 0) {
              const sortedSubCategories = sortSubCategories([...category.sub_category]); // Sort sub-categories if needed
              return sortedSubCategories.map((item, subIndex) => {
                if (selectedSubCategory === item.name) {
                  return (
                    <TouchableOpacity
                      key={`${el._id}-${categoryIndex}-${subIndex}`}
                      onPress={() => handeViewDetail(el._id, subIndex, categoryIndex)}
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
      :
      <Block center>
        <Text style={{ fontSize: 16,color:'grey', marginTop: 30 }}>
          No Factory Available Right Now
        </Text>
      </Block>
  )
}


{
  userDetails.registerAs === "Factory" && FactoryData && (
    sortData([...FactoryData]).length > 0 ?  // Sort the FactoryData before mapping
      sortData([...FactoryData]).map((el, index) => {  // Use the sorted data for mapping
        // Check if categories is an array and not empty, and if the current item is not the user's own data
        if (el.categories && el.categories.length > 0 && el._id !== userDetails._id) {
          return el.categories.map((category, categoryIndex) => {
            // Check if sub_category exists in the current category
            if (category.sub_category && category.sub_category.length > 0) {
              const sortedSubCategories = sortSubCategories([...category.sub_category]); // Sort sub-categories if needed
              return sortedSubCategories.map((item, subIndex) => {
                if (selectedSubCategory === item.name) {
                  return (
                    <TouchableOpacity
                      key={`${el._id}-${categoryIndex}-${subIndex}`}
                      onPress={() => handeViewDetail(el._id, subIndex, categoryIndex)}
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
      :
      <Block center>
        <Text style={{ fontSize: 16,color:'grey', marginTop: 30}}>
          No Factory Available Right Now
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