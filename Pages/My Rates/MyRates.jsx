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
  Image,
  TextInput
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
// import { TextInput } from "@react-native-material/core";
import {Picker} from '@react-native-picker/picker';
import { CategoryAddModel } from "../../Components/CategoryAddModel/CategoryAddModel";
import { CategoryAddModel2 } from "../../Components/CategoryAddModel/CategoryAddModel2";
import icon from './icon.png'
import { ThemeData } from "../../Theme/Theme";

export const MyRates = () => {
  const navigation = useNavigation();
  const { userDetails,update,setUpdate } = useAppContext();
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
  // const [update, setupdate] = useState(0);
  
  
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

  const [SubCategoriesData, setSubCategoriesData] = useState([]);
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
    console.log("Update Subcategory ========>",userDetails.id,categoryId,
    subcategoryId,
    subcategoryData);
    try {
      const response = await axios.put(
        `${Base_url}b2bUser/${userDetails.id}/category/${categoryId}/subcategory/${subcategoryId}`,
        subcategoryData
      );
      setUpdate((prev) => prev + 1);
      return response.data;
    } catch (error) {
      console.error("Error updating subcategory:", error);
      throw error;
    }
  };

  const handelPricingHistory = () => {
    navigation.navigate("PricingHistory");
  };

  const handelUpdatePricing = () => {
    navigation.navigate("UpdatePricing");
  };

  const addSubcategory = async (categoryId, subcategoryData) => {
    console.log("Add Subcategory ========>");
    try {
      const response = await axios.post(
        `${Base_url}b2bUser/${userDetails.id}/category/${categoryId}/subcategory`,
        subcategoryData
      );
      setUpdate((prev) => prev + 1);
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
      console.log("Submit dat of new sub category =>",UserCategoryData)
      console.log("Submit dat of new sub category =>",subAddForm)
      const category = UserCategoryData.filter((el) => el.name === subAddForm.categoryName.name);
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
        `${Base_url}b2bUser/${userId}/category`
      );
      console.log("CategoriesData 1 =====================>",response.data)
      const CategoriesData =  response.data.data.categories
      
      console.log("CategoriesData 2 =====================>",CategoriesData)
      // console.log("res of category and subcategory =>", CategoriesData);
      const transformedData = [].concat(...CategoriesData.map(category => {
        console.log("Category Data ==>",category)
        
        return category.sub_category && category.sub_category.map(subCategory => ({
          id: subCategory._id,
          title: subCategory && subCategory.name.toUpperCase(),
          value: subCategory.price,
          image: "https://tse4.mm.bing.net/th?id=OIP.OQh1ykyaCVyCvt2aNHJ-LwHaHa&pid=Api&P=0&h=220", 
          category: category.name,
          updatedAt: subCategory.updatedAt,
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
    deleteSubcategoryByIndex(category[0]._id,ItemModelData.id,userDetails.id)
    setModalVisible(false)
  }

  const deleteSubcategoryByIndex = async (categoryId, subcategoryId,userId) => {
    try {
      const response = await axios.delete(`${Base_url}b2bUser/${userId}/category/${categoryId}/subcategory/${subcategoryId}`);
      setUpdate((prev)=>prev+1)
      return response.data;
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      throw error;
    }
  };

  const getCategories = async () => {
      
    try {
      const response = await axios.get(`${Base_url}categories`);
      setCategoriesData(response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const getSubCategoriesByCategoryName = async (name) => {
      console.log('Getting SubCategories',name)
    try {
      const response = await axios.post(`${Base_url}subcategories/category`,{
        categoryName:name
      });
      
      console.log("sub category data of selected category ==>",response.data);
      setSubCategoriesData(response.data);
      return response.data;
    } catch (error) {
      console.log("Error getting subcategory ==>",error)
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
          }});
        console.log("categoryNames",selectedCategories[0].name)
        const UpdatedData = Data;
    
        try {
          const response = await axios.post(
            `${Base_url}b2bUser/${userDetails.id}/category`,{
             "name":selectedCategories[0].name
            }
            
          );
          setUpdate((prev) => prev + 1);
          setSelectedCategories("")
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
    fetchCategoryData(userDetails.id);
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
    setIsCategorySelected(value.name !== '');
    setSelectedCategories(value.name)
    getSubCategoriesByCategoryName(value.name)
  }
};


  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
     
     <Block style={{marginTop:30,padding:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
       <Block>
        <Text style={{fontSize:25,fontWeight:"bold"}}>My Rates</Text>
       </Block>

       <TouchableOpacity onPress={handelPricingHistory}>
        <Text style={{textDecorationLine: 'underline',fontSize:14}}>Pricing History</Text>
       </TouchableOpacity>
     </Block>
      <View style={styles.topContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Add your Custom </Text>
        <Text style={styles.subText}>Scrap Rate. </Text>
      </View>
      
      <View style={styles.imageBackground}>
        <Image
          source={require('./icon.png')} // replace with your image path
          style={{ width: 78, height: 93 }}
          resizeMode="contain"
        />
      </View>
    </View>

      <Block style={{ padding: 8,marginTop: 10 }}>
        {/* <Input
          placeholder="Search for an item..."
          left
          icon="search1"
          family="antdesign"
          iconSize={20}
          iconColor="grey"
          value={query}
          onChangeText={(text) => setQuery(text)}
          style={{ borderRadius: 16, borderWidth: 1, borderColor: "#A6A6A6",paddingVertical:10 ,paddingHorizontal:20}}
        /> */}
        <Block style={styles.Space_Between}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => filterItems("All")}
          style={{
            marginRight: 10,
            paddingVertical: 5,
            paddingHorizontal: 15,
            
            backgroundColor: activeCategory === "All" ? ThemeData.textColor : ThemeData.activeBackgroundColor,
            borderRadius: 30,
          }}
        >
          <Text style={{ fontWeight: "500", color: activeCategory === "All" ? ThemeData.activeColor : ThemeData.textColor, }}>All</Text>
        </TouchableOpacity>

        {UserCategoryData && UserCategoryData.length > 0 && UserCategoryData.map((el, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => filterItems(el.name)}
            style={{
              marginRight: 10,
              paddingVertical: 5,
              paddingHorizontal: 15,
              
              backgroundColor: activeCategory === el.name ? ThemeData.textColor : ThemeData.activeBackgroundColor,
              borderRadius: 30,
            }}
          >
            <Text style={{ fontWeight: "500", color: activeCategory === el.name ? ThemeData.activeColor : ThemeData.textColor, }}>{el.name && el.name.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

            {/* <TouchableOpacity
              onPress={() => handelCategoryModelOpen(activeCategory)}
              style={[styles.Center, { marginRight: 8 }]}
            >
              <View style={{ backgroundColor: ThemeData.backgroundColor, borderRadius: 35, padding: 10 }}>
                <Ionicons name="add" size={14} color={ThemeData.activeColor} />
              </View>
            </TouchableOpacity> */}
    </Block>
      
       
      </Block>
      <View style={styles3.container}>
      <Text style={styles3.text}>
        Add pricing for{' '}
        <Text style={styles3.linkText}>sub categories</Text> of{' '}
        <Text style={styles3.highlightText}>{activeCategory}</Text> -
      </Text>
      <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
      <TouchableOpacity style={styles3.button} onPress={handelUpdatePricing}>
        <Text style={styles3.buttonText}>+ Update Pricing</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles3.button,{marginLeft:15}]} onPress={handelSubCategoryModelOpen}>
        <Text style={styles3.buttonText}>+ Add Subcategory</Text>
      </TouchableOpacity>

      </Block>
      

    </View>

      <ScrollView style={{ backgroundColor: ThemeData.containerBackgroundColor }}>
        <Block
          style={{ backgroundColor: ThemeData.containerBackgroundColor, paddingHorizontal: 10, marginBottom: 60 }}
        >
          {/* <Block style={[styles.Space_Between, { marginTop: 10 }]}>
            <Text style={{ fontWeight: 500 ,fontSize:18}}>Normal Recyclables</Text>
   

<Button
  size={"small"}
  onPress={handelSubCategoryModelOpen}
  style={{ backgroundColor: "#239456",height:30,width:60 }}
>
  Add
</Button>
          </Block> */}

                    <Block style={{ marginBottom: 100 }}>
            {filteredData.length > 0 ? (
              filteredData.map((el, index) => (
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
                  Date={el.updatedAt}
                  setModalVisible={setModalVisible}
                  setItemModelData={setItemModelData}
                  ItemAddStatus={ItemAddStatus}
                />
              ))
            ) : (
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
            )}
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
                color={ThemeData.textColor}
              />
            </Block>

            <View style={{ width: "100%", marginTop: 15 }}>
              {/* <TextInput
                variant="outlined"
            
                label="Name"
                value={subAddForm.name}
                onChangeText={(text) => handleSubAddInputChange("name", text)}
              /> */}
           <Block style={{ marginTop: 10, borderColor: ThemeData.textColor, borderWidth: 1,borderRadius:10 }}>
          <Picker
            selectedValue={subAddForm.categoryName}
            onValueChange={(itemValue) => {
              console.log("Value selected ==>", itemValue);
              handleSubAddChange('categoryName', itemValue);
            }}
            style={{ color: ThemeData.textColor, height: 50, fontSize: 18 }}
            itemStyle={{ color: ThemeData.textColor }}
          >
            <Picker.Item label="Select Category" value="" />
            {UserCategoryData && UserCategoryData.length > 0 && UserCategoryData.map((el, index) => (
              <Picker.Item key={index} label={el.name} value={el} />
            ))}
          </Picker>
        </Block>

        {/* {isCategorySelected && ( */}
          <Block style={{ borderWidth: 1, borderColor: ThemeData.textColor, marginTop: 20,borderRadius:10 }}>
            <Picker
              selectedValue={subAddForm.name}
              onValueChange={(itemValue) => handleSubAddChange('name', itemValue)}
              style={{ color: 'black', height: 50, fontSize: 18 }}
            >
              <Picker.Item label="Select Sub Category" value="" />
              {/* {CategoriesData && CategoriesData.map((el) => (
                el.name === subAddForm.categoryName && el.sub_category.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.name} />
                ))
              ))} */}
             {
                SubCategoriesData && SubCategoriesData.map((item, index) => (
                  (item.isTradable || item.isTradable==="true")  && <Picker.Item key={index} label={item.name} value={item.name} />
                ))
              }
            </Picker> 
          </Block>
        {/* )}  */}
             

              <TextInput
                
                keyboardType="numeric"
                placeholder="Price"
                color={ThemeData.textColor}
                value={subAddForm.price}
                placeholderTextColor="#000"
                onChangeText={(text) => handleSubAddChange("price", text)}
                style={{ marginTop: 20,borderRadius:10,borderWidth:1,borderColor: ThemeData.textColor,paddingHorizontal : 15,paddingVertical: 10,color:ThemeData.textColor }}
              />

              {/* <TextInput
                variant="outlined"
                
                label="Unit"
                value={subAddForm.unit}
                onChangeText={(text) => handleSubAddInputChange("unit", text)}
                style={{ marginTop: 20 }}
              /> */}
               <Block style={{borderWidth:1,borderColor: ThemeData.textColor,marginTop: 20,borderRadius:10}}>
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
              
              <Block center style={{ marginTop: 20,marginBottom: 10 }}>
      
      <TouchableOpacity onPress={handelSubCategoryModelSubmit} activeOpacity={0.8} disabled={loading}>
        { loading ? ( <ActivityIndicator size="small" color="#0000ff" />) : ( 
        <Text style={{ color: "#fff", marginTop: 10,backgroundColor: ThemeData.backgroundColor,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
   }}>Submit</Text>
        )}
      </TouchableOpacity>
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
  topContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    paddingLeft: 20,

    alignItems: 'center',
    justifyContent: 'space-between',
    // adjust size to fit design
    height: 110,
    
  },
  textContainer: {
    flex: 1,
  },
  mainText: {
    fontSize: 22,
    fontWeight: '700',
    color: ThemeData.textColor,
  },
  highlight: {
    color: '#65c5c4', // matching color for "Selling"
  },
  subText: {
    fontSize: 22,
    fontWeight: '700',
    color: ThemeData.textColor,
    
  },
  imageBackground: {
    
    backgroundColor: ThemeData.color, 
    
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: 150,
  },
  container: {
    flex: 1,
    backgroundColor: ThemeData.containerBackgroundColor,
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
    color: ThemeData.textColor,
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
    marginTop: 10,
  },
  shadow: {
    shadowColor: ThemeData.textColor,
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
    backgroundColor: ThemeData.containerBackgroundColor,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    
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

const styles3 = StyleSheet.create({
  container: {
    padding: 10
  },
  text: {
    fontSize: 16,
    color: ThemeData.textColor, // Black color for the main text
  },
  linkText: {
    color: ThemeData.color // Color for "sub categories" text
    
  },
  highlightText: {
    color: ThemeData.color, // Color for "Aluminium" text
  },
  button: {
    marginTop: 18,
    borderColor: ThemeData.color,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical:5,
    paddingHorizontal:15,
    alignItems: 'center',
   
  },
  buttonText: {
    color: ThemeData.color,
    fontSize: 16,
    fontWeight: '600',
  },

});
