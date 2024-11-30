import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, ScrollView, View, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Header } from '../../Components/Header/Header';
const { width, height } = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import { useAppContext } from '../../Context/AppContext';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import { useNavigation, useRoute } from '@react-navigation/native';
import logo from "./scrap-img.jpeg";


import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ThemeData } from '../../Theme/Theme';

export const MediatorRates = () => {
    const route = useRoute();
  const { userId ,categoryName ,subCategoryName, city} = route.params;
  const animationRef = useRef(null);
  const navigation = useNavigation();


    const handleItemPress = (userId, categoryId, subCategoryId) => {
    console.log("User ID:", userId);
    console.log("Category ID:", categoryId);
    console.log("SubCategory ID:", subCategoryId);
    navigation.navigate("Rate Details", { userId, categoryId, subCategoryId });
  };

  const handleBack = () => {
    navigation.goBack();
  };
  // const route = useRoute();
  // const { value } = route.params;
  const { userDetails, update } = useAppContext();
 
  const [Data, setData] = useState([]);

   
  
  const [refreshing, setRefreshing] = useState(false);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDailyRates();
    setRefreshing(false);
  };

  const fetchDailyRates = async () => {
  try {
    const response = await axios.post(`${Base_url}b2bOrder/filterusers`, {
      categoryName: categoryName,
      subCategoryName: subCategoryName,
      city: city,
      userId: userId
    });
    console.log('Fetched Filter categoey =>:', response.data.data[0].category);
    console.log('Fetched Filter User =>:', response.data.data[0].category[0].sub_category);
    const Data = response.data.data;
    setData(Data);
  } catch (error) {
    console.error('Error fetching Rates:', error);
  }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    animationRef.current?.play();
    animationRef.current?.play(10, 80);
  }, []);

  useEffect(() => {
    fetchDailyRates();
  }, [update]);

  const toggleExpandCard = (index) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };


    const renderMarketItem = ({ item }) => {
    const categoryId = item.category.length > 0 ? item.category[0]._doc._id : null;
    const subCategoryId = item.category.length > 0 && item.category[0].sub_category.length > 0 ? item.category[0].sub_category[0]._id : null;
  
    return (
      <TouchableOpacity
        style={{ marginTop: 10 }}
        activeOpacity={0.5}
        onPress={() => handleItemPress(item._id, categoryId, subCategoryId)}
      >
        <Block
          style={{
            width: "90%",
            borderRadius: 8,
            padding: 5,
            borderWidth: 1,
            borderColor: ThemeData.color,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginHorizontal: 20,
            backgroundColor: ThemeData.cardBackgroundColor,
          }}
        >
          <Block>
            <Image
              source={logo}
              style={{ resizeMode: "cover", width: 40, height: 40, marginLeft: 5, borderRadius: 8, marginVertical: 5 }}
            />
          </Block>
          <Block style={{ width: "60%", marginLeft: 10 }}>
            <Text
              style={{ fontWeight: "700", color: ThemeData.textColor, fontSize: 13 }}
            >
              {item.name || "Unknown Name"}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: "600" }}>
              {item.category.length > 0 && item.category[0].sub_category.length > 0
                ? item.category[0].sub_category.map(sub => sub.name).join(', ')
                : "Hardcoded Category"}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="calendar" size={14} color={ThemeData.color} />
              <Text style={{ fontSize: 12, fontWeight: "600", color: ThemeData.textColor, marginLeft: 5 }}>
                {formatDate(item.updatedAt)}
              </Text>
            </View>
          </Block>
          <Block style={{ textAlign: "right", flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text
              style={{ fontWeight: "700", color: ThemeData.textColor, fontSize: 13 }}
            >
              ₹ {item.category.length > 0 && item.category[0].sub_category.length > 0
                ? item.category[0].sub_category.map(sub => sub.price).join(', ')
                : "N/A"}/kg
            </Text>
            <Ionicons name='arrow-forward' size={18} color={ThemeData.textColor} style={{ alignSelf: 'flex-end', marginLeft: 5 }} />
          </Block>
        </Block>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
          // Add back navigation logic here
          console.log("Back pressed");
        }}
      >  
      <TouchableOpacity onPress={handleBack} activeOpacity={0.9}>
        <View style={{padding: 10,backgroundColor:'#000',borderRadius:30,width: 50, height: 50,flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

        <MaterialIcons name="arrow-back-ios" size={22} color="#fff" style={{ marginLeft: 5 }}/>
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
          Mediator rates
        </Text>
      </View>

      {/* Right Icons */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >

        <TouchableOpacity
          onPress={() => {
            // Add action for second icon
            console.log("Second icon pressed");
          }}
        >
          <Ionicons name="filter" size={30} color="#000" style={{marginRight: 10}} />
        </TouchableOpacity>
      </View>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', width: '95%',padding: 10,marginHorizontal: 10 }}>
        <Ionicons name="search" size={20} color="#000" style={{ marginLeft: 10 }} />
        <TextInput
          placeholder="Search"
          style={{
            flex: 1,
            height: 60,
            borderColor: '#b7b7b7',
            borderWidth: 1,
            borderRadius: 16,
            paddingLeft: 40, 
            marginLeft: -30, // Adjust margin to align the icon and input
          }}
        />
      </View>
      <View style={{padding: 5}}>
        <Text style={{marginLeft: 20,fontSize: 17,fontWeight: 600,color: '#000'}}>
           <Text style={{color : ThemeData.color}}>12 Buyers</Text>  available for <Text style={{color : ThemeData.color}}>{categoryName}</Text> Purchase in <Text style={{color : ThemeData.color}}>{city}</Text> area.   
        </Text>
      </View>
          <View style={{ paddingVertical: 7, paddingHorizontal: 13, backgroundColor: "#000", justifyContent: 'flex-start', borderRadius: 30, alignSelf: 'flex-start',marginLeft:20,marginTop: 10 }}>
      <Text style={{ color: "#fff" }}>{subCategoryName}</Text>
    </View>

    <FlatList
        data={Data}
        keyExtractor={(item) => item._id}
        renderItem={renderMarketItem}
        refreshing={refreshing}
        onRefresh={fetchDailyRates}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  gridcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridcolumn: {
    width: '48%',
    marginBottom: 10,
  },
  gridItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  itemText: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  
  card: {
    backgroundColor: "#f4f4f4",
    padding: 0,
    borderRadius: 15,
    width: width * 0.9,
     
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // elevation: 1,
    marginBottom: 10,
    minHeight: 200,
    marginHorizontal: 10,
  },
});

