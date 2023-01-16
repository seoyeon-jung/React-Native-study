// API 이용할 때 필요한 URL과 KEY
const BASE_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "b3eb8003c5ad8fa2915d1fe18d0ee5a0";

// slide (now playing) 불러오기
export const getNowPlayings = () =>
  fetch(`${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res) => res.json())
    .catch((error) => console.log(error));

// top rated movie
export const getTopRated = () =>
  fetch(`${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res) => res.json())
    .catch((error) => console.log(error));

// upcoming movies
export const getUpcoming = ({ pageParam = 1 }) =>
  fetch(
    `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=${pageParam}`
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

// detail => get detail
export const getDetail = (params) => {
  const [_, movieId] = params.queryKey;
  return fetch(
    `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));
};
