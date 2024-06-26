import React from "react";
import styled from "@emotion/native";
import { getImgPath } from "../util";
import { useNavigation } from "@react-navigation/native";

export default function UpComing({ movie }) {
  const { navigate } = useNavigation();

  return (
    <UpcomingRow
      onPress={() =>
        navigate("Stacks", { screen: "Detail", params: { movieId: movie.id } })
      }
    >
      <UpcomingPoster
        source={{
          uri: getImgPath(movie.poster_path),
        }}
      />
      <UpcomingColumn>
        <UpcomingTitle>{movie.original_title}</UpcomingTitle>
        <Release>{movie.release_date}</Release>
        <UpcomingOverview>
          {movie.overview.slice(0, 70)}
          {movie.overview.length > 70 && "..."}
        </UpcomingOverview>
      </UpcomingColumn>
    </UpcomingRow>
  );
}

const UpcomingRow = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: 20px;
  //margin-bottom: 20px;
`;
const UpcomingPoster = styled.Image`
  width: 100px;
  height: 150px;
  background-color: grey;
  border-radius: 5px;
`;
const UpcomingTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.upcomingText};
`;

const UpcomingOverview = styled.Text`
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.upcomingText};
`;

const UpcomingColumn = styled.View`
  margin-left: 20px;
  width: 60%;
`;

const Release = styled.Text`
  font-size: 16px;
  font-weight: 300;
  color: ${(props) => props.theme.upcomingText};
  margin-top: 10px;
  margin-bottom: 10px;
`;

const UpcomingView = styled.View``;
