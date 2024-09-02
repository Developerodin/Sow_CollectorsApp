import React, { useState, useEffect ,useContext} from 'react';
import { View,  TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, ScrollView ,FlatList , Image,} from 'react-native';
import { Text } from "galio-framework";
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../Context/AppContext';
import Modal from "react-native-modal";
const { width, height } = Dimensions.get("screen");

const Marketmodal = ({ modalVisible, selectedItem, setModalVisible, formatDate, formatTime, onClose }) => {
    const { favouriteMandi,setFavouriteMandi,updateMandi,setUpdateMandi} = useAppContext();
    const [priceHistory, setPriceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeButton, setActiveButton] = useState(0);
    const [timeframe, setTimeframe] = useState('today');
    const [noData, setNoData] = useState(false);
    const [userId, setUserId] = useState(null);
    const [notificationAdded, setNotificationAdded] = useState([]);
    const [favouriteAdded, setFavouriteAdded] = useState([]);

    const getHistoryByTimeframe = async (mandiId, category, timeframe) => {
        try {
            const response = await axios.get(`${Base_url}api/mandi_rates/history/timeframe/${mandiId}/${category}/${timeframe}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching history by timeframe:', error);
            throw error;
        }
    };

    const addMandiToList = async (mandiId, listType) => {
        try {
            console.log('mandiId:', mandiId);
            console.log('userId:', userId);
            console.log('listType:', listType);

            const response = await axios.post(`${Base_url}api/b2b/add-mandi`, {
                userId,
                mandiId,
                listType
            });

            if (listType === 'favorite') {
                setFavouriteAdded(prev => [...prev, mandiId]);  
            } else if (listType === 'notification') {
                setNotificationAdded(prev => [...prev, mandiId]); 
            }
            setUpdateMandi((prev) => prev + 1);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error(`Error 404: Not Found. Please check userId, mandiId, or listType:`, error);
            } else {
                console.error(`Error adding Mandi to ${listType}:`, error);
            }
            throw error;
        }
    };

    const removeMandiFromList = async (userId, mandiId, listType) => {
        try {
            const response = await axios.post(`${Base_url}api/b2b/remove-mandi`, {
                userId,
                mandiId,
                listType
            });
    
            if (listType === 'favorite') {
                setFavouriteAdded(prev => prev.filter(id => id !== mandiId));  
            } else if (listType === 'notification') {
                setNotificationAdded(prev => prev.filter(id => id !== mandiId)); 
            }
            setUpdateMandi((prev) => prev + 1);
    
            return response.data;
        } catch (error) {
            console.error('Error removing Mandi from list:', error);
            throw error;
        }
    };


    const fetchUserMandis = async (userId, mandiId) => {
        try {
            const response = await axios.get(`${Base_url}api/b2b/${userId}/mandis`);
            
            const favoriteMandis = response.data.favoriteMandis?.map(mandi => mandi._id) || [];
            const notificationMandis = response.data.notificationFormMandiList?.map(mandi => mandi._id) || [];
    
           
            setFavouriteAdded(favoriteMandis);
            setNotificationAdded(notificationMandis);
    
            
            if (mandiId) {
                if (favoriteMandis.includes(mandiId)) {
                    console.log('Mandi is in the favorite list');
                } else if (notificationMandis.includes(mandiId)) {
                    console.log('Mandi is in the notification list');
                } else {
                    console.log('Mandi is not in the favorite or notification list');
                }
            }
        } catch (error) {
            
        }
    };
    
    useEffect(() => {
        fetchUserMandis(userId, selectedItem?.mandi?._id);
    }, [userId, selectedItem?.mandi?._id]);

    useEffect(() => {
        if (modalVisible) {
            const fetchHistory = async () => {
                try {
                    setLoading(true);
                    const mandiId = selectedItem?.mandi?._id;
                    const category = selectedItem?.categoryPrices?.[0]?.category;
    
                    if (!mandiId || !category) {
                        throw new Error('Invalid mandiId or category');
                    }
    
                    const historyData = await getHistoryByTimeframe(mandiId, category, timeframe);
    
                    if (historyData.length === 0) {
                        setNoData(true);
                        setPriceHistory([]);
                    } else {
                        setNoData(false);
    
                        let processedData = historyData.map(entry => ({
                            price: entry.categoryPrices[0]?.price,
                            date: new Date(entry.createdAt)
                        })).filter(entry => !isNaN(entry.price) && !isNaN(entry.date.getTime()));
    
                        // Sorting data by date in ascending order
                        processedData.sort((a, b) => a.date - b.date);
    
                        switch (timeframe) {
                            case 'week':
                                processedData = processWeeklyData(processedData);
                                break;
                            case 'month':
                                processedData = processMonthlyData(processedData);
                                break;
                            case 'year':
                                processedData = processYearlyData(processedData);
                                break;
                            default:
                                // Already sorted above, no need to sort again
                                break;
                        }
    
                        setPriceHistory(processedData);
                    }
    
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching history:', error);
                    setLoading(false);
                }
            };
    
            fetchHistory();
        }
    }, [modalVisible, timeframe]);
    



 // Group data by day and calculate the average price per day
const processWeeklyData = (data) => {
    const groupedByDay = data.reduce((acc, item) => {
        const day = item.date.toISOString().split('T')[0]; // YYYY-MM-DD
        if (!acc[day]) {
            acc[day] = { price: item.price, count: 1 };
        } else {
            acc[day].price += item.price;
            acc[day].count += 1;
        }
        return acc;
    }, {});

    return Object.keys(groupedByDay).map(day => ({
        date: new Date(day),
        price: Math.round(groupedByDay[day].price / groupedByDay[day].count) // Rounded average price per day
    }));
};

// Group data by week and calculate the average price per week
const processMonthlyData = (data) => {
    const groupedByWeek = data.reduce((acc, item) => {
        const week = `${item.date.getFullYear()}-${getWeekNumber(item.date)}`;
        if (!acc[week]) {
            acc[week] = { price: item.price, count: 1 };
        } else {
            acc[week].price += item.price;
            acc[week].count += 1;
        }
        return acc;
    }, {});

    return Object.keys(groupedByWeek).map(week => ({
        date: new Date(week.split('-')[0], 0, 1 + (parseInt(week.split('-')[1]) - 1) * 7),
        price: Math.round(groupedByWeek[week].price / groupedByWeek[week].count) // Rounded average price per week
    }));
};

// Group data by month and calculate the average price per month
const processYearlyData = (data) => {
    const groupedByMonth = data.reduce((acc, item) => {
        const month = `${item.date.getFullYear()}-${item.date.getMonth() + 1}`;
        if (!acc[month]) {
            acc[month] = { price: item.price, count: 1 };
        } else {
            acc[month].price += item.price;
            acc[month].count += 1;
        }
        return acc;
    }, {});

    return Object.keys(groupedByMonth).map(month => ({
        date: new Date(month.split('-')[0], month.split('-')[1] - 1),
        price: Math.round(groupedByMonth[month].price / groupedByMonth[month].count) // Rounded average price per month
    }));
};

// Helper function to get the week number of the year
const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};


const formatLabel = (date, timeframe) => {
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    
    switch (timeframe) {
        case 'today':
            return formatTime(date); // Format as time (e.g., "10:00 AM")
        case 'week':
        case 'month':
        case 'year':
            return formattedDate; // Format as "DD-MM-YYYY"
        default:
            return formattedDate; // Default to "DD-MM-YYYY"
    }
};



    const userDetailsFromStorage = async (token) => {
        
        try{
          const Details = (await AsyncStorage.getItem("userDetails")) || null;
         
        const ParseData = JSON.parse(Details);
         
        
        const data = ParseData;
         console.log("User Data 2 ==>",data)
            setUserId(ParseData._id);
            console.log("User ID ==>",userId)
         
        
        return ;
        }
        catch(err){
          console.log("Error in getting user ==.",err)
        }
       
      }; 


      useEffect(() => {
        userDetailsFromStorage();
        }, []);

        const calculatePriceStatistics = () => {
            const prices = priceHistory.map(entry => entry.price);
        
            if (prices.length === 0) {
                return { highestPrice: 0, lowestPrice: 0, averagePrice: 0 };
            }
        
            const highestPrice = Math.max(...prices);
            const lowestPrice = Math.min(...prices);
            const averagePrice = (prices.reduce((sum, price) => sum + price, 0) / prices.length).toFixed(2);
        
            return { highestPrice, lowestPrice, averagePrice };
        };
        
        const { highestPrice, lowestPrice, averagePrice } = calculatePriceStatistics();

    if (!selectedItem) return null;

    return (
        <Modal
        animationType="slide"
        transparent={true}
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        backdropOpacity={0.1}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection={[ "down"]}
        style={styles.backdrop}
        >
            <View >
                <View style={styles.modalView}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.topBar} >
                            <View style={styles.topBarHandle}></View>
                        </TouchableOpacity>

                        {timeframe === 'today' ? (
                           <View style={[styles.buttonGroup]}>
                           <Text style={styles.buttonGroupItemtwo}>Add to:</Text>
                           
                           <TouchableOpacity
   onPress={() => {
       if (notificationAdded.includes(selectedItem?.mandi?._id)) {
           removeMandiFromList(userId, selectedItem?.mandi?._id, 'notification');
       } else {
           addMandiToList(selectedItem?.mandi?._id, 'notification');
       }
   }}
   style={styles.buttonGroupItemtwo}
>
   <View style={styles.iconTextContainer}>
       <Ionicons 
           name={notificationAdded.includes(selectedItem?.mandi?._id) ? "checkmark-circle-outline" : "notifications-outline"} 
           size={20} 
           color={notificationAdded.includes(selectedItem?.mandi?._id) ? "green" : "black"} 
           style={{ textAlign: 'center' }}
       />
       <Text style={styles.buttonGroupText}>
       Notification
       </Text>
   </View>
</TouchableOpacity>

<TouchableOpacity
   onPress={() => {
       if (favouriteAdded.includes(selectedItem?.mandi?._id)) {
           removeMandiFromList(userId, selectedItem?.mandi?._id, 'favorite');
       } else {
           addMandiToList(selectedItem?.mandi?._id, 'favorite');
       }
   }}
   style={styles.buttonGroupItemtwo}
>
   <View style={styles.iconTextContainer}>
       <Ionicons 
           name={favouriteAdded.includes(selectedItem?.mandi?._id) ? "checkmark-circle-outline" : "heart-outline"} 
           size={20} 
           color={favouriteAdded.includes(selectedItem?.mandi?._id) ? "green" : "black"} 
           style={{ textAlign: 'center' }}
       />
       <Text style={styles.buttonGroupText}>
       Favourite
       </Text>
   </View>
</TouchableOpacity>

                       </View>
                        ) : (
                            <View style={styles.buttonGroupthree}>
                                <View style={[styles.priceContainer, { marginRight: 80 }]}>
                                    <Text style={styles.priceSummaryText}>Highest</Text>
                                    <Text style={styles.priceValueText}>₹ {highestPrice}</Text>
                                </View>
                                <View style={[styles.priceContainer, { marginRight: 80 }]}>
                                    <Text style={styles.priceSummaryText}>Lowest</Text>
                                    <Text style={styles.priceValueText}>₹ {lowestPrice}</Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.priceSummaryText}>Average</Text>
                                    <Text style={styles.priceValueText}>₹ {averagePrice}</Text>
                                </View>
                            </View>
                        )}

                        <View style={styles.buttonGrouptwo}>
                            {['Today', 'Week', 'Month', 'Year'].map((label, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setActiveButton(index);
                                        setTimeframe(label.toLowerCase());
                                    }}
                                    style={[
                                        styles.buttonGroupItem,
                                        activeButton === index && styles.activeButton
                                    ]}
                                >
                                    <Text style={[
                                        styles.buttonGroupTexttwo,
                                        activeButton === index && styles.activeButtonText
                                    ]}>
                                        {label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : noData ? (
                            <>
                            <Text>No data available for {['Today', 'Week', 'Month', 'Year'][activeButton]}</Text>
                            <Image
                            source={require("../../assets/media/5-dark.png")}
                            style={{
                              width: 300,
                              height: 300,
                              marginRight: 10,
                              alignSelf: "center",
                            }}
                          />
                            </>
                        ) : (
                            <>
                              <ScrollView horizontal  showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity >
    <LineChart
        data={{
            labels: priceHistory.map(entry => formatLabel(new Date(entry.date), timeframe)),
            datasets: [
                {
                    data: priceHistory.map(entry => entry.price),
                    color: (opacity = 1) => `rgba(0, 115, 177, ${opacity})`,
                    strokeWidth: 2,
                    
                },
            ],
        }}
        width={600} 
        height={200} 
        chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
                borderRadius: 16,
                paddingRight: 50, // Ensure labels have enough space
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#000000",
            },
            // propsForLabels: {
            //     fontSize: 8, 
            //   },
            propsForBackgroundLines: {
                stroke: '#cccccc',
                strokeDasharray: "",
            },
            fillShadowGradient: 'transparent',
            fillShadowGradientOpacity: 0,
        }}
        style={{
            marginVertical: 10,
            borderRadius: 2,
        }}
        withInnerLines={true}
        withOuterLines={true}
        fromZero={false}
    />
</TouchableOpacity>
</ScrollView>


<FlatList
      data={priceHistory.sort((a, b) => new Date(b.date) - new Date(a.date))}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => console.log(`Item pressed: ${item.date}`)}>
          <View style={styles.infoRow}>
            <Text style={styles.infoRowText}>{formatDate(item.date)}</Text>
            <Text style={styles.infoRowTextRight}>₹ {item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
      style={styles.scrollView}
    />
                            </>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
    
     margin: 0,
     justifyContent: 'flex-end',
    },
    modalView: {
        
        justifyContent: 'flex-end',
    },
    modalContent: {
       
        height: height * 0.7,
        backgroundColor: "#F2F2F2",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5
    },
    topBar: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    topBarHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#C0C0C0',
        borderRadius: 2,
    },
    buttonGroup: {
        display: 'flex',
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 30,
        borderColor: '#F2F2F2',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: '#ffffff',
        paddingHorizontal: 26,

    
    },
    buttonGroupText: {
        textAlign: 'center',
        color: 'black',
    },
    buttonGroupItemtwo: {
        
        fontWeight: '700',
        fontSize: 16,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        paddingHorizontal: 20,
        paddingVertical: 10,
        
    },
    iconTextContainer: {
       

    
    }, 
    buttonGrouptwo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 50,
        borderColor: '#F2F2F2',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: '#ffffff',
        fontSize: 16,
    },
    buttonGroupTexttwo: {
        textAlign: 'center',
        color: 'black',
        fontSize : 11.5,
    },
   
    buttonGroupItem: {
        flex: 1,
        margin: 5,
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        
    },
    activeButton: {
        backgroundColor: '#0073B1',
        textAlign: 'center',
        color: 'white',
        borderRadius: 30,
    },
    activeButtonText: {
        color: '#ffffff',
    },
    priceSummary: {
        marginBottom: 20,
        textAlign: 'center',
       
    },
    priceSummaryText: {
        fontSize: 15,
        fontWeight: '500',
        alignItems: 'center',
        color: 'teal',
    },
    scrollView: {
        width: '100%',
        
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 7,
        borderColor: '#FAF9F6',
        borderWidth: 1,
        marginBottom: 10,
        
        backgroundColor: '#FAF9F6',
    },
    infoRowText: {
        flex: 1,
        textAlign: 'left',
        paddingLeft: 10,
        color: '#4682B4',
    },
    infoRowTextRight: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 10,
    },
    priceContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
       
        
    },
    buttonGroupthree: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 30,
        

        marginBottom: 10,
        backgroundColor: '#ffffff',
        
    },
    priceValueText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#0073B1',
    },
});

export default Marketmodal;
