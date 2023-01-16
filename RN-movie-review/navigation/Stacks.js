import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screen/Detail";
import { YELLOW_COLOR, BLUE_COLOR } from "../colors";
import { Text, TouchableOpacity, useColorScheme } from "react-native";

const Stack = createNativeStackNavigator();

export default function My({ navigation: { goBack } }) {
  const isDark = useColorScheme() === "dark";

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: isDark ? YELLOW_COLOR : BLUE_COLOR,
        // headerLeft 통해 뒤로가기 가능 (없으면 swipe 해서 이전 화면으로 돌아가야 함)
        headerLeft: () => {
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: YELLOW_COLOR }}>뒤로</Text>
          </TouchableOpacity>;
        },
      }}
    >
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
