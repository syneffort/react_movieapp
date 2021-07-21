import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

import { FAVORITE_SERVER } from '../../../Config';

function Favorite(props) {

    const { movieInfo, movieId, userFrom } = props;
    const { movieTitle, moviePost, movieRunTIme: movieRunTime } = movieInfo;

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime,
    };

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);


    useEffect(() => {

        axios.post(`${FAVORITE_SERVER}/favorite-number`, variables)
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
    }, []);

    const onClickFavorite = () => {
        if (Favorited) {
            axios.post(`${FAVORITE_SERVER}/remove-favorite`, variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited); 
                    } else {
                        alert('좋아요 취소에 실패했습니다.');
                    }
                });
        } else {
            axios.post(`${FAVORITE_SERVER}/add-favorite`, variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    } else {
                        alert('좋아요 등록에 실패했습니다.');
                    }
                })
        }
    };

    return (
        <div>
            <label>🥰 좋아요 : {FavoriteNumber} </label>
            <Button onClick={onClickFavorite}>
                {Favorited ? "취소" : "좋아요"}
            </Button>
        </div>
    )
}

export default Favorite
