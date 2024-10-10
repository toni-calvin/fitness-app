import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const MesocycleForm = () => {
  const [preparationLevel, setPreparationLevel] = useState('');
  const [comments, setComments] = useState('');
  const [objectives, setObjectives] = useState('');

  const handleSubmit = async () => {
    if (!preparationLevel || !comments || !objectives) {
      Alert.alert('Please fill all fields!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/mesocycles', {
        preparation_level: preparationLevel,
        comments: comments,
        objectives: objectives,
      });

      Alert.alert('Mesocycle created!', `ID: ${response.data.id}`);
      // Clear fields after submission
      setPreparationLevel('');
      setComments('');
      setObjectives('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error creating mesocycle');
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Preparation Level"
        value={preparationLevel}
        onChangeText={setPreparationLevel}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Comments"
        value={comments}
        onChangeText={setComments}
        style={styles.input}
      />
      <TextInput
        placeholder="Objectives"
        value={objectives}
        onChangeText={setObjectives}
        style={styles.input}
      />
      <Button title="Create Mesocycle" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default MesocycleForm;
