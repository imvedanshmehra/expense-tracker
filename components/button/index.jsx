import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";

const Button = ({ children, mode, onPress, style }) => {
  return (
    <View style={style}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <View style={[styles.button, mode === "flat" && styles.flatButton]}>
          <Text
            style={[
              styles.buttonText,
              mode === "flat" && styles.flatButtonText,
            ]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple100,
    borderRadius: 4,
  },
  flatButton: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    padding: 12,
  },
  flatButtonText: {
    color: colors.purple100,
  },
  pressed: {
    opacity: 0.75,
  },
});
