import React, { useEffect, useState } from 'react'
import { FAVORITE_SERVER } from '../../../Config';
import axios from 'axios';

function Favorite(props) {

    const { movieInfo, movieId, userFrom } = props;
    const { movieTitle, moviePost, movieRunTIme } = movieInfo;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);


    useEffect(() => {
        
        let variables = {
            userFrom,
            movieId
        }
        axios.post(`${FAVORITE_SERVER}/favoritenumber`, variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('좋아요 수 확인에 실패했습니다.');
                }
            });

        axios.post(`${FAVORITE_SERVER}/favorited`, variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.Favorited);
                } else {
                    alert('좋아요 상태 확인에 실패했습니다.');
                }
            });
    }, [])

    return (
        <div>
            <label>🥰 좋아요 : {FavoriteNumber} </label>
            <button>{Favorited ? "취소" : "좋아요"}</button>
        </div>
    )
}

export default Favorite
