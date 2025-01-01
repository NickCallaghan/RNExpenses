import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { COLORS } from "../constants/Colors";
import { template } from "@babel/core";

interface ExepenseTotalProps extends ViewProps {
    amount: number;
    text: string;
}

export const ExepenseTotal: React.FC<ExepenseTotalProps> = ({
    style,
    amount,
    text,
}) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.amount}>£{amount.toString()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: COLORS.accent500,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 16,
    },
    text: {
        color: COLORS.primary700,
        fontSize: 20,
    },
    amount: {
        color: COLORS.primary700,
        fontSize: 20,
    },
});

export default ExepenseTotal;
