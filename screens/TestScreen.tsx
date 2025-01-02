import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import Button from "../components/Button";
import { useFirebase } from "../hooks/useFirebase";

interface TestScreenProps extends ViewProps {
    // Add your custom props here
}

export const TestScreen: React.FC<TestScreenProps> = ({ style }) => {
    const [date, setDate] = React.useState(new Date());
    const { addExpense, getExpenses } = useFirebase();

    const handleAddExpense = () => {
        console.log("Add Expense");

        const newExpense = {
            title: `Test Expense${Math.floor(Math.random() * 100).toFixed(0)}`,
            amount: 100,
            date: date,
        };

        addExpense(newExpense);
    };

    const handleGetExpenses = () => {
        console.log("Get Expenses");

        getExpenses();
    };

    return (
        <View style={[styles.container, style]}>
            <View
                style={{
                    gap: 20,
                }}
            >
                <Button onPress={handleAddExpense} mode="contained">
                    Add Test Expense
                </Button>
                <Button onPress={handleGetExpenses} mode="contained">
                    Get Expenses
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default TestScreen;
