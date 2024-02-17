import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ icon, color, size, style, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} color={color} size={size} style={style} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  iconContainer: {
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
