import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeData } from "../../Theme/Theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const B2cOrderCard = () => {
    const navigation = useNavigation();
    const handelCardClick = () => {
        navigation.navigate('B2cOrderDetails');
    };
  // JSON Data for the card
  const orderData = {
    companyName: "United Enterprises",
    quotationsReceived: 3,
    product: {
      name: "Iron Scrap",
      expectedPrice: "₹ 40 / Kg",
      quantity: "100 Ton",
      location: "Near Dmart, Mahavir Nagar, 302033, Jaipur, India",
      imageUrl:
        "https://cdn.pixabay.com/photo/2018/01/29/21/13/scrap-3111733_960_720.jpg",
    },
  };

  return (
    <TouchableOpacity onPress={handelCardClick}>
    <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.companyName}>{orderData.companyName}</Text>
        <Text style={styles.quotationText}>
          {orderData.quotationsReceived} Quotations Received
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Image */}
        <Image
          source={require("../../assets/B2cScrap.png")}
          style={styles.productImage}
        />

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{orderData.product.name}</Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Expected: </Text>
            {orderData.product.expectedPrice}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Quantity: </Text>
            {orderData.product.quantity}
          </Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" style={styles.locationIcon} />
            <Text style={styles.locationText}>
              {orderData.product.location}
            </Text>
          </View>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.quoteButton}>
        <Text style={styles.quoteButtonText}>Quote your Price</Text>
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 15,
    marginVertical: 15,
    marginHorizontal: 16,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  companyName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  quotationText: {
    fontSize: 12,
    color: ThemeData.color,
  },
  mainContent: {
    flexDirection: "row", // Aligns image and content in a row
    marginBottom: 12,
  },
  productImage: {
    width: 80, // Adjust the image size
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1, 
    justifyContent: "center",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  detailText: {
    fontSize: 10,
    color: "#333",
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
  },
  locationIcon: {
    marginRight: 6,
    fontSize: 20,
    color: ThemeData.color,
  },
  locationText: {
    fontSize: 12,
    color: "#333",
  },
  quoteButton: {
    backgroundColor: "#000",
    paddingVertical: 15,

    borderRadius: 8,
    alignItems: "center",
  },
  quoteButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default B2cOrderCard;
