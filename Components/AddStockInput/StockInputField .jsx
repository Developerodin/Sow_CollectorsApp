import React, { useState } from 'react';
import { View,Dimensions, StyleSheet  } from 'react-native';
import { Block, Text, Input, theme } from "galio-framework";
import Picker from '@react-native-picker/picker';
import { SelectList } from 'react-native-dropdown-select-list'
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button } from "@react-native-material/core";
const {width, height} = Dimensions.get('window');
const StockInputField = ({ addInputField, inputFields, setInputFields, categories, setCategories }) => {

    const [selected, setSelected] = React.useState("");

    const data = [
        {key:'1', value:'Plastic', disabled:false},
        {key:'2', value:'Newspaper'},
        {key:'3', value:'Iron'},
        {key:'4', value:'Brass', disabled:true},
        {key:'5', value:'Glass Bottles'},
        {key:'6', value:'Paperboard'},
        {key:'7', value:'Cardboard'},
        {key:'8', value:'Tin Cans'},
        
    ]
    const handleInputChange = (text, index) => {
        const updatedInputFields = [...inputFields];
        updatedInputFields[index].value = text;
        setInputFields(updatedInputFields);
      };
      
      const handleCategoryChange = (category, index) => {
        const updatedInputFields = [...inputFields];
        updatedInputFields[index].category = category;
        setInputFields(updatedInputFields);
      };

      const handleRemoveItem = (index) => {
        const updatedInputFields = [...inputFields];
        updatedInputFields.splice(index, 1);
        setInputFields(updatedInputFields);
      };

  return (
    <View>
      {inputFields.map((input, index) => (
  <View  style={{backgroundColor:"#fff", marginTop:30,borderRadius:5,width:width*0.9}} key={index}>
    <Block right style={{marginTop:-20,marginRight:-20}}>

    <Ionicons onPress={() => handleRemoveItem(index)} name="close-circle" size={26} color="red" />
    </Block>
   
<Block >
<SelectList
    setSelected={(val) => handleCategoryChange(val, index)}
    data={data}
    save="value"
  />
</Block>


<Block style={[styles.Space_Between]}>
<TextInput
    variant="outlined"
    keyboardType="numeric"
    label="Weight"
    value={input.value}
    placeholder="Enter value"
    onChangeText={(text) => handleInputChange(text, index)}
     // Make the Input take 50% of the width
     style={{marginTop:20,borderRadius:20,width:width*0.6}}
     color={ 'grey'}
    inputStyle={{ borderWidth: 0, paddingBottom:0,color:"black",fontSize:16,letterSpacing:2 }}
  />
  <TextInput
    variant="outlined"
    keyboardType="ascii-capable"
    label="In"
    value={"Kg"}
     style={{marginTop:20,borderRadius:20,width:width*0.2}}
     color={ 'grey'}
    inputStyle={{ borderWidth: 0, paddingBottom:0,color:"black",fontSize:16,letterSpacing:2 }}
  />

</Block>
  
 
          
</View>
))}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#FFF",

  },
  modalContainer: {
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: 'transparent', // Make the border color transparent
  },
  input: {
    flex: 1,
    textAlign:"center",
    padding:0,
    fontSize:22
     // Remove padding to make it look borderless
  },
  subtitle: {
    color:"black",
    fontSize: 20,
    marginTop: 10,
  
    textAlign: 'left',
    lineHeight: 23,
    letterSpacing:0.3
  },
  title: {
    color:"black",
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 52,
  },
  btn: {
   width: '95%',
    height: 55,
    borderRadius: 5,
    backgroundColor: '#40A99E',
    justifyContent: 'center',
    alignItems: 'center',
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

export default StockInputField;
