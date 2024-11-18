import React from 'react';
import { View, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import { Block, Text } from "galio-framework";
import { Ionicons, AntDesign, Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeData } from '../../Theme/Theme';
const {width, height} = Dimensions.get('window');

export const B2bOrderCard = ({ data }) => {
  const navigation = useNavigation();

  if (!data) {
    console.log("No data available");
    return null;
  }

  const handleViewDetail = () => {
    navigation.navigate("B2bOrderDetails", { id: data._id });
  };

  return (
    
    <View style={styles.cardContainer}>
      {/* <View style={[styles.header, {backgroundColor: data.status === 'canceled' ? '#FF2020' : (data.status === 'pending' ? '#FFD12C' : '#FFD12C'),}]}>
               {data.status === 'pending' ? (
          <Feather name="clock" size={18} color={ThemeData.textColor} />
        ) : data.status === 'canceled' ? (
          <Feather name="x-circle" size={18} color={ThemeData.activeColor} />
        ) : null}
        <Text style={[styles.statusText,{color : data.status === 'canceled' ? ThemeData.activeColor : (data.status === 'pending' ? ThemeData.textColor : ThemeData.textColor),}]}>{data.status}</Text>
        
      </View> */}
        <Block style={{flexDirection: 'row',justifyContent: 'space-between',alignItems:'center'}} >
            <Text style={{marginLeft: 2,fontSize: 16}}><Text style={{color: ThemeData.color}}>50kg</Text> scrap for <Text style={{color: ThemeData.color}}>{data.estValue}</Text> in {data.location}</Text>
                        <MaterialIcons name="more-vert" size={24} color={ThemeData.textColor} /> 

        </Block>
      

      <Block style={styles.row}>
        <View style={styles.column}>
        <Text style={{fontSize: 16,fontWeight: 600}}>{data.name}</Text>
                   <View style={{ flexDirection: 'row', alignItems: 'center',marginTop: 5 }}>
            <AntDesign name="calendar" size={20} color={ThemeData.color} />
            <Text style={[styles.text, { marginLeft: 8 }]}>
              <Text style={styles.blueText}>{data.date}</Text>
            </Text>
          </View>
        </View>

        <View style={[styles.column, styles.divider]}>
        <Text style={{fontSize: 16,fontWeight: 600}}>Est. Value</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop: 5 }}>
          <View style={{ backgroundColor: ThemeData.color, borderRadius: 50, padding: 5 }}>
            <FontAwesome name="rupee" size={10} color={ThemeData.activeColor} />
          </View>
          <Text style={styles.amountText}> {data.estValue}</Text>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={[styles.text,{fontSize: 16,fontWeight: 600}]}>Items</Text>
          <Text style={[styles.text,{marginTop: 5}]}>{data.items}</Text>
         
        </View>
      </Block>


            <View style={{ flexDirection: 'row', alignItems: 'center',paddingTop: 15 }}>
        <Ionicons name="location" size={26} color={ThemeData.color} />
        <Text style={[styles.text, { flex: 1,paddingRight: 24 }]}>
          {data.address}
        </Text>
        <TouchableOpacity style={styles.viewDetailsButton} >
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 20 ,paddingHorizontal :0}}>
          <View style={styles.cardActions}>
              <TouchableOpacity onPress={handleViewDetail} >
                <View style={styles.acceptButton}>
                <Text style={styles.acceptText}>Accept</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity >
                <View style={styles.declineButton}>
                <Text style={styles.declineText}>Decline</Text>
                </View>
              </TouchableOpacity>
            </View>
            </View>
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
    marginVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: ThemeData.color,
    borderRadius: 15,
    paddingVertical: 20,
  },
  column: {
    flex: 1,
    alignItems: 'left',
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