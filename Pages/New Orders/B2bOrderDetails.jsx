import React, { useState , useEffect} from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";
import { useAppContext } from '../../Context/AppContext';
const { width, height } = Dimensions.get("window");
import userLogo from "../../assets/user.png";
import catIcon from "../../assets/catIcon.png";
import weightIcon from "../../assets/weightIcon.png";
import rupee from "../../assets/ruppee.png";
import calender from "../../assets/calender.png";
import location from "../../assets/location.png";

export const B2bOrderDetails = ({route}) => {
  const { orderId } = route.params;
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const { userDetails, update, setUpdate } = useAppContext();
  const [images, setImages] = useState([]);

  const handleBack = () => {
    navigation.goBack();
  };

  const getOrdersById = async () => {
    try {
      const response = await axios.get(`${Base_url}b2bOrder/${orderId}`);
      const data = response.data;
      console.log("orders by id ==>", response.data);
      setImages(data.photos || [])
      setOrderDetails(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const postUserAccept = async ( status) => {
    console.log(orderId, status);
    try {
      const response = await axios.post(`${Base_url}b2bOrder/updateOrderStatus`, {
        orderId: orderId,
        status: status
      });
      if(status === 'Pending'){
        toggleModal();
      }
      console.log(response.data);
      setUpdate(!update); 
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getOrdersById();
  }, [update]);

  return (
    <View style={styles.container}>
      <Block
        style={{ flexDirection: "row", alignItems: "center", marginTop: 55 }}
      >
        <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
        <Block
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: 10,
          }}
        >
          <View
            style={{ backgroundColor: "#000", borderRadius: 30, padding: 10 }}
          >
            <Ionicons
              
              name="chevron-back"
              size={20}
              color="#fff"
            />
          </View>
        </Block>
        </TouchableOpacity>
        <Text
          style={{ marginLeft: 15, fontSize: 25, fontWeight: "500", flex: 1 }}
        >
          Scrap Details
        </Text>
        <Block
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableOpacity activeOpacity={0.8}>
            <View style={{ flexDirection: "row", marginRight: 15 }}>
              <Ionicons name="share-social" size={24} color="#000" />
            </View>
          </TouchableOpacity>
        </Block>
      </Block>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Block
          style={{
            padding: 15,
            backgroundColor: "#fff",
            marginTop: 0,
            borderRadius: 10,
          }}
        >
          <Block style={{ marginTop: 0 }}>
            <Block
              style={{
                marginTop: 18,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={userLogo} style={{ height: 20, width: 20 }} />
              <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 500 }}>
              {/* {orderDetails?.orderTo?.name || "N/A"} */}
              {
            orderDetails.orderTo && orderDetails.orderTo.id === userDetails.id ?
            orderDetails.orderBy?.name
            :
            orderDetails.orderTo?.name
          }
              </Text>
            </Block>

            <Block
              style={{
                marginTop: 18,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={catIcon} style={{ height: 20, width: 20 }} />
              <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 500 }}>
              {orderDetails?.category || "N/A"}
              </Text>
            </Block>

            <Block
              style={{
                marginTop: 18,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="phone" size={20} color="#000" />
              <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 500 }}>
              {
            orderDetails.orderTo && orderDetails.orderTo.id === userDetails.id ?
            orderDetails.orderBy?.phoneNumber
            :
            orderDetails.orderTo?.phoneNumber
          }
              </Text>
            </Block>

            <Block
              style={{
                marginTop: 18,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={rupee} style={{ height: 20, width: 20 }} />
              <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: 700 }}>
                Est. value : ₹{orderDetails?.totalPrice || "-"}
              </Text>
            </Block>

            <Block
              style={{
                marginTop: 18,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={weightIcon} style={{ height: 20, width: 20 }} />
              <Text style={{ fontSize: 20, marginLeft: 8, fontWeight: 700 }}>
                Est. weight : {orderDetails?.weight || "-"}kg
              </Text>
            </Block>
            <Block
              style={{
                marginTop: 18,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={calender} style={{ height: 20, width: 20 }} />
              <Text style={{ fontSize: 16, marginLeft: 8, fontWeight: 500 }}>
              {orderDetails && new Date(orderDetails.createdAt).toLocaleDateString('en-GB')}
              </Text>
            </Block>
            <Block
              style={{
                marginTop: 18,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={location} style={{ height: 19, width: 16 }} />
              <Text style={{ fontSize: 16, marginLeft: 8, fontWeight: 500,paddingRight: 10 }}>
                Pickup Location : {orderDetails?.location?.googleAddress || "N/A"}
              </Text>
            </Block>
          </Block>
{
  images && images.length > 0 && <Text
  style={{
    fontSize: 24,
    fontWeight: 700,
    color: "#000",
    marginTop: 25,
  }}
>
  Photos
</Text>
}
          
          <View style={styles.boxContainer}>
           
            <View style={styles.row}>
              {
               images &&  images.map((img,index)=>{
                  return img && <View style={[styles.box,{position:"relative"}]}>
                     <Image key={index} source={{ uri: img }} style={{height:"100%",width:"100%",borderRadius:8}} />
                     
                  </View>
                })
              }
              
              
            </View>
            
         
          </View>
          {
        orderDetails.orderBy && orderDetails.orderBy.id !== userDetails.id && 
          <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
            <View style={styles.cardActions}>
              <TouchableOpacity  onPress={() => postUserAccept('Pending')}>
                <View style={styles.acceptButton}>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name="checkmark" size={18} color="#FF2020" />
                    <Text style={styles.acceptText}>Accept</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => postUserAccept('Rejected')}>
                <View style={styles.declineButton}>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name="close" size={18} color="#FF2020" />
                    <Text style={styles.declineText}>Decline</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
}
          {/* Modal for Accept Button */}
          <Modal
          animationType="slide"
          transparent={true}
  isVisible={isModalVisible}
  onBackdropPress={toggleModal}
  backdropOpacity={0.2}
  style={styles.modalStyle}
  swipeDirection={["down"]}
    onSwipeComplete={toggleModal}
>
  <View style={styles.modalContainer}>
    {/* Call Customer Button */}
    <TouchableOpacity style={styles.callCustomerButton}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="call-outline" size={20} color="#fff" />
        <Text style={styles.callCustomerText}>Call Customer</Text>
      </View>
    </TouchableOpacity>

    {/* Separator */}
    <View style={styles.separator} />

    {/* Order Accepted */}
    <View style={styles.orderAcceptedContainer}>
      <Ionicons name="checkmark" size={20} color="#96DE20" />
      <Text style={styles.orderAcceptedText}>Order Accepted</Text>
    </View>
  </View>
</Modal>
        </Block>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
      },
      text1: {
        fontSize: 14,
        color: "#9B9B9B",
      },
      text2: {
        fontSize: 16,
        color: "#040404",
      },
      tabBar: {
        flexDirection: "row",
        // paddingTop: StatusBar.currentHeight,
        padding: 10,
      },
      
      tabItem: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        marginTop: 10,
      },
      inputContainer: {
        width: "100%",
        height: 66,
        borderBottomWidth: 1, // Add a bottom border for the input
        borderColor: "transparent", // Make the border color transparent
      },
      input: {
        flex: 1,
        textAlign: "center",
        padding: 0,
        fontSize: 22,
        // Remove padding to make it look borderless
      },
      subtitle: {
        color: "black",
        fontSize: 20,
        marginTop: 10,
    
        textAlign: "left",
        lineHeight: 23,
        letterSpacing: 0.3,
      },
      title: {
        color: "black",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 20,
        textAlign: "center",
      },
      image: {
        height: "100%",
        width: "100%",
        resizeMode: "contain",
      },
      indicator: {
        height: 10,
        width: 10,
        backgroundColor: "grey",
        marginHorizontal: 3,
        borderRadius: 52,
      },
      btn: {
        width: "95%",
        height: 55,
        borderRadius: 5,
        backgroundColor: "#40A99E",
        justifyContent: "center",
        alignItems: "center",
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
        marginTop: 15,
        paddingRight: 30,
        paddingLeft: 30,
      },
    
      boxContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      },
      row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 10,
      },
      box: {
        width: "28%", // Adjusts the width of each box in the row
        aspectRatio: 1, // Ensures boxes are square
        backgroundColor: "#D3D3D3", // Light grey color
        borderRadius: 5,
      },
      cardActions: {
        flexDirection: "column",
        justifyContent: "space-between",
      },
      acceptButton: {
        flex: 1,
        backgroundColor: "#000",
        paddingVertical: 12,
        borderRadius: 7,
        marginRight: 8,
        alignItems: "center",
        width: width * 0.8,
      },
      acceptText: {
        fontSize: 14,
        color: "#FF2020",
        fontWeight: "bold",
        marginLeft: 8,
      },
      declineButton: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingVertical: 12,
        borderRadius: 7,
        alignItems: "center",
        width: width * 0.8,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#FF2020",
      },
      declineText: {
        fontSize: 14,
        color: "#FF2020",
        fontWeight: "bold",
        marginLeft: 8,
      },
      modalStyle: {
        justifyContent: "flex-end", 
        margin: 0, 
      },
      modalContainer: {
        backgroundColor: "#000",
        paddingVertical: 40,
        paddingHorizontal: 30,
        borderTopLeftRadius: 35, 
        borderTopRightRadius: 35,
        alignItems: "center",
      },
      callCustomerButton: {
        width: "100%",
        backgroundColor: "#000",
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        flexDirection: "row",
      },
      callCustomerText: {
        color: "#fff",
        fontSize: 18,
        marginLeft: 10,
      },
      separator: {
        width: "60%",
        height: 1,
        backgroundColor: "#737373",
        marginVertical: 15,
      },
      orderAcceptedContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      orderAcceptedText: {
        color: "#96DE20",
        fontSize: 18,
        marginLeft: 10,
      },
  
});

export default B2bOrderDetails;
