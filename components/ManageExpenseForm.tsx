import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import Button from "./Button";
import Input from "./Input";

import { COLORS } from "../constants/Colors";

import { useNavigation } from "@react-navigation/native";
import { ExpensesActionType, useExpenses } from "../store/ExpensesContext";
import { useFirebase } from "../hooks/useFirebase";

interface ManageExpenseFormProps extends ViewProps {
    isEditing: boolean;
    itemId?: string;
}

enum ExpenseFieldsType {
    TITLE = "title",
    AMOUNT = "amount",
    DATE = "date",
}

export const ManageExpenseForm: React.FC<ManageExpenseFormProps> = ({
    style,
    isEditing,
    itemId,
}) => {
    const navigation = useNavigation<any>();
    const { addExpense } = useFirebase();
    const { state, dispatch } = useExpenses();
    const [error, setError] = useState({ isError: false, message: "" });
    const { isError } = error;
    const [formState, setFormState] = useState({
        title: "",
        amount: "",
        date: "",
    });
    const { expenses } = state;

    const handleChange = (input: ExpenseFieldsType, enteredValue: string) => {
        console.log({ enteredValue, input });
        setFormState((prevState) => ({ ...prevState, [input]: enteredValue }));
    };

    useEffect(() => {
        if (isEditing) {
            const expense = expenses.find((expense) => expense.id === itemId);

            try {
                if (!expense) {
                    throw new Error("Expense not found");
                }

                setFormState({
                    title: expense.title,
                    amount: expense.amount.toString(),
                    date: expense.date.toISOString().split("T")[0],
                });
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    const handleCancel = () => {
        navigation.goBack();
    };

    const handleUpsert = () => {
        const updatedExpenseDetails = {
            id: itemId ? itemId : Math.random().toString(),
            title: formState.title,
            amount: parseFloat(formState.amount),
            date: new Date(formState.date),
        };

        const action = isEditing
            ? ExpensesActionType.EDIT_EXPENSE
            : ExpensesActionType.ADD_EXPENSE;

        const isAmountValid = !isNaN(updatedExpenseDetails.amount);
        const isDateValid = !isNaN(updatedExpenseDetails.date.getTime());
        const isTitleValid = updatedExpenseDetails.title.trim().length > 0;

        const allFieldsValid = isAmountValid && isDateValid && isTitleValid;

        if (!isAmountValid) {
            setError({ isError: true, message: "Amount is invalid" });
            return;
        }
        if (!isDateValid) {
            setError({ isError: true, message: "Date is invalid" });
            return;
        }
        if (!isTitleValid) {
            setError({ isError: true, message: "Title is invalid" });
            return;
        }
        if (allFieldsValid && !isEditing) {
            // dispatch({ type: action, payload: updatedExpenseDetails });
            addExpense(updatedExpenseDetails);
            navigation.goBack();
        }
    };

    return (
        <View style={[styles.container, style]}>
            {isError && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error.message}</Text>
                </View>
            )}
            <View style={styles.dateAmountContainer}>
                <Input
                    label="Amount"
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        placeholder: "0.00",
                    }}
                    value={formState.amount}
                    setValue={handleChange.bind(this, ExpenseFieldsType.AMOUNT)}
                    inputStyles={{ flex: 1 }}
                />
                <Input
                    label="Date"
                    textInputConfig={{ placeholder: "YY-MM-DD" }}
                    value={formState.date}
                    setValue={handleChange.bind(this, ExpenseFieldsType.DATE)}
                    inputStyles={{ flex: 1 }}
                />
            </View>

            <Input
                label="Title"
                textInputConfig={{
                    keyboardType: "default",
                    multiline: true,
                }}
                value={formState.title}
                setValue={handleChange.bind(this, ExpenseFieldsType.TITLE)}
            />

            <View style={styles.buttonContainer}>
                <Button mode="outlined" onPress={handleCancel}>
                    Cancel
                </Button>
                <Button mode="contained" onPress={handleUpsert}>
                    {isEditing ? "Update" : "Add"}
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    dateAmountContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginTop: 24,
        marginBottom: 12,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary50,
    },
    errorContainer: {
        backgroundColor: COLORS.error500,
        padding: 12,
        marginVertical: 12,
        borderRadius: 5,
    },
    errorText: {
        color: "white",
    },
});

export default ManageExpenseForm;