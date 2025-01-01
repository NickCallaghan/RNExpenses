import React, { useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { COLORS } from "../constants/Colors";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useExpenses } from "../store/ExpensesContext";

interface AllExpensesScreenProps extends ViewProps {
    // Add your custom props here
}

export const AllExpensesScreen: React.FC<AllExpensesScreenProps> = ({
    style,
}) => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const isEditing = route.params?.itemId !== undefined;
    const { state } = useExpenses();
    const { expenses } = state;

    useEffect(() => {
        if (isEditing) {
            const expense = expenses.find(
                (item) => item.id === route.params.itemId
            );
        }
    }, [isEditing, route.params?.itemId, expenses, navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    return (
        <View style={[styles.container, style]}>
            <View style={styles.detailsContainer}>
                <Text style={{ color: "white" }}>Expense Details</Text>
            </View>

            {isEditing && (
                <Ionicons
                    name="trash"
                    size={44}
                    color={COLORS.error500}
                    style={{ marginHorizontal: 12 }}
                />
            )}

            <Text style={{ color: "white" }}>
                {isEditing ? "Editing" : "Adding"}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary800,
        height: 400,
    },
    detailsContainer: {
        borderBottomWidth: 1,
        width: "80%",
        borderBottomColor: "white",
        marginBottom: 24,
        padding: 8,
    },
});

export default AllExpensesScreen;
