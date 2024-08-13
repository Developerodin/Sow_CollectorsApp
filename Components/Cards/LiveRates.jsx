import React, { useState } from 'react';
import { View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { Block, Text } from "galio-framework";
import marketRates from './marketRates.json';
import logo from "./scrap-img.jpeg";
import MarketModal from './MarketModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icon from './trend.png';

const LiveRates = () => {
    const [selectedCity, setSelectedCity] = useState('All');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [visibleItems, setVisibleItems] = useState(5); // State to manage number of items visible

    const cities = ['All', ...new Set(marketRates.map(item => item.city))];

    const filteredData = selectedCity === 'All'
        ? marketRates
        : marketRates.filter(item => item.city === selectedCity);

    const handleShowMore = () => {
        setVisibleItems(filteredData.length); // Show all items
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleCityPress = (city) => {
        setSelectedCity(city);
        setVisibleItems(5); // Reset visible items when city changes
    };

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const renderMarketItem = ({ item }) => (
        <TouchableOpacity style={{ marginTop: 20 }} activeOpacity={0.5} onPress={() => handleItemPress(item)}>
            <Block style={{ width: '100%', borderRadius: 10, padding: 5, borderWidth: 1, borderColor: "#C8C8C8", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", backgroundColor: '#FFFFFF' }}>
                <Block>
                    <Image
                        source={logo}
                        style={{ resizeMode: 'cover', width: 50, height: 50 }}
                    />
                </Block>
                <Block style={{ width: "60%", marginLeft: 15 }}>
                    <Text style={{ fontWeight: '700', color: "#002379", fontSize: 14 }}>{item.name.toUpperCase()}</Text>
                    <Text style={{ fontSize: 13,fontWeight: '600' }}>{item.category}</Text>
                    <Text style={{ fontSize: 12,fontWeight: '600' }}>{formatDate(item.date)}  {item.time} </Text>
                </Block>
                <Block style={{textAlign:'right'}}>
                    <Text style={{ fontWeight: '500', color: "#002379", fontSize: 14 }}>₹ {item.price}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: 5 ,color:'#e41010',fontWeight:400}}>0 </Text>
                        <Image source={icon} style={{ width: 24, height: 24 }} />
                    </View>
                </Block>
            </Block>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginVertical: 10, paddingLeft: 10 }}
            >
                {cities.map(city => (
                    <TouchableOpacity
                        key={city}
                        onPress={() => handleCityPress(city)}
                        style={{ marginRight: 10, padding: 10, backgroundColor: selectedCity === city ? '#002379' : '#fff', borderRadius: 10 }}
                    >
                        <Text style={{ color: selectedCity === city ? '#fff' : 'black' }}>{city}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FlatList
                data={filteredData.slice(0, visibleItems)} // Show only the visible items
                renderItem={renderMarketItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                ListFooterComponent={
                    visibleItems < filteredData.length ? (
                        <TouchableOpacity onPress={handleShowMore} style={{ marginVertical: 20, alignSelf: 'center', padding: 10, borderRadius: 10, backgroundColor: '#002379' }}>
                            <Text style={{ color: '#fff', fontWeight: '600' }}>Show More</Text>
                        </TouchableOpacity>
                    ) : null
                }
            />

            {/* Modal */}
            <MarketModal
                modalVisible={modalVisible}
                selectedItem={selectedItem}
                setModalVisible={setModalVisible}
                formatDate={formatDate}
            />
        </View>
    );
};

export default LiveRates;
