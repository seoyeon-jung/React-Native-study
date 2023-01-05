import React, { useEffect, useState } from "react";
import {
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  View,
  Alert,
} from "react-native";
import styled from "@emotion/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import TopRated from "../components/TopRated";
import UpComing from "../components/UpComing";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { getNowPlayings, getTopRated, getUpcoming } from "../api";

export default function Movies({ navigation: { navigate } }) {
  // // slide (now playing)
  // const [nowPlayings, setNowPlayings] = useState([]);
  // // loading check
  // const [isLoading, setIsLoading] = useState(true);
  // // top rated movie
  // const [topRated, setTopRated] = useState([]);
  // // upcoming movie
  // const [upComing, setUpComing] = useState([]);
  // server state는 usequery가 관라히가 때문에 useState가 관리할 필요 없다

  // refresh check
  const [isRefreshing, setIsRefreshing] = useState(false);

  // queryclient (어떤 컴포넌트에 있어도 cache memory는 하나)
  const queryClient = useQueryClient();

  // useQuery
  const { data: nowPlayingData, isLoading: isLoadingNP } = useQuery(
    ["Movies", "NowPlayings"],
    getNowPlayings
  );
  const { data: topRatedData, isLoading: isLoadingTR } = useQuery(
    ["Movies", "TopRated"],
    getTopRated
  );
  const {
    data: upComingData,
    isLoading: isLoadingUC,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["Movies", "UpComing"], getUpcoming, {
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있으면 +1
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
        // return 값이 page params로 넘어감
      }
    },
  });

  // refresh
  const onRefresh = async () => {
    setIsRefreshing(true);

    // refetch를 해야 한다 (data를 서버에서 받오는 게 fetch)
    // refetch : 한번 더 받아오는 것 (refresh를 했을 떄)
    // fetch함수와 무관하게 refetch를 하는 것
    //await Promise.all(refetchNP(), refetchTR(), refetchUC());

    // Movies를 가지고 있는 fetcher 함수가 모두 일괄적으로 실행된다
    await queryClient.refetchQueries(["Movies"]);
    setIsRefreshing(false);
  };

  // 3개의 loading state 중 하나라도 true이면 loading 화면이 보인다
  const isLoading = isLoadingNP || isLoadingTR || isLoadingUC;

  // infinity scroll
  const fetchMore = async () => {
    // fetch next page
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

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
      onEndReached={fetchMore}
      // screen 절반 길이만큼
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          {/* Main : movie poster & title/content (background: movie image)  */}
          <Swiper height="100%" showsPagination={false} autoplay loop>
            {nowPlayingData.results.map((movie) => (
              <Slide key={movie.id} movie={movie} />
            ))}
          </Swiper>

          {/* Top Rated movies */}
          <ListTitle>Top Rated Movies</ListTitle>
          <FlatList
            horizontal
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            data={topRatedData.results}
            renderItem={({ item }) => <TopRated movie={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={<View style={{ width: 10 }} />}
          />

          {/* UpComing movies */}
          <ListTitle>Upcoming Movies</ListTitle>
        </>
      }
      // 누적되어지는 1차 영화 리스트
      data={upComingData.pages.map((page) => page.results).flat()}
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
