import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Block, Input, theme, Button } from "galio-framework";

export const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.content}>
      <Text style={styles.heading}>User License Agreement (ULA) - Scrap on Wheels</Text>
      <Text style={styles.paragraph}>
      IMPORTANT - READ CAREFULLY:

This User License Agreement (ULA) is a legal agreement between you (referred to as "User," "you," or "your") and Scrap on Wheels Pvt Ltd (referred to as "Company," "we," "us," or "our") governing your use of the Scrap on Wheels mobile application and related services (collectively referred to as the "Service"). By installing, accessing, or using the Service, you agree to be bound by the terms and conditions of this ULA. If you do not agree to these terms, please do not use the Service.
      </Text>

      {/* <Text style={styles.subheading}>Our Story</Text>
      <Text style={styles.paragraph}>
        Scrap On Wheels was founded in [Year] by a group of environmentally
        conscious entrepreneurs who saw the need for a modern and convenient
        scrap collection service. With backgrounds in recycling, logistics,
        and technology, our founders set out to transform the way scrap
        materials are handled.
      </Text> */}

      {/* Add more sections like "What We Do," "Why Choose Us," "Our Vision," and "Contact Us" here */}
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  content: {
    // flex: 1,
    // justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});