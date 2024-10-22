import React, { useState } from 'react';
import {  View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, } from 'react-native';
const { width, height } = Dimensions.get("screen");
import Modal from "react-native-modal";

const RejectOrder = ({ isVisible, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const predefinedReasons = [
    "Too far",
    "Price too high",
    "Ordered by mistake",
    "Issue with the app",
    "Other"
  ];

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
    if (reason !== 'Other') {
      setCustomReason(''); 
    }
  };

  const handleSubmit = () => {
    const reason = selectedReason === 'Other' ? customReason : selectedReason;
    if (reason) {
      onSubmit(reason); 
      onClose();  
    } else {
      alert("Please select or enter a reason.");
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide" 
    
   
    onSwipeComplete={() => onClose()}
    backdropOpacity={0.5}
    onBackdropPress={() => onClose()}
    swipeDirection={[ "down"]} style={styles.backdrop} >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Why are you rejecting the order?</Text>
          
          {predefinedReasons.map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.reasonButton,
                selectedReason === reason && styles.selectedReason
              ]}
              onPress={() => handleReasonSelect(reason)}
            >
              <Text style={styles.reasonText}>{reason}</Text>
            </TouchableOpacity>
          ))}

          {selectedReason === 'Other' && (
            <TextInput
              style={styles.textInput}
              placeholder="Enter your reason"
              value={customReason}
              onChangeText={setCustomReason}
            />
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
    
     margin: 0,
     justifyContent: 'flex-end',
    },
  modalContainer: {
    justifyContent: 'flex-end',
    
  },
  modalContent: {
    
    height: height * 0.55,
        backgroundColor: "#F2F2F2",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reasonButton: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  selectedReason: {
    backgroundColor: '#ddd',
  },
  reasonText: {
    fontSize: 16,
  },
  textInput: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    padding: 15,
    backgroundColor: '#dc3545',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
  }
});

export default RejectOrder;
