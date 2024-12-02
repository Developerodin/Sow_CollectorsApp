import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, ToastAndroid, Dimensions, FlatList, Image, RefreshControl } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from '../../../Context/AppContext';
import { Base_url } from "../../../Config/BaseUrl";
import axios from "axios";
import Logo from "../../../assets/addressIcon.png";
import Logo2 from "../../../assets/bag.png";
import Logo3 from "../../../assets/logo2.png";

const { width } = Dimensions.get('window');

export const AccountSettings = () => {
  const navigation = useNavigation();
  const { userDetails, update, setUpdate } = useAppContext();
  const [selectedAddressType, setSelectedAddressType] = useState("Warehouse");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddAddress = () => {
    navigation.navigate("Address", { userId: userDetails.id });
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`${Base_url}b2bUser/${userDetails.id}`);
      console.log(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setMobile(response.data.phoneNumber);
      setBusinessName(response.data.businessName);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetails = async () => {
    try {
      const response = await axios.put(`${Base_url}b2bUser/${userDetails.id}`, {
        name: name,
        email: email,
        businessName: businessName,
      });
      console.log(response.data);
      ToastAndroid.show("User details updated successfully", ToastAndroid.SHORT);
      setUpdate(!update); 
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAddress = async () => {
    try {
      const response = await axios.get(`${Base_url}b2bUser/address/${userDetails.id}`);
      console.log("Addres =>", response.data.data);
      setAddress(response.data.data);
    } catch (error) {
      setAddress([]);
      console.log("Error retrieving data from api", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getUserDetails();
    getUserAddress();
    setRefreshing(false);
  };

  useEffect(() => {
    getUserDetails();
    getUserAddress();
  }, [update]);

  const renderAddress = ({ item }) => (
    <View style={styles.addressCard}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={Logo} style={{ width: 15, height: 15 }} />
          <Text style={styles.addressTitle}>{item.buildingName}</Text>
        </View>
        <Text style={styles.addressDetail}>{item.googleAddress}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginVertical: 30,
          height: 50,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            console.log("Back pressed");
          }}
        >
          <TouchableOpacity onPress={handleBack} activeOpacity={0.9}>
            <View style={{ padding: 10, backgroundColor: '#000', borderRadius: 30, width: 50, height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <MaterialIcons name="arrow-back-ios" size={22} color="#fff" style={{ marginLeft: 5 }} />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: "#000",
              fontSize: 25,
              marginLeft: 10,
              fontWeight: 500,
            }}
          >
            Account Settings
          </Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 15 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Name */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Email Address */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mobile Number */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <View>
            <Text style={{
              justifyContent: "space-between",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#A6A6A6",
              paddingVertical: 17,
              color: "#A6A6A6",
              borderRadius: 8,
              paddingHorizontal: 16,
            }}>
              +91  {mobile}
            </Text>
          </View>
        </View>

        {/* Manage Address */}
        <Text style={styles.sectionTitle}>Manage Address</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedAddressType === "Warehouse" && styles.toggleSelected,
            ]}
            onPress={() => setSelectedAddressType("Warehouse")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={Logo2} style={{ width: 19, height: 19 }} />
              <Text style={[styles.toggleText, selectedAddressType === "Warehouse" && styles.toggleSelectedText]}>Warehouse</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedAddressType === "Other" && styles.toggleSelected,
            ]}
            onPress={() => setSelectedAddressType("Other")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={Logo3} style={{ width: 11, height: 13 }} />
              <Text style={[styles.toggleText, selectedAddressType == "Other" && styles.toggleSelectedText]}>Other</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Addresses */}
        <FlatList
          data={address}
          renderItem={renderAddress}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />

        {/* Add Address */}
        <TouchableOpacity onPress={handleAddAddress}>
          <View style={styles.addAddressContainer}>
            <Ionicons name="add-circle" size={32} color="#000" />
            <Text style={styles.addAddressButton}>Add new Address</Text>
          </View>
        </TouchableOpacity>

        {/* Business Info */}
        <Text style={styles.sectionTitle}>Business Info</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Business Name</Text>
          <View style={[styles.row, { marginBottom: 10 }]}>
            <TextInput
              style={styles.input}
              placeholder="Enter your business name"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>
          <Text style={styles.label}>GSTIN</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="Enter your GST Number"
            />
          </View>
        </View>

        {/* Upload Photo/Video */}
        <Text style={styles.sectionTitle}>Upload photo/video</Text>
        <Text style={styles.label}>Warehouse Live Video</Text>
        <TouchableOpacity style={styles.button1}>
          <Ionicons
            name="camera"
            size={24}
            color="#000"
            style={styles.icon}
          />
          <Text style={{ fontSize: 18, fontWeight: 400, color: "#000" }}>
            Open Camera
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Owner’s photo in workplace</Text>
        <TouchableOpacity style={styles.button1}>
          <Ionicons
            name="camera"
            size={24}
            color="#000"
            style={styles.icon}
          />
          <Text style={{ fontSize: 18, fontWeight: 400, color: "#000" }}>
            Open Camera
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={updateUserDetails} activeOpacity={0.7}>
          <Text style={{ fontSize: 18, fontWeight: 400, color: "#fff" }}>
            Update
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: { fontSize: 18, color: "#000" },
  headerTitle: { fontSize: 25, fontWeight: "600", marginLeft: 20 },
  fieldContainer: { marginBottom: 20 },
  label: { fontSize: 14, color: "#000", marginBottom: 5, fontWeight: '600' },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A6A6A6",
    paddingVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  input: { fontSize: 16, color: "#000", flex: 1, padding: 5 },
  editButton: { color: "#65C5C4", fontSize: 14 },
  sectionTitle: { fontSize: 30, fontWeight: "600", marginVertical: 12 },
  toggleRow: { flexDirection: "row", marginBottom: 20, gap: 10 },
  toggleButton: {
    alignItems: "center",
    paddingVertical: 7,
    borderRadius: 30,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 15,
  },
  toggleSelected: { backgroundColor: "#000" },
  toggleText: { color: "#000", fontSize: 18, marginLeft: 10 },
  toggleSelectedText: { color: "#fff" },
  addressCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    padding: 13,
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 8,
  },
  addressTitle: { fontWeight: "600", fontSize: 18, color: "#000", marginBottom: 5, marginLeft: 10 },
  addressDetail: { fontSize: 14, color: "#666" },
  addAddressButton: { color: "#000", fontSize: 18, marginLeft: 5, fontWeight: '600' },
  addAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 25,
  },
  uploadCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
  },
  uploadText: { fontSize: 14 },
  uploadButton: { color: "#007BFF", fontSize: 14 },
  button1: {
    borderWidth: 1,
    width: width * 0.93,
    height: 60,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "black",
    borderRadius: 10,
  },
  button2: {
    borderWidth: 1,
    width: width * 0.93,
    height: 60,
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "black",
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AccountSettings;