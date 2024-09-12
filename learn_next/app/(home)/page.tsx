
export const metadata = {
    title : "home",
}
const URL = "https://nomad-movies.nomadcoders.workers.dev/movies"


async function getMovies() {
    return await fetch(URL).then(response => response.json());
}

export default async function HomePage(){
    const movies = await getMovies();
    return (
        <div>
            {JSON.stringify(movies)}
        </div>
    )
}

