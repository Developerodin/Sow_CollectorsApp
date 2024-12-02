import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Button ,ToastAndroid ,Dimensions} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from '../../../Context/AppContext';

export const AccountSettings = () => {
    const navigation = useNavigation();
    const { userDetails, update, setUpdate } = useAppContext();
  const [selectedAddressType, setSelectedAddressType] = useState("Warehouse"); // Toggle selection
  const [name, setName] = useState("Vishal Rao");
  const [email, setEmail] = useState("vishalrao@gmail.com");
  const [mobile, setMobile] = useState("+91 9876543210");


    const handleBack = () => {
    navigation.goBack();
    };



  const showImagePicker = async (sourceType) => {
    // Request media library permission
    if(images.length < 3){
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access the gallery is required!');
      return;
    }
  
    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      sourceType: sourceType,
      base64: true,  // Request base64 encoding
    });
  
    // Check if the user selected an image
    if (!result.canceled) {
      // console.log("URI of image library ==> ", result.assets[0]);
      const dataImage = result.assets[0]

      if(dataImage){
        // console.log("Base64 of selected image ==> ", result.assets[0].base64);
      const base64data = `data:${dataImage.mimeType};base64,${dataImage.base64}`  // Base64 string
      setImages((prev)=>[...prev,base64data]); 
     
      
        // Or you can set the base64 if needed
      // updateUserImage(userDetails.id,base64data)
      }
      
    }
  }
  else{
    ToastAndroid.show("You can uplode only 3 Images", ToastAndroid.SHORT);
  }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginTop: 20,
        height: 50,
      }}
    >
      
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => {
          // Add back navigation logic here
          console.log("Back pressed");
        }}
      >  
      <TouchableOpacity onPress={handleBack} activeOpacity={0.9}>
        <View style={{padding: 10,backgroundColor:'#000',borderRadius:30,width: 50, height: 50,flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

        <MaterialIcons name="arrow-back-ios" size={22} color="#fff" style={{ marginLeft: 5 }}/>
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
      <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ padding: 15 }}>
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
          <View >
            <Text style={{ justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A6A6A6",
    paddingVertical: 17,
    color: "#A6A6A6",
    borderRadius: 8,
    paddingHorizontal: 16,}}>
           9982103647
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
            <Text style={[styles.toggleText , selectedAddressType === "Warehouse" && styles.toggleSelectedText]}>Warehouse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedAddressType === "Other" && styles.toggleSelected,
            ]}
            onPress={() => setSelectedAddressType("Other")}
          >
            <Text style={[styles.toggleText, selectedAddressType == "Other" && styles.toggleSelectedText]}>Other</Text>
          </TouchableOpacity>
        </View>

        {/* Addresses */}
        {["WH1", "WH2"].map((address, index) => (
          <View key={index} style={styles.addressCard}>
            <View>
              <Text style={styles.addressTitle}>{address}</Text>
              <Text style={styles.addressDetail}>
                Flatbush Ave, Brooklyn, NY 11238, United States
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Add Address */}
        <TouchableOpacity>
          <Text style={styles.addAddressButton}>+ Add new Address</Text>
        </TouchableOpacity>

        {/* Business Info */}
        <Text style={styles.sectionTitle}>Business Info</Text>
        <View style={styles.fieldContainer}>
        <Text style={styles.label}>Business Name</Text>
        <View style={[styles.row,{ marginBottom:10}]}>  
              
        <TextInput
          style={styles.input}
          placeholder="Enter your business name"
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
        <TouchableOpacity  style={styles.button1}>
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
          <TouchableOpacity  style={styles.button1}>
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

          <TouchableOpacity  style={styles.button2}>
            <Text style={{ fontSize: 18, fontWeight: 400, color: "#fff" }}>
                Submit
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
  headerTitle: { fontSize: 18, fontWeight: "600", marginLeft: 20 },
  fieldContainer: { marginBottom: 20 },
  label: { fontSize: 14, color: "#000", marginBottom: 5 ,fontWeight: '600'},
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
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  toggleRow: { flexDirection: "row", marginBottom: 20 ,gap: 10},
  toggleButton: {
    
    alignItems: "center",
    paddingVertical: 7,
    borderRadius: 30,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 13,
  },
  toggleSelected: { backgroundColor: "#000" },
  toggleText: { color: "#000" },
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
  addressTitle: { fontWeight: "600", fontSize: 16, color: "#000" ,marginBottom: 5},
  addressDetail: { fontSize: 14, color: "#666" },
  addAddressButton: { color: "#65C5C4", fontSize: 14, marginBottom: 20 },
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
    width: width * 0.9,
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
    width: width * 0.9,
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
