import React, {
    useEffect,
    createContext,
    useReducer,
    useContext,
    ReactNode,
    useState,
} from "react";
import { Expense, NewExpense } from "../types/expense";
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
} from "firebase/firestore";

import { db } from "./firebase";

type ExpensesContext = {
    expenses: Expense[];
    addExpense: (expense: NewExpense) => void;
    updateExpense: (expense: Expense) => void;
};

const initialState: ExpensesContext = {
    expenses: [],
    addExpense: () => {},
    updateExpense: () => {},
};

const ExpensesContext = createContext<ExpensesContext>(initialState);

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
    const [expenses, setExpenses] = useState([] as Expense[]);

    const addExpense = async (expense: NewExpense) => {
        try {
            const docRef = await addDoc(collection(db, "expenses"), expense);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const updateExpense = async (expense: Expense) => {};

    useEffect(() => {
        // Firestore query for real time updates
        const q = query(collection(db, "expenses"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            //TODO: Fix any type
            const expenses: any = [];
            querySnapshot.forEach((doc) => {
                expenses.push({ id: doc.id, ...doc.data() });
            });
            console.log("Expenses: ", expenses);
            setExpenses(expenses);
        });
        // Stop listening to changes
        return () => unsubscribe();
    }, []);

    return (
        <ExpensesContext.Provider
            value={{ expenses, addExpense, updateExpense }}
        >
            {children}
        </ExpensesContext.Provider>
    );
};

export const useExpenses = () => {
    const context = useContext(ExpensesContext);
    if (!context) {
        throw new Error("useExpenses must be used within an ExpensesProvider");
    }
    return context;
};
