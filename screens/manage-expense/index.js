import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/button";
import { useContext, useLayoutEffect, useState } from "react";
import { ExpensesContext } from "../../store/expenses-context";
import Input from "../../components/input";
import { colors } from "../../constants/colors";

const ManageExpense = ({ navigation }) => {
  const routes = useRoute();
  const { addExpense, updateExpense, expenses } = useContext(ExpensesContext);

  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmt, setExpenseAmt] = useState("");

  const isEditing = routes?.params?.title === "Edit Expense";

  const handleChangeText = (value) => {
    setExpenseTitle(value);
  };

  const handleChangeAmt = (value) => {
    setExpenseAmt(value);
  };

  const handleCancel = () => {
    navigation?.goBack();
  };

  const handleSubmit = () => {
    const isAmountValid = !isNaN(expenseAmt) && Number(expenseAmt) > 0;
    const isTitleValid = expenseAmt?.trim()?.length > 0;

    if (isAmountValid && isTitleValid) {
      if (isEditing) {
        updateExpense(routes?.params?.expenseId, {
          amount: expenseAmt,
          title: expenseTitle,
        });
      } else {
        addExpense({ amount: expenseAmt, title: expenseTitle });
      }
      navigation?.goBack();
    }
  };

  useLayoutEffect(() => {
    if (isEditing) {
      const expenseToUpdate = expenses?.find(
        (expense) => expense?.id === routes?.params?.expenseId
      );

      setExpenseTitle(expenseToUpdate?.title);
      setExpenseAmt(expenseToUpdate?.amount);
    }
  }, [isEditing]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Your Expense</Text>
        <Input
          label={"Expense"}
          textInputConfig={{
            value: expenseTitle,
            onChangeText: handleChangeText,
          }}
        />
        <Input
          label={"Amount"}
          textInputConfig={{
            value: expenseAmt,
            onChangeText: handleChangeAmt,
            inputMode: "numeric",
          }}
        />
        <View style={styles.actionButtonsContainer}>
          <Button mode={"flat"} onPress={handleCancel}>
            Cancel
          </Button>
          <Button onPress={handleSubmit}>
            {isEditing ? "Edit" : "Add"} Expense
          </Button>
        </View>
      </View>
    </View>
  );
};
export default ManageExpense;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.purple600,
  },
  innerContainer: {
    marginTop: 60,
  },
  title: {
    color: colors.grey100,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 14,
    fontSize: 16,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
});
