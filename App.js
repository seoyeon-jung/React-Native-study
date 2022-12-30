import { StatusBar } from "expo-status-bar";
import {
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function App() {
  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style="auto" />
      <View style={styles.safearea}>
        {/* Button 3개 (범위 나누기) */}
        <View style={styles.TagBtnList}>
          <View style={styles.TagBtn}>
            <Text>JavaScript</Text>
          </View>
          <View style={styles.TagBtn}>
            <Text>React</Text>
          </View>
          <View style={styles.TagBtn}>
            <Text>Coding Test</Text>
          </View>
        </View>
        {/* TextInput 창 */}
        <View style={styles.InputBox}>
          <TextInput style={styles.TodoInput} placeholder="Enter your task" />
        </View>
        {/* Todo List (Todo Item 여러개) */}
        <ScrollView>
          <View style={styles.TodoItem}>
            <Text>신나는 실행 컨텍스트 공부</Text>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="checksquare" size={24} color="black" />
              <Feather
                style={{ marginLeft: 10 }}
                name="edit"
                size={24}
                color="black"
              />
              <AntDesign
                style={{ marginLeft: 10 }}
                name="delete"
                size={24}
                color="black"
              />
            </View>
          </View>
          <View style={styles.TodoItem}>
            <Text>너무 좋은 ES6 최신문법 공부</Text>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="checksquare" size={24} color="black" />
              <Feather
                style={{ marginLeft: 10 }}
                name="edit"
                size={24}
                color="black"
              />
              <AntDesign
                style={{ marginLeft: 10 }}
                name="delete"
                size={24}
                color="black"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  TagBtnList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TagBtn: {
    backgroundColor: "lightgray",
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "30%",
    alignItems: "center",
  },
  InputBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  TodoInput: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  TodoItem: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
