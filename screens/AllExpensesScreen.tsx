import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { COLORS } from "../constants/Colors";

import ExpenseList from "../components/ExpenseList";
import ExepenseTotal from "../components/ExepenseTotal";

import { useExpenses } from "../store/ExpensesContext";

interface AllExpensesScreenProps extends ViewProps {
    // Add your custom props here
}

export const AllExpensesScreen: React.FC<AllExpensesScreenProps> = ({
    style,
}) => {
    const { state } = useExpenses();
    const { expenses } = state;

    const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);

    return (
        <View style={[styles.container, style]}>
            <ExepenseTotal text="Total Expenses" amount={totalExpenses} />
            <ExpenseList items={expenses} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary800,
        padding: 16,
    },
});

export default AllExpensesScreen;
