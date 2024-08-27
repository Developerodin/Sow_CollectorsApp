import React, { useState, useEffect ,useContext} from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import { Text } from "galio-framework";
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../Context/AppContext';

const MarketModal = ({ modalVisible, selectedItem, setModalVisible, formatDate, formatTime }) => {
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
                setFavouriteAdded(prev => [...prev, mandiId]);  // Add mandiId to favourite list
            } else if (listType === 'notification') {
                setNotificationAdded(prev => [...prev, mandiId]); // Add mandiId to notification list
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
                        const sortedData = historyData.map(entry => ({
                            price: entry.categoryPrices[0]?.price,
                            date: entry.createdAt
                        })).filter(entry => !isNaN(entry.price) && !isNaN(new Date(entry.date).getTime()))
                        .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sorting by date
    
                        setPriceHistory(sortedData);
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
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableOpacity style={styles.backdrop} onPress={() => setModalVisible(false)}>
                <TouchableOpacity activeOpacity={1} style={styles.modalView}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.topBar} onPress={() => setModalVisible(false)}>
                            <View style={styles.topBarHandle}></View>
                        </TouchableOpacity>

                        {timeframe === 'today' ? (
                             <View style={[styles.buttonGroup]}>
                             <Text style={styles.buttonGroupItemtwo}>Add to:</Text>
                             <TouchableOpacity
                                 onPress={() => addMandiToList(selectedItem?.mandi?._id, 'notification')}
                                 style={styles.buttonGroupItemtwo}
                             >
                                 <View style={styles.iconTextContainer}>
                                 <Ionicons 
                                    name={notificationAdded.includes(selectedItem?.mandi?._id) ? "checkmark-circle-outline" : "notifications-outline"} 
                                    size={20} 
                                    color={notificationAdded.includes(selectedItem?.mandi?._id) ? "green" : "black"} 
                                    style={{ textAlign: 'center' }}
                                />
                                     <Text style={styles.buttonGroupText}>Notification</Text>
                                 </View>
                             </TouchableOpacity>
                             <TouchableOpacity
                                 onPress={() => addMandiToList(selectedItem?.mandi?._id, 'favorite')}
                                 style={styles.buttonGroupItemtwo}
                             >
                                 <View style={styles.iconTextContainer}>
                                     <Ionicons 
                                         name={favouriteAdded.includes(selectedItem?.mandi?._id) ? "checkmark-circle-outline" : "heart-outline"} 
                                         size={20} 
                                         color={favouriteAdded.includes(selectedItem?.mandi?._id) ? "green" : "black"} 
                                         style={{ textAlign: 'center' }}
                                     />
                                     <Text style={styles.buttonGroupText}>Favourite</Text>
                                 </View>
                             </TouchableOpacity>
                         </View>
                        ) : (
                            <View style={styles.buttonGroupthree}>
                                <View style={[styles.priceContainer, { marginRight: 85 }]}>
                                    <Text style={styles.priceSummaryText}>Highest</Text>
                                    <Text style={styles.priceValueText}>₹ {highestPrice}</Text>
                                </View>
                                <View style={[styles.priceContainer, { marginRight: 85 }]}>
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
                            {['Today', 'Week', 'Month', 'Year', 'All'].map((label, index) => (
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
                            <Text>No data available for the selected timeframe.</Text>
                        ) : (
                            <>
                                <LineChart
                                    data={{
                                        labels: priceHistory.map(entry => formatTime(entry.date)),
                                        datasets: [
                                            {
                                                data: priceHistory.map(entry => entry.price),
                                                color: (opacity = 1) => `rgba(0, 115, 177, ${opacity})`,
                                                strokeWidth: 2,
                                            },
                                        ],
                                    }}
                                    width={Dimensions.get("window").width - 40}
                                    height={200}
                                    chartConfig={{
                                        backgroundGradientFrom: '#ffffff',
                                        backgroundGradientTo: '#ffffff',
                                        decimalPlaces: 0,
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                        propsForDots: {
                                            r: "6",
                                            strokeWidth: "2",
                                            stroke: "#000000",
                                        },
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

                                <ScrollView style={styles.scrollView}>
                                    {priceHistory
                                        .sort((a, b) => new Date(b.date) - new Date(a.date)) 
                                        .map((entry, index) => (
                                            <View key={index} style={styles.infoRow}>
                                                <Text style={styles.infoRowText}>{formatDate(entry.date)}</Text>
                                                <Text style={styles.infoRowTextRight}>₹ {entry.price}</Text>
                                            </View>
                                        ))}
                                </ScrollView>
                            </>
                        )}
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalView: {
        justifyContent: 'flex-end',
    },
    modalContent: {
        height: '85%',
        backgroundColor: "#F2F2F2",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
    },
    buttonGroupTexttwo: {
        textAlign: 'center',
        color: 'black',
    },
   
    buttonGroupItem: {
        flex: 1,
        margin: 5,
        padding: 10,
        borderRadius: 5,
        
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
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 30,
        borderColor: '#F2F2F2',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: '#ffffff',
        
    },
    priceValueText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#0073B1',
    },
});

export default MarketModal;
