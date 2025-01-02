import React from "react";
import { View, Text, StyleSheet, ViewProps, Pressable } from "react-native";
import { COLORS } from "../constants/Colors";

interface ButtonProps extends ViewProps {
    onPress: () => void;
    mode: "contained" | "outlined";
}

export const Button: React.FC<ButtonProps> = ({
    style,
    onPress,
    children,
    mode,
}) => {
    return (
        <View style={[style, styles.container]}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    styles.button,
                    mode === "outlined" && styles.outlineButton,
                    pressed && styles.pressed,
                ]}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        borderRadius: 3,
    },
    button: {
        backgroundColor: COLORS.primary500,
        padding: 10,
        borderRadius: 5,
        width: "100%",
    },
    buttonText: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
    },
    outlineButton: {
        backgroundColor: "transparent",
        borderColor: COLORS.primary50,
        borderWidth: 1,
    },
    pressed: {
        opacity: 0.5,
    },
});

export default Button;
