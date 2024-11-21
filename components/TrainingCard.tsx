import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Touchable, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import { set } from 'react-hook-form';
import { Exercise, Training } from '../models/models';

const title = "Dia 1: Empujes"
const imagePath = require("../assets/test.jpg");


const training: Training = {
  id: 1, 
  targetMuscleGroup: "Pectoral", 
  excercises: [{id: 1, name: "Press Banca", sets: [{id: 1, reps: 10, weight: "100", rir: 10, restTime: 10 }, {id: 2, reps: 20, weight: "100", rir: 10, restTime: 10 }], muscleGroup: "Pectoral", movementType: "Empuje", notes: "notes"}],

  preparationLevel: 10, 
  comments: "comments"
};

const ExcerciseCard = (excercise: Exercise) => {
  return (
    <TouchableOpacity>
      <Card containerStyle={styles.card}>
      <Card.Title>{excercise.name}</Card.Title>
      <Card.Divider></Card.Divider>
      {
      excercise.sets.map((set, i) => {
        return (<View>
        <Text style={{color: "red"}}>Set: {i+1}:</Text>
        <Text>Reps: {set.reps}</Text>
        <Text>Weight: {set.weight}</Text>
        <Text>Rir: {set.rir}</Text>
        <Text>Rest Time: {set.restTime} </Text>
      </View>)
      })
      }
      </Card>
    </TouchableOpacity>
  )
}



const TrainingCard = () => {
  const [clicked, setClicked] = useState(false);


  return (
    <TouchableOpacity onPress={() => setClicked(!clicked)}>
      <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{title}</Card.Title>
      <Card.Divider></Card.Divider>
      <Card.Image source={imagePath} style={styles.imageBackground}></Card.Image>
      <Card.Divider></Card.Divider>
      <View style={styles.cardDetails}>
        <Text>{"Series: 10"}</Text>
        <Text>{"Reps: 10"}</Text>
        <Text>{"Duration: 10"}</Text>
      </View>
      {clicked && <ExcerciseCard {...training.excercises[0]}></ExcerciseCard>}
      </Card>
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  imageBackground: {
  },
  infoOverlay: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 5,
  },
  duration: {
    color: '#fff',
    fontSize: 12,
    fontStyle: 'italic',
  },
  cardDetails: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default TrainingCard;