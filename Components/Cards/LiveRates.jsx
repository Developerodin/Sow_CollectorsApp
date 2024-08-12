import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, FlatList, Modal, Button } from 'react-native';
import { Block, Text } from "galio-framework";
import marketRates from './marketRates.json';
import logo from "./scrap-img.jpeg";
import { LineChart } from 'react-native-chart-kit';

const LiveRates = () => {
    const [selectedCity, setSelectedCity] = useState('All');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const cities = ['All', ...new Set(marketRates.map(item => item.city))];

    const filteredData = selectedCity === 'All'
        ? marketRates
        : marketRates.filter(item => item.city === selectedCity);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleCityPress = (city) => {
        setSelectedCity(city);
    };

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const renderCityItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleCityPress(item)}
            style={{ padding: 10, backgroundColor: selectedCity === item ? '#002379' : '#fff', borderRadius: 5, marginHorizontal: 5, borderColor: '#002379' }}
        >
            <Text style={{ color: selectedCity === item ? '#fff' : '#000', borderColor: '#002379' }}>{item}</Text>
        </TouchableOpacity>
    );

    const renderMarketItem = ({ item }) => (
        <TouchableOpacity style={{ marginTop: 20 }} activeOpacity={0.5} onPress={() => handleItemPress(item)}>
            <Block style={{ width: '100%', borderRadius: 10, padding: 5, borderWidth: 1, borderColor: "#C8C8C8", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", backgroundColor: '#FFFFFF' }}>
                <Block>
                    <Image
                        source={logo}
                        style={{ resizeMode: 'cover', width: 50, height: 50, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                    />
                </Block>
                <Block style={{ width: "60%", marginLeft: 20 }}>
                    <Text style={{ fontWeight: '500', color: "#002379", fontSize: 14 }}>{item.name.toUpperCase()}</Text>
                    <Text style={{ fontSize: 12 }}>{item.category}</Text>
                    <Text style={{ fontSize: 11 }}>{formatDate(item.date)}  {item.time} </Text>
                </Block>
                <Block>
                    <Text style={{ fontWeight: '500', color: "#002379", fontSize: 14 }}>₹ {item.price}</Text>
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
                        <Text style={{ color: selectedCity === city ? '#fff' : '#000' }}>{city}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FlatList
                data={filteredData}
                renderItem={renderMarketItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />

            {/* Modal Component */}
            {selectedItem && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalContent}>
                            {/* Top Bar */}
                            <View style={styles.topBar}>
                                <View style={styles.topBarHandle}></View>
                            </View>

                            {/* Title */}
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 30, borderColor: '#F2F2F2', borderWidth: 1,marginBottom:10,backgroundColor:'#ffffff'}}>
  <Text style={{flex: 1, textAlign: 'center'}}>Add to:</Text>
  <Text style={{flex: 1, textAlign: 'center'}}>Notification</Text>
  <Text style={{flex: 1, textAlign: 'center'}}>Favourite</Text>
</View>


                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',padding: 10, borderRadius: 30, borderColor: '#F2F2F2', borderWidth: 1,backgroundColor:'#ffffff'}}>
  <Text style={{flex: 1, textAlign: 'center'}}>Today</Text>
  <Text style={{flex: 1, textAlign: 'center'}}>Week</Text>
  <Text style={{flex: 1, textAlign: 'center'}}>Month</Text>
  <Text style={{flex: 1, textAlign: 'center'}}>3 Month</Text>
  <Text style={{flex: 1, textAlign: 'center'}}>Custom</Text>
</View>
                            {/* Line Chart */}
                            <LineChart
                                data={{
                                    labels: ['9:00', '12:00', '15:00', '18:00'],
                                    datasets: [
                                        {
                                            data: [30000, 37000, 32000, 37000],
                                            color: (opacity = 1) => `rgba(2, 115, 177, ${opacity})`, // Color of the line
                                            strokeWidth: 2 // Thickness of the line
                                        },
                                    ],
                                }}
                                width={Dimensions.get("window").width - 40} // Adjust width as needed
                                height={220}
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
                                        stroke: "#ffa726"
                                    }
                                }}
                                
                                style={{
                                    marginVertical: 20,
                                    borderRadius: 16,
                                }}
                            />

                            {/* Additional Information */}
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 30, borderColor: '#F2F2F2', borderWidth: 1, marginBottom: 10, backgroundColor: '#ffffff'}}>
  <Text style={{flex: 1, textAlign: 'left', paddingLeft: 10, color: '#4682B4'}}>{formatDate(selectedItem.date)} {selectedItem.time}</Text>
  <Text style={{flex: 1, textAlign: 'right', paddingRight: 10}}>₹ {selectedItem.price}</Text>
</View>

<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 30, borderColor: '#F2F2F2', borderWidth: 1, marginBottom: 10, backgroundColor: '#ffffff'}}>
  <Text style={{flex: 1, textAlign: 'left', paddingLeft: 10, color: '#4682B4'}}>{formatDate(selectedItem.date)} {selectedItem.time}</Text>

  <Text style={{flex: 1, textAlign: 'right', paddingRight: 10}}>₹ {selectedItem.price}</Text>
</View>
                          

                            <Button title="Close" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'flex-end',

    },
    modalContent: {
        height: '65%',
        backgroundColor: "#FAFAFA",
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
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#002379',
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#808080',
        marginVertical: 5,
    },
    modalPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#002379',
        marginBottom: 20,
    },
    additionalInfo: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    additionalInfoText: {
        fontSize: 14,
        color: '#808080',
    },
});

export default LiveRates;
