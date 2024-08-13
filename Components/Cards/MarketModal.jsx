import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Text } from "galio-framework";
import { LineChart } from 'react-native-chart-kit';

const MarketModal = ({ modalVisible, selectedItem, setModalVisible, formatDate }) => {
    if (!selectedItem) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            {/* Clickable Backdrop */}
            <TouchableOpacity style={styles.backdrop} onPress={() => setModalVisible(false)}>
                <TouchableOpacity activeOpacity={1} style={styles.modalView}>
                    <View style={styles.modalContent}>
                        {/* Top Bar with Close Handler */}
                        <TouchableOpacity style={styles.topBar} onPress={() => setModalVisible(false)}>
                            <View style={styles.topBarHandle}></View>
                        </TouchableOpacity>

                        {/* Title */}
                        <View style={styles.buttonGroup}>
                            <Text style={styles.buttonGroupText}>Add to:</Text>
                            <Text style={styles.buttonGroupText}>Notification</Text>
                            <Text style={styles.buttonGroupText}>Favourite</Text>
                        </View>

                        <View style={styles.buttonGroup}>
                            <Text style={styles.buttonGroupText}>Today</Text>
                            <Text style={styles.buttonGroupText}>Week</Text>
                            <Text style={styles.buttonGroupText}>Month</Text>
                            <Text style={styles.buttonGroupText}>3 Month</Text>
                            <Text style={styles.buttonGroupText}>Custom</Text>
                        </View>

                        {/* Line Chart */}
                        <LineChart
    data={{
        labels: ['Wed, 07', 'Thu, 08', 'Fri, 09', 'Sat, 10', 'Mon, 12', 'Tue, 13'],
        datasets: [
            {
                data: [36500, 36100, 35800, 35900, 36200, 31000, 37650, 37000], // Updated data points for 8 points
                color: (opacity = 1) => `rgba(0, 115, 177, ${opacity})`, // Darker line color
                strokeWidth: 2, // Slightly thinner line
            },
        ],
    }}
    width={Dimensions.get("window").width - 40} // Adjust width based on screen size
    height={200} // Adjust height as necessary
    chartConfig={{
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 0, // No decimal places
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: "6", // Smaller dot size for clarity
            strokeWidth: "2", // Thinner dot border
            stroke: "#000000", // Darker dot border color
        },
        // Adjust grid line appearance
        propsForBackgroundLines: {
            stroke: '#cccccc', // Solid line color for grid
            strokeDasharray: "", // Remove dash pattern to make it solid
        },
        fillShadowGradient: 'transparent', // Ensure shadow effect is removed
        fillShadowGradientOpacity: 0, // Ensure shadow effect is removed
    }}
    style={{
        marginVertical: 10,
        borderRadius: 2,
    }}
    withInnerLines={true} // Ensure inner grid lines are visible
    withOuterLines={true} // Ensure outer grid lines are visible
    fromZero={false} // If you want the y-axis to start from zero, set this to true
/>








                        {/* Additional Information */}
                        
                    
                        <View style={styles.infoRow}>
                            <Text style={styles.infoRowText}>{formatDate(selectedItem.date)} {selectedItem.time}</Text>
                            <Text style={styles.infoRowTextRight}>₹ {selectedItem.price}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoRowText}>{formatDate(selectedItem.date)} {selectedItem.time}</Text>
                            <Text style={styles.infoRowTextRight}>₹ {selectedItem.price}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoRowText}>{formatDate(selectedItem.date)} {selectedItem.time}</Text>
                            <Text style={styles.infoRowTextRight}>₹ {selectedItem.price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalView: {
        justifyContent: 'flex-end',
    },
    modalContent: {
        height: '90%',
        backgroundColor: "#F2F2F2",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    topBar: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    topBarHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#C0C0C0',
        borderRadius: 2,
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 30,
        borderColor: '#F2F2F2',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: '#ffffff',
    },
    buttonGroupText: {
        flex: 1,
        textAlign: 'center',
    },
    infoRow: {
        display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 7,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'transparent',


    },
    infoRowText: {
        flex: 1,
        textAlign: 'left',
        paddingLeft: 10,
        color: '#4682B4',
    },
    infoRowTextRight: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 10,
    },
});

export default MarketModal;
