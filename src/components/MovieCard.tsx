import { Link } from "react-router-dom";

type MovieCardProps = {
  id: number;
  coverImg: string;
  rating: number;
  title: string;
  year: number;
  genres?: string[];
};

const MovieCard = ({
  id,
  coverImg,
  rating,
  title,
  year,
  genres,
}: MovieCardProps) => {
  return (
    <div>
      <Link to={`/movies/${id}`}>
        <img src={coverImg} alt={title} />
      </Link>
      <span>⭐ {rating}</span>
      <h4>{title}</h4>
      <span>
        {year} · {genres?.slice(0, 2).join(", ")}
        {/*장르배열에서 앞 2개만 추출, 장르 undifined일 수도 있으므로 옵셔널 체이닝, 배열을 문자열로 연결*/}
      </span>
    </div>
  );
};

export default MovieCard;
