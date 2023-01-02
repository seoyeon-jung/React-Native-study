import { StatusBar } from "expo-status-bar";
import {
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // state 만들기
  const [todos, setTodos] = useState([]);
  const [tag, setTag] = useState(""); // 기본 setting: js (tag: js / react / coding test)
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");

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

  // delete Todo
  const deleteTodo = (id) => {
    // 1. id 값을 받아서 해당 배열 요소를 제외한 나머지를 새로운 배열로 받는다.
    // 2. setTodos
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          const newTodos = todos.filter((todo) => todo.id !== id);
          setTodos(newTodos);
        },
      },
    ]);
  };

  // setedit
  const setEdit = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isEdit = !newTodos[idx].isEdit;
    setTodos(newTodos);
  };

  // edit todo
  const editTodo = (id) => {
    // id 값 받아서 해당 배열 요소를 찾아 그 해당 배열만 수정하기
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].text = editText;
    newTodos[idx].isEdit = false;
    setTodos(newTodos);
  };

  const setCategory = async (cat) => {
    //console.log("cat:", cat);
    setTag(cat);
    await AsyncStorage.setItem("category", cat);
  };

  useEffect(() => {
    // 현재의 최신 todos를 AsyncStorage에 저장
    const saveTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    };
    if (todos.length > 0) saveTodos();
  }, [todos]);

  useEffect(() => {
    const getData = async () => {
      const resp_todos = await AsyncStorage.getItem("todos"); // todos 배열
      const resp_cat = await AsyncStorage.getItem("category"); // undefined / null

      setTodos(JSON.parse(resp_todos) ?? []);
      setCategory(resp_cat ?? "js");
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style="auto" />
      {/* Button 3개 (범위 나누기) */}
      <View style={styles.container}>
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
        {/* TextInput 창 */}
        <View style={styles.inputBox}>
          <TextInput
            onSubmitEditing={addTodo}
            onChangeText={setText}
            value={text}
            placeholder="Enter your task"
            style={styles.TodoInput}
          />
        </View>
        {/* Todo List (Todo Item 여러개) */}
        <ScrollView>
          {todos.map((todo) => {
            if (tag === todo.tag) {
              return (
                <View key={todo.id} style={styles.todoItem}>
                  {todo.isEdit ? (
                    <TextInput
                      onSubmitEditing={() => editTodo(todo.id)}
                      onChangeText={setEditText}
                      value={editText}
                      style={{ backgroundColor: "white", flex: 1 }}
                    />
                  ) : (
                    <Text
                      style={{
                        textDecorationLine: todo.isDone
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.text}
                    </Text>
                  )}

                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => setDone(todo.id)}>
                      <AntDesign name="checksquare" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setEdit(todo.id)}>
                      <Feather
                        style={{ marginLeft: 10 }}
                        name="edit"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
                      <AntDesign
                        style={{ marginLeft: 10 }}
                        name="delete"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
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
  inputBox: {
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
  todoItem: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
