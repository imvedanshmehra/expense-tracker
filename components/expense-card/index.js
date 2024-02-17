import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Swipeable } from "react-native-gesture-handler";
import IconButton from "../icon-button";
import { useContext } from "react";
import { ExpensesContext } from "../../store/expenses-context";

const ExpenseCard = ({ expenses }) => {
  const navigation = useNavigation();
  const { deleteExpense } = useContext(ExpensesContext);

  const handleDeleteExpense = (expenseId) => {
    deleteExpense(expenseId);
  };

  const rightSwipe = (expenseId) => {
    return (
      <View style={styles.deleteActionContainer}>
        <IconButton
          icon="trash-bin"
          color={"white"}
          size={24}
          onPress={() => handleDeleteExpense(expenseId)}
        />
      </View>
    );
  };

  let rowRefs = new Map();

  const renderItem = ({ item }) => {
    return (
      <Swipeable
        ref={(ref) => {
          if (ref && !rowRefs.get(item.id)) {
            rowRefs.set(item.id, ref);
          }
        }}
        renderRightActions={() => rightSwipe(item?.id)}
        overshootRight={false}
        // Open only one swipeable item at once
        onSwipeableWillOpen={() => {
          [...rowRefs.entries()].forEach(([id, ref]) => {
            if (id !== item.id && ref) ref.close();
          });
        }}
      >
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.innerContainer, styles.pressed]
              : styles.innerContainer
          }
          onPress={() => handleOnExpenseCardPress(item?.id)}
        >
          <View>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.date}>
              {dayjs(item?.date)?.format("YYYY-MM-DD hh:mm:a")}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>${item?.amount}</Text>
          </View>
        </Pressable>
      </Swipeable>
    );
  };

  const handleOnExpenseCardPress = (expenseId) => {
    navigation.navigate("ManageExpense", {
      title: "Edit Expense",
      expenseId: expenseId,
    });
  };
  return (
    <View style={styles.rootContainer}>
      <FlatList
        keyExtractor={(item) => item?.id}
        data={expenses}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.purple500,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  pressed: {
    opacity: 0.75,
  },
  title: {
    color: colors.white100,
    fontWeight: "bold",
    fontSize: 14,
  },
  date: {
    color: colors.white100,
    fontSize: 12,
  },
  amountContainer: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 8,
    borderRadius: 4,
    width: 80,
  },
  amountText: {
    color: colors.purple500,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  deleteActionContainer: {
    backgroundColor: colors?.danger100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
});
