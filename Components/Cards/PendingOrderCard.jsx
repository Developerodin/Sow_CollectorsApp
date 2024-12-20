import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from "galio-framework";
import { Ionicons, AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeData } from '../../Theme/Theme';

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
      <View style={[styles.header, {backgroundColor: data.status === 'canceled' ? '#FF2020' : (data.status === 'pending' ? '#FFD12C' : '#FFD12C'),}]}>
               {data.status === 'pending' ? (
          <Feather name="clock" size={18} color={ThemeData.textColor} />
        ) : data.status === 'canceled' ? (
          <Feather name="x-circle" size={18} color={ThemeData.activeColor} />
        ) : null}
        <Text style={[styles.statusText,{color : data.status === 'canceled' ? ThemeData.activeColor : (data.status === 'pending' ? ThemeData.textColor : ThemeData.textColor),}]}>{data.status}</Text>
        
      </View>

      

      <Block style={styles.row}>
        <View style={styles.column}>
        <Text style={{fontSize: 16,fontWeight: 600}}>{data.to.name}</Text>
                   <View style={{ flexDirection: 'row', alignItems: 'center',marginTop: 5 }}>
            <AntDesign name="calendar" size={20} color={ThemeData.color} />
            <Text style={[styles.text, { marginLeft: 8 }]}>
              <Text style={styles.blueText}>{new Date(data.orderDate).toLocaleDateString('en-GB')}</Text>
            </Text>
          </View>
        </View>

        <View style={[styles.column, styles.divider]}>
        <Text style={{fontSize: 16,fontWeight: 600}}>Est. Value</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop: 5 }}>
          <View style={{ backgroundColor: ThemeData.color, borderRadius: 50, padding: 5 }}>
            <FontAwesome name="rupee" size={10} color={ThemeData.activeColor} />
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
        <Ionicons name="location" size={26} color={ThemeData.color} />
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
    borderColor: ThemeData.color,
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
     // Default to #FFD12C if status is not 'canceled' or 'pending'
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
    marginVertical: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: ThemeData.color,
    borderLeftWidth: 1,
    borderLeftColor: ThemeData.color,
    paddingHorizontal: 12,
    
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
  viewDetailsButton: {
    
  },
  viewDetailsText: {
    fontSize: 16,
    color: ThemeData.color,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
