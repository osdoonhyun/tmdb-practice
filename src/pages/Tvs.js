import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

export default function Tvs() {
  const [tvsData, setTvsData] = useState([]);

  const address = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
  const options = {
    headers: {
      accept: 'accept: application/json',
      Authorization: process.env.TMDB_AUTHORIZATION,
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
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  variant='top'
                  src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                />
                <Card.Body>
                  <Card.Title>{tv.name}</Card.Title>
                  <Card.Text>{tv.overview}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
