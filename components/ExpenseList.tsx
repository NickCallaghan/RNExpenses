import React from "react";
import { FlatList, StyleSheet, View, ViewProps } from "react-native";
import { Expense } from "../types/expense";

import ExpenseItem from "./ExpenseItem";

interface ExpenseListProps extends ViewProps {
    items: Expense[];
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ style, items }) => {
    return (
        <View style={[styles.container, style]}>
            <FlatList
                data={items}
                renderItem={({ item }) => <ExpenseItem item={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 70,
    },
});

export default ExpenseList;
