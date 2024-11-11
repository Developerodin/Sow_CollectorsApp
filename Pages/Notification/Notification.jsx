import React from 'react';
import { View, Text, StyleSheet, FlatList,Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Block } from 'galio-framework'; // Import Block from the appropriate library

const notifications = [
    { id: '1', time: '2:45 PM' },
    { id: '2', time: '2:45 PM' },
    { id: '3', time: '2:45 PM' },
    { id: '4', time: '2:45 PM' },
    { id: '5', time: '2:45 PM' },
    { id: '6', time: '2:45 PM' },
    { id: '7', time: '2:45 PM' },
  // Add more notifications as needed
];

export const Notification = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View>

    <View style={styles.notificationContainer}>
    <View style={styles.iconContainer}>
      <Image
        source={require('./Bell.png')} // Replace with the actual path to your bell icon image
        style={styles.icon}
      />
    </View>
    <View>
    <Text style={styles.notificationTitle}>Order Rejected</Text>
    <Text style={styles.notificationDescription}>Your scrap was rejected.Click to see more</Text>
    </View>
    <Text style={styles.timeText}>{item.time}</Text>
  </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Block style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" ,marginTop : 80 ,marginBottom: 20}}>
        <Block style={{ backgroundColor: "black", width: 50, height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 150, marginLeft: 20 }}>
          <MaterialIcons onPress={handleBack} name="arrow-back-ios" size={22} style={{ marginLeft: 5 }} color="white" />
        </Block>
        <Text style={{ marginLeft: 15, fontSize: 25, fontWeight: '500' }}>Notifications</Text>
      </Block>
          <Block style={{ backgroundColor: '#FAFAFA', padding: 5, borderRadius: 30,  width: 100, alignSelf: 'center',margin: 10 }}>
      <Text style={{ textAlign: 'center',color: '#000' }}>Today</Text>
    </Block>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderColor: '#B3B3B3',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  iconContainer: {
    width: 35,
    height: 35,
    backgroundColor: '#F0FAFA', 
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  timeText: {
    fontSize: 13,
    color: '#9A9A9A',
    fontWeight: 'bold',
    position: 'absolute',
    right: 20,
    top: 10,
  },
});

export default Notification;