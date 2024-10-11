import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, Platform } from 'react-native';
import MesocycleForm from '../components/MesocycleForm';
import GlobalButtons from '../components/GlobalButton';
import { CustomScreenProps } from '../App';
import axios from 'axios';
import { Mesocycle } from '../models/models';
import MesocycleList from '../components/MesocycleList';

export interface MesocycleCreationForm {
  numberMicrocycles: number;
  startDate: Date | null; // Change type to Date
  objectives: string;
}

const AdminScreen: React.FC<CustomScreenProps> = ({ navigation }) => {  
  const [showMesocycleForm, setShowMesocycleForm] = useState(false);
  const [mesocycles, setMesocycles] = useState<[Mesocycle] | null>(null);

  const getMesocycles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/mesocycles'); 
      console.log('Mesocycles:', response.data);
      setMesocycles(response.data);
    } catch (error) {
      console.error('Error getting mesocycles:', error);
    }
  }

  const postMesocycle = async (mesocycleData: MesocycleCreationForm) => {
    try {
      console.log('Mesocycle:', mesocycleData);
      const response = await axios.post('http://localhost:8080/mesocycles', mesocycleData); 
      console.log('Mesocycle created successfully:', response.data);
      getMesocycles();
      // You can navigate or update UI based on the response
    } catch (error) {
      console.error('Error posting mesocycle:', error);
    }
  };

  useEffect(() => {
    getMesocycles();
  }, []);

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
      {
        mesocycles?.length! > 0 && <MesocycleList mesocycles={mesocycles!} />
      }
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
    backgroundColor: '#fff',
  },
});

export default AdminScreen;
