import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme, Button } from "galio-framework";

import { AntDesign } from "@expo/vector-icons";
import { Header } from "../../Components/Header/Header";
import { MarketCard } from "../../Components/Cards/MarketCard";
const { width, height } = Dimensions.get("window");
import { MaterialIcons } from "@expo/vector-icons";
import { ItemAddModel } from "../../Components/Model/ItemAddModel";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { useAppContext } from "../../Context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";
import { TextInput } from "@react-native-material/core";
import {Picker} from '@react-native-picker/picker';
import { CategoryAddModel } from "../../Components/CategoryAddModel/CategoryAddModel";
import { CategoryAddModel2 } from "../../Components/CategoryAddModel/CategoryAddModel2";

export const MyRates = () => {
  const navigation = useNavigation();
  const { userDetails } = useAppContext();
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [Categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [AddSubmodalVisible, setAddSubModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [ItemAddStatus, setItemAddStatus] = useState(false);
  const [UserCategoryData, setUserCategoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [update, setupdate] = useState(0);
  
  
  const [subAddForm, setsubAddForm] = useState({
    categoryName:"",
    name: "",
    price: "",
    unit: "",
  });
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const initalModelData = {
    id: "",
    index: "",
    title: "",
    value: "",
    image: "",
    category: "",
  };
  const [ItemModelData, setItemModelData] = useState(initalModelData);
  const {
    Cart,
    setCart,
  } = useAppContext();
  const [CategoriesData, setCategoriesData] = useState([]);
  const [ catmodalVisible,setcatModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [updatedCategoriesData,setUpdatedCategoriesData] = useState([])
  const filterItems = (category) => {
    let filteredItems = data;
    console.log("Category ===>", category);
    if (category !== "All") {
      filteredItems = filteredItems.filter(
        (item) => item.category === category
      );
    }
     
    setFilteredData(filteredItems);
    setActiveCategory(category);
  };

  const handleSubAddInputChange = (name, value) => {
    setsubAddForm({ ...subAddForm, [name]: value });
  };

  const updateSubcategoryByIndex = async (
    categoryId,
    subcategoryId,
    subcategoryData
  ) => {
    console.log("Update Subcategory ========>",categoryId,
    subcategoryId,
    subcategoryData);
    try {
      const response = await axios.patch(
        `${Base_url}api/b2b/${categoryId}/subcategories/${subcategoryId}`,
        subcategoryData
      );
      setupdate((prev) => prev + 1);
      return response.data;
    } catch (error) {
      console.error("Error updating subcategory:", error);
      throw error;
    }
  };

  const addSubcategory = async (categoryId, subcategoryData) => {
    console.log("Add Subcategory ========>");
    try {
      const response = await axios.post(
        `${Base_url}api/b2b/${categoryId}/subcategories`,
        subcategoryData
      );
      setupdate((prev) => prev + 1);
      return response.data;
    } catch (error) {
      console.error("Error adding subcategory:", error);
      throw error;
    }
  };

  const handelComplete = (Data) => {
    // console.log(
    //   "Data after update  =>",
    //   Data,
    //   ItemModelData
    // );
    const category = UserCategoryData.filter((el,index)=>{
      return el.name === ItemModelData.category
    })
    const UpdatedData = {
      name:ItemModelData.title,
      price:Data.price,
      unit:Data.unit

    }
    updateSubcategoryByIndex(category[0]._id, ItemModelData.id, UpdatedData);
    setModalVisible(false);
    
    setActiveCategory("All");
    console.log("Complete ==>")
  };

  const handelSubCategoryModelSubmit = async () => {
    setLoading(true);
    try {
      const category = UserCategoryData.filter((el) => el.name === subAddForm.categoryName);
      console.log("after submit", category);
      await addSubcategory(category[0]._id, subAddForm);
      setsubAddForm({
        categoryName: "",
        name: "",
        price: "",
        unit: "",
      });
      handelSubCategoryModelClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handelSubCategoryModelOpen = () => {
    setsubAddForm({ ...subAddForm, categoryName: activeCategory });
    setAddSubModalVisible(true);
  };

  const handelSubCategoryModelClose = () => {
    setsubAddForm({
      categoryName:"",
      name: "",
      price: "",
      unit: "",
    })
    setAddSubModalVisible(false);

  
  };

  const fetchCategoryData = async (userId) => {
    try {
      const response = await axios.get(
        `${Base_url}api/b2b/${userId}/category-subcategory`
      );
      const CategoriesData =  response.data.data.categories
      // console.log("CategoriesData =====================>",CategoriesData)
      // console.log("res of category and subcategory =>", CategoriesData);
      const transformedData = [].concat(...CategoriesData.map(category => {
        return category.sub_category.map(subCategory => ({
          id: subCategory._id,
          title: subCategory.name.toUpperCase(),
          value: subCategory.price,
          image: "https://tse4.mm.bing.net/th?id=OIP.OQh1ykyaCVyCvt2aNHJ-LwHaHa&pid=Api&P=0&h=220", // Replace with the actual image URL
          category: category.name,
        }));
      }));

      // console.log("Subcategory Data ==>",transformedData)
      setData(transformedData);
      setFilteredData(transformedData)
      setUserCategoryData(CategoriesData);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setError(error.message || "An error occurred");
      setLoading(false);
    }
  };

  const handelSubCategoryDelete = (index)=>{
    const category = UserCategoryData.filter((el,index)=>{
      return el.name === ItemModelData.category
    })
    deleteSubcategoryByIndex(category[0]._id,ItemModelData.id)
    setModalVisible(false)
  }

  const deleteSubcategoryByIndex = async (categoryId, subcategoryId) => {
    try {
      const response = await axios.delete(`${Base_url}api/b2b/${categoryId}/subcategories/${subcategoryId}`);
      setupdate((prev)=>prev+1)
      return response.data;
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      throw error;
    }
  };

  const getCategories = async () => {
      
    try {
      const response = await axios.get(`${Base_url}api/category`);
      setCategoriesData(response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handelCategoryModelOpen=()=>{

    const newCategoriesData = CategoriesData.filter(
      (category) => !UserCategoryData.some((userCategory) => userCategory.name === category.name)
    );
    setUpdatedCategoriesData(newCategoriesData)
      
   
    setcatModalVisible(true)
  }

  const handelCatSelectComplete = async()=>{

    if(selectedCategories && selectedCategories.length>0){
     
        const Data = selectedCategories.map(category => {
          return {
            name:category.name,
            sub_category:[
              {
                name:"test",
                price:"100",
                unit:"Kg"
              }
            ] 
          }});
        console.log("categoryNames",Data)
        const UpdatedData = JSON.stringify(Data);
    
        try {
          const response = await axios.post(
            `${Base_url}api/b2b/${userDetails._id}/addCategories`,{
             Data : UpdatedData
            }
            
          );
          setupdate((prev) => prev + 1);
          setcatModalVisible(false)
          return response.data;
        } catch (error) {
          console.error("Error adding category:", error);
          throw error;
        }
    
    }
    
    
  }

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
    const categories = [...new Set(data.map((item) => item.category))];
    console.log("Updating ===>");
    setCategories(categories);
    setActiveCategory("All");
    
  }, [query,update]);

  useEffect(() => {
    fetchCategoryData(userDetails._id);
  }, [update]);

  useEffect(()=>{
    getCategories()
  },[update])

  



const handleSubAddChange = (field, value) => {
  setsubAddForm((prevForm) => ({
    ...prevForm,
    [field]: value
  }));
  if (field === 'categoryName') {
    setIsCategorySelected(value !== '');
    setSelectedCategories(value)
  }
};


  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header />

      <Block style={{ padding: 10 }}>
        <Input
          placeholder="Search for an item..."
          right
          icon="search1"
          family="antdesign"
          iconSize={20}
          iconColor="grey"
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
        <Block style={styles.Space_Between}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => filterItems("All")}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderBottomWidth: activeCategory === "All" ? 2 : 0,
            borderBottomColor: activeCategory === "All" ? "#239456" : "transparent",
          }}
        >
          <Text style={{ fontWeight: "500", color: "black" }}>All</Text>
        </TouchableOpacity>

        {UserCategoryData && UserCategoryData.length > 0 && UserCategoryData.map((el, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => filterItems(el.name)}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderBottomWidth: activeCategory === el.name ? 2 : 0,
              borderBottomColor: activeCategory === el.name ? "#239456" : "transparent",
            }}
          >
            <Text style={{ fontWeight: "500", color: "black" }}>{el.name.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => handelCategoryModelOpen(activeCategory)}
        style={[styles.Center, { marginRight: 10 }]}
      >
        <Ionicons name="add-circle-outline" size={24} color="#239456" />
      </TouchableOpacity>
    </Block>
      
       
      </Block>

      <ScrollView style={{ backgroundColor: "#F1F1F1" }}>
        <Block
          style={{ backgroundColor: "#F1F1F1", padding: 10, marginBottom: 60 }}
        >
          <Block style={[styles.Space_Between, { marginTop: 10 }]}>
            <Text style={{ fontWeight: 500 ,fontSize:18}}>Normal Recyclables</Text>
            {/* {
    CartInStorage.length > 0 &&  <Button onPress={handelCartProceed} color='#29BD7F' size={"small"}>Proceed</Button>
  } */}

<Button
  size={"small"}
  onPress={handelSubCategoryModelOpen}
  style={{ backgroundColor: "#239456",height:30,width:60 }}
>
  Add
</Button>
          </Block>

          <Block style={{ marginTop: 10, marginBottom: 100 }}>
            {filteredData.map((el, index) => {
              return (
                <MarketCard
                  key={index}
                  Id={el.id}
                  Index={index}
                  Cart={Cart}
                  setCart={setCart}
                  Title={el.title}
                  Value={el.value}
                  Img={el.image}
                  Category={el.category}
                  setModalVisible={setModalVisible}
                  setItemModelData={setItemModelData}
                  ItemAddStatus={ItemAddStatus}
                />
              );
            })}
          </Block>
        </Block>
      </ScrollView>

      <ItemAddModel
        setItemAddStatus={setItemAddStatus}
        setCart={setCart}
        modalVisible={modalVisible}
        ItemModelData={ItemModelData}
        setModalVisible={setModalVisible}
        handelComplete={(data) => handelComplete(data)}
        handelDelete = {(data)=>handelSubCategoryDelete(data)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        isVisible={AddSubmodalVisible}
        onSwipeComplete={() => handelSubCategoryModelClose()}
        backdropOpacity={0.1}
        onBackdropPress={() => handelSubCategoryModelClose()}
        swipeDirection={["down"]}
        style={styles2.viewHalf}
      >
        <View style={[styles2.centeredView]}>
          <View style={[styles2.modalView]}>
            <Block right style={{ width: width * 0.8 }}>
              <Ionicons
                onPress={handelSubCategoryModelClose}
                name="close-circle"
                size={26}
                color="teal"
              />
            </Block>

            <View style={{ width: "100%", marginTop: 15 }}>
              {/* <TextInput
                variant="outlined"
            
                label="Name"
                value={subAddForm.name}
                onChangeText={(text) => handleSubAddInputChange("name", text)}
              /> */}
           <Block style={{ marginTop: 10, borderColor: "grey", borderWidth: 1,borderRadius:10 }}>
          <Picker
            selectedValue={subAddForm.categoryName}
            onValueChange={(itemValue) => {
              console.log("Value selected ==>", itemValue);
              handleSubAddChange('categoryName', itemValue);
            }}
            style={{ color: 'black', height: 50, fontSize: 18 }}
            itemStyle={{ color: 'black' }}
          >
            <Picker.Item label="Select Category" value="" />
            {UserCategoryData && UserCategoryData.length > 0 && UserCategoryData.map((el, index) => (
              <Picker.Item key={index} label={el.name} value={el.name} />
            ))}
          </Picker>
        </Block>

        {/* {isCategorySelected && ( */}
          <Block style={{ borderWidth: 1, borderColor: "grey", marginTop: 20,borderRadius:10 }}>
            <Picker
              selectedValue={subAddForm.name}
              onValueChange={(itemValue) => handleSubAddChange('name', itemValue)}
              style={{ color: 'black', height: 50, fontSize: 18 }}
            >
              <Picker.Item label="Select Sub Category" value="" />
              {CategoriesData && CategoriesData.map((el) => (
                el.name === subAddForm.categoryName && el.sub_category.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.name} />
                ))
              ))}
            </Picker> 
          </Block>
        {/* )}  */}
             

              <TextInput
                variant="outlined"
                keyboardType="numeric"
                label="Price"
                value={subAddForm.price}
                onChangeText={(text) => handleSubAddChange("price", text)}
                style={{ marginTop: 20,borderRadius:10 }}
              />

              {/* <TextInput
                variant="outlined"
                
                label="Unit"
                value={subAddForm.unit}
                onChangeText={(text) => handleSubAddInputChange("unit", text)}
                style={{ marginTop: 20 }}
              /> */}
               <Block style={{borderWidth:1,borderColor:"grey",marginTop: 20,borderRadius:10}}>
              <Picker
          selectedValue={subAddForm.unit}
          onValueChange={(itemValue) => handleSubAddChange('unit', itemValue)}
          style={{ color: 'black', height: 50, fontSize: 18 }}
        >
          {/* <Picker.Item label="Select Unit" value="" /> */}
          <Picker.Item  label="Kg" value="Kg" />
          
          <Picker.Item label="Ton" value="Ton" />
          <Picker.Item label="Per Piece" value="Per Piece" />
        </Picker>
              </Block>
              
              <Block center style={{ marginTop: 30 }}>
      <Button
        size={"small"}
        style={{ backgroundColor: "teal", color: "#fff" }}
        onPress={handelSubCategoryModelSubmit}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff" }} >Submit</Text>}
      </Button>
    </Block>
            </View>
          </View>
        </View>
      </Modal>

      <CategoryAddModel2 
            modalVisible={catmodalVisible} 
            setModalVisible={setcatModalVisible} 
            categoriesData={updatedCategoriesData}
            setSelectedCategories={setSelectedCategories}
            selectedCategories={selectedCategories}
            handelComplete={handelCatSelectComplete}
            />

      {/* {
showCartSuggestion && CartInStorage.length >0 && <Block center style={{position:"absolute",bottom:60,elevation:10,borderRadius:15,height:100,backgroundColor:"#fff",width:width*0.9,marginTop:10,borderWidth:1,borderColor:"#65be34"}}>
<Block right style={{width:width*0.9,position:"absolute",top:2,right:5}}>
             <Ionicons onPress={handelCloseCartInfo} name="close-circle" size={25} style={{marginLeft:5}} color="red" />
             </Block>
    <Block center style={{flexDirection:"row",justifyContent:"space-between",paddding:10,width:width*0.9,marginTop:20}}>
    
   
        

    <Block>
        
      <Block center>
      <Text style={{fontSize:16,fontWeight:500,marginLeft:10  }}>Total Weight : {CartTotalWeight} Kg</Text>
    
    <Text style={{fontSize:16,fontWeight:500,marginTop:10,marginLeft:10}}> Total Amount : ₹ {CartTotalAmount}</Text>

      </Block>
    
  
 
 
    </Block>

    <Block style={[{flexDirection:"row",justifyContent:"center",alignItem:"center"}]}>

      <Block center>
      <Button color='#65be34' onPress={handelSellScrap} style={{width:100,marginRight:30}}>
      <Text style={{fontSize:16,fontWeight:400,color:"#fff"}}>
      Sell Scraps
      </Text>
    
      </Button>

      </Block>
    
  
 
 
    </Block>
</Block>

</Block>

}   */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container1: {
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 10,
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
    borderColor: "blue",
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
});

const styles2 = StyleSheet.create({
  viewHalf: {
    justifyContent: "flex-end",
    margin: 0,
  },
  lottie: {
    width: 250,
    height: 250,
  },
  content: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.9,
    minHeight:300,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginTop: 5,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 45,
    fontWeight: "bold",
    color: "#2DA194",
  },
});
