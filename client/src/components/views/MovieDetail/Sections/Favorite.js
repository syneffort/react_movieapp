import React, { useEffect } from 'react'
import axios from 'axios';

function Favorite(props) {

    const { movieInfo, movieId, userFrom } = props;
    const { movieTitle, moviePost, movieRunTIme } = movieInfo;

    useEffect(() => {
        
        let variables = {
            userFrom,
            movieId
        }
        axios.post('/api/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {

                } else {
                    alert('추천수 확인에 실패했습니다.')
                }
            });

    }, [])

    return (
        <div>
            <button>추천</button>
        </div>
    )
}

export default Favorite
