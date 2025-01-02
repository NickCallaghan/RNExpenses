import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { COLORS } from "../constants/Colors";
import { useExpenses } from "../store/ExpensesContext";

import ExepenseTotal from "../components/ExepenseTotal";
import ExpenseList from "../components/ExpenseList";
import EmptyMessage from "../components/EmptyMessage";

interface RecentExpensesScreenProps extends ViewProps {
    // Add your custom props here
}

export const RecentExpensesScreen: React.FC<RecentExpensesScreenProps> = ({
    style,
}) => {
    const { state } = useExpenses();
    const { expenses } = state;

    const last7DaysExpenses = expenses.filter((item) => {
        const today = new Date();
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        return item.date >= last7Days;
    });

    const totalExpenses = last7DaysExpenses.reduce(
        (acc, item) => acc + item.amount,
        0
    );

    return (
        <View style={[styles.container, style]}>
            <ExepenseTotal text="Last 7 days" amount={totalExpenses} />
            <ExpenseList items={last7DaysExpenses} />
            {expenses.length === 0 && (
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
