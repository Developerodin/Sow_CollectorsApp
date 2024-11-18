import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import B2bOrderCard from "../../Components/Cards/B2bOrderCard"; // Ensure the correct import
import B2cOrderCard from "../../Components/Cards/B2cOrderCard"; // Ensure the correct import
import { ThemeData } from "../../Theme/Theme";

export const NewOrders = () => {
  const [activeTab, setActiveTab] = useState("B2B");
  const [activeFilter, setActiveFilter] = useState("All"); // State for the new tabs

  const b2bOrders = [
    {
      id: "1",
      weight: "50Kg",
      price: "₹3000",
      location: "Mahavir Nagar",
      name: "Vishal Rao",
      date: "21/11/24",
      time: "10:00 AM",
      estValue: "₹3000",
      items: ["Aluminium"],
      address: "Pickup Location : Near Dmart, Mahavir Nagar, 302033, Jaipur, India.",
    },
    {
      id: "2",
      weight: "50Kg",
      price: "₹3000",
      location: "Mahavir Nagar",
      name: "Vishal Rao",
      date: "21/11/24",
      time: "10:00 AM",
      estValue: "₹3000",
      items: ["Aluminium"],
      address: "Pickup Location : Near Dmart, Mahavir Nagar, 302033, Jaipur, India.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Orders</Text>
        <Ionicons name="filter-outline" size={24} color="black" />
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
      <Text style={styles.orderInfo}>There are <Text style={{color: ThemeData.color}}>5 New orders</Text> today!</Text>

      
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

      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
        {activeTab === "B2B" ? (
          b2bOrders.map((order) => <B2bOrderCard key={order.id} data={order} />)
        ) : (
          <>
            <B2cOrderCard />
            <B2cOrderCard />
            <B2cOrderCard />
          </>
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
  },
  activeFilterTab: {
    backgroundColor: "#000",
  },
  inactiveFilterTab: {
    backgroundColor: "#f0f0f0",
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: "400",
  },
  activeFilterTabText: {
    color: "#fff",
  },
  inactiveFilterTabText: {
    color: "#000",
  },
});

export default NewOrders;
