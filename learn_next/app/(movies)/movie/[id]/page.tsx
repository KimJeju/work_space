import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";


interface IPramas {
    params : {id:string}
}

export async function generateMetadata({params:{id}}: IPramas) {
    const movie = await getMovie(id);
    return {
        title : movie.title
    }
}

export default async function MovieDetail({ params:{id} }:IPramas) {
    //병렬처리
    return (
        <div>
            {/* 
            데이터 병렬처리를 위한 suspense 
            fetch 가 동시에 진행 되지만 먼저 끝난 컴포넌트 부터 랜더링 해준다.
            */}
            <Suspense fallback={<h1>loading movie info</h1>}>
                <MovieInfo id={id} />
            </Suspense>
            <Suspense fallback={<h1>loading movie video</h1>}>
                <MovieVideos id={id} />
            </Suspense>
        </div>
    )
}