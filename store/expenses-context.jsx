import { createContext, useReducer } from "react";
import uuid from "react-native-uuid";

const initialValue = {
  expenses: [],
  addExpense: ({ amount, title }) => {},
  updateExpense: (id, { amount, title }) => {},
  deleteExpense: (id) => {},
};

export const ExpensesContext = createContext(initialValue);

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        { ...action?.payload, id: uuid.v4(), date: new Date() },
        ...state,
      ];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload?.data }
          : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const value = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
