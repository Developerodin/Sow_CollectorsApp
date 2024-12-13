import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Image, ActivityIndicator } from 'react-native';
import { Block, Text } from "galio-framework";
import { Ionicons, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Base_url } from '../../Config/BaseUrl'; // Ensure this is correctly imported
import { useAppContext } from '../../Context/AppContext';
import { ThemeData } from '../../Theme/Theme';
import icon from "../../assets/filterIcon.png";
import icon2 from "../../assets/ruppes.png";

export const Orders = () => {
  const navigation = useNavigation();
  const { userDetails, update, setUpdate } = useAppContext();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const [selectedAction, setSelectedAction] = useState('Sell');
  const [errorFetchingOrders, setErrorFetchingOrders] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state


  const formatPrice = (price) => {
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    }
    return `₹${price}`;
  };

  const onRefresh = () => {
    setRefreshing(true);
    getOrders(selectedTab.toLowerCase(), selectedAction.toLowerCase());
    setRefreshing(false);
  };

  const handleMandiRates = () => {
    navigation.navigate("MandiRates");
  };

  const handleViewDetail = (id) => {
    navigation.navigate("Pending Order", { id });
  }

  const getOrders = async (type, action) => {
    try {
      setLoading(true); // Set loading to true before API call
      console.log("User ID:", userDetails.id, "Type:", type, "Action:", action);
      const response = await axios.post(`${Base_url}b2bOrder/filterorders`, {
        userId: userDetails.id,
        type,
        action
      });
      console.log("Fetched Orders ===>:", response.data);
      const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPendingOrders(sortedOrders);
      setErrorFetchingOrders(false); // Reset error state on successful fetch
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response && error.response.status === 404) {
        setErrorFetchingOrders(true); // Set error state if 404 error occurs
      }
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  useEffect(() => {
    getOrders(selectedTab.toLowerCase(), selectedAction.toLowerCase());
  }, [update]);

  const renderOrderCard = (data) => (
    <View key={data._id} style={styles.cardContainer}>
      
            <View style={[styles.header, { 
        backgroundColor: 
          data.orderStatus === 'Rejected' ? '#FF2020' : 
          data.orderStatus === 'Pending' ? '#FFD12C' : 
          data.orderStatus === 'Cancelled' ? '#FF2020' : 
          data.orderStatus === 'Completed' ? '#96DE20' : 
          '#FFD12C', 
      }]}>
        {data.orderStatus === 'Pending' ? (
          <Feather name="clock" size={18} color={ThemeData.textColor} />
        ) : data.orderStatus === 'Rejected' || data.orderStatus === 'Cancelled' ? (
          <Feather name="x-circle" size={18} color={ThemeData.activeColor} />
        ) : data.orderStatus === 'Completed' ? (
          <Feather name="check-circle" size={18} color={ThemeData.textColor} />
        ) : null}
        <Text style={[styles.statusText, { 
          color: 
            data.orderStatus === 'Rejected' || data.orderStatus === 'Cancelled' ? ThemeData.activeColor : 
            data.orderStatus === 'Completed' ? ThemeData.textColor : 
            ThemeData.textColor, 
        }]}>
          {data.orderStatus}
        </Text>
      </View>

      <Block style={styles.row}>
        <View style={[styles.column,{marginRight: -25}]}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>{data.orderTo && data.orderTo.id === userDetails.id ?
            data.orderBy.name
            :
          data.orderTo?.name
          }</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <AntDesign name="calendar" size={16} color={ThemeData.color} />
            <Text style={[styles.text, { marginLeft: 8 }]}>
              <Text style={styles.blueText}>{new Date(data.createdAt).toLocaleDateString('en-GB')}</Text>
            </Text>
          </View>
        </View>

        <View style={[styles.column,styles.divider, { marginRight: -45 }]}>
          <View style={{marginLeft: 15}}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Est. Value</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
           
              <Image source={icon2} style={{ width: 16, height: 16 }} />
            
            <Text style={styles.amountText}>{formatPrice(data.totalPrice)}</Text>
          </View>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 600 }]}>Items</Text>
          <Text style={[styles.text, { marginTop: 5 }]}>{data.category}</Text>
        </View>
      </Block>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15 }}>
        <Ionicons name="location" size={26} color={ThemeData.color} />
        <Text style={{ flex: 1,fontSize: 14,marginLeft: 8,color: ThemeData.textColor,marginRight:10 }}>
          Pickup Location: {data.location.city}, {data.location.state}
        </Text>
        <TouchableOpacity style={styles.viewDetailsButton} onPress={() => handleViewDetail(data._id)}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: ThemeData.containerBackgroundColor }}>
      <Block style={{ marginTop: 30, backgroundColor: ThemeData.containerBackgroundColor }}></Block>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 25,
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold", color: ThemeData.textColor }}>Your Orders</Text>
          {/* <TouchableOpacity onPress={handleMandiRates}>
            <Image source={icon} style={{ width: 25, height: 25 }} />
          </TouchableOpacity> */}
        </View>
        <ScrollView>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'Upcoming' ? styles.activeTab : styles.inactiveTab]}
              onPress={() => {
                setSelectedTab('Upcoming');
                getOrders('upcoming', selectedAction.toLowerCase());
              }}
            >
              <Text style={[styles.tabText, selectedTab === 'Upcoming' ? styles.activeTabText : styles.inactiveTabText]}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'Previous' ? styles.activeTab : styles.inactiveTab]}
              onPress={() => {
                setSelectedTab('Previous');
                getOrders('previous', selectedAction.toLowerCase());
              }}
            >
              <Text style={[styles.tabText, selectedTab === 'Previous' ? styles.activeTabText : styles.inactiveTabText]}>
                Previous
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sellTabContainer}>
            <TouchableOpacity
              style={[styles.sellTab, selectedAction === 'Sell' ? styles.activeSellTab : styles.inactiveSellTab]}
              onPress={() => {
                setSelectedAction('Sell');
                getOrders(selectedTab.toLowerCase(), 'sell');
              }}
            >
              <Text style={[styles.sellTabText, selectedAction === 'Sell' ? styles.activeSellTabText : styles.inactiveSellTabText]}>
                Sell
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sellTab, selectedAction === 'Purchase' ? styles.activeSellTab : styles.inactiveSellTab]}
              onPress={() => {
                setSelectedAction('Purchase');
                getOrders(selectedTab.toLowerCase(), 'purchase');
              }}
            >
              <Text style={[styles.sellTabText, selectedAction === 'Purchase' ? styles.activeSellTabText : styles.inactiveSellTabText]}>
                Purchase
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <ScrollView
        contentContainerStyle={{ backgroundColor: ThemeData.containerBackgroundColor }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Block style={{ padding: 10, marginBottom: 60 }}>
          {loading ? ( // Show loader while loading
            <Block center style={{ marginTop: 40 }}>
              <ActivityIndicator size="large" color={ThemeData.color} />
            </Block>
          ) : errorFetchingOrders ? (
            <Block center style={{ marginTop: 40 }}>
              <Image
                source={require("../../assets/media/5-dark.png")}
                style={{
                  width: 300,
                  height: 300,
                  marginRight: 10,
                }}
              />
            </Block>
          ) : (
            pendingOrders && pendingOrders.length > 0 ? (
              pendingOrders.map((order) => renderOrderCard(order))
            ) : (
              <Block center style={{ marginTop: 40 }}>
                <Image
                  source={require("../../assets/media/5-dark.png")}
                  style={{
                    width: 300,
                    height: 300,
                    marginRight: 10,
                  }}
                />
              </Block>
            )
          )}
        </Block>
      </ScrollView>
    </View>
      
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    alignSelf: "center",
    marginTop: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: ThemeData.textColor,
  },
  inactiveTab: {
    backgroundColor: ThemeData.activeBackgroundColor,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: ThemeData.activeColor,
  },
  inactiveTabText: {
    color: ThemeData.textColor,
  },
  sellTabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 80,
    alignItems: "center",
    marginTop: 15,
  },
  sellTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
    marginHorizontal: 5, 
    borderRadius: 23,
  },
  sellTabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeSellTab: {
    backgroundColor: ThemeData.textColor,
  },
  inactiveSellTab: {
    backgroundColor: ThemeData.activeBackgroundColor,
  },
  activeSellTabText: {
    color: ThemeData.activeColor,
  },
  inactiveSellTabText: {
    color: ThemeData.textColor,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: ThemeData.color,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: ThemeData.containerBackgroundColor,
    marginTop: 20,
    marginBottom: 15,
    marginHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 15,
    width: 110,
    position: 'absolute',
    right: 10,
    top: -15,
  },
  statusText: {
    color: ThemeData.textColor,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  column: {
    flex: 1,
    alignItems: 'left',
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: ThemeData.color,
    borderLeftWidth: 1,
    borderLeftColor: ThemeData.color,
    marginHorizontal: 5,
  },
  amountText: {
    fontSize: 13,
    fontWeight: '500',
    color: ThemeData.textColor,
    marginLeft: 5,
  },
  text: {
    fontSize: 13,
    color: ThemeData.textColor,
    textAlign: 'center',
    marginLeft: 35,
    
  },
  blueText: {
    color: ThemeData.textColor,
    fontWeight: '500',
  },
  viewDetailsButton: {},
  viewDetailsText: {
    fontSize: 16,
    color: ThemeData.color,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default Orders;