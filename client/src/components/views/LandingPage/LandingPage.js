import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../Commons/MainImage';
import GridCards from '../Commons/GridCards';
import { Row } from 'antd';

import dotevn from 'dotenv';
dotevn.config();

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}/movie/popular?api_key=${process.env.REACT_APP_APIKEY}&language=ko&page=1`;
        fetchMovies(endpoint);
    }, []);

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setMovies([...Movies, ...response.results]);
                setCurrentPage(response.page);
                if (CurrentPage === 0) setMainMovieImage(response.results[0]);
            });
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}/movie/popular?api_key=${process.env.REACT_APP_APIKEY}&language=ko&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {/* Main Image */}
            {MainMovieImage && 
                <MainImage 
                image={`${IMAGE_BASE_URL}/w1280/${MainMovieImage.backdrop_path}`}
                title={MainMovieImage.original_title}
                text={MainMovieImage.overview}/>
            }

            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>최신 영화</h2>
                <hr/>

                {/* Movie Grid Card */}
                <Row gutter={[16,16]}>
                    {Movies && Movies.map((movie, index) => {
                        return (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={movie.poster_path ? `${IMAGE_BASE_URL}/w500/${movie.poster_path}`: null }
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                            </React.Fragment>
                    );
                        
                    })}
                </Row>

            </div>

            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}>더보기...</button>
            </div>
        </div>
    )
}

export default LandingPage