import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SettingsGroupItem = (props) => {

  return (
    <View>
      <Text style={styles.groupItem}>
        {props.content.item.name}
      </Text>
    </View>
  );
};

export default SettingsGroupItem;

const styles = StyleSheet.create({
  groupItem: {
    color: "black",
    fontWeight: "bold",
  },
});
