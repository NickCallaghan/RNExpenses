import axios from "axios";
import { Expense, NewExpense } from "../types/expense";

import { initializeApp } from "firebase/app";
import { DocumentData, getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

import FIREBASE_CONFIG from "../.env.local/firebase";

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export function useFirebase() {
    const url = "https://rncourse-cd9c9-default-rtdb.firebaseio.com/";

    const addExpense = async (expense: NewExpense) => {
        try {
            const docRef = await addDoc(collection(db, "expenses"), expense);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const getExpenses = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "expenses"));
            const expenses: Expense[] = [];
            // querySnapshot.forEach((doc) => {
            //     const data = doc.data();

            //     const expenseObj = {
            //         id: doc.id,
            //         title: data.title,
            //         amount: data.amount,
            //         date: new Date(data.date),
            //     };
            //     expenses.push(expenseObj);
            // });
            // console.log({ expenses });
            return expenses;
        } catch (error) {
            console.error(error);
        }
    };

    return { addExpense, getExpenses };
}
