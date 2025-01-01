import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { COLORS } from "../constants/Colors";
import { useRoute, useNavigation } from "@react-navigation/native";

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

    return (
        <View style={[styles.container, style]}>
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
        backgroundColor: COLORS.primary700,
    },
});

export default AllExpensesScreen;
