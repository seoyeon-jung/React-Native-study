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
//import AsyncStorage from "@react-native-async-storage/async-storage";
import TagList from "./components/TagList";
import Todo from "./components/Todo";
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { dbService } from "./firebase";

export default function App() {
  // state 만들기
  const [todos, setTodos] = useState([]);
  const [tag, setTag] = useState(""); // 기본 setting: js (tag: js / react / coding test)
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");

  // new todo
  const newTodo = {
    //id: Date.now(),
    text,
    isDone: false,
    isEdit: false,
    tag,
    createdAt: Date.now(),
  };

  // add Todo
  const addTodo = async () => {
    // setTodos((prev) => [...prev, newTodo]);

    // 바로 database에 변화를 주기만하면 onSnapshot이 인지를 해서 setTodos를 해주기 때문에
    // setTodos를 일일히 해줄 필요가 없어졌다.
    // addDoc은 collection만 지정하면 된다 (document id는 자동으로 랜덤생성)
    await addDoc(collection(dbService, "todos"), newTodo); // todos는 자동으로 생성되니 미리 만들 필요 X
    setText("");
  };

  // Set Done (완료 toggling)
  const setDone = async (id) => {
    // id를 매개변수로 받아 완료하고 싶은 배열의 요소 찾기
    // 배열의 요소의 isDone 값을 토글링한 후에 setTodos
    // const newTodos = [...todos];
    // const idx = newTodos.findIndex((todo) => todo.id === id);
    // newTodos[idx].isDone = !newTodos[idx].isDone;
    // setTodos(newTodos);

    const idx = todos.findIndex((todo) => todo.id === id);
    await updateDoc(doc(dbService, "todos", id), {
      isDone: !todos[idx].isDone,
    });
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
        onPress: async () => {
          // const newTodos = todos.filter((todo) => todo.id !== id);
          // setTodos(newTodos);

          // 특정 document id값만 알면 삭제 가능
          // deleteDoc 이용
          await deleteDoc(doc(dbService, "todos", id));
        },
      },
    ]);
  };

  // setedit
  const setEdit = async (id) => {
    // const newTodos = [...todos];
    // const idx = newTodos.findIndex((todo) => todo.id === id);
    // newTodos[idx].isEdit = !newTodos[idx].isEdit;
    // setTodos(newTodos);

    // updateDoc API 이용 (false -> true로 isEdit이 바뀐다)
    // index 값은 알아야 한다
    const idx = todos.findIndex((todo) => todo.id === id);
    await updateDoc(doc(dbService, "todos", id), {
      isEdit: !todos[idx].isEdit,
    });
  };

  // edit todo
  const editTodo = async (id) => {
    // id 값 받아서 해당 배열 요소를 찾아 그 해당 배열만 수정하기
    // const newTodos = [...todos];
    // const idx = newTodos.findIndex((todo) => todo.id === id);
    // newTodos[idx].text = editText;
    // newTodos[idx].isEdit = false;
    // setTodos(newTodos);

    // updateDoc API 이용
    await updateDoc(doc(dbService, "todos", id), {
      text: editText,
      isEdit: false,
    });
  };

  const setCategory = async (cat) => {
    //console.log("cat:", cat);
    setTag(cat);
    // await AsyncStorage.setItem("category", cat);
    await updateDoc(doc(dbService, "category", "currentCategory"), {
      tag: cat,
    });
  };

  // useEffect(() => {
  //   // 현재의 최신 todos를 AsyncStorage에 저장
  //   const saveTodos = async () => {
  //     await AsyncStorage.setItem("todos", JSON.stringify(todos));
  //   };
  //   if (todos.length > 0) saveTodos();
  // }, [todos]);
  // 더이상 asyncstorage에 저장할 필요가 없다

  useEffect(() => {
    // const getData = async () => {
    //   const resp_todos = await AsyncStorage.getItem("todos"); // todos 배열
    //   //const resp_cat = await AsyncStorage.getItem("category"); // undefined / null

    //   setTodos(JSON.parse(resp_todos) ?? []);
    //   //setCategory(resp_cat ?? "js");
    // };
    // getData();

    // 1. onSnapshot API를 이용해서 todos collection에 변경이 생길 때마다
    // 2. todos collection 안의 모든 document들을 불러와서 setTodos한다
    const q = query(
      collection(dbService, "todos"),
      orderBy("createdAt", "desc")
    );

    // data 불러오기
    onSnapshot(q, (snapshot) => {
      const newTodos = snapshot.docs.map((doc) => {
        const newTodo = {
          id: doc.id,
          ...doc.data(), // doc.data() : { text, createdAt, ...  }
        };
        return newTodo;
      });
      setTodos(newTodos);
    });

    const getCategory = async () => {
      const snapshot = await getDoc(
        doc(dbService, "category", "currentCategory")
      );
      setCategory(snapshot.data().category);
    };
    getCategory();
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
