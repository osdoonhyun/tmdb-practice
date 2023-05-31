import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Detail() {
  const { pathname, detailId } = useParams();
  const [detailData, setDetailData] = useState({});

  console.log('pathname', pathname);
  console.log('디테일 데이터------', detailData);
  const getDetailData = async () => {
    try {
      const options = {
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGQzYjU4ZjA4NzM3NjE5NzEyMThlODMyN2Q4ODczYSIsInN1YiI6IjY0NzA0OGMwMzM2ZTAxMDE0YjYyNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3u9U1AFbLAEL6wblb4n0782dnv-doAEo2Ae5brSiz9g',
        },
      };
      const address = `https://api.themoviedb.org/3/${pathname}/${detailId}?language=en-US'`;
      const { data, status } = await axios.get(address, options);
      console.log('++++movie++', data);
      console.log('++status++++', status);
      if (status === 200) {
        setDetailData(data);
        console.log('디테일 데이터+++++', data);
      }
    } catch (error) {
      console.log('movieError', error.message);
    }
  };

  useEffect(() => {
    getDetailData();
  }, []);

  return (
    <>
      <h1>{detailData.title ? detailData.title : detailData.name}</h1>
    </>
  );
}
