import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Platform } from 'react-native';
import { Mesocycle } from '../models/models';
import MesocycleCard from './MesocycleCard';

const windowHeight = Dimensions.get('window').height;

const MesocycleList: React.FC<{ mesocycles: Mesocycle[] }> = ({ mesocycles }) => {
    return (
        <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Mesocycles</Text>
            <FlatList
                data={mesocycles}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => (<MesocycleCard mesocycle={item} />)}
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

export default MesocycleList;