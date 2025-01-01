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
        <View style={[style]}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    styles.container,
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
        backgroundColor: COLORS.primary500,
        paddingHorizontal: 6,
        marginVertical: 6,
        paddingVertical: 10,
        borderRadius: 3,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    outlineButton: {
        backgroundColor: "transparent",
        borderColor: COLORS.primary500,
        borderWidth: 2,
    },
    pressed: {
        opacity: 0.5,
    },
});

export default Button;
