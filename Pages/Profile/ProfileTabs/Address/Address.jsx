import { Block,Button,Text } from 'galio-framework';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  TextInput,
  Modal,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { useAppContext } from '../../../../Context/AppContext';

export const Address = () => {
  const{update,setUpdate} = useAppContext()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    address: '',
    landmark: '',
    city: '',
    country: '',
    mobileNumber: '',
    name: '',
  });

  const selectAddress = (address) => {
    setSelectedAddress(address);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const saveAddress = () => {
    setAddresses([...addresses, newAddress]);
    toggleModal();
    // Clear input fields
    setNewAddress({
      address: '',
      landmark: '',
      city: '',
      country: '',
      mobileNumber: '',
      name: '',
    });
  };

  const saveSelectedAddress = async () => {
    try {
      if (selectedAddress) {
        await AsyncStorage.setItem('UserAddress', JSON.stringify(selectedAddress));
        setUpdate((prev)=>prev+1)
      }
    } catch (error) {
      console.error('Error saving address to AsyncStorage:', error);
    }
  };
  return (
    <View style={styles.container}>
    <Text style={styles.heading}>Your Addresses</Text>
    <FlatList
      data={addresses}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableHighlight
        onPress={() => selectAddress(item)}
        underlayColor="transparent"
        style={[
          styles.addressContainer,
          selectedAddress === item && styles.selectedAddress,
        ]}
      >
        <View style={{backgroundColor:"#fff",padding:10}}>
          <Text style={{fontSize:18,fontWeight:500}}>{item.name}</Text>
          <Text style={{fontSize:14,fontWeight:500}}>{item.address}</Text>
          <Text style={{fontSize:14,fontWeight:500}}>{item.landmark}</Text>
          <Text style={{fontSize:14,fontWeight:500}}>{item.city}</Text>
          <Text style={{fontSize:14,fontWeight:500}}>{item.country}</Text>
          <Text style={{fontSize:14,fontWeight:500}}>{item.mobileNumber}</Text>
        </View>
      </TouchableHighlight>
      )}
    />

<Block style={styles2.Space_Around}>
<Button color='black' onPress={toggleModal}>Add Address</Button>
<Button color='black' onPress={saveSelectedAddress}>Save Address</Button>
</Block>
   

    <Modal visible={isModalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalHeading}>Add Address</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newAddress.name}
          onChangeText={(text) =>
            setNewAddress({ ...newAddress, name: text })
          }
        />
      
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={newAddress.address}
          onChangeText={(text) =>
            setNewAddress({ ...newAddress, address: text })
          }
        />
     

     
        <TextInput
          style={styles.input}
          placeholder="Landmark"
          value={newAddress.landmark}
          onChangeText={(text) =>
            setNewAddress({ ...newAddress, landmark: text })
          }
        />
       


     
        <TextInput
          style={styles.input}
          placeholder="City"
          value={newAddress.city}
          onChangeText={(text) =>
            setNewAddress({ ...newAddress, city: text })
          }
        />
       


      
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={newAddress.country}
          onChangeText={(text) =>
            setNewAddress({ ...newAddress, country: text })
          }
        />
    


       
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={newAddress.mobileNumber}
          onChangeText={(text) =>
            setNewAddress({ ...newAddress, mobileNumber: text })
          }
        />
     


      
        
 
     
        {/* Add similar TextInput fields for other address details */}

        <Block style={[styles2.Space_Between,{width:"100%"}]}>
        <Button  onPress={saveAddress}>Save</Button>
        <Button  onPress={toggleModal} > CLose </Button>
        </Block>
        
      </View>
    </Modal>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addressContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedAddress: {
    borderWidth: 2,
    borderColor: 'green',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius:15
  },
});



const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  AlignCenter: {
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "grey",
    borderBottomWidth: 0.5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  borderView: {
    borderWidth: 1,
    borderColor: "red",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBlock: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  textContainer: {
    position: "absolute",
    bottom: 40, // Adjust as needed
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});