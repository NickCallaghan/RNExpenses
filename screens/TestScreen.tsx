import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import Button from "../components/Button";

interface TestScreenProps extends ViewProps {
    // Add your custom props here
}

export const TestScreen: React.FC<TestScreenProps> = ({ style }) => {
    const [date, setDate] = React.useState(new Date());

    const handleAddExpense = () => {};

    return (
        <View style={[styles.container, style]}>
            <View
                style={{
                    gap: 20,
                }}
            >
                <Button onPress={handleAddExpense} mode="contained">
                    This Does Nothing
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default TestScreen;
