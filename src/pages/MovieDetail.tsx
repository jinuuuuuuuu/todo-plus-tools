import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// 영화 데이터 타입 정의
type Movie = {
  title: string;
  year: number;
  rating: number;
  runtime: number;
  medium_cover_image: string;
  description_full: string;
  genres?: string[];
};

const MovieDetail = () => {
  const { id } = useParams(); // URL에서 'id' 값을 가져옴
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
        );
        const json = await response.json();
        setMovie(json.data.movie); // 타입 Movie에 맞는 데이터를 상태에 저장
      } catch (error) {
        console.error("영화 정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);
  //dependency array안에 id넣어줌. id가 변경될 때마다 실행됨. url바뀌면 자동으로 다시 데이터 불러옴

  if (loading) return <strong>Loading...</strong>;
  if (!movie) return <p>Sorry, we couldn't load the movie details.</p>;

  return (
    <div>
      <img src={movie.medium_cover_image} alt={movie.title} />
      <h2>{movie.title}</h2>
      <h4>
        {movie.year} · {movie.runtime} mins
      </h4>
      <h4>⭐ {movie.rating}</h4>
      <p>
        {movie.description_full ||
          "Sorry, no description available for this movie."}
      </p>
      <div>
        {movie.genres?.map((g) => (
          <span key={g}>{g}</span>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
