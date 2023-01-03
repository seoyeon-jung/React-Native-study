import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Movies({ navigation: { navigate } }) {
  //   useEffect(() => {
  //     console.log("마운트");
  //     return () => {
  //       console.log("언마운트");
  //     };
  //   }, []);
  //   // 언마운트가 찍히지 않는다는 것은 뒤에서 계속 렌더링된다는 의미
  //   // 언마운트를 시키려면 reset method를 사용해야 한다. (navigation stack을 초기화하는 메소드)

  //   useFocusEffect(
  //     useCallback(() => {
  //       console.log("Focus");
  //       return () => {
  //         console.log("Blur");
  //       };
  //     }, [])
  //   );
  return (
    <View>
      <Text>Movies</Text>
      <TouchableOpacity
        onPress={() =>
          navigate("Stacks", { screen: "one", params: { id: "123" } })
        }
      >
        <Text>Go to One Screen</Text>
      </TouchableOpacity>
    </View>
  );
}
