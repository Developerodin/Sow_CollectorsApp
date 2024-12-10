import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, TextInput, ScrollView, StyleSheet, ToastAndroid ,ActivityIndicator} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../../Context/AppContext";
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";
import { CategoryAddModel2 } from "../../Components/CategoryAddModel/CategoryAddModel2";
import { ThemeData } from "../../Theme/Theme";

const UpdatePricing = () => {
  const navigation = useNavigation();

  // State for the picker
  const [selectedUnit, setSelectedUnit] = useState({});
  const { userDetails,update,setUpdate } = useAppContext();
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [Categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null); // Store category ID
  const [AddSubmodalVisible, setAddSubModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [ItemAddStatus, setItemAddStatus] = useState(false);
  const [UserCategoryData, setUserCategoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [CategoriesData, setCategoriesData] = useState([]);

  const [SubCategoriesData, setSubCategoriesData] = useState([]);
  const [catmodalVisible, setcatModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [updatedCategoriesData, setUpdatedCategoriesData] = useState([]);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  // const [update, setupdate] = useState(0);
  const [prices, setPrices] = useState({});

  const filterItems = (category, categoryId,Idata) => {
    let filteredItems = data;
    console.log("Category 2 ===================================>", category);
    
      let filteredItems2 = filteredItems.filter(
        (item) => item.category === category
      );

      if(Idata && Idata.length > 0) {
         filteredItems2 = Idata.filter(
          (item) => item.category === category
        );
      }
    
      console.log("Category 2 ===================================>", filteredItems2);
    setFilteredData(filteredItems2);
    setActiveCategory(category);
    setActiveCategoryId(categoryId); // Set category ID
  };

  const fetchCategoryData = async (userId) => {
    try {
      const response = await axios.get(
        `${Base_url}b2bUser/${userId}/category`
      );
      // console.log("CategoriesData 1 =====================>", response.data)
      const CategoriesData = response.data.data.categories

      // console.log("CategoriesData 2 =====================>", CategoriesData)
      const transformedData = [].concat(...CategoriesData.map(category => {
        // console.log("Category Data ==>", category)

        return category.sub_category && category.sub_category.map(subCategory => ({
          id: subCategory._id,
          title: subCategory && subCategory.name.toUpperCase(),
          value: subCategory.price,
          image: "https://tse4.mm.bing.net/th?id=OIP.OQh1ykyaCVyCvt2aNHJ-LwHaHa&pid=Api&P=0&h=220", // Replace with the actual image URL
          category: category.name,
          categoryId: category._id, // Store category ID
          updatedAt: subCategory.updatedAt,
          unit: subCategory.unit,
        }));
      }));

      setData(transformedData);
      setFilteredData(transformedData)
      setUserCategoryData(CategoriesData);
      filterItems(transformedData[0].category, transformedData[0].id,transformedData)
      setLoading(false);

      // Set the first category as the active category by default
      if (CategoriesData.length > 0) {
        setActiveCategory(CategoriesData[0].name);
        setActiveCategoryId(CategoriesData[0]._id); // Set category ID
     
      }
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

  const handelCategoryModelOpen = () => {
    const newCategoriesData = CategoriesData.filter(
      (category) => !UserCategoryData.some((userCategory) => userCategory.name === category.name)
    );
    setUpdatedCategoriesData(newCategoriesData)
    setcatModalVisible(true)
  }

  const handelCatSelectComplete = async () => {
    if (selectedCategories && selectedCategories.length > 0) {
      const Data = selectedCategories.map(category => {
        return {
          name: category.name,
        }
      });
      console.log("categoryNames", selectedCategories[0].name)
      const UpdatedData = Data;

      try {
        const response = await axios.post(
          `${Base_url}b2bUser/${userDetails.id}/category`, {
          "name": selectedCategories[0].name
        }
        );
        setUpdate((prev) => prev + 1);
        setSelectedCategories("")
        setcatModalVisible(false)
        return response.data;
      } catch (error) {
        console.error("Error adding category:", error);
        throw error;
      }
    }
  }

  const updateSubCategoryPrices = async (userId, categoryId, subCategories) => {
    setLoading(true);
    try {
      const response = await axios.put(`${Base_url}b2bUser/${userId}/category/${categoryId}/subcategory`, {
        subCategories: subCategories
      });
      console.log("Subcategories updated successfully:", response.data);
      ToastAndroid.show("Prices updated successfully!", ToastAndroid.SHORT);
      setUpdate((prev) => prev + 1);
    } catch (error) {
      setLoading(false);
      console.error("Error updating subcategories:", error);
      ToastAndroid.show("Error updating prices. Try Again !!", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchCategoryData(userDetails.id);
  }, [update]);

  useEffect(() => {
    getCategories()
  }, [update])

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
        
      )
    );
    const categories = [...new Set(data.map((item) => item.category))];
    console.log("Updating ===>");
    setCategories(categories);
    setActiveCategory("All");
    
  }, [query,update]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handelPricingHistory = () => {
    navigation.navigate("PricingHistory");
  };

  const handlePriceChange = (id, value) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [id]: value.replace(/[^0-9]/g, ''), // Ensure only numbers are stored
    }));
  };

  const handleSubmit = () => {
    const subCategories = Object.keys(prices).map((id) => ({
      subCategoryId: id,
      price: prices[id],
    }));
    updateSubCategoryPrices(userDetails.id, activeCategoryId, subCategories); // Use category ID
  };

  const categories = [
    "Aluminium Selection",
    "Section Cutting",
    "Aluminium Sheet Cutting",
    "Aluminium Purja",
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
      }}
    >
      {/* Header */}
      <Block
        style={{ flexDirection: "row", alignItems: "center", marginTop: 55 }}
      >
        <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
          <Block
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginLeft: 10,
            }}
          >
            <View
              style={{ backgroundColor: "#000", borderRadius: 30, padding: 10 }}
            >
              <Ionicons
                name="chevron-back"
                size={20}
                color="#fff"
              />
            </View>
          </Block>
        </TouchableOpacity>
        <Text
          style={{ marginLeft: 15, fontSize: 25, fontWeight: "500", flex: 1 }}
        >
          My Rates
        </Text>
        <Block
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={handelPricingHistory}>
            <View style={{ flexDirection: "row", marginRight: 15 }}>
              <Text style={{ textDecorationLine: "underline" }}>Pricing History</Text>
            </View>
          </TouchableOpacity>
        </Block>
      </Block>

      {/* Tabs */}
      <Block style={styles.Space_Between}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {UserCategoryData && UserCategoryData.length > 0 && UserCategoryData.map((el, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() => filterItems(el.name, el._id)} // Pass category ID
              style={{
                marginRight: 10,
                paddingVertical: 5,
                paddingHorizontal: 15,
                backgroundColor: activeCategory === el.name ? ThemeData.textColor : ThemeData.activeBackgroundColor,
                borderRadius: 30,
              }}
            >
              <Text style={{ fontWeight: "500", color: activeCategory === el.name ? ThemeData.activeColor : ThemeData.textColor, }}>{el.name && el.name.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

   
      </Block>

      {/* Subcategories Text */}
      <View style={styles3.container}>
      <Text style={styles3.text}>
        Add pricing for{' '}
        <Text style={styles3.linkText}>sub categories</Text> of{' '}
        <Text style={styles3.highlightText}>{activeCategory}</Text> -
      </Text>
      <TouchableOpacity style={styles3.button} >
        <Text style={styles3.buttonText}>+ Update Pricing</Text>
      </TouchableOpacity>
    </View>



      <View style={{  marginTop: 20 }}>
      {filteredData.map((el, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
            borderWidth: 1,
            borderColor: "#b3b3b3",
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 10,
            justifyContent: "space-between",
            height: 55,

          }}
        >
          
          <Text style={{ flex: 2, fontSize: 13 ,alignItems: "center", fontWeight: 600}}>{el.title}</Text>
          
               <Text style={{ flex: 1, fontSize: 13 ,alignItems: "center", fontWeight: 600}}>{el.unit || "Kg" }</Text>
         
                    {/* <Picker
            selectedValue={selectedUnit[el] || "KG"}
            onValueChange={(value) =>
              setSelectedUnit((prev) => ({ ...prev, [el]: value }))
            }
            style={{
              flex: 1,
              height: 40,
              marginRight: 30,
            }}
          >
            <Picker.Item label="KG" value="KG" />
            <Picker.Item label="TONS" value="TONS" />
          </Picker> */}
          

          <View>
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#b3b3b3",
              borderRadius: 8,
              paddingVertical: 5,
                paddingHorizontal: 30,
              textAlign: "center",
              
            }}
            placeholder="₹0"
            keyboardType="numeric"
            value={prices[el.id] !== undefined ? prices[el.id] : el.value.toString()}
            onChangeText={(value) => handlePriceChange(el.id, value)}
    />
          </View>
        </View>
      ))}
    </View>

      {/* Submit Button */}
            <TouchableOpacity
        style={{
          backgroundColor: "#000",
          paddingTop: 15,
          paddingBottom: 10,
          paddingHorizontal: 10,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 16,
          height: 55,
        }}
        onPress={handleSubmit}
        activeOpacity={0.8}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{ color: "#FFF", fontWeight: "bold" }}>Submit</Text>
        )}
      </TouchableOpacity>

      <CategoryAddModel2
        modalVisible={catmodalVisible}
        setModalVisible={setcatModalVisible}
        categoriesData={updatedCategoriesData}
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
        handelComplete={handelCatSelectComplete}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Space_Between: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
  },
  Center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const styles3 = StyleSheet.create({
    container: {
        marginLeft: 5,
      
    },
    text: {
        fontWeight: "500",
      fontSize: 16,
      color: ThemeData.textColor, // Black color for the main text
    },
    linkText: {
      color: ThemeData.color // Color for "sub categories" text
      
    },
    highlightText: {
      color: ThemeData.color, // Color for "Aluminium" text
    },
    button: {
      marginTop: 18,
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 10,
      alignItems: 'center',
      width: 150,
      backgroundColor: ThemeData.backgroundColor,
    },
    buttonText: {
      color: ThemeData.color,
      fontSize: 16,
      fontWeight: '600',
    },
  
  });

export default UpdatePricing;