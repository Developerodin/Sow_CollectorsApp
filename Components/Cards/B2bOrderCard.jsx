import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Block, Text } from "galio-framework";
import { Ionicons, AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeData } from '../../Theme/Theme';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { useAppContext } from '../../Context/AppContext';
const { width } = Dimensions.get('window');

export const B2bOrderCard = ({ data }) => {
  const navigation = useNavigation();
  const { userDetails, update, setUpdate } = useAppContext();

  const postUserAccept = async (orderId, status) => {
    console.log(orderId, status);
    try {
      const response = await axios.post(`${Base_url}b2bOrder/updateOrderStatus`, {
        orderId: orderId,
        status: status
      });
      console.log(response.data);
      setUpdate(!update); // Trigger a state update to refresh the page
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    console.log("No data available");
    return null;
  }

  const handleViewDetail = () => {
    navigation.navigate("B2bOrderDetails",{orderId: data._id});
  };

  return (
    <View style={styles.cardContainer}>
      <Block style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
        <Text style={{ marginLeft: 2, fontSize: 16 }}>
          <Text style={{ color: ThemeData.color }}>{data.weight}{data.unit}</Text> scrap for <Text style={{ color: ThemeData.color }}>₹{data.totalPrice}</Text> in {data.location.city}, {data.location.state}
        </Text>
        <MaterialIcons name="more-vert" size={24} color={ThemeData.textColor} />
      </Block>

      <Block style={styles.row}>
        <View style={styles.column}>
          <Text style={{ fontSize: 14, fontWeight: 600 }}>{
            data.orderTo && data.orderTo.id === userDetails.id ?
            data.orderBy.name
            :
          data.orderTo.name
          }</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <AntDesign name="calendar" size={20} color={ThemeData.color} />
            <Text style={[styles.text, { marginLeft: 8 }]}>
              <Text style={styles.blueText}>{new Date(data.createdAt).toLocaleDateString('en-GB')}</Text>
            </Text>
          </View>
        </View>

        <View style={[styles.column, styles.divider]}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Est. Value</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View style={{ backgroundColor: ThemeData.color, borderRadius: 50, padding: 5 }}>
              <FontAwesome name="rupee" size={10} color={ThemeData.activeColor} />
            </View>
            <Text style={styles.amountText}>₹{data.totalPrice}</Text>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 600 }]}>Items</Text>
          <Text style={[styles.text, { marginTop: 5 }]}>{data.category}</Text>
        </View>
      </Block>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15 }}>
        <Ionicons name="location" size={26} color={ThemeData.color} />
        <Text style={[styles.text, { flex: 1, paddingRight: 24 }]}>
          Pickup Location: {data.location.city}, {data.location.state}
        </Text>
        <TouchableOpacity style={styles.viewDetailsButton} onPress={handleViewDetail}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
       {
        data.orderBy && data.orderBy.id !== userDetails.id && 
        <View style={{ marginTop: 20, paddingHorizontal: 0 }}>
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={() => postUserAccept(data._id, 'Pending')}>
            <View style={styles.acceptButton}>
              <Text style={styles.acceptText}>Accept</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => postUserAccept(data._id, 'Rejected')}>
            <View style={styles.declineButton}>
              <Text style={styles.declineText}>Decline</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
       }
    
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: ThemeData.containerBackgroundColor,
    marginTop: 20,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 15,
    width: 110,
    position: 'absolute',
    right: 10,
    top: -15,
  },
  statusText: {
    color: ThemeData.textColor,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: ThemeData.color,
    borderRadius: 15,
    padding: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: ThemeData.color,
    borderLeftWidth: 1,
    borderLeftColor: ThemeData.color,
    paddingHorizontal: 12,
    marginHorizontal: 15,
  },
  amountText: {
    fontSize: 18,
    fontWeight: '500',
    color: ThemeData.textColor,
    marginLeft: 5,
  },
  text: {
    fontSize: 14,
    color: ThemeData.textColor,
    textAlign: 'center',
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
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: 20,
    borderRadius: 7,
    marginRight: 8,
    alignItems: "center",
    width: width / 2.5,
  },
  acceptText: {
    fontSize: 16,
    color: "#96DE20",
    fontWeight: "bold",
  },
  declineButton: {
    flex: 1,
    backgroundColor: "#FF2020",
    paddingVertical: 20,
    borderRadius: 7,
    alignItems: "center",
    width: width / 2.5,
  },
  declineText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default B2bOrderCard;