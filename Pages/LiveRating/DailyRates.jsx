import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, ScrollView, View, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Header } from '../../Components/Header/Header';
// import HamburgerMenu from '../../Components/HamburgerMenu/HamburgerMenu';
const { width, height } = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import { useAppContext } from '../../Context/AppContext';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import { useNavigation, useRoute } from '@react-navigation/native';
import logo from "./scrap-img.jpeg";
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

export const DailyRates = () => {
  const animationRef = useRef(null);
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  // const route = useRoute();
  // const { value } = route.params;
  const { userDetails, update } = useAppContext();
  const [CategoriesData, setCategoriesData] = useState([]);
  const [categoryLength, setCategoryLength] = useState(4);
  const [categorySeetype, setCategorySeetype] = useState(false);
  const [Data, setData] = useState([]);
  const [marketRateLength, setmarketRateLength] = useState(2);
  const [marketRateSeetype, setmarketRateSeetype] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDailyRates();
    setRefreshing(false);
  };

  const fetchDailyRates = async () => {
    try {
      const response = await axios.get(`${Base_url}dailyRates`);
      // console.log('Fetched Daily Rates:', response.data);
      const Data = response.data;
      setData(Data);
    } catch (error) {
      console.error('Error fetching Rates:', error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    return `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
  }

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
      {/* Left Icon */}
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
          Message
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
            // Add action for first icon
            console.log("First icon pressed");
          }}
          style={{ marginHorizontal: 10 }}
        >
          <Ionicons name="search" size={30} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // Add action for second icon
            console.log("Second icon pressed");
          }}
        >
          <Ionicons name="notifications" size={30} color="#000" style={{marginRight: 10}} />
        </TouchableOpacity>
      </View>
    </View>
  
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Block style={{ backgroundColor: "#FFF", padding: 10 }}>
          {Data && Data.length > 0 ? (
            <Block style={{ marginTop: 0 }}>
              <Block style={{ marginTop: 0 }}>
                <View style={styles.gridcontainer}>
                  {Data && Data.map((el, index) => (
                    <Block style={{ marginTop: 15 }} activeOpacity={0.5} key={index}>
                      <Block style={styles.card}>
                        <Block>
                          <Block style={{margin:18, padding: 14, backgroundColor: "#000", borderRadius: 10,  }}>
                            <Text left style={{ fontWeight: 500, color: "#65C5C4", fontSize: 18,marginLeft: 10 }}>Price Update : {el.name}</Text>
                          </Block>
                          <Block style={{ marginHorizontal: 18, padding: 10, flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesome5 name="calendar-alt" size={20} color="black" style={{ marginRight: 8 }} />
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
        Date : {formatDate(el.date)}
      </Text>
    </Block>
                          <Block style={{marginHorizontal:18, padding: 10, height: expandedCardIndex === index ? 'auto' : 100, overflow: 'hidden' }}>
                            {expandedCardIndex === index ? (
                              <>
                                {el.text.split(',').map((textPart, idx) => (
                                  <Text key={idx} style={{ fontSize: 14, fontWeight: 500, color: "black" }}>{textPart}</Text>
                                ))}
                                <TouchableOpacity onPress={() => toggleExpandCard(index)}>
                                  <Text style={{ fontWeight: 700,color: "black",marginTop: 5, textAlign: 'right',fontSize: 16 }}>Close</Text>
                                </TouchableOpacity>
                              </>
                            ) : (
                              <>
                                {el.text.split(',').slice(0, 2).map((textPart, idx) => (
                                  <Text key={idx} style={{ fontSize: 14, fontWeight: "bold", color: "black" }}>{textPart}</Text>
                                ))}
                                <TouchableOpacity onPress={() => toggleExpandCard(index)} >
                                  <Text style={{ fontWeight: 700,color: "black", textAlign: 'right',fontSize: 16 }}>Read more...</Text>
                                </TouchableOpacity>
                              </>
                            )}
                          </Block>
                        </Block>
                      </Block>
                    </Block>
                  ))}
                </View>
              </Block>
            </Block>
          ) : (
            <Block center style={{ marginTop: 40 }}>
              <Image
                source={require('../../assets/media/5-dark.png')}
                style={{
                  width: 300,
                  height: 300,
                  marginRight: 10,
                }}
              />
              <Text>No Rates Available For</Text>
            </Block>
          )}
        </Block>
      </ScrollView>
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
  lottie: {
    width: 150,
    height: 150
  },
  inputContainer: {
    width: '100%',
    height: 66,
    borderBottomWidth: 1,
    borderColor: 'transparent',
  },
  input: {
    flex: 1,
    textAlign: "center",
    padding: 0,
    fontSize: 22
  },
  subtitle: {
    color: "black",
    fontSize: 20,
    marginTop: 10,
    textAlign: 'left',
    lineHeight: 23,
    letterSpacing: 0.3
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 52,
  },
  btn: {
    width: '95%',
    height: 55,
    borderRadius: 5,
    backgroundColor: '#40A99E',
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    marginTop: 10
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-between",
  },
  gridItem: {
    width: 170,
    height: 75,
    backgroundColor: '#fff',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  centeredText: {
    textAlign: 'center',
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

