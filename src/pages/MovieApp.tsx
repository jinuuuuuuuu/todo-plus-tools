import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

type Movie = {
  id: number;
  title: string;
  summary: string;
  medium_cover_image: string;
  genres?: string[];
  rating: number;
  year: number;
  runtime: number;
};

const MovieApp = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  /*useEffect 안에 함수를 따로 선언하는 이유: 
    useEffect 자체는 async로 만들 수 없기 때문. 대신, 그 안에서 비동기 함수를 따로 선언하고 호출하는 구조를 사용.*/
  useEffect(() => {
    const fetchMovies = async () => {
      // 비동기 함수(async)를 선언해서, API를 호출하고 데이터를 가져오는 로직을 작성. 이 함수는 await 키워드 사용 가능.
      try {
        // await 키워드를 사용하여 비동기 작업, fetch 함수가 완료될 때까지 기다렸다가 그 결과를 response에 저장.
        const response = await fetch(
          "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.7&sort_by=year"
        );
        // response.json()을 호출해서 JSON 데이터를 파싱하고, 그 결과를 json에 저장.
        const json = await response.json();
        // 받아온 데이터 중 실제 영화 정보 배열(json.data.movies)만 뽑아서 movies 상태에 저장
        setMovies(json.data.movies);
      } catch (error) {
        console.error("영화 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        // 성공/실패 상관없이 로딩 종료
        setLoading(false); // 로딩 상태 변경
      }
    };
    // 선언한 비동기 함수 직접 호출. 이 방식으로 useEffect 안에서 비동기 작업을 안전하게 수행 가능.
    fetchMovies(); //함수 선언문 바깥에서 한 번만 호출!!
  }, []);

  return (
    <div>
      <h1>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <div>
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                rating={movie.rating}
                title={movie.title}
                year={movie.year}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </h1>
    </div>
  );
};

export default MovieApp;
