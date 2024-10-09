import React from 'react';
import { View, StyleSheet } from 'react-native';
import MesocycleForm from '../components/MesocycleForm';

const MesocycleScreen = () => {
  return (
    <View style={styles.container}>
      <MesocycleForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MesocycleScreen;
