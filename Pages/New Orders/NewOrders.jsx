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

export const NewOrders = () => {
  const [activeTab, setActiveTab] = useState("B2B");

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
      <Text style={styles.orderInfo}>There are 5 New orders today!</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'B2B' ? (
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
    backgroundColor: "#fafafa",
    paddingHorizontal: 16,
    paddingTop: 40,
    marginBottom: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 5,
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
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: '#000',
  },
  inactiveTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: '#000',
  },
  orderInfo: {
    fontSize: 14,
    color: "#444",
    marginBottom: 16,
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  comingSoonText: {
    fontSize: 18,
    color: '#888',
  },
});

export default NewOrders;