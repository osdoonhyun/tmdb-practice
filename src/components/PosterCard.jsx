import { Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export default function PosterCard({ data, pathname }) {
  return (
    <>
      <Card style={{ width: '18rem', height: '550px' }}>
        <Link to={`/${pathname}/${data.id}`}>
          <Card.Img
            variant='top'
            style={{ height: '300px' }}
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          />
        </Link>
        <Card.Body>
          <Card.Title>
            {/* {data.title.length <= 23
              ? data.title
              : data.title.slice(0, 23) + '...'} */}
            {data.title ? data.title : data.name}
          </Card.Title>
          <Card.Text>
            {data.overview.length <= 120
              ? data.overview
              : data.overview.slice(0, 120) + '...'}
          </Card.Text>
        </Card.Body>
        <Card.Footer className='bg-primary'>
          <Card.Text style={{ fontSize: '15px' }}>
            개봉 날짜: {data.release_date}
          </Card.Text>
          <Card.Text style={{ fontSize: '15px' }}>
            별점: {data.vote_average}
          </Card.Text>
        </Card.Footer>
      </Card>
    </>
  );
}
