import React, {
    useEffect,
    createContext,
    useReducer,
    useContext,
    ReactNode,
    useState,
} from "react";
import { Expense } from "../types/expense";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "../hooks/useFirebase";

type ExpensesState = {
    expenses: Expense[];
};

const initialState: ExpensesState = {
    expenses: [],
};

const ExpensesContext = createContext<{
    expenses: ExpensesState;
}>({
    expenses: initialState,
});

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
    const [expenses, setExpenses] = useState(initialState);

    useEffect(() => {
        // Firestore query for real time updates
        const q = query(collection(db, "expenses"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            //TODO: Fix any type
            const expenses: any = [];
            querySnapshot.forEach((doc) => {
                expenses.push({ id: doc.id, ...doc.data() });
            });
            setExpenses({ expenses });
        });
        // Stop listening to changes
        return () => unsubscribe();
    }, []);

    const state = { expenses: expenses.expenses };

    return (
        <ExpensesContext.Provider value={{ expenses: state }}>
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
