import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For delete icon
import { Mesocycle } from '../models/models';

interface MesocycleCardProps {
  mesocycle: Mesocycle;
  darkMode?: boolean;
  onDelete: () => void; // Function to handle delete
}

const MesocycleCard: React.FC<MesocycleCardProps> = ({ mesocycle, darkMode, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const swipeableRef = useRef<Swipeable>(null);  // Step 1: Create a reference for Swipeable
  const strokeDashoffset = 283 - (283 * mesocycle.progressRate) / 100;

  const renderRightActions = (progress, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-120, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity style={styles.rightAction} onPress={() => confirmDelete()}>
        <Animated.View style={[styles.actionIcon, { transform: [{ scale }] }]}>
          <Ionicons name="trash-outline" size={30} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const confirmDelete = () => {
    setModalVisible(true);
  };

  const handleDelete = () => {
    setModalVisible(false);
    onDelete(); // Call the delete function
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
    if (swipeableRef.current) {
      swipeableRef.current.close(); // Step 2: Close the swipeable when cancel is clicked
    }
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRef}  // Step 3: Attach the ref to the Swipeable component
        renderRightActions={renderRightActions}
        onSwipeableRightOpen={confirmDelete} 
      >
        <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
          <View style={styles.progressContainer}>
            <Svg height="100" width="100" viewBox="0 0 100 100">
              <Circle cx="50" cy="50" r="45" stroke={darkMode ? '#444' : '#e0e0e0'} strokeWidth="10" fill="none" />
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke={darkMode ? '#00FF00' : '#32CD32'}
                strokeWidth="10"
                fill="none"
                strokeDasharray="283"
                strokeDashoffset={`${strokeDashoffset}`}
                strokeLinecap="round"
              />
            </Svg>
            <View style={styles.percentageContainer}>
              <Text style={styles.progressText}>{mesocycle.progressRate}%</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.title, darkMode ? styles.darkText : styles.lightText]}>{'Mesocycle: ' + mesocycle.id}</Text>
            <Text style={[styles.objectives, darkMode ? styles.darkText : styles.lightText]}>{mesocycle.objectives}</Text>
          </View>
        </View>
      </Swipeable>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to delete this mesocycle?</Text>
            <Button title="Delete" color="red" onPress={handleDelete} />
            <Button title="Cancel" onPress={handleCancelDelete} /> 
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  lightContainer: {
    backgroundColor: '#FFF',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
  },
  percentageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  objectives: {
    fontSize: 14,
    marginTop: 4,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#FFF',
  },
  rightAction: {
    flex: 1,
    backgroundColor: 'red', // Red background when swiping
    justifyContent: 'center',
    alignItems: 'flex-end', // Aligns delete icon to the right
  },
  actionIcon: {
    width: 60,
    marginRight: 20, // Space between the icon and the card edge
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
  },
});

export default MesocycleCard;