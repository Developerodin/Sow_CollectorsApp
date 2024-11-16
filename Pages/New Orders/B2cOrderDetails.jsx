import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeData } from '../../Theme/Theme';

export const B2cOrderDetails = () => {
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    };
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <View style={{backgroundColor: '#000',borderRadius: 35,padding:8}}>
          <Ionicons  name="chevron-back" style={styles.backIcon} />
            </View >
        </TouchableOpacity>
        <Text style={styles.title}>Iron scrap</Text>
      </View>

      {/* Image */}
      <Image
        source={require("../../assets/IronScrap.png")} 
        style={styles.image}
        resizeMode="cover"
      />

      {/* Company Details */}
      <View style={styles.companyRow}>
        <Text style={styles.companyName}>United Enterprises</Text>
        <TouchableOpacity>
          <Text style={styles.quotationText}>3 Quotations Received</Text>
        </TouchableOpacity>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        {renderDetailRow('Availability', 'For Buy')}
        {renderDetailRow('Expected', 'Aluminium Boring')}
        {renderDetailRow('Quantity', '100 Ton')}
        {renderDetailRow('Price', '₹40 / Kg')}
        {renderDetailRow('Date', '01.10.2024')}
        {renderDetailRow('Time', '11 : 42 AM')}
        {renderDetailRow('Description', 'Aluminium Boring for sale')}
        {renderDetailRow(
          'Location',
          'Near Dmart, Mahavir Nagar, 302033, Jaipur, India.'
        )}
      </View>

      {/* Quote Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Quote your Price</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const renderDetailRow = (label, value) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detail}>: </Text>
    <Text style={styles.detailValue}>{value}</Text>

  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 24,
  },
  backButton: {
    marginRight: 8,
  },
  backIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 16,
  },
  companyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
  },
  quotationText: {
    fontSize: 14,
    color: ThemeData.color,
    
  },
  detailsContainer: {
    marginVertical: 16,

  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  detail: {
    fontSize: 14,
    
    marginLeft: 8,
  },
  detailValue: {
    fontSize: 14,
    flex: 2,
    marginLeft: 15,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default B2cOrderDetails;
