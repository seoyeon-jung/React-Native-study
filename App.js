import { StatusBar } from "expo-status-bar";
import {
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TagList from "./components/TagList";
import Todo from "./components/Todo";

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
      <View style={styles.container}>
        {/* Button 3개 (범위 나누기) */}
        <TagList setCategory={setCategory} tag={tag} />
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
                <Todo
                  key={todo.id}
                  todo={todo}
                  editTodo={editTodo}
                  setDone={setDone}
                  setEdit={setEdit}
                  setEditText={setEditText}
                  deleteTodo={deleteTodo}
                />
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
  inputBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginTop: 15,
    marginBottom: 15,
  },
});
