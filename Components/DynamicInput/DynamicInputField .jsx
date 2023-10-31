import React, { useState } from 'react';
import { View, TextInput  } from 'react-native';
import { Block, Text, Input, theme, Button } from "galio-framework";
import Picker from '@react-native-picker/picker';
import { SelectList } from 'react-native-dropdown-select-list'
import { Ionicons } from '@expo/vector-icons';
const DynamicInputField = ({ addInputField, inputFields, setInputFields, categories, setCategories }) => {

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
  <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }} key={index}>

<SelectList
    setSelected={(val) => handleCategoryChange(val, index)}
    data={data}
    save="value"
    style={{width:120}}
  />

  <Input
    
    value={input.value}
    placeholder="Enter value"
    onChangeText={(text) => handleInputChange(text, index)}
     // Make the Input take 50% of the width
     style={{width:120}}
  />
 
          <Ionicons onPress={() => handleRemoveItem(index)} name="ios-remove-circle-outline" size={24} color="red" />
</View>
))}
      
    </View>
  );
};

export default DynamicInputField;
