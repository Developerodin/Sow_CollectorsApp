import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image ,ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


const categories = ["Iron scrap", "TMT Bar", "CRC scrap", "Sponge", "Turning"];
const mandiRates = [
  {
    id: '1',
    name: 'Govindgarh Mandi',
    date: '24.09.2024',
    time: '11:43 AM',
    price: '₹ 32,100',
    change: '+ 300',
  },
  {
    id: '2',
    name: 'Jaipur Mandi',
    date: '24.09.2024',
    time: '11:43 AM',
    price: '₹ 32,100',
    change: '+ 300',
  },
  {
    id: '3',
    name: 'Jaipur Mandi',
    date: '24.09.2024',
    time: '11:43 AM',
    price: '₹ 32,100',
    change: '+ 300',
   
  }
];

export const MandiRates = () => {
    const [selectedTab, setSelectedTab] = useState('Jaipur');
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mandi Rates</Text>
        <Ionicons name="search" size={24} color="black" />
      </View>

      {/* Location and Category Selectors */}
      <View style={styles.selectors}>
        <TouchableOpacity
          style={[
            styles.locationButton,
            selectedTab === 'Jaipur' && styles.selectedButton,
          ]}
          onPress={() => setSelectedTab('Jaipur')}
        >
          <Ionicons name="globe" size={16} color={selectedTab === 'Jaipur' ? 'white' : 'black'} />
          <Text style={[styles.selectorText, selectedTab === 'Jaipur' && styles.selectedText]}>Jaipur</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedTab === 'Category' && styles.selectedButton,
          ]}
          onPress={() => setSelectedTab('Category')}
        >
          <Text style={[styles.selectorText, selectedTab === 'Category' && styles.selectedText]}>Select Category</Text>
        </TouchableOpacity>
      </View>

      {/* Scrap Categories Tabs */}
      <View style={styles.tabs}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.tab}>
            <Text style={styles.tabText}>{category}</Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>

      {/* Mandi Rates List */}
      <FlatList
        data={mandiRates}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.rateItem}>
            <View style={styles.rateInfo}>
              <Text style={styles.mandiName}>{item.name}</Text>
              <View style={styles.dateContainer}>
                <FontAwesome name="calendar" size={14} color="#65c5c4" />
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>
            <View style={styles.priceInfo}>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.change}>{item.change}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '500',
  },
  selectors: {
    flexDirection: 'row',
    gap: 10,
    
    marginBottom: 15,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 30,
    backgroundColor: '#f4f4f4',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 30,
    backgroundColor: '#f4f4f4',
  },
  selectedButton: {
    backgroundColor: '#000',
  },
  selectorText: {
    marginLeft: 5,
    color: 'black',
  },
  selectedText: {
    color: 'white',
  },
  tabs: {
    flexDirection: 'row',
    
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  tabText: {
    fontSize: 14,
    color: '#000',
  },
  listContent: {
    paddingBottom: 20,
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b3b3b3',
    marginBottom: 10,
    
  },
  rateInfo: {
    flexDirection: 'column',
  },
  mandiName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 5,
  },
  timeText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 10,
  },
  priceInfo: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  change: {
    fontSize: 14,
    color: '#65c5c4',
  },
});

export default MandiRates;
