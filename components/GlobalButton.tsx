import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

type GlobalButtonsProps = {
  onButton1Press: () => void;
  onButton2Press: () => void;
};

const GlobalButtons: React.FC<GlobalButtonsProps> = ({ onButton1Press, onButton2Press }) => {
  return (
    <View style={styles.container}>
      <Button title="Button 1" onPress={onButton1Press} />
      <Button title="Button 2" onPress={onButton2Press} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
});

export default GlobalButtons;
