import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";

const ExpenseSummary = ({ summaryText, summaryAmount }) => {
  return (
    <View style={styles.expenseSummaryContainer}>
      <Text style={styles.summaryText}>{summaryText}</Text>
      <Text style={styles.summaryAmount}>${summaryAmount}</Text>
    </View>
  );
};

export default ExpenseSummary;

const styles = StyleSheet.create({
  expenseSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.purple100,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  summaryText: {
    color: colors.purple600,
    fontSize: 14,
  },
  summaryAmount: {
    color: colors.purple600,
    fontSize: 16,
    fontWeight: "bold",
  },
});
