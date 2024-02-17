const { View, StyleSheet, Text } = require("react-native");
import ExpenseCard from "../../components/expense-card";
import ExpenseSummary from "../../components/expense-summary";
import BottomDrawer from "../../components/bottom-drawer";
import { useContext } from "react";
import { ExpensesContext } from "../../store/expenses-context";
import dayjs from "dayjs";

const RecentExpenses = () => {
  const { expenses } = useContext(ExpensesContext) ?? [];

  const recentExpenses = expenses?.filter(
    (expense) => dayjs(expense?.date)?.diff(dayjs(expense?.date), "day") <= 7
  );

  const totalExpenseAmount = recentExpenses?.reduce(
    (a, b) => Number(a) + Number(b?.amount),
    0
  );

  return (
    <View style={styles.rootContainer}>
      <BottomDrawer />
      <ExpenseSummary
        summaryText={"Last 7 Days"}
        summaryAmount={totalExpenseAmount}
      />
      {!recentExpenses?.length ? (
        <View style={styles.summaryTextContainer}>
          <Text style={styles.summaryText}>
            You don't have any expenses yet.
          </Text>
        </View>
      ) : (
        <ExpenseCard expenses={recentExpenses} />
      )}
    </View>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
  },
  headerIcon: {
    marginRight: 8,
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
});
