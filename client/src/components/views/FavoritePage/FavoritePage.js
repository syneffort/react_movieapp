import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Popover } from 'antd';
import './favorite.css';

import { FAVORITE_SERVER, IMAGE_BASE_URL } from '../../Config';

function FavoritePage(props) {

    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavoriteMovie();
    }, []);

    const fetchFavoriteMovie = () => {
        axios.post(`${FAVORITE_SERVER}/get-favorite-movie`, { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites);
                } else {
                    alert('좋아요 한 영화 정보 확인에 실패했습니다.')
                }
            });
    };

    const renderCards = Favorites.map((elem, index) => {

        const content = <div>
            {elem.moviePost ? <img src={`${IMAGE_BASE_URL}/w200${elem.moviePost}`}/> : "no image"}
        </div>

        return <tr key={index}>
            <Popover content={content} title={elem.movieTitle}>
                <td>{elem.movieTitle}</td>
            </Popover>
            <td>{elem.movieRunTime} 분</td>
            <td><Button onClick={() => onClickDelete(elem.movieId, elem.userFrom)}>취소</Button></td>
        </tr>
    });

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom,
        }

        axios.post(`${FAVORITE_SERVER}/remove-favorite`, variables)
            .then(response => {
                if (response.data.success) {
                    return fetchFavoriteMovie();
                } else {
                    alert('좋아요 취소에 실패했습니다.')
                }
            });
    };

    return <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2>🥰 내가 좋아요 한 영화</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>상영시간</th>
                        <td>좋아요 취소</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
}

export default FavoritePage
