import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "./screens/all-expenses";
import RecentExpenses from "./screens/recent-expenses";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./constants/colors";
import IconButton from "./components/icon-button";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExpense from "./screens/manage-expense";
import ExpensesContextProvider from "./store/expenses-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ExpenseOverView = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.purple500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: colors.purple500,
        },
        tabBarActiveTintColor: colors.yellow100,
        tabBarInactiveTintColor: "#f1f1f1",
        headerRight: ({ tintColor }) => (
          <IconButton
            icon={"add"}
            color={tintColor}
            size={24}
            onPress={() =>
              navigation.navigate("ManageExpense", { title: "Add Expense" })
            }
          />
        ),
      })}
      sceneContainerStyle={{
        backgroundColor: colors.purple600,
      }}
    >
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
          headerTitle: "Recent Expenses",
          headerTitleAlign: "left",
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.purple500,
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpenseOverView"
              component={ExpenseOverView}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={({ route }) => ({
                title: route?.params?.title,
                presentation: "modal",
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </GestureHandlerRootView>
  );
}
