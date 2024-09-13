import Movie from "../../components/movie";
import style from "../../style/home.module.css";
import { API_URL } from "../constants";
export const metadata = {
    title: "home",
}


export async function getMovies() {
    return await fetch(API_URL).then(response => response.json());
}

export default async function HomePage() {
    const movies = await getMovies();
    return (
        <div className={style.container}>
            {movies.map(movie =>
                <Movie
                    key={movie.id}
                    id={movie.id}
                    poster_path={movie.poster_path}
                    title={movie.title}
                />
            )}
        </div>
    )
}

