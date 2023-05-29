import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Moives() {
  const [moviesData, setMoviesData] = useState([]);

  const address =
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMDB_AUTHORIZATION,
    },
  };

  const getMoviesData = async () => {
    try {
      // axios는 data, status 네트워크 정보까지 가져오는데 data, status만 뽑아서 사용한다,
      const { data, status } = await axios.get(address, options);
      console.log('*****', data);
      if (status === 200) {
        setMoviesData(data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getMoviesData();
  }, []);

  return (
    <Container>
      <Row>
        {moviesData.results &&
          moviesData.results.map((movie) => (
            <Col className='mt-5'>
              <Card style={{ width: '18rem', height: '550px' }}>
                <Link to={`/${movie.id}`}>
                  <Card.Img
                    variant='top'
                    style={{ height: '300px' }}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>
                    {movie.title.length <= 23
                      ? movie.title
                      : movie.title.slice(0, 23) + '...'}
                  </Card.Title>
                  <Card.Text>
                    {movie.overview.length <= 120
                      ? movie.overview
                      : movie.overview.slice(0, 120) + '...'}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className='bg-primary'>
                  <Card.Text style={{ fontSize: '15px' }}>
                    개봉 날짜: {movie.release_date}
                  </Card.Text>
                  <Card.Text style={{ fontSize: '15px' }}>
                    별점: {movie.vote_average}
                  </Card.Text>
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
