import { Block, Text } from "galio-framework";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Modal,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { useAppContext } from "../../../Context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { MyMap } from "../../../Components/Maps/MyMap";
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from "lottie-react-native"; 
import { TextInput, Button } from "@react-native-material/core";
const { width, height } = Dimensions.get("window");
export const Address = () => {
  const navigation = useNavigation();
  const { update, setUpdate,SelectedAddressFromMap,setSelectedAddressFromMap } = useAppContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [AllUserAddresses, setAllUsersAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    house: "",
    area: "",
    directions: "",
  });

  

  const selectAddress = (address) => {
    setSelectedAddress(address);
    saveSelectedAddress(address);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setIsAddressModalVisible(!isAddressModalVisible);
  };

  const ConfirmLoction  = ()=>{
    console.log("Address from loction ==>", SelectedAddressFromMap)
    toggleModal();
    setTimeout(()=>{
      toggleModal2()
    },500)
    
  }

  const saveAddress = () => {
   
    const newAddress1 ={
      address: `${SelectedAddressFromMap.district}`,
      landmark:`${SelectedAddressFromMap.street}`,
      postalCode:SelectedAddressFromMap.postalCode,
      city: `${SelectedAddressFromMap.city}`,
      state:SelectedAddressFromMap.region,
      country: `${SelectedAddressFromMap.country}`,
      mobileNumber: "",
      name: SelectedAddressFromMap.name,
      house:newAddress.house,
      area:newAddress.area,
      directions:newAddress.directions
    }
    // setAddresses([...addresses, newAddress1]);
    setnewAddressinStorage(newAddress1)
    toggleModal();
    // Clear input fields
    setNewAddress({
      house:"",
      area:"",
      directions:"",
    });
    setIsModalVisible(false)
    setIsAddressModalVisible(false)
  };
const setnewAddressinStorage =async(address)=>{
  const Data = [...AllUserAddresses,address]
  // console.log("Data",Data)
  try {
    
      await AsyncStorage.setItem(
        "UserAllAddress",
        JSON.stringify(Data)
      );
      console.log("Address save to storage ")
      setUpdate((prev) => prev + 1);
    
  } catch (error) {
    console.error("Error saving address to AsyncStorage:", error);
  }
}
  const saveSelectedAddress = async (address) => {
    try {
      if (address) {
        await AsyncStorage.setItem(
          "UserAddress",
          JSON.stringify(address)
        );
        setUpdate((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error saving address to AsyncStorage:", error);
    }
  };

  const GettAllAddressFromStorage=async()=>{
    AsyncStorage.getItem("UserAllAddress").then((storedData) => {
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setAllUsersAddresses(parsedData)
        console.log("All Address",parsedData);
      } else {
        setAllUsersAddresses([])
        console.log("All Address Data not found in AsyncStorage");
      }
    }).catch((error) => {
      setAllUsersAddresses([])
      console.error("Error retrieving data from AsyncStorage: ", error);
    });
  }

  const getSelectedAddressFromStorage = async ()=>{
    AsyncStorage.getItem("UserAddress").then((storedData) => {
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setSelectedAddress(parsedData)
        console.log("All Address",parsedData);
      } else {
        setSelectedAddress({})
        console.log("All Address Data not found in AsyncStorage");
      }
    }).catch((error) => {
      setSelectedAddress({})
      console.error("Error retrieving data from AsyncStorage: ", error);
    });
  }

  const DeleteAddress = async(name)=>{
    const Data = AllUserAddresses.filter ((el)=>el.name !== name)
  // console.log("Data",Data)
  if(selectedAddress.name === name){
    try {
      if (selectedAddress) {
        await AsyncStorage.setItem(
          "UserAddress",
          JSON.stringify({})
        );
        setUpdate((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error saving address to AsyncStorage:", error);
    }
  }
  try {
    
      await AsyncStorage.setItem(
        "UserAllAddress",
        JSON.stringify(Data)
      );
      console.log("Address save to storage ")
      setUpdate((prev) => prev + 1);
    
  } catch (error) {
    console.error("Error saving address to AsyncStorage:", error);
  }
  }
  useEffect(()=>{
   GettAllAddressFromStorage()
   getSelectedAddressFromStorage()
  },[update])
  

  const animationRef = useRef(null);
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Your Addresses</Text> */}

      {
         AllUserAddresses.length > 0  ?
         <FlatList
         data={AllUserAddresses}
         keyExtractor={(item, index) => index.toString()}
         renderItem={({ item }) => (
           <TouchableHighlight
             onPress={() => selectAddress(item)}
             underlayColor="#fff"
             style={[
               styles.addressContainer,
               selectedAddress && selectedAddress.name === item.name && styles.selectedAddress,
             ]}
           >
             <View style={{ backgroundColor: "#fff", padding: 15,borderRadius:25 }}>
               <Block style={styles2.Space_Between}>
               <Text style={{ fontSize: 16, fontWeight: 500 ,letterSpacing:1}}>{item.name}</Text> 
               <Ionicons  onPress={()=>DeleteAddress(item.name)} name="close-circle" size={20} color="crimson" />
               </Block>
              
               {
                 item.house !== "null" && <Text style={{ fontSize: 12, fontWeight: 500,marginTop:5,letterSpacing:1 }}>
                 {item.house},{item.area}
                </Text>
               }
               {
                 item.address !== "null" &&  <Text style={{ fontSize: 12, fontWeight: 500,marginTop:5,letterSpacing:1 }}>
                 {item.address} 
                 </Text>
               }
 
               {
                 item.city !== "null" && <Text style={{ fontSize: 12, fontWeight: 500,marginTop:5,letterSpacing:1 }}>{item.city},{item.postalCode},{item.state}</Text>
               }
              
               {
                 item.country !== "null" && <Text style={{ fontSize: 12, fontWeight: 500,marginTop:5,letterSpacing:1 }}>
                 {item.country}
               </Text>
               }
             
             </View>
           </TouchableHighlight>
         )}
       />
       :
       <Block style={{flex:0.9,justifyContent:"center",alignItems:"center"}}>
             <Block center>
             <LottieView
                style={styles.lottie}
                source={require("../../../assets/Animations/Animation - 1699520734986.json")}
                autoPlay
                loop
              />
       </Block>
       </Block>
      
      }
     

      <Block style={styles2.Space_Around}>
      <Button color="#65be34" title="Add New Address" style={{width:width*0.5}} tintColor="#fff" onPress={toggleModal} />
        
      </Block>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
        
            <MyMap navigation={navigation} />
          
          <Block style={{backgroundColor:"#fff",flexDirection:"row",justifyContent:"left",alignItems:"center",height:50}}>
          <Ionicons onPress={toggleModal} name="arrow-back-circle" style={{marginLeft:10}} size={30} color="#65be34" />
          <Text style={{fontSize:18,fontWeight:500,marginLeft:10}}>Select Address</Text>
          </Block>

{
 <Block style={{padding:11,backgroundColor:"#fff",height:200,position:"absolute",bottom:0,width:width,borderTopLeftRadius:10,borderTopRightRadius:10}}>
              
  <Block>
    <Text  style={{color:"grey",fontSize:13,fontWeight:500,letterSpacing:1}}>SELECT PICKUP LOCATION</Text>
  </Block>
  
  {
   SelectedAddressFromMap ?  
    <Block >
    <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:5}}>
         <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
         <Ionicons name="md-location" size={24} color="crimson" />
         <Text style={{fontSize:18,fontWeight:"bold",letterSpacing:1,marginLeft:5}} >{SelectedAddressFromMap.street}</Text>
         </Block>

         {/* <Block>
         <Button color="#65be34" size={"small"} style={{width:80,height:26}}>CHANGE</Button>
         </Block> */}
     </Block>
     <Block left style={{width:width*0.7,marginTop:0}} >
      <Text style={{fontSize:13,fontWeight:400,letterSpacing:1}}>{SelectedAddressFromMap.name},{SelectedAddressFromMap.district}</Text>
      <Text style={{fontSize:13,fontWeight:400,letterSpacing:1,marginTop:4}}>{SelectedAddressFromMap.city},{SelectedAddressFromMap.region} {SelectedAddressFromMap.postalCode},{SelectedAddressFromMap.country}</Text>
     </Block>
    </Block>
    :
      <Block>
       
         <Block center>
             <LottieView
                style={styles.lottie}
                source={require("../../../assets/Animations/Animation - 1699521355549.json")}
                autoPlay
                loop
              />
       </Block>
      </Block>
  }
  
  
   <Block style={[styles2.AlignCenter,{marginTop:20}]}>
  
   <Button color="#65be34" title="CONFIRM LOCATION" style={{width:width*0.9}} tintColor="#fff" onPress={ConfirmLoction} />
        
   </Block>
</Block>
}
          

          {/* <Block>
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
          </Block> */}

          {/* Add similar TextInput fields for other address details */}

          {/* <Block style={[styles2.Space_Between, { width: "100%" }]}>
            <Button onPress={saveAddress}>Save</Button>
            <Button onPress={toggleModal}> CLose </Button>
          </Block> */}
        </View>
      </Modal>


      <Modal visible={isAddressModalVisible} animationType="slide">
        <View style={styles.modalContainer2}>
          
          <Block style={{backgroundColor:"#fff",flexDirection:"row",justifyContent:"left",alignItems:"center",height:50}}>
          <Ionicons onPress={toggleModal2} name="arrow-back-circle" style={{marginLeft:10}} size={30} color="#65be34" />
          {/* <Text style={{fontSize:18,fontWeight:500,marginLeft:10}}>Select Address</Text> */}
          </Block>

          {
            SelectedAddressFromMap &&  
            <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:5}}>
                 <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                 <Ionicons name="md-location" size={24} color="crimson" />
                 <Text style={{fontSize:18,fontWeight:"bold",letterSpacing:1,marginLeft:5}} >{SelectedAddressFromMap.street}</Text>
                 </Block>
        
                
             </Block>
             <Block left style={{width:width*0.7,marginTop:10}} >
              <Text style={{fontSize:13,fontWeight:400,letterSpacing:1}}>{SelectedAddressFromMap.name},{SelectedAddressFromMap.district}</Text>
              <Text style={{fontSize:13,fontWeight:400,letterSpacing:1,marginTop:4}}>{SelectedAddressFromMap.city},{SelectedAddressFromMap.region} {SelectedAddressFromMap.postalCode},{SelectedAddressFromMap.country}</Text>
             </Block>
            </Block>
          }

          <Block style={{marginTop:40}}>
            

            <TextInput
              value={newAddress.house}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, house: text })
              }
              variant="standard"
              keyboardType="ascii-capable"
              label="House / Flat / Block No"
              color={ 'grey'}
              inputStyle={{ borderWidth: 0, paddingBottom:0,color:"black",fontSize:15 }}
            />

            <TextInput
             
              value={newAddress.area}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, area: text })
              }
              variant="standard"
              keyboardType="ascii-capable"
              label="Apartment / Road / Area (optional)"
              color={ 'grey'}
              inputStyle={{ borderWidth: 0, paddingBottom:0,color:"black",fontSize:15 }}
              style={{marginTop:20}}
            />

            <TextInput
             
              value={newAddress.directions}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, directions: text })
              }
              variant="standard"
              keyboardType="ascii-capable"
              label="Directions to reach (Optional)"
              color={ 'grey'}
              inputStyle={{ borderWidth: 0, paddingBottom:0,color:"black",fontSize:15 }}
              style={{marginTop:20}}
            />

           
          </Block>

          {/* Add similar TextInput fields for other address details */}

          <Block center style={[styles2.Space_Between, { width:width*0.9,position:"absolute",bottom:40 }]}>
            <Button color="#65be34" title="save" style={{width:width*0.4}} tintColor="#fff" onPress={saveAddress} />
            <Button color="#65be34" title="close" style={{width:width*0.4}} tintColor="#fff" onPress={toggleModal2} />
          </Block>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"#fff"
  },
  lottie: {
    width: width * 0.9,
    height: width * 0.5,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addressContainer: {
    backgroundColor: "#fff",
    marginBottom: 25,
    elevation:1,
    borderBottomWidth:1,
    borderColor:"grey"
  },
  selectedAddress: {
    borderWidth:2,
    borderColor: "#65be34",
    borderRadius:20
  },
  modalContainer: {
    flex: 1,
   
  },
  modalContainer2: {
    flex: 1,
    padding:10
   
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
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
