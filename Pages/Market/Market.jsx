import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Header } from '../../Components/Header/Header';
import { AntDesign } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../Context/AppContext';
import { MarketRatesCard } from '../../Components/Cards/MarketRatesCard';
export const Market = () => {
  const navigation = useNavigation()
  const City = ["Jaipur","Hayderabad","Delhi","Uttar Pradesh","Mumbai","Ranchi","Udaipur"]
  const Category = ["Glass", "Electronic"]
   const{update} = useAppContext()
    const [expanded, setExpanded] = useState(false);
    const [CityExpand, setCityExpand] = useState(false);
    const [Timeexpanded, setTimeExpanded] = useState(false);
    const [Addressexpanded, setAddressExpanded] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [Address,setAddress] = useState(null);
    const [selectedCity,setselectedCity] = useState("");
    const [selectedCategory,setselectedCategory] = useState("");

    const handeViewDetail=()=>{
        navigation.navigate("Rate Details")
      }
    const toggleAccordion = () => {
        setExpanded(!expanded);
      };
      const toggleCityAccordion = () => {
        setCityExpand(!CityExpand);
        setShowDatePicker(true)
      };

      const toggleTimeAccordion = () => {
        setTimeExpanded(!Timeexpanded);
        setShowTimePicker(true)
      };

      const toggleAddressAccordion = () => {
        setAddressExpanded(!Addressexpanded);
      };
      const handleDateChange = (event, selected) => {
        if (event.type === 'set') {
          setSelectedDate(selected);
        }
        setShowDatePicker(false); // Hide date picker on iOS after selecting a date
      };

      const handleTimeChange = (event, selected) => {
        if (event.type === 'set') {
          setSelectedTime(selected);
        }
        setShowTimePicker(Platform.OS === 'ios'); // Hide time picker on iOS after selecting a time
      };
      const retrieveAddress = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('UserAddress');
          if (jsonValue !== null) {
            // JSON parse the retrieved value to convert it back to an object
            const address = JSON.parse(jsonValue);
            console.log('Retrieved Address:', address);
            setAddress(address)
            return address;
          } else {
            console.log('No address data found in AsyncStorage.');
            return null;
          }
        } catch (error) {
          console.error('Error retrieving address:', error);
          return null;
        }
      };

      const handelAddNewAddress =()=>{
         navigation.navigate("Address")
      }

      const handelCity = (data)=>{
        setselectedCity(data)
        toggleCityAccordion()
      }
      const handelCategory = (data)=>{
        setselectedCategory(data)
        toggleAccordion()
      }

      useEffect(()=>{
        retrieveAddress();
      },[update])
     
  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView style={{flex:1,backgroundColor:"#F1F1F1"}}>

      <Block style={{padding:10}}>
     
     <Block>
        <Block>
            <Text style={{fontSize:28,marginTop:20}}>Live Market Rates</Text>
        </Block>
         <Block style={{marginTop:20}}>
   <View style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:5}}>
      <TouchableOpacity  activeOpacity={0.7} onPress={toggleAccordion}>
        <Block style={styles.Space_Between}>
          <Block style={{flexDirection:"row",alignItems:"center"}}>
         
          <Text style={{fontSize:20}}>
            {
                selectedCategory !== "" ? selectedCategory : "Select Category"
            }
            
            </Text>
          </Block>

          <Block>
            {
              expanded ? <MaterialIcons name="keyboard-arrow-up" size={28} color="black" /> 
              :
              <MaterialIcons name="keyboard-arrow-down" size={28} color="black" />
            }
          

          
          </Block>
         
        </Block>
      </TouchableOpacity>
      {expanded && (
        <View style={{marginTop:20}}>
            <Block  style={[styles.Space_Between,{marginTop:10}]}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>handelCategory("")}>
                      <Text style={{fontSize:20}}>None</Text>
                      </TouchableOpacity>
                      </Block>
            {
                Category.map((el,index)=>{
                    return <Block key={index} style={[styles.Space_Between,{marginTop:10}]}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>handelCategory(el)}>
                      <Text style={{fontSize:20}}>{el}</Text>
                      </TouchableOpacity>
                      </Block>
                })
            }
          
          
       
         
          
        </View>
      )}
    </View>
   

            </Block>

            <Block style={{marginTop:20}}>
   <View style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:5}}>
      <TouchableOpacity  activeOpacity={0.7} onPress={toggleCityAccordion}>
        <Block style={styles.Space_Between}>
          <Block style={{flexDirection:"row",alignItems:"center"}}>
         
          <Text style={{fontSize:20}}>
          {
                selectedCity !== "" ? selectedCity : "Select City"
            }
            
            </Text>
          </Block>

          <Block>
            {
              CityExpand ? <MaterialIcons name="keyboard-arrow-up" size={28} color="black" /> 
              :
              <MaterialIcons name="keyboard-arrow-down" size={28} color="black" />
            }
          

          
          </Block>
         
        </Block>
      </TouchableOpacity>
      {CityExpand && (
        <View style={{marginTop:20}}>
            <Block  style={[styles.Space_Between,{marginTop:10}]}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>handelCity("")}>
                      <Text style={{fontSize:20}}>None</Text>
                      </TouchableOpacity>
                      </Block>
           {
                City.map((el,index)=>{
                    return <Block key={index} style={[styles.Space_Between,{marginTop:10}]}>
                    <TouchableOpacity activeOpacity={0.6} onPress={()=>handelCity(el)}>
                      <Text style={{fontSize:20}}>{el}</Text>
                      </TouchableOpacity>
                      </Block>
                })
            }
        </View>
      )}
    </View>
   

            </Block>


     </Block>


     <Block>
        <TouchableOpacity onPress={handeViewDetail}>
        <MarketRatesCard Title={"Marudhara Industries"} Value={"420"}/>
        </TouchableOpacity>
     
     </Block>

      </Block>
      </ScrollView >
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#FFF",

  },
  inputContainer: {
    width: '100%',
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: 'transparent', // Make the border color transparent
  },
  input: {
    flex: 1,
    textAlign:"center",
    padding:0,
    fontSize:22
     // Remove padding to make it look borderless
  },
  subtitle: {
    color:"black",
    fontSize: 20,
    marginTop: 10,
  
    textAlign: 'left',
    lineHeight: 23,
    letterSpacing:0.3
  },
  title: {
    color:"black",
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

  });