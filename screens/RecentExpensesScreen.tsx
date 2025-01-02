import React, { useEffect, useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { COLORS } from "../constants/Colors";

import ExepenseTotal from "../components/ExepenseTotal";
import ExpenseList from "../components/ExpenseList";
import EmptyMessage from "../components/EmptyMessage";
import { Expense } from "../types/expense";
import { useExpenses } from "../store/ExpensesContext";

interface RecentExpensesScreenProps extends ViewProps {
    // Add your custom props here
}

export const RecentExpensesScreen: React.FC<RecentExpensesScreenProps> = ({
    style,
}) => {
    const { expenses } = useExpenses();

    const last7DaysExpenses = expenses.filter((item) => {
        // TODO: Fix filter query, filter using firestore query
        const today = new Date();
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        return item.date >= last7Days;
    });

    const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);

    return (
        <View style={[styles.container, style]}>
            <ExepenseTotal text="Last 7 days" amount={totalExpenses} />
            <ExpenseList items={last7DaysExpenses} />
            {last7DaysExpenses.length === 0 && (
                <EmptyMessage text="No expenses to show for the last 7 days" />
            )}
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

export default RecentExpensesScreen;
