import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ViewProps,
    TextInput,
    TextInputProps,
    StyleProp,
    ViewStyle,
} from "react-native";

import { COLORS } from "../constants/Colors";

interface InputProps extends ViewProps {
    label: string;
    textInputConfig?: TextInputProps;
    value: string;
    setValue: (value: string) => void;
    inputStyles?: StyleProp<ViewStyle>;
}

export const Input: React.FC<InputProps> = ({
    style,
    textInputConfig: textInputProps,
    label,
    value,
    setValue,
    inputStyles,
}) => {
    return (
        <View style={[styles.container, inputStyles]}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={[
                    styles.textInput,
                    textInputProps?.multiline && styles.multiline,
                ]}
                value={value}
                onChangeText={setValue}
                {...textInputProps}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Add your styles here
    },
    inputLabel: {
        color: COLORS.primary50,
        fontSize: 16,
    },
    textInput: {
        backgroundColor: COLORS.primary50,
        padding: 10,
        borderRadius: 5,
        width: "100%",
        color: COLORS.primary500,
        marginBottom: 12,
        marginTop: 4,
    },
    multiline: {
        minHeight: 100,
        textAlignVertical: "top",
    },
});

export default Input;
