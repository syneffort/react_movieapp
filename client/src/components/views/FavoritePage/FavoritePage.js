import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import './favorite.css';

import { FAVORITE_SERVER } from '../../Config';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios.post(`${FAVORITE_SERVER}/get-favorite-movie`, { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites);
                } else {
                    alert('좋아요 한 영화 정보 확인에 실패했습니다.')
                }
            });
    }, [])

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2>🥰 좋아요 한 영화</h2>
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
                    {console.log(Favorites)}
                    {Favorites.map((elem, index) => (
                        <tr key={index}>
                            <td>{elem.movieTitle}</td>
                            <td>{elem.movieRunTime} 분</td>
                            <td><Button>취소</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
