import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import { Text } from "galio-framework";
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';

const MarketModal = ({ modalVisible, selectedItem, setModalVisible, formatDate, formatTime }) => {
    const [priceHistory, setPriceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeButton, setActiveButton] = useState(0);
    const [timeframe, setTimeframe] = useState('today');

    const getHistoryByTimeframe = async (mandiId, category, timeframe) => {
        try {
            console.log('Fetching history by timeframe:', mandiId, category, timeframe);
            const response = await axios.get(`${Base_url}api/mandi_rates/history/timeframe/${mandiId}/${category}/${timeframe}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching history by timeframe:', error);
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
    
                   
                    const sortedData = historyData.map(entry => ({
                        price: entry.categoryPrices[0]?.price,
                        date: entry.createdAt
                    })).filter(entry => !isNaN(entry.price) && !isNaN(new Date(entry.date).getTime()))
                      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sorting by date
    
                    setPriceHistory(sortedData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching history:', error);
                    setLoading(false);
                }
            };
    
            fetchHistory();
        }
    }, [modalVisible, timeframe]);
    

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

                        <View style={styles.buttonGroup}>
                            <Text style={styles.buttonGroupText}>Add to:</Text>
                            <Text style={styles.buttonGroupText}>Notification</Text>
                            <Text style={styles.buttonGroupText}>Favourite</Text>
                        </View>

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
    ))
}
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
        height: '90%',
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
        padding: 10,
        borderRadius: 30,
        borderColor: '#F2F2F2',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: '#ffffff',
    },
    buttonGrouptwo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 30,
        borderColor: '#F2F2F2',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: '#ffffff',
    },
    buttonGroupTexttwo: {
        textAlign: 'center',
        color: 'black',
    },
    buttonGroupText: {
        flex: 1,
        textAlign: 'center',
        color: 'black',
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 7,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: 'transparent',
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
    scrollView: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    buttonGroupItem: {
        flex: 1,
        textAlign: 'center',
        padding: 5,
        borderRadius: 15,
    },
    activeButton: {
        backgroundColor: 'blue',
        textAlign: 'center',
        color: 'white',
    },
    activeButtonText: {
        color: 'white',
    },
});

export default MarketModal;
