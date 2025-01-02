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
