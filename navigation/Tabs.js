import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screen/Movie";
import My from "../screen/My";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { DARK_COLOR } from "../colors";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  // dark mode인 경우 isDark 값이 참
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
      }}
      sceneContainerStyle={{ backgroundColor: DARK_COLOR }}
    >
      {/* initialRouteName : 맨 처음 나오는 화면을 설정할 수 있다 */}
      {/* screenOptions : 객체를 인자로 받아서 제목 등을 변경할 수 있다  */}
      {/* (각각에 options라는 prop을 주고 변경 가능) */}
      {/* sceneContainerStyle : screen 화면에 대한 스타일링을 할 수 있는 속성 */}
      <Tab.Screen
        options={{
          title: "영화",
          headerTitleAlign: "center",
          tabBarLabel: "Movies",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="movie" size={size} color={color} />
          ),
        }}
        name="Movies"
        component={Movies}
      />
      <Tab.Screen
        options={{
          title: "내가 작성한 댓글들",
          headerTitleAlign: "center",
          tabBarLabel: "My",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="social-myspace" size={size} color={color} />
          ),
        }}
        name="My"
        component={My}
      />
    </Tab.Navigator>
  );
}
