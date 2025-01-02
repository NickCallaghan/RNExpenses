import React, { useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useExpenses } from "../store/ExpensesContext";
import { COLORS } from "../constants/Colors";

import Button from "../components/Button";
import IconButton from "../components/IconButton";
import { ExpensesActionType } from "../store/ExpensesContext";

interface AllExpensesScreenProps extends ViewProps {
    // Add your custom props here
}

export const AllExpensesScreen: React.FC<AllExpensesScreenProps> = ({
    style,
}) => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const isEditing = route.params?.itemId !== undefined;
    const { state, dispatch } = useExpenses();
    const { expenses } = state;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    const handleCancel = () => {
        navigation.goBack();
    };

    const handleAdd = () => {
        navigation.goBack();

        const expense = {
            id: isEditing ? route.params.itemId : Math.random().toString(),
            title: "New Expense",
            amount: parseFloat((Math.random() * 1000).toFixed(2)),
            date: new Date(),
        };

        const action = isEditing
            ? ExpensesActionType.EDIT_EXPENSE
            : ExpensesActionType.ADD_EXPENSE;

        dispatch({ type: action, payload: expense });
    };

    const handleDelete = () => {
        dispatch({
            type: ExpensesActionType.REMOVE_EXPENSE,
            payload: route.params.itemId,
        });
        navigation.goBack();
    };

    return (
        <View style={[styles.container, style]}>
            <View style={styles.detailsContainer}>
                <Button mode="contained" onPress={handleAdd}>
                    {isEditing ? "Update" : "Add"}
                </Button>
                <Button mode="outlined" onPress={handleCancel}>
                    Cancel
                </Button>
            </View>

            {isEditing && (
                <IconButton
                    onPress={handleDelete}
                    name="trash"
                    size={44}
                    color={COLORS.error500}
                    style={{ marginHorizontal: 12 }}
                />
            )}
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
