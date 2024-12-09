import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Block, Text } from "galio-framework";
import B2bOrderCard from "../../Components/Cards/B2bOrderCard"; // Ensure the correct import
import B2cOrderCard from "../../Components/Cards/B2cOrderCard"; // Ensure the correct import
import { ThemeData } from "../../Theme/Theme";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";
import { useAppContext } from '../../Context/AppContext';
import icon from "../../assets/filterIcon.png";

export const NewOrders = () => {
  const [activeTab, setActiveTab] = useState("B2B");
  const [activeFilter, setActiveFilter] = useState("All"); // State for the new tabs
  const { userDetails, update, setUpdate } = useAppContext();
  const [refreshing, setRefreshing] = useState(false);
  const [b2bOrders, setB2bOrders] = useState([]);
  const [errorFetchingOrders, setErrorFetchingOrders] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const onRefresh = () => {
    setRefreshing(true);
    getB2bOrders(activeFilter.toLowerCase());
    setRefreshing(false);
  };

  const getB2bOrders = async (period) => {
    console.log(userDetails.id, activeFilter.toLowerCase());
    try {
      setLoading(true); // Set loading to true before API call
      const response = await axios.post(`${Base_url}b2bOrder/getNewOrdersForUser`, {
        userId: userDetails.id,
        period: period.toLowerCase()
      });
      console.log(response.data);
      // Sort orders from new to old
      const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setB2bOrders(sortedOrders);
      setErrorFetchingOrders(false); // Reset error state on successful fetch
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setErrorFetchingOrders(true); // Set error state if 404 error occurs
      }
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  useEffect(() => {
    getB2bOrders(activeFilter.toLowerCase());
  }, [activeFilter, update]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Orders</Text>
       <Image source={icon} style={{width: 25, height: 25}}/>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'B2B' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('B2B')}
        >
          <Text style={[styles.tabText, activeTab === 'B2B' ? styles.activeTabText : styles.inactiveTabText]}>
            B2B
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'B2C' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('B2C')}
        >
          <Text style={[styles.tabText, activeTab === 'B2C' ? styles.activeTabText : styles.inactiveTabText]}>
            B2C
          </Text>
        </TouchableOpacity>
      </View>

      {/* Order Info */}
      <Text style={styles.orderInfo}>
        There are <Text style={{ color: ThemeData.color }}>{b2bOrders.length} New orders</Text> today!
      </Text>

      {/* Filter Tabs */}
      <View style={styles.filterTabsContainer}>
        {["All", "Today", "Last week", "Last month"].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              activeFilter === filter ? styles.activeFilterTab : styles.inactiveFilterTab,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === filter ? styles.activeFilterTabText : styles.inactiveFilterTabText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
          activeTab === "B2B" ? (
            b2bOrders.length > 0 ? (
              b2bOrders.map((order) => <B2bOrderCard key={order._id} data={order} />)
            ) : (
              <Text style={styles.noOrdersText}>No B2B orders available.</Text>
            )
          ) : (
            <>
              <B2cOrderCard />
              <B2cOrderCard />
              <B2cOrderCard />
            </>
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 0,
    paddingTop: 40,
    marginBottom: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 21,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    alignSelf: "center",
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: "#000",
  },
  inactiveTab: {
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: "#fff",
  },
  inactiveTabText: {
    color: "#000",
  },
  orderInfo: {
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
    paddingHorizontal: 16,
    marginTop: 10,
    fontWeight: "500",
  },
  filterTabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  filterTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  activeFilterTab: {
    backgroundColor: "#000",
  },
  inactiveFilterTab: {
    backgroundColor: "#f0f0f0",
  },
  filterTabText: {
    fontSize: 15,
    fontWeight: "400",
  },
  activeFilterTabText: {
    color: "#fff",
  },
  inactiveFilterTabText: {
    color: "#000",
  },
  noOrdersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default NewOrders;