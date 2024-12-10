import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Block } from 'galio-framework';
import { useAppContext } from "../../Context/AppContext";
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';

export const Notification = () => {
  const { userDetails, update,notificatoinUpdate,setNotificationsUpdate } = useAppContext();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const getNotifications = async (id) => {
    try {
      const response = await axios.get(`${Base_url}b2b-notifications/${id}`);
      console.log("notifications", response.data);
      setNotifications(response.data);
      markReadNotifications(id);
      setError(false); // Reset error state on successful fetch
    } catch (error) {
      console.log(error);
      setError(true); // Set error state if an error occurs
    }
  };

  const markReadNotifications = async (id) => {
    try {
      const response = await axios.get(`${Base_url}b2b-notifications/mark-read/${id}`);
      console.log("notifications", response.data);
      setNotificationsUpdate((prev)=>prev+1)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(userDetails.id){
    getNotifications(userDetails.id);
    }
  }, [update,userDetails]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const renderItem = ({ item }) => (
    <View style={[styles.notificationContainer]}>
      <View style={styles.iconContainer}>
        <Image
          source={require('./Bell.png')} // Replace with the actual path to your bell icon image
          style={styles.icon}
        />
      </View>

      <View style={{width:"69%",marginLeft:5}}>
        <Text style={styles.notificationTitle}>{item.notification}</Text>
        <Text style={styles.notificationDescription}>Status: {item.orderStatus}</Text>
        <Text style={styles.notificationDescription}>Total Price: ₹{item.totalPrice}</Text>
      </View>
      <Text style={styles.timeText}>{formatDate(item.createdAt)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Block style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 80, marginBottom: 20 }}>
        <Block style={{ backgroundColor: "black", width: 50, height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 150, marginLeft: 20 }}>
          <MaterialIcons onPress={handleBack} name="arrow-back-ios" size={22} style={{ marginLeft: 5 }} color="white" />
        </Block>
        <Text style={{ marginLeft: 15, fontSize: 25, fontWeight: '500' }}>Notifications</Text>
      </Block>
      {/* <Block style={{ backgroundColor: '#FAFAFA', padding: 5, borderRadius: 30, width: 100, alignSelf: 'center', margin: 10 }}>
        <Text style={{ textAlign: 'center', color: '#000' }}>Today</Text>
      </Block> */}
      {error || notifications.length === 0 ? (
        <Block center style={{ marginTop: 40 }}>
          <Image
            source={require("../../assets/media/5-dark.png")}
            style={{
              width: 300,
              height: 300,
              marginRight: 10,
            }}
          />
        </Block>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#000',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
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
    marginRight: 12,
    
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