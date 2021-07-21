import React, { useEffect, useState } from 'react'
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import { Row, Button } from 'antd';
import MainImage from '../Commons/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../Commons/GridCards';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState(null);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {

        let endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${process.env.REACT_APP_APIKEY}&language=ko`;
        let endpointInfo = `${API_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_APIKEY}&language=ko`;
    
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            });

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts([...response.cast])
            });
    }, []);

    const toggoleActorView = () => {
        setActorToggle(!ActorToggle);
    }

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

                    <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                    </div>

                    {/* Movie Info */}

                    <MovieInfo 
                    movie={Movie}/>

                    <br/>
                    {/* Actor Grid */}

                    <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                        <Button onClick={toggoleActorView}>출연진 보기</Button>
                    </div>

                    {ActorToggle &&
                        <Row gutter={[16,16]}>
                        {Casts && Casts.map((cast, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <GridCards
                                        image={cast.profile_path ? `${IMAGE_BASE_URL}/w500/${cast.profile_path}`: null }
                                        name={cast.name}
                                    />
                                </React.Fragment>
                            );  
                        })}
                        </Row> 
                    }
                </div>
            }

        </div>
    )
}

export default MovieDetail
