import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { COLORS } from "../constants/Colors";

import IconButton from "../components/IconButton";
import ManageExpenseForm from "../components/ManageExpenseForm";

interface AllExpensesScreenProps extends ViewProps {
    // Add your custom props here
}

export const AllExpensesScreen: React.FC<AllExpensesScreenProps> = ({
    style,
}) => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const isEditing = route.params?.itemId !== undefined;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    const handleDelete = () => {
        //TODO: Implement delete functionality
        navigation.goBack();
    };

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>Expense Details</Text>

            <ManageExpenseForm
                isEditing={isEditing}
                itemId={route.params?.itemId}
            />

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
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: COLORS.primary800,
        paddingTop: 24,
        paddingHorizontal: 18,
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
    },
});

export default AllExpensesScreen;
