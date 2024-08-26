import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { Block, Text } from "galio-framework";
import axios from 'axios';
import MarketModal from './MarketModal';
import logo from "./scrap-img.jpeg";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Base_url } from '../../Config/BaseUrl';
import icon from './trend.png';

const LiveRates = () => {
    const [selectedState, setSelectedState] = useState('All');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [marketRates, setMarketRates] = useState([]);
    const [visibleItems, setVisibleItems] = useState(4);

    const getAllData = async () => {
        try {
            const response = await axios.get(`${Base_url}api/mandi_rates/all-data`);
            const allData = response.data;

            console.log("Fetched Data:", allData);

            // Group by mandi ID and keep only the latest entry, while checking if `mandi` exists
            const latestData = Object.values(
                allData.reduce((acc, curr) => {
                    const mandi = curr.mandi;
                    if (mandi && mandi._id) {
                        const mandiId = mandi._id;
                        if (!acc[mandiId] || new Date(acc[mandiId].updatedAt) < new Date(curr.updatedAt)) {
                            acc[mandiId] = curr;
                        }
                    }
                    return acc;
                }, {})
            );

            console.log("Latest Data after Grouping:", latestData);

            // Filter out any entries without a mandi name
            const filteredData = latestData.filter(item => item.mandi && item.mandi.mandiname);

            console.log("Filtered Data:", filteredData);

            setMarketRates(filteredData);
        } catch (error) {
            console.error("Error fetching all data:", error);
        }
    };

    useEffect(() => {
        getAllData();
    }, []);

    const states = ['All', ...new Set(marketRates.map(item => item.mandi?.state).filter(state => state))];

    const filteredData = selectedState === 'All'
        ? marketRates
        : marketRates.filter(item => item.mandi?.state === selectedState);

    const handleShowMore = () => {
        setVisibleItems(filteredData.length);
    };

    const handleShowLess = () => {
        setVisibleItems(4);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        
        // Format date part as DD-MM-YYYY
        const datePart = `${day}-${month}-${year}`;
        
        // Format time part as HH:MM AM/PM
        const timePart = date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        return `${datePart} ${timePart}`;
    };
     

    const formatTime = (dateString) => {
        const date = new Date(dateString);
    
        
        const timePart = date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    
        return timePart;
    };



    const handleStatePress = (state) => {
        setSelectedState(state);
        setVisibleItems(5);
    };

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
        console.log("Selected Item:", item);
    };

    const renderMarketItem = ({ item }) => (
        item.categoryPrices.map((priceItem, index) => (
            <TouchableOpacity key={index} style={{ marginTop: 10 }} activeOpacity={0.5} onPress={() => handleItemPress(item)}>
                <Block style={{ width: '100%', borderRadius: 10, padding: 5, borderWidth: 1, borderColor: "#C8C8C8", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", backgroundColor: '#FFFFFF' }}>
                    <Block>
                        <Image
                            source={logo}
                            style={{ resizeMode: 'cover', width: 50, height: 50 }}
                        />
                    </Block>
                    <Block style={{ width: "60%", marginLeft: 15 }}>
                        <Text style={{ fontWeight: '700', color: "#002379", fontSize: 13 }}>{item.mandi?.mandiname || 'Unknown Mandi'}</Text>
                        <Text style={{ fontSize: 13, fontWeight: '600' }}>{priceItem.category}</Text>
                        <Text style={{ fontSize: 12, fontWeight: '600' }}>{formatDate(item.updatedAt)}</Text>
                    </Block>
                    <Block style={{ textAlign: 'right' }}>
                        <Text style={{ fontWeight: '500', color: "#002379", fontSize: 13 }}>
                            ₹ {priceItem.price}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: 5 ,color:'#e41010',fontWeight:400}}>20% </Text>
                        <Image source={icon} style={{ width: 24, height: 24 }} />
                    </View>
                    </Block>
                </Block>
            </TouchableOpacity>
        ))
    );

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginVertical: 10, paddingLeft: 10 }}
            >
                {states.map(state => (
                    <TouchableOpacity
                        key={state}
                        onPress={() => handleStatePress(state)}
                        style={{ marginRight: 10, padding: 10, backgroundColor: selectedState === state ? '#239456' : '#fff', borderRadius: 10 }}
                    >
                        <Text style={{ color: selectedState === state ? '#fff' : 'black' }}>{state}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FlatList
                data={filteredData.slice(0, visibleItems)}
                renderItem={renderMarketItem}
                keyExtractor={item => item._id}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                ListFooterComponent={
                    visibleItems < filteredData.length ? (
                        <TouchableOpacity onPress={handleShowMore} style={{ marginVertical: 20, alignSelf: 'center' }}>
                            <EvilIcons name="arrow-down" size={32} color="#239456" style={{ marginBottom: 10 }} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleShowLess} style={{ marginVertical: 20, alignSelf: 'center' }}>
                            <EvilIcons name="arrow-up" size={32} color="#239456" style={{ marginBottom: 10 }} />
                        </TouchableOpacity>
                    )
                }
            />

            <MarketModal
                modalVisible={modalVisible}
                selectedItem={selectedItem}
                setModalVisible={setModalVisible}
                formatDate={formatDate}
                formatTime={formatTime}
            />
        </View>
    );
};

export default LiveRates;
