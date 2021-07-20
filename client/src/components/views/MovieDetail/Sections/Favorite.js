import React, { useEffect } from 'react'
import { FAVORITE_SERVER } from '../../../Config';
import axios from 'axios';

function Favorite(props) {

    const { movieInfo, movieId, userFrom } = props;
    const { movieTitle, moviePost, movieRunTIme } = movieInfo;

    useEffect(() => {
        
        let variables = {
            userFrom,
            movieId
        }
        axios.post(`${FAVORITE_SERVER}/favoritenumber`, variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
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
