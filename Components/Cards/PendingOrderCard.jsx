import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from "galio-framework";
import { Ionicons, AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const PendingOrderCard = ({ data }) => {
  const navigation = useNavigation();

  if (!data) {
    console.log("No data available");
    return null;
  }

  const handleViewDetail = () => {
    navigation.navigate("Pending Order", { id: data._id });
  };

  return (
    
    <View style={styles.cardContainer}>
      

      <Block style={styles.row}>
        <View style={styles.column}>
        <Text style={{fontSize: 16,fontWeight: 600}}>{data.to.name}</Text>
                   <View style={{ flexDirection: 'row', alignItems: 'center',marginTop: 5 }}>
            <AntDesign name="calendar" size={20} color="#65C5C4" />
            <Text style={[styles.text, { marginLeft: 8 }]}>
              <Text style={styles.blueText}>{new Date(data.orderDate).toLocaleDateString('en-GB')}</Text>
            </Text>
          </View>
        </View>

        <View style={[styles.column, styles.divider]}>
        <Text style={{fontSize: 16,fontWeight: 600}}>Est. Value</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop: 5 }}>
          <View style={{ backgroundColor: '#65C5C4', borderRadius: 50, padding: 5 }}>
            <FontAwesome name="rupee" size={10} color="#fff" />
          </View>
          <Text style={styles.amountText}>₹{data.totalAmount}</Text>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={[styles.text,{fontSize: 16,fontWeight: 600}]}>Items</Text>
          <Text style={[styles.text,{marginTop: 5}]}>{data.details.category}</Text>
         
        </View>
      </Block>


            <View style={{ flexDirection: 'row', alignItems: 'center',paddingTop: 15 }}>
        <Ionicons name="location" size={26} color="#65C5C4" />
        <Text style={[styles.text, { flex: 1,paddingRight: 24 }]}>
          Pickup Location: {data.from.Address}, {data.from.pincode}, {data.from.city}, {data.from.country}
        </Text>
        <TouchableOpacity style={styles.viewDetailsButton} onPress={handleViewDetail}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: "#65C5C4",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#FFF5CC",
  },
  statusText: {
    color: "#000",
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: "#65C5C4",
    borderLeftWidth: 1,
    borderLeftColor: "#65C5C4",
    paddingHorizontal: 12,
    
  },
  amountText: {
    fontSize: 18,
    fontWeight: '500',
    color: "#000",
    
    marginLeft: 5,
  },
  text: {
    fontSize: 14,
    color: "#000",
    textAlign: 'center',
    
  },
  blueText: {
    color: "#000",
    fontWeight: '500',
  },
  viewDetailsButton: {
    
  },
  viewDetailsText: {
    fontSize: 16,
    color: "#65C5C4",
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
