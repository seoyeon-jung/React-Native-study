import { TouchableOpacity, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// screen comonent는 기본적으로 navigation이라는 prop을 가지고 있다
// 여러 메소드 중 페이지 이동을 위해 navigate라는 메소드를 사용한다
// navigation prop 공식문서 통해 확인 가능 (reset, setOptions도 많이 쓴다)
const One = ({ route: { params }, navigation: { navigate } }) => {
  console.log("params: ", params);
  return (
    <TouchableOpacity onPress={() => navigate("two")}>
      <Text>One</Text>
    </TouchableOpacity>
  );
};

// set options : 제목을 바꾼다거나 여러 가지 커스텀마이징을 할수가 있다
const Two = ({ navigation: { navigate, setOptions } }) => {
  return (
    <>
      <TouchableOpacity onPress={() => navigate("three")}>
        <Text>Two</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          setOptions({
            title: "변경ㄱ된 제목!",
          })
        }
      >
        <Text>Set Options</Text>
      </TouchableOpacity>
    </>
  );
};

// goBack: 뒤로가기 속성
// reset: navigation history를 초기화시킨다 (뒤로가기 불가능)
// index => routes 배열의 몇 번째 화면이 무엇인지 가리키는 index
const Three = ({ navigation: { goBack, reset } }) => {
  return (
    <>
      <TouchableOpacity onPress={() => goBack()}>
        <Text>Two</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          reset({
            index: 1,
            routes: [{ name: "three" }, { name: "two" }],
          })
        }
      >
        <Text>Reset Navigation</Text>
      </TouchableOpacity>
    </>
  );
};

export default function App() {
  return (
    <Stack.Navigator>
      {/* initialRouteName : 맨 처음 나오는 화면을 설정할 수 있다 */}
      {/* screenOptions : 객체를 인자로 받고 title 같은 것들을 바꿀 수 있다 */}
      <Stack.Screen name="one" component={One} />
      <Stack.Screen name="two" component={Two} />
      <Stack.Screen name="three" component={Three} />
    </Stack.Navigator>
  );
}
