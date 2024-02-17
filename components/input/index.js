import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../constants/colors";

const Input = ({ label, textInputConfig }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 12,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    color: colors.grey100,
    marginVertical: 4,
  },
  input: {
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    backgroundColor: colors.purple100,
    borderWidth: 1,
    borderColor: colors.grey100,
    color: colors.purple600,
  },
});
