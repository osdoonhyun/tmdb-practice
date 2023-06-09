import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PosterCard } from '../components';

const AuthorizationToken = process.env.REACT_APP_TMDB_AUTHORIZATION;
// const AuthorizationToken =
//   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGQzYjU4ZjA4NzM3NjE5NzEyMThlODMyN2Q4ODczYSIsInN1YiI6IjY0NzA0OGMwMzM2ZTAxMDE0YjYyNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3u9U1AFbLAEL6wblb4n0782dnv-doAEo2Ae5brSiz9g';

export default function Tvs() {
  const [tvsData, setTvsData] = useState([]);

  const address =
    'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';

  const options = {
    headers: {
      accept: 'application/json',
      Authorization: AuthorizationToken,
    },
  };

  const getTvsData = async () => {
    try {
      const { data, status } = await axios.get(address, options);
      console.log('data', data);
      if (status === 200) {
        setTvsData(data.results);
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  useEffect(() => {
    getTvsData();
  }, []);

  return (
    <Container>
      <Row>
        {tvsData &&
          tvsData.map((tv) => (
            <Col className='mt-5' key={tv.id}>
              <PosterCard pathname={'tv'} data={tv} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}
