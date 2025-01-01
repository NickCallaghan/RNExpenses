import React from "react";
import { View, Text, StyleSheet, ViewProps, Pressable } from "react-native";
import { COLORS } from "../constants/Colors";

import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps extends ViewProps {
    onPress: () => void;
    name: any;
    size: number;
    color: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
    style,
    onPress,
    children,
    name,
    size,
    color,
}) => {
    return (
        <View style={[style]}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    styles.container,
                    pressed && styles.pressed,
                ]}
            >
                <Ionicons name={name} size={size} color={color} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 6,
        marginVertical: 6,
        paddingVertical: 10,
        borderRadius: 3,
    },

    pressed: {
        opacity: 0.5,
    },
});

export default IconButton;
