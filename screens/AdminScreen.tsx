import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MesocycleForm from '../components/MesocycleForm';
import GlobalButtons from '../components/GlobalButton';
import { CustomScreenProps } from '../App';

const AdminScreen: React.FC<CustomScreenProps> = ({ navigation }) => {  
  const [showMesocycleForm, setShowMesocycleForm] = useState(false);
  const handleCreateMesocycle = () => {
    setShowMesocycleForm(!showMesocycleForm); // Set state to show the MesocycleForm
  };
  
  return (
  
    <View style={styles.container}>
      <Button title="Create Mesocycle" onPress={handleCreateMesocycle} />
      {showMesocycleForm && (
          <MesocycleForm onSubmit={(data: any) => {
              console.log('Mesocycle Data:', data);
              setShowMesocycleForm(false); 
          }} />
      )}
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
