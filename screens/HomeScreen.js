import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
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
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    // fetchMesocycles();
    fetchExercises();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Create New Mesocycle" onPress={() => navigation.navigate('Mesocycle')} />

      {/* Display list of mesocycles
      <FlatList
        data={mesocycles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.mesocycleCard}>
            <Text style={styles.title}>Mesocycle {item.id}</Text>
            <Text>Preparation Level: {item.preparation_level}</Text>
            <Text>Comments: {item.comments}</Text>
            <Text>Objectives: {item.objectives}</Text>
          </View>
        )}
      /> */}

      {/* Display list of exercises */}
      <Text style={styles.sectionTitle}>Exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseCard}>
            <Text style={styles.exerciseTitle}>{item.name}</Text>
            <Text>Name: {item.Name}</Text>
            <Text>Muscle Group: {item.MuscleGroup}</Text>
            <Text>Movement Type: {item.MovementType}</Text>
            <Text>Notes: {item.Notes}</Text>
          </View>   
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
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
  sectionTitle: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  exerciseCard: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;