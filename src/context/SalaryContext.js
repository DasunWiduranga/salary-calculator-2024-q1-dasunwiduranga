import React, { createContext, useReducer } from 'react';

const initialState = {
  basicSalary: 0,
  earnings: [],
  deductions: [],
};

const SalaryContext = createContext(initialState);

const salaryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BASIC_SALARY':
      return { ...state, basicSalary: parseFloat(action.payload) };
    case 'ADD_EARNING':
      return { ...state, earnings: [...state.earnings, action.payload] };
    case 'REMOVE_EARNING':
      return { ...state, earnings: state.earnings.filter(e => e.id !== action.payload) };
    case 'ADD_DEDUCTION':
      return { ...state, deductions: [...state.deductions, action.payload] };
    case 'REMOVE_DEDUCTION':
      return { ...state, deductions: state.deductions.filter(d => d.id !== action.payload) };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const SalaryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(salaryReducer, initialState);
  return (
    <SalaryContext.Provider value={{ state, dispatch }}>
      {children}
    </SalaryContext.Provider>
  );
};

export { SalaryContext, SalaryProvider };
