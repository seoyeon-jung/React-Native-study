import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

export default function TagList({ setCategory, tag }) {
  return (
    <View style={styles.tags}>
      <TouchableOpacity
        onPress={() => setCategory("js")}
        style={{
          ...styles.tag,
          backgroundColor: tag === "js" ? "#0FBCF9" : "grey",
        }}
      >
        <Text style={styles.tagText}>Javascript</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCategory("react")}
        style={{
          ...styles.tag,
          backgroundColor: tag === "react" ? "#0FBCF9" : "grey",
        }}
      >
        <Text style={styles.tagText}>React</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCategory("ct")}
        style={{
          ...styles.tag,
          backgroundColor: tag === "ct" ? "#0FBCF9" : "grey",
        }}
      >
        <Text style={styles.tagText}>Coding Test</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tags: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tag: {
    backgroundColor: "#0FBCF9",
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "30%",
    alignItems: "center",
  },
  tagText: {
    fontWeight: "600",
  },
});
