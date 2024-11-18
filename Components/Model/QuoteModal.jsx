import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { ThemeData } from "../../Theme/Theme";

const QuoteModal = ({ isVisible, onClose }) => {
  return (
    <Modal
    animationType="slide"
      transparent={true}
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={["down"]}
      backdropOpacity={0.2}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Quotation</Text>
        <Text style={styles.modalSubtitle}>Send Quote Price</Text>
        <Text style={styles.label}>Price</Text>
        <View style={styles.priceRow}>
          <TextInput
            style={styles.priceInput}
            placeholder="00000"
            keyboardType="numeric"
          />
          <Text style={styles.unit}>/ Per Kg</Text>
        </View>
        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Notes"
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={onClose}>
          <Text style={styles.submitButtonText}>Send Quotation</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 16,
    color: ThemeData.color,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#a6a6a6",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginRight: 8,
  },
  unit: {
    fontSize: 16,
    color: "#888",
  },
  notesInput: {
    height: 120,
    borderWidth: 1,
    borderColor: "#a6a6a6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuoteModal;
