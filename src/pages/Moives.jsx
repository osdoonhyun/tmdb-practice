import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BaseURL } from '../constants';

const AuthorizationToken = process.env.REACT_APP_TMDB_AUTHORIZATION;
// const AuthorizationToken =
// 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGQzYjU4ZjA4NzM3NjE5NzEyMThlODMyN2Q4ODczYSIsInN1YiI6IjY0NzA0OGMwMzM2ZTAxMDE0YjYyNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3u9U1AFbLAEL6wblb4n0782dnv-doAEo2Ae5brSiz9g';

export default function Moives() {
  const [moviesData, setMoviesData] = useState([]);

  axios.defaults.baseURL = BaseURL;
  const address = '/movie/now_playing?language=en-US&page=1';
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: AuthorizationToken,
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
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://plus.unsplash.com/premium_photo-1675873580289-213b32be1f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80'
            alt='First slide'
            style={{ height: '350px' }}
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://images.unsplash.com/photo-1685452329316-d505335ca3d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
            alt='Second slide'
            style={{ height: '350px' }}
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://images.unsplash.com/photo-1674766440835-5ba9f6698750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2920&q=80'
            alt='Third slide'
            style={{ height: '350px' }}
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container>
        <Row>
          {moviesData.results &&
            moviesData.results.map((movie) => (
              <Col className='mt-5' key={movie.id}>
                <Card style={{ width: '18rem', height: '550px' }}>
                  <Link to={`/movie/${movie.id}`}>
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
    </>
  );
}
