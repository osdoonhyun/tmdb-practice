import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Detail() {
  const { detailId } = useParams(); // url에 있는 path(id값) 가져오기
  const [movie, setMovie] = useState({});

  const getDetailMovie = async (id) => {
    try {
      const address = `https://api.themoviedb.org/3/movie/${id}?api_key=8597e491ed6e80f0de12e349eb60ea6e`;
      const { data, status } = await axios.get(address);
      console.log('++++++', data.title);
      console.log('++status++++', status);
      if (status === 200) {
        setMovie(data);
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  useEffect(() => {
    getDetailMovie(detailId);
  }, []);

  return (
    <>
      <h1>{movie.title}</h1>
    </>
  );
}
