import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Expense } from "../types/expense";

import { dummyExpenses } from "../data/data";

type ExpensesState = {
    expenses: Expense[];
};

export enum ExpensesActionType {
    ADD_EXPENSE = "ADD_EXPENSE",
    EDIT_EXPENSE = "EDIT_EXPENSE",
    REMOVE_EXPENSE = "REMOVE_EXPENSE",
}

type ExpensesAction =
    | { type: ExpensesActionType.ADD_EXPENSE; payload: Expense }
    | { type: ExpensesActionType.EDIT_EXPENSE; payload: Expense }
    | { type: ExpensesActionType.REMOVE_EXPENSE; payload: string };

const initialState: ExpensesState = {
    expenses: dummyExpenses,
};

const ExpensesContext = createContext<{
    state: ExpensesState;
    dispatch: React.Dispatch<ExpensesAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

const expensesReducer = (
    state: ExpensesState,
    action: ExpensesAction
): ExpensesState => {
    switch (action.type) {
        case ExpensesActionType.ADD_EXPENSE:
            return { ...state, expenses: [...state.expenses, action.payload] };
        case ExpensesActionType.EDIT_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.map((expense) =>
                    expense.id === action.payload.id ? action.payload : expense
                ),
            };
        case ExpensesActionType.REMOVE_EXPENSE:
            console.log({ delete: action.payload });
            return {
                ...state,
                expenses: state.expenses.filter(
                    (expense) => expense.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(expensesReducer, initialState);

    return (
        <ExpensesContext.Provider value={{ state, dispatch }}>
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
