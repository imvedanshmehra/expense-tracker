import { Modal, View, Text, StyleSheet, Dimensions } from "react-native";

const BottomDrawer = ({ isOpen = false, handleClose }) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={handleClose}
      >
        <View style={[styles.bottomSheet, { height: windowHeight * 0.6 }]}>
          <View
            style={{
              flex: 0,
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          ></View>
          <Text>Hello world</Text>
        </View>
      </Modal>
    </View>
  );
};

export default BottomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
    borderWidth: 1,
    borderColor: "red",
  },
});
