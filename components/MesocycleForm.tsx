import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface MesocycleCreationForm {
    numberMicrocycles: number;
    startDate: string;
    objectives: string;
}

interface MesocycleFormProps {
    onSubmit: SubmitHandler<MesocycleCreationForm>; // Update to use SubmitHandler
}

const MesocycleForm: React.FC<MesocycleFormProps> = ({ onSubmit }) => {
    // Initialize the form methods with the correct type
    const { control, handleSubmit, formState: { errors } } = useForm<MesocycleCreationForm>(); 

    // This function will be called when the form is submitted
    const onSubmitHandler = (data: MesocycleCreationForm) => {
        console.log('Form Data:', data); // Log the captured values
        onSubmit(data); // Pass data to the parent component if needed
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
                            keyboardType="numeric" // Set keyboard type to numeric
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value?.toString()} // Convert number to string for display
                        />
                    )}
                />
                {errors.numberMicrocycles && <Text style={styles.errorText}>{errors.numberMicrocycles.message}</Text>}
            </View>

            <View style={styles.startDateContainer}>
                <Text style={styles.label}>Start Date:</Text>
                <Controller
                    control={control}
                    name="startDate"
                    rules={{ required: 'Start Date is required' }} // Add validation
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="YYYY-MM-DD"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.startDate && <Text style={styles.errorText}>{errors.startDate.message}</Text>}
            </View>

            <View style={styles.objectivesContainer}>
                <Text style={styles.label}>Objectives:</Text>
                <Controller
                    control={control}
                    name="objectives"
                    rules={{ required: 'Objectives are required' }} // Add validation
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

            <Button title="Submit" onPress={handleSubmit(onSubmitHandler)} /> {/* Use the handler here */}
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
