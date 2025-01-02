import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";

interface EmptyMessageProps extends ViewProps {
    text: string;
}

export const EmptyMessage: React.FC<EmptyMessageProps> = ({ style, text }) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.messageText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    messageText: {
        maxWidth: "60%",
        color: "white",
        fontSize: 24,
        textAlign: "center",
    },
});

export default EmptyMessage;
