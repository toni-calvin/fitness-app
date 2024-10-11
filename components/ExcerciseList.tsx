import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Platform } from 'react-native';
import { Exercise } from '../models/models';

const windowHeight = Dimensions.get('window').height;

const ExerciseList: React.FC<{ exercises: Exercise[] }> = ({ exercises }) => {
    return (
        <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Exercises</Text>
            <FlatList
                data={exercises}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.exerciseCard}>
                        <Text style={styles.exerciseTitle}>{item.name}</Text>
                        <Text>Name: {item.name}</Text>
                        <Text>Muscle Group: {item.muscleGroup}</Text>
                        <Text>Movement Type: {item.movementType}</Text>
                        <Text>Notes: {item.notes}</Text>
                    </View>
                )}
                contentContainerStyle={[
                    styles.listContent,
                    Platform.OS === 'web' ? { maxHeight: windowHeight * 0.6 } : {},
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listTitle: {
        fontSize: 20,
        marginVertical: 20,
        fontWeight: 'bold',
      },
      listContainer: {
        flex: 1, 
      },
      listContent: {
        paddingBottom: 20,
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

export default ExerciseList;