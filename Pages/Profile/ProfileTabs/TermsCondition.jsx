import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const TermsCondition = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.content}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.paragraph}>
        At Scrap On Wheels, we are passionate about revolutionizing the scrap
        collection and recycling industry. Our mission is to make recycling
        convenient, efficient, and environmentally responsible. We're not just
        a company; we're a team of dedicated individuals committed to creating
        a sustainable future for our planet.
      </Text>

      <Text style={styles.subheading}>Our Story</Text>
      <Text style={styles.paragraph}>
        Scrap On Wheels was founded in [Year] by a group of environmentally
        conscious entrepreneurs who saw the need for a modern and convenient
        scrap collection service. With backgrounds in recycling, logistics,
        and technology, our founders set out to transform the way scrap
        materials are handled.
      </Text>

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
    flex: 1,
    justifyContent: 'center',
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