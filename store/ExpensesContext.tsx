import {
    addDoc,
    doc,
    collection,
    onSnapshot,
    query,
    getDoc,
} from "firebase/firestore";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Expense, NewExpense } from "../types/expense";

import { db } from "./firebase";

const EXPENSES_COLLECTION = "expenses";

type ExpensesContext = {
    expenses: Expense[];
    addExpense: (expense: NewExpense) => void;
    updateExpense: (expense: Expense) => void;
    getExpense: (id: string) => any; // TODO: Define return type
};

const initialState: ExpensesContext = {
    expenses: [],
    addExpense: () => {},
    updateExpense: () => {},
    getExpense: () => ({} as Expense),
};

const ExpensesContext = createContext<ExpensesContext>(initialState);

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
    const [expenses, setExpenses] = useState([] as Expense[]);

    const addExpense = async (expense: NewExpense) => {
        try {
            const docRef = await addDoc(
                collection(db, EXPENSES_COLLECTION),
                expense
            );
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const getExpense = async (id: string) => {
        const docRef = doc(db, EXPENSES_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            const data = docSnap.data();

            return {
                id: docSnap.id,
                title: data.title,
                amount: data.amount,
                date: new Date(data.date), // TODO: Handle date conversion
            };
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    };

    const updateExpense = async (expense: Expense) => {};

    useEffect(() => {
        // Firestore query for real time updates
        const q = query(collection(db, EXPENSES_COLLECTION));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const expenses: Expense[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                expenses.push({
                    id: doc.id,
                    title: data.title,
                    amount: data.amount,
                    date: data.date,
                });
            });
            setExpenses(expenses);
        });
        // Stop listening to changes
        return () => unsubscribe();
    }, []);

    return (
        <ExpensesContext.Provider
            value={{ expenses, addExpense, updateExpense, getExpense }}
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
