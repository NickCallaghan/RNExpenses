import React from "react";
import { View, Text, StyleSheet, ViewProps, Pressable } from "react-native";
import { Expense } from "../types/expense";
import { COLORS } from "../constants/Colors";

import { useNavigation } from "@react-navigation/native";

interface ExpenseItemProps extends ViewProps {
    item: Expense;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({ style, item }) => {
    const { title, amount, date } = item;

    const navigation = useNavigation<any>();

    return (
        <Pressable
            onPress={() =>
                navigation.navigate("ManageExpense", { itemId: item.id })
            }
        >
            <View style={[styles.container, style]}>
                <View>
                    <Text style={styles.expenseTitle}>{title}</Text>
                    <Text style={styles.expenseDate}>
                        {date.toLocaleDateString("en-GB")}
                    </Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.expenseAmount}>£{amount}</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary700,
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        padding: 16,
    },
    expenseTitle: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    expenseDate: {
        color: "white",
        fontSize: 16,
    },
    amountContainer: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        minWidth: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    expenseAmount: {
        color: COLORS.primary500,
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default ExpenseItem;
