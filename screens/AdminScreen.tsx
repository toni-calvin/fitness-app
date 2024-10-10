import React from 'react';
import { View, StyleSheet } from 'react-native';
import MesocycleForm from '../components/MesocycleForm';
import GlobalButtons from '../components/GlobalButton';
import { CustomScreenProps } from '../App';

const AdminScreen: React.FC<CustomScreenProps> = ({ navigation }) => {  return (
    <View style={styles.container}>
      <MesocycleForm />
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
