import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Mesocycle } from "../models/models";

const MesocycleCard = ({ mesocycle }: { mesocycle: Mesocycle }) => {
    return (
        <View style={styles.container}>
            <Text>{mesocycle.id}</Text>
            <Text>{mesocycle.startDate}</Text>
            <Text>{mesocycle.objectives}</Text>
            {mesocycle.microcycles.map((microcycle, index) => (
                <View key={index}>
                    <Text>Microcycle id: {microcycle.id}</Text>
                    <Text>{microcycle.startDate}</Text>
                    <Text>{microcycle.endDate}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
});


export default MesocycleCard;