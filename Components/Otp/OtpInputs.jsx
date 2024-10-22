import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

 export const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const otpInputs = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < length - 1 && value !== '') {
      otpInputs.current[index + 1].focus();
    }

    if (index === length - 1) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      const newOtp = [...otp];
    newOtp[index-1] = "";
    setOtp(newOtp);
      otpInputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
        
          key={index}
          style={styles.input}
          value={value}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          keyboardType="numeric"
          maxLength={1}
          ref={(ref) => (otpInputs.current[index] = ref)}
          
          secureTextEntry={true}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  input: {
    width: 50,
    height: 60,
    fontSize:27,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#A6A6A6',
    borderRadius:10,
    marginLeft:10,
    marginRight:10
  },
});

