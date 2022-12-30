import { StatusBar } from "expo-status-bar";
import {
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

export default function App() {
  // state 만들기
  const [todos, setTodos] = useState([]);
  const [tag, setTag] = useState("js"); // 기본 setting: js (tag: js / react / coding test)
  const [text, setText] = useState("");

  // new todo
  const newTodo = {
    id: Date.now(),
    text,
    isDone: false,
    isEdit: false,
    tag,
  };

  // add Todo
  const addTodo = () => {
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  // Set Done (완료 toggling)
  const setDone = (id) => {
    // id를 매개변수로 받아 완료하고 싶은 배열의 요소 찾기
    // 배열의 요소의 isDone 값을 토글링한 후에 setTodos
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isDone = !newTodos[idx].isDone;
    setTodos(newTodos);
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style="auto" />
      <View style={styles.safearea}>
        {/* Button 3개 (범위 나누기) */}
        <View style={styles.TagBtnList}>
          <TouchableOpacity
            onPress={() => setTag("js")}
            style={{
              ...styles.TagBtn,
              backgroundColor: tag === "js" ? "#0FBCF9" : "lightgrey",
            }}
          >
            <Text>JavaScript</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTag("react")}
            style={{
              ...styles.TagBtn,
              backgroundColor: tag === "react" ? "#0FBCF9" : "lightgrey",
            }}
          >
            <Text>React</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTag("ct")}
            style={{
              ...styles.TagBtn,
              backgroundColor: tag === "ct" ? "#0FBCF9" : "lightgrey",
            }}
          >
            <Text>Coding Test</Text>
          </TouchableOpacity>
        </View>
        {/* TextInput 창 */}
        <View style={styles.InputBox}>
          <TextInput
            onSubmitEditing={addTodo}
            onChangeText={setText}
            value={text}
            style={styles.TodoInput}
            placeholder="Enter your task"
          />
        </View>
        {/* Todo List (Todo Item 여러개) */}
        <ScrollView>
          {todos.map((todo) => {
            if (tag === todo.tag) {
              return (
                <View key={todo.id} style={styles.TodoItem}>
                  <Text
                    style={{
                      textDecorationLine: todo.isDone ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => setDone(todo.id)}>
                      <AntDesign name="checksquare" size={24} color="black" />
                    </TouchableOpacity>
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
              );
            }
          })}
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
