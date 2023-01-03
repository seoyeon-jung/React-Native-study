import React from "react";
import { ScrollView, View, Image, Text } from "react-native";
import styled from "@emotion/native";

export default function Movies({ navigation: { navigate } }) {
  return (
    <ScrollView>
      {/* Main : movie poster & title/content (background: movie image)  */}
      <View style={{ flexDirection: "row" }}>
        <Img source={require("../assets/sample.jpg")} />
        <View>
          <Text>Title</Text>
          <Text>contents</Text>
        </View>
      </View>

      {/* Top Rated movies */}
      <ScrollView>
        <Text>Top Rated Movies</Text>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Img source={require("../assets/sample.jpg")} />
            <Text>star</Text>
            <Text>movie title</Text>
          </View>
          <View>
            <Img source={require("../assets/sample.jpg")} />
            <Text>star</Text>
            <Text>movie title</Text>
          </View>
        </View>
      </ScrollView>

      {/* Upcoming movies */}
      <View>
        <Text>Upcoming Movies</Text>
        <View style={{ flexDirection: "row" }}>
          <Img source={require("../assets/sample.jpg")} />
          <View>
            <Text>Movie Title</Text>
            <Text>2022-12-05</Text>
            <Text>contents</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Img source={require("../assets/sample.jpg")} />
          <View>
            <Text>Movie Title</Text>
            <Text>2022-12-05</Text>
            <Text>contents</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const Img = styled.Image`
  width: 100px;
  height: 150px;
`;
