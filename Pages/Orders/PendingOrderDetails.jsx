import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Modal, ToastAndroid ,Dimensions} from 'react-native';
import { Block, Text, Button } from "galio-framework";
import { Ionicons, MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Base_url } from '../../Config/BaseUrl'; // Ensure this is correctly imported
import { useAppContext } from '../../Context/AppContext';
import { ThemeData } from '../../Theme/Theme';
import Logo from "../../assets/user.png";

const { width } = Dimensions.get('window');



export const PendingOrderDetails = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const { userDetails, update, setUpdate } = useAppContext();
  const [orderDetails, setOrderDetails] = useState(null);
  const [inputFields, setInputFields] = useState([{ value: '', category: 'Category 1' }]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderCompleteStatus, setOrderCompleteStatus] = useState(false);
  const [images, setImages] = useState([]);
  const handleBack = () => {
    navigation.goBack();
  };

  const getOrdersById = async () => {
    try {
      const response = await axios.get(`${Base_url}b2bOrder/${id}`);
      const data = response.data;
      console.log("orders by id ==>", response.data);
      setImages(data.photos || [])
      setOrderDetails(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const addInputField = () => {
    const updatedInputFields = [...inputFields, { value: '', category: 'Category 1' }];
    setInputFields(updatedInputFields);
  };

  const handleOrderUpdate = async (orderId, status, quantity) => {
    try {
      await axios.put(`${Base_url}api/b2b_orders/orders/${orderId}`, {
        status,
        quantity,
      });

      if (status === "completed") {
        setOrderCompleteStatus(true);
      }

      setUpdate((prev) => prev + 1);
      console.log("Order updated successfully!");
      ToastAndroid.show("Order successful!", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Try Again !!", ToastAndroid.SHORT);
      console.error("Error updating order:", error.message);
    }
  };

  const handelSubmit = () => {
    console.log("Values", inputFields);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handelComplete = (otp) => {
    console.log("OTP =>", otp);
    if (otp === "") {
      ToastAndroid.show('OTP Required', ToastAndroid.SHORT);
      return;
    }
    if (otp === "1234") {
      setOrderCompleteStatus(true);
    } else {
      ToastAndroid.show('Wrong OTP', ToastAndroid.SHORT);
    }
  };

  const handelCancel = async () => {
    handleOrderUpdate(orderDetails._id, "canceled", "");
    setUpdate((prev) => prev + 1);
  };

  useEffect(() => {
    getOrdersById();
  }, [update]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginTop: 65,
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
            <View
              style={{
                padding: 10,
                backgroundColor: "#000",
                borderRadius: 30,
                width: 50,
                height: 50,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="arrow-back-ios"
                size={22}
                color="#fff"
                style={{ marginLeft: 5 }}
              />
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
            Scrap Details
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={{ padding: 15, backgroundColor: "#fff", marginTop: 0, borderRadius: 10 }}>
          <Block style={{ marginTop: 0 }}>
            <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="document" size={20} color={ThemeData.textColor} />
              <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 500, color: ThemeData.textColor }}>
                Order No. : {orderDetails?.orderNo || "#0100"}
              </Text>
            </Block>
            <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="person" size={20} color={ThemeData.textColor} />
              <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 500, color: ThemeData.textColor }}>
                {orderDetails?.orderTo.name || "N/A"}
              </Text>
            </Block>
            <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="category" size={20} color={ThemeData.textColor} />
              <Text style={{ fontSize: 20, marginLeft: 8, fontWeight: 500 }}>
                {orderDetails?.category || "N/A"}
              </Text>
            </Block>
            <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="calendar" size={20} color={ThemeData.textColor} />
              <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 500, color: ThemeData.textColor }}>
                {orderDetails && new Date(orderDetails.createdAt).toLocaleDateString('en-GB')}
              </Text>
            </Block>
            <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="location" size={20} color="black" />
              <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 500 }}>
                Pickup Location: {orderDetails?.location?.googleAddress || "N/A"}
              </Text>
            </Block>
            <Block style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 500, marginLeft: 26, color: ThemeData.color, textDecorationLine: 'underline' }}>
                View on Map
              </Text>
            </Block>
           
          </Block>

          <Block style={styles.tableContainer}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.headerText, styles.tableCell]}>Unit</Text>
              <Text style={[styles.headerText, styles.tableCell]}>Estimated</Text>
              <Text style={[styles.headerText, styles.tableCell]}>Actual</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.cellText, styles.tableCell]}>
                {orderDetails?.unit || "-"}
              </Text>
              <Text style={[styles.cellText, styles.tableCell]}>
                {orderDetails?.weight || "-"}
              </Text>
              <Text style={[styles.cellText, styles.tableCell]}>
                {orderDetails?.actual || "-"}
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.cellText, styles.tableCell]}>₹</Text>
              <Text style={[styles.cellText, styles.tableCell]}>₹ {orderDetails?.totalPrice || "-"}</Text>
              <Text style={[styles.cellText, styles.tableCell]}>₹ {orderDetails?.Amount || "-"}</Text>
            </View>
          </Block>

          <Text style={{ fontSize: 24, fontWeight: 700, color: '#000', marginVertical: 15 }}>Photos</Text>
          <View style={styles.boxContainer}>
            <View style={styles.row}>
              {
                images.map((img,index)=>{
                  return img && <View style={[styles.box,{position:"relative"}]}>
                     <Image key={index} source={{ uri: img }} style={{height:"100%",width:"100%",borderRadius:8}} />
                     
                  </View>
                })
              }
              
              
            </View>
            
          </View>

          <Block style={{ marginTop: 20 }}>
            {/* Additional content can go here */}
          </Block>
        </Block>

        <Block style={[{ marginTop: 30, marginBottom: 30 }, styles.Center]}>
          {orderDetails && (orderDetails.orderStatus === "in-progress" || orderDetails.orderStatus === "pending") && orderDetails.orderStatus !== "canceled" && (
            <Block style={[{ marginTop: 30, marginBottom: 30 }, styles.Center]}>
              <Button color="black" onPress={handelCancel} style={{ height: 63 }}>
                Cancel Order
              </Button>
            </Block>
          )}
        </Block>

        {/* <OTPModel modalVisible={isModalVisible} setModalVisible={setIsModalVisible} handelComplete={handelComplete} orderCompleteStatus={orderCompleteStatus} /> */}

        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Block
              style={{
                backgroundColor: ThemeData.containerBackgroundColor,
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "center",
                height: 50,
              }}
            >
              <Ionicons
                onPress={toggleModal}
                name="arrow-back-circle"
                style={{ marginLeft: 10 }}
                size={30}
                color="#65be34"
              />
              <Text style={{ fontSize: 18, fontWeight: 500, marginLeft: 10 }}>
                Direction
              </Text>
            </Block>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: ThemeData.containerBackgroundColor,
    padding:10

  },
  text1:{
   fontSize:14,
   color:"#9B9B9B"
  },
  text2:{
      fontSize:16,
      color:"#040404"
  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: StatusBar.currentHeight,
    padding:10,
    
  },
  modalContainer: {
    flex: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop:10
    
  },
  inputContainer: {
    width: '100%',
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: 'transparent', // Make the border color transparent
  },
  input: {
    flex: 1,
    textAlign:"center",
    padding:0,
    fontSize:22
     // Remove padding to make it look borderless
  },
  subtitle: {
    color:"black",
    fontSize: 20,
    marginTop: 10,
  
    textAlign: 'left',
    lineHeight: 23,
    letterSpacing:0.3
  },
  title: {
    color:"black",
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 52,
  },
  btn: {
   width: '95%',
    height: 55,
    borderRadius: 5,
    backgroundColor: '#40A99E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
      borderWidth: 1,
      borderColor: "pink",
    },
    Center: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    Space_Around: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    Space_Between: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    shadow: {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowOpacity: 0.2,
      elevation: 2,
    },
    button: {
      width: width,
    },
    tableContainer: {
      marginTop : 15,
      paddingRight : 30,
      marginLeft : 30,
      
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#333',
      textAlign: 'center',
    },
    tableHeader: {
      backgroundColor:  ThemeData.containerBackgroundColor,
      borderBottomWidth: 1,
      borderBottomColor: ThemeData.textColor,
      borderTopColor: ThemeData.textColor,
      borderTopWidth: 1,
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: ThemeData.textColor,
    },
    headerText: {
      fontSize: 16,
      fontWeight: '700',
      color: ThemeData.textColor,
      textAlign: 'center',
    },
    cellText: {
      fontSize: 16,
      color: ThemeData.textColor,
      textAlign: 'center',
      fontWeight : 500
    },
    tableCell: {
      flex: 1,
      paddingVertical: 5,
      borderRightWidth: 0.5,
      borderRightColor: ThemeData.textColor,
      borderLeftWidth: 0.5,
      borderLeftColor: ThemeData.textColor,
    },
    boxContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 10,
    },
    box: {
      width: '25%', // Adjusts the width of each box in the row
      aspectRatio: 1, // Ensures boxes are square
      backgroundColor: '#D3D3D3', // Light grey color
      borderRadius: 8,
    },
});

export default PendingOrderDetails;