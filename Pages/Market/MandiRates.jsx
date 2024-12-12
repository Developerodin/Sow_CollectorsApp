import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { ThemeData } from '../../Theme/Theme';

export const MandiRates = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingCards, setLoadingCards] = useState(false);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${Base_url}categories`);
      setCategoriesData(response.data);
      if (response.data.length > 0) {
        setSelectedCategory(response.data[0].name);
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    } finally {
      setLoadingPage(false);
    }
  };

  const getSubCategoriesByCategoryName = async (categoryName) => {
    console.log('Getting SubCategories', categoryName);
    setLoadingCards(true);
    try {
      const response = await axios.post(`${Base_url}subcategories/category`, {
        categoryName: categoryName
      });

      console.log("sub category data of selected category ==>", response.data);
      setSubCategoryData(response.data);
      if (response.data.length > 0) {
        setSelectedSubCategory(response.data[0].name);
      }
      return response.data;
    } catch (error) {
      console.log("Error getting subcategory ==>", error);
      setSubCategoryData([]);
      setSelectedSubCategory("");
    } finally {
      setLoadingCards(false);
    }
  };

  const handleCategoryPress = (categoryName) => {
    setSelectedCategory(categoryName);
    getSubCategoriesByCategoryName(categoryName);
  };

  const handleSubCategoryPress = (subCategoryName) => {
    setSelectedSubCategory(subCategoryName);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getSubCategoriesByCategoryName(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Purchase Rate Card</Text>
            <Ionicons name="search" size={24} color="black" />
          </View>
          {loadingPage ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={ThemeData.color} />
        </View>
      ) : (
        <>

          {/* Location and Category Selectors */}
          {/* <View style={styles.selectors}>
            <TouchableOpacity
              style={[
                styles.locationButton,
                selectedCategory === 'Jaipur' && styles.selectedButton,
              ]}
              onPress={() => handleCategoryPress('Jaipur')}
            >
              <Ionicons name="globe" size={16} color={selectedCategory === 'Jaipur' ? 'white' : 'black'} />
              <Text style={[styles.selectorText, selectedCategory === 'Jaipur' && styles.selectedText]}>Jaipur</Text>
            </TouchableOpacity>
          </View> */}

          {/* Scrap Categories Tabs */}
          <View style={styles.tabs}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginVertical: 10 }}
            >
              {categoriesData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleCategoryPress(item.name)}
                  style={{
                    marginRight: 3,
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    backgroundColor: selectedCategory === item.name ? ThemeData.color : "#fff",
                    borderRadius: 30,
                  }}
                >
                  <Text style={{ fontWeight: 500, fontSize: 15, color: selectedCategory === item.name ? ThemeData.backgroundColor : ThemeData.textColor }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Subcategories Horizontal Scroller */}
          {/* <View style={styles.tabs}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginVertical: 10 }}
            >
              {subCategoryData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSubCategoryPress(item.name)}
                  style={{
                    marginRight: 3,
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    backgroundColor: selectedSubCategory === item.name ? ThemeData.color : "#fff",
                    borderRadius: 30,
                  }}
                >
                  <Text style={{ fontWeight: 500, fontSize: 15, color: selectedSubCategory === item.name ? ThemeData.backgroundColor : ThemeData.textColor }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View> */}

          {/* Mandi Rates List */}
          {loadingCards ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={ThemeData.color} />
            </View>
          ) : subCategoryData.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Image
                source={require("../../assets/media/5-dark.png")}
                style={{
                  width: 300,
                  height: 300,
                  marginRight: 10,
                }}
              />
            </View>
          ) : (
            <FlatList
              data={subCategoryData}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.rateItem}>
                  <View style={{flexDirection: "row"}}>
                  <Image
                    source={require('./scrap-img.jpeg')} // Replace with your actual image source
                    style={styles.image}
                  />
                  <View style={styles.rateInfo}>
                    <Text style={styles.subCategoryName}>{item.name}</Text>
                  </View>
                  </View>
                  <View style={styles.priceInfo}>
                    <Text style={styles.price}>₹ {item.price}/kg</Text>
                  </View>
                </View>
              )}
              contentContainerStyle={styles.listContent}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '500',
  },
  selectors: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 30,
    backgroundColor: '#f4f4f4',
  },
  selectedButton: {
    backgroundColor: '#000',
  },
  selectorText: {
    marginLeft: 5,
    color: 'black',
  },
  selectedText: {
    color: 'white',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0000004D',
    marginBottom: 10,
  },
  image: {
    width: 38,
    height: 38,
    marginRight: 10,
  },
  rateInfo: {
    justifyContent: 'center',
  },
  subCategoryName: {
    fontSize: 15,
    fontWeight: '600',
  },
  priceInfo: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
});

export default MandiRates;