export type Expense = {
    id: string;
    title: string;
    amount: number;
    date: Date;
};

export type NewExpense = {
    title: string;
    amount: number;
    date: Date;
};
