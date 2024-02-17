const { View, StyleSheet, Text } = require("react-native");
import { useContext, useEffect, useState } from "react";
import ExpenseCard from "../../components/expense-card";
import ExpenseSummary from "../../components/expense-summary";
import { ExpensesContext } from "../../store/expenses-context";

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);

  const allExpenses = expenses ?? [];

  const totalExpenseAmount = allExpenses?.reduce(
    (a, b) => Number(a) + Number(b?.amount),
    0
  );

  return (
    <View style={styles.rootContainer}>
      <ExpenseSummary
        summaryText={"Total Expenses"}
        summaryAmount={totalExpenseAmount}
      />
      {!expenses?.length ? (
        <View style={styles.summaryTextContainer}>
          <Text style={styles.summaryText}>
            You don't have any expenses yet.
          </Text>
        </View>
      ) : (
        <ExpenseCard expenses={expenses} />
      )}
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
  },
  summaryTextContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 12,
  },
  summaryText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  headerIcon: {
    marginRight: 8,
  },
});
