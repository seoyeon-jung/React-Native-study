import React, { useEffect, useState } from "react";
import {
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  View,
} from "react-native";
import styled from "@emotion/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import TopRated from "../components/TopRated";
import UpComing from "../components/UpComing";

export default function Movies({ navigation: { navigate } }) {
  // slide (now playing)
  const [nowPlayings, setNowPlayings] = useState([]);
  // loading check
  const [isLoading, setIsLoading] = useState(true);
  // top rated movie
  const [topRated, setTopRated] = useState([]);
  // upcoming movie
  const [upComing, setUpComing] = useState([]);
  // refresh check
  const [isRefreshing, setIsRefreshing] = useState(false);

  // API 이용할 때 필요한 URL과 KEY
  const BASE_URL = "https://api.themoviedb.org/3/movie";
  const API_KEY = "b3eb8003c5ad8fa2915d1fe18d0ee5a0";

  // slide (now playing) 불러오기
  const getNowPlayings = async () => {
    const { results } = await fetch(
      `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .catch((error) => console.log(error));
    setNowPlayings(results);
    //setIsLoading(false);
  };

  // top rated movie
  const getTopRated = async () => {
    const { results } = await fetch(
      `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .catch((error) => console.log(error));

    //console.log("results: ", results);
    setTopRated(results);
    //setIsLoading(false);
  };

  // upcoming movies
  const getUpcoming = async () => {
    const { results } = await fetch(
      `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .catch((error) => console.log(error));

    // console.log("results: ", results);
    setUpComing(results);
    //setIsLoading(false);
  };

  // 한꺼번에 호출할 수 있는 함수
  const getData = async () => {
    // Promise.all : 순회 가능한 객체에 주어진 모든 프로미스가 이행한 후
    // 혹은 프로미스가 주어지지 않았을 때 이행하는 Promise를 반환
    // 모든 프로미스가 끝나야 다음 프로미스로 넘어감
    await Promise.all([getNowPlayings(), getTopRated(), getUpcoming()]);
    setIsLoading(false);
    // async 함수는 항상 promise를 반환
  };

  // refresh
  const onRefresh = async () => {
    setIsRefreshing(true);
    await getData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    // getNowPlayings();
    // getTopRated();
    // getUpcoming();
    getData();
  }, []);

  // loading 중인지 아닌지
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          {/* Main : movie poster & title/content (background: movie image)  */}
          <Swiper height="100%" showsPagination={false} autoplay loop>
            {nowPlayings.map((movie) => (
              <Slide key={movie.id} movie={movie} />
            ))}
          </Swiper>

          {/* Top Rated movies */}
          <ListTitle>Top Rated Movies</ListTitle>
          <FlatList
            horizontal
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            data={topRated}
            renderItem={({ item }) => <TopRated movie={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={<View style={{ width: 10 }} />}
          />

          {/* UpComing movies */}
          <ListTitle>Upcoming Movies</ListTitle>
        </>
      }
      data={upComing}
      renderItem={({ item }) => <UpComing movie={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<View style={{ height: 15 }} />}
    />
  );
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.title};
`;
