import React, { useEffect, useState } from 'react'
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../Commons/MainImage';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {

    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState(null)

    useEffect(() => {

        let endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${process.env.REACT_APP_APIKEY}&language=ko`;
        let endpointInfo = `${API_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_APIKEY}&language=ko`;
    
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })
    }, []);

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {/* Header */}
            {Movie && 
                <MainImage
                image={`${IMAGE_BASE_URL}/w1280/${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}/>
            }

            {/* Body */}
            {Movie &&
                <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* Movie Info */}

                <MovieInfo 
                movie={Movie}/>

                <br/>
                {/* Actor Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button>출연진 보기</button>

                </div>
            </div>
            }
            

        </div>
    )
}

export default MovieDetail
