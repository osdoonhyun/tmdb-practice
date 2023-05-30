import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = '68d3b58f0873761971218e8327d8873a';

export default function Detail() {
  const { detailId } = useParams(); // url에 있는 path(id값) 가져오기
  const [movie, setMovie] = useState({});
  const [tv, setTv] = useState({});

  const getDetailTv = async (id) => {
    try {
      const address = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;
      const { data, status } = await axios.get(address);

      if (status === 200) {
        setTv(data);
      }
    } catch (error) {
      console.log('tvError', error.message);
    }
  };

  const getDetailMovie = async (id) => {
    try {
      const address = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
      const { data, status } = await axios.get(address);
      console.log('++++movie++', data.title);
      console.log('++status++++', status);
      if (status === 200) {
        setMovie(data);
      }
    } catch (error) {
      console.log('movieError', error.message);
    }
  };

  useEffect(() => {
    if (tv) {
      getDetailTv(detailId);
    }
    if (movie) {
      getDetailMovie(detailId);
    }
  }, []);

  return (
    <>
      <h1>{movie && movie.title}</h1>
      <h1>{tv && tv.name}</h1>
    </>
  );
}
