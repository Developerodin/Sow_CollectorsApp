import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text } from "galio-framework";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Base_url } from "../../../Config/BaseUrl";
import { ToastAndroid } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAppContext } from '../../../Context/AppContext';

const { width } = Dimensions.get("window");

export const KycTab = () => {
  const navigation = useNavigation();
  const { userDetails, update, setUpdate } = useAppContext();
  const [formData, setFormData] = useState({
    gstinNumber: "",
  });
  const [isFocused, setIsFocused] = useState({
    ForName: false,
    ForEmail: false,
    ForCity: false,
  });
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [termandCondition, setTermandCondition] = useState(false);
  const [privacyPolicy, setprivacyPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [kycDetails, setKycDetails] = useState(null);
  const [kycId, setKycId] = useState(null);

  const showImagePicker = async (sourceType) => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access the gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      sourceType: sourceType,
      base64: true,
    });

    if (!result.canceled) {
      const dataImage = result.assets[0];
      if (dataImage) {
        const base64data = `data:${dataImage.mimeType};base64,${dataImage.base64}`;
        setImage(base64data);
      }
    }
  };

  const showImagePicker2 = async (sourceType) => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access the gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      sourceType: sourceType,
      base64: true,
    });

    if (!result.canceled) {
      const dataImage = result.assets[0];
      if (dataImage) {
        const base64data = `data:${dataImage.mimeType};base64,${dataImage.base64}`;
        setImage2(base64data);
      }
    }
  };

  const handelSkip = () => {
    navigation.navigate("VerifyProfileStatus");
  };

  const handelSubmitData = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${Base_url}b2bUser/kyc`, data);
      if (response.data.success) {
        console.log("KYC details added successfully:", response.data.data);
        
        setUpdate(!update);
        setKycId(response.data.data._id);

        if (image !== "") {
          handelSubmitWareHouseData();
        }
        if (image2 !== "") {
          handelSubmitOwnerImageData();
        }
        return { success: true, data: response.data.data };
      }
    } catch (error) {
      console.error("Error adding KYC details:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message };
    } finally {
        setLoading(false);
        }
  };

  const handelSubmitOwnerImageData = async () => {
    try {
      const response = await axios.post(`${Base_url}b2bUser/kycOwnerImage`, { ownerImage: image2 });
      if (response.data.success) {
        console.log("KYC details added successfully:", response.data.data);
        return { success: true, data: response.data.data };
      }
    } catch (error) {
      console.error("Error adding KYC details:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  const handelSubmitWareHouseData = async () => {
    try {
      const response = await axios.post(`${Base_url}b2bUser/kycWareHouseImage`, { warehouseImage: image });
      if (response.data.success) {
        console.log("KYC details added successfully:", response.data.data);
        return { success: true, data: response.data.data };
      }
    } catch (error) {
      console.error("Error adding KYC details:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  const getUserKycDetails = async () => {
    try {
      const userDetails = JSON.parse(await AsyncStorage.getItem("userDetails"));
      const response = await axios.get(`${Base_url}b2bUser/kyc/${userDetails.id}`);
      console.log(response.data);
      setKycDetails(response.data.data);
      setFormData({ gstinNumber: response.data.data.gstinNumber });
      setKycId(response.data.data._id);
    } catch (error) {
      console.log("kyc error =>", error);
    }
  };

  const updateKycDetails = async () => {
    setLoading(true);
    try {
    
      const kycResponse = await axios.get(`${Base_url}b2bUser/kyc/${userDetails.id}`);
      const kycId = kycResponse.data.data._id;

      const url = `${Base_url}b2bUser/kyc/${kycId}`;
      console.log("Kyc Details =>", formData.gstinNumber);
      console.log("Request URL =>", url);

      const response = await axios.put(url, {
        gstinNumber: formData.gstinNumber,
      });

      if (response.data.success) {
        console.log("KYC details updated successfully:", response.data.data);
        ToastAndroid.show("KYC details updated successfully", ToastAndroid.SHORT);
      }
      setUpdate(!update);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("KYC details not found, creating new KYC details");
        const data = {
          gstinNumber: formData.gstinNumber,
          userId: userDetails.id,
          WareHouseImage: "",
          OwnerImage: "",
        };
        handelSubmitData(data);
      } else {
        console.log("Error updating KYC details =>", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const getOwnerImage = async () => {
    try {
      const response = await axios.get(`${Base_url}b2bUser/kycOwnerImage/${kycId}`);
      setImage2(response.data.ownerImage);
    } catch (error) {
      console.log("Error getting owner image =>", error);
    }
  };

  const updateOwnerImage = async () => {
    try {
      const response = await axios.put(`${Base_url}b2bUser/kycOwnerImage/${kycId}`, { ownerImage: image2 });
      if (response.data.success) {
        console.log("Owner image updated successfully:", response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Owner image not found, creating new owner image");
        handelSubmitOwnerImageData();
      } else {
        console.log("Error updating owner image =>", error);
      }
    }
  };

  const getWarehouseImage = async () => {
    try {
      const response = await axios.get(`${Base_url}b2bUser/kycWareHouseImage/${kycId}`);
      setImage(response.data.warehouseImage);
    } catch (error) {
      console.log("Error getting warehouse image =>", error);
    }
  };

  const updateWarehouseImage = async () => {
    try {
      const response = await axios.put(`${Base_url}b2bUser/kycWareHouseImage/${kycId}`, { warehouseImage: image });
      if (response.data.success) {
        console.log("Warehouse image updated successfully:", response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Warehouse image not found, creating new warehouse image");
        handelSubmitWareHouseData();
      } else {
        console.log("Error updating warehouse image =>", error);
      }
    }
  };

  const handelPersonalDetailSubmit = async () => {
    updateKycDetails();
    updateWarehouseImage();
    updateOwnerImage();
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handelBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardOpen(false);
    });

    getUserKycDetails();

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (kycId) {
      getOwnerImage();
      getWarehouseImage();
    }
  }, [kycId]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={{ alignItems: "left", marginTop: 55, width: width }}>
          {!isKeyboardOpen && (
            <Block
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Block style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={handelBack} activeOpacity={0.8} disabled={loading}>
                  <Block
                    style={{
                      backgroundColor: "black",
                      width: 40,
                      height: 40,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 150,
                      marginLeft: 20,
                    }}
                  >
                    <MaterialIcons
                      name="arrow-back-ios"
                      size={18}
                      style={{ marginLeft: 5 }}
                      color="white"
                    />
                  </Block>
                </TouchableOpacity>
                <Text style={{ marginLeft: 15, fontSize: 25, fontWeight: 500 }}>
                  Update Kyc
                </Text>
              </Block>
            </Block>
          )}
        </View>

        <Block style={{ padding: 10 }}>
          <Block style={{ marginTop: 15 }}>
            <Block style={[styles.card]}>
              <Text style={{ fontSize: 16 }}>
                GSTIN <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your GST Number"
                value={formData.gstinNumber}
                onChangeText={(text) => handleInputChange("gstinNumber", text)}
                placeholderTextColor="#B7B7B7"
              />
            </Block>
          </Block>

          <Block style={{ marginTop: 20, padding: 10 }}>
            <Text style={styles.sectionTitle}>Update photos</Text>
            <Text style={styles.label}>Warehouse Live Photo</Text>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  resizeMode: "contain",
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                }}
              />
            )}
            <TouchableOpacity
              onPress={() => showImagePicker("camera")}
              style={styles.button1}
            >
              <Ionicons
                name="camera"
                size={24}
                color="#000"
                style={styles.icon}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  color: "#000",
                  marginLeft: 10,
                }}
              >
                Open Camera
              </Text>
            </TouchableOpacity>

            <Text style={[styles.label]}>Owner’s photo in workplace</Text>
            {image2 && (
              <Image
                source={{ uri: image2 }}
                style={{
                  resizeMode: "contain",
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                }}
              />
            )}
            <TouchableOpacity
              onPress={() => showImagePicker2("camera")}
              style={styles.button1}
            >
              <Ionicons
                name="camera"
                size={24}
                color="#000"
                style={styles.icon}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  color: "#000",
                  marginLeft: 10,
                }}
              >
                Open Camera
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>

        <Block right style={[{ padding: 20, marginTop: 20 }]}>
          <TouchableOpacity
            style={{
              backgroundColor: "#000000",
              width: width * 0.88,
              padding: 15,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
            }}
            onPress={handelPersonalDetailSubmit}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ color: "#fff", fontSize: 16 }}>Update</Text>
            )}
          </TouchableOpacity>
        </Block>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 0,
    fontWeight: "600",
    marginTop: 20,
  },
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
  sectionTitle: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  input: {
    flex: 1,
    textAlign: "left",
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A6A6A6",
    width: width * 0.9,
    marginTop: 4,
  },
  card: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default KycTab;