import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import GlobalButtons from '../components/GlobalButton';
import { Platform } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { CustomScreenProps } from '../App';
import ExcerciseList from '../components/ExcerciseList';

interface Exercise {
  id: number;
  name: string;
  MuscleGroup: string;
  MovementType: string;
  Notes: string;
}


const HomeScreen: React.FC<CustomScreenProps> = ({ navigation }) => {
  
  const [mesocycles, setMesocycles] = useState([]);
  const [exercises, setExercises] = useState([]);

  // Fetch both mesocycles and exercises
  useEffect(() => {
    // const fetchMesocycles = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8080/mesocycles'); // Replace with your mesocycles endpoint
    //     setMesocycles(response.data);
    //   } catch (error) {
    //     console.error('Error fetching mesocycles:', error);
    //   }
    // };

    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:8080/exercises'); // Replace with your exercises endpoint
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    // fetchMesocycles();
    fetchExercises();
  }, []);


  return (
    <View style={styles.container}>    
      <ExcerciseList exercises={exercises} /> 
      <GlobalButtons 
            onButton1Press={() => navigation.navigate('Home')}
            onButton2Press={() => navigation.navigate('Admin')}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  mesocycleCard: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default HomeScreen;
