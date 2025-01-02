import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "./constants/Colors";

import Ionicons from "@expo/vector-icons/Ionicons";

import AllExpensesScreen from "./screens/AllExpensesScreen";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import ManageExpense from "./screens/ManageExpense";

import { ExpensesProvider } from "./store/ExpensesContext";

// Define the types for your navigation parameters
type RootStackParamList = {
    Expenses: undefined;
    ManageExpense: { itemId: string };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const TabNavigator = () => {
    const navigation = useNavigation<any>();
    return (
        <Tab.Navigator
            screenOptions={{
                headerRight: () => (
                    <Pressable
                        onPress={() => navigation.navigate("ManageExpense")}
                    >
                        <Ionicons
                            name="add"
                            size={24}
                            color="white"
                            style={{ marginHorizontal: 12 }}
                        />
                    </Pressable>
                ),
                headerStyle: {
                    backgroundColor: COLORS.primary500,
                },
                headerTintColor: "white",
                tabBarStyle: {
                    backgroundColor: COLORS.primary500,
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: COLORS.accent500,
            }}
        >
            <Tab.Screen
                name="RecentExpenses"
                component={RecentExpensesScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="timer"
                            size={24}
                            color={focused ? "white" : COLORS.accent500}
                        />
                    ),
                    title: "Recent Expenses",
                }}
            />
            <Tab.Screen
                name="AllExpenses"
                component={AllExpensesScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="calendar"
                            size={24}
                            color={focused ? "white" : COLORS.accent500}
                        />
                    ),
                    title: "All Expenses",
                }}
            />
        </Tab.Navigator>
    );
};

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <ExpensesProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Expenses"
                            component={TabNavigator}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="ManageExpense"
                            component={ManageExpense}
                            options={{
                                title: "Manage Expense",
                                headerStyle: {
                                    backgroundColor: COLORS.primary500,
                                },
                                headerTintColor: "white",
                                presentation: "modal",
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ExpensesProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
