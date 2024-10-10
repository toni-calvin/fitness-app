import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MesocycleForm from '../components/MesocycleForm';
import GlobalButtons from '../components/GlobalButton';
import { CustomScreenProps } from '../App';
import axios from 'axios';
import { Mesocycle } from '../models/models';
import MesocycleCard from '../components/MesocycleCard';

export interface MesocycleCreationForm {
  numberMicrocycles: number;
  startDate: Date | null; // Change type to Date
  objectives: string;
}

const AdminScreen: React.FC<CustomScreenProps> = ({ navigation }) => {  
  const [showMesocycleForm, setShowMesocycleForm] = useState(false);
  const [createdMesocycle, setCreatedMesocycle] = useState<Mesocycle | null>(null);

  const postMesocycle = async (mesocycleData: MesocycleCreationForm) => {
    try {
      console.log('Mesocycle:', mesocycleData);
      const response = await axios.post('http://localhost:8080/mesocycles', mesocycleData); // Adjust endpoint as needed
      console.log('Mesocycle created successfully:', response.data);
      setCreatedMesocycle(response.data);
      // You can navigate or update UI based on the response
    } catch (error) {
      console.error('Error posting mesocycle:', error);
    }
  };

  const handleCreateMesocycle = () => {
    setShowMesocycleForm(!showMesocycleForm); // Set state to show the MesocycleForm
  };
  
  return (
  
    <View style={styles.container}>
      <Button title="Create Mesocycle" onPress={handleCreateMesocycle} />
      {showMesocycleForm && (
          <MesocycleForm onSubmit={(data: MesocycleCreationForm) => {
              console.log('Mesocycle Data:', data);
              postMesocycle(data); 
              setShowMesocycleForm(false); 
          }} />
      )}
      <GlobalButtons 
        onButton1Press={() => navigation.navigate('Home')}
        onButton2Press={() => navigation.navigate('Admin')}
      />
      {createdMesocycle && <MesocycleCard mesocycle={createdMesocycle} />} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AdminScreen;
