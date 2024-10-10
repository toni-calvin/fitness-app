import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller, SubmitHandler, set } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MesocycleCreationForm } from '../screens/AdminScreen';

interface MesocycleFormProps {
    onSubmit: SubmitHandler<MesocycleCreationForm>;
}

const MesocycleForm: React.FC<MesocycleFormProps> = ({ onSubmit }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<MesocycleCreationForm>(); 
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const onSubmitHandler = (data: MesocycleCreationForm) => {
        // Include the selected date in the submitted data
        const formData = { ...data, startDate: selectedDate };
        console.log('Form Data:', formData);
        onSubmit(formData);
    };

    const handleDatePicked = (date: Date) => {
        setSelectedDate(date);
        setDatePickerVisibility(false); // Hide the date picker
    };

    return (
        <View style={styles.formContainer}>
            <View style={styles.numberMicrocycleContainer}>
                <Text style={styles.label}>Number of Microcycles:</Text>
                <Controller
                    control={control}
                    name="numberMicrocycles"
                    rules={{
                        required: 'Number of Microcycles is required',
                        min: {
                            value: 1,
                            message: 'Must be at least 1',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Number of Microcycles"
                            keyboardType="numeric"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value?.toString()} 
                        />
                    )}
                />
                {errors.numberMicrocycles && <Text style={styles.errorText}>{errors.numberMicrocycles.message}</Text>}
            </View>

            <View style={styles.startDateContainer}>
              <View style={styles.startDateContainerValue}></View>
                <Text style={styles.label}>Start Date: {selectedDate ? selectedDate.toDateString() : 'No date selected'}</Text>
                <Button title="Select Date" onPress={() => setDatePickerVisibility(true)} />
                {isDatePickerVisible && (
                    <DateTimePicker
                        mode='date'
                        value={selectedDate || new Date()}
                        onChange={(_, date) => handleDatePicked(date!)}
                        onTouchCancel={() => setDatePickerVisibility(false)}
                    />
                )}
            </View>

            <View style={styles.objectivesContainer}>
                <Text style={styles.label}>Objectives:</Text>
                <Controller
                    control={control}
                    name="objectives"
                    rules={{ required: 'Objectives are required' }} 
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Enter objectives"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.objectives && <Text style={styles.errorText}>{errors.objectives.message}</Text>}
            </View>

            <Button title="Submit" onPress={handleSubmit(onSubmitHandler)} />
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    numberMicrocycleContainer: {
        marginBottom: 20,
    },
    startDateContainer: {
        marginBottom: 20,
    },
    startDateContainerValue: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    objectivesContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});

export default MesocycleForm;
