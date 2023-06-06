import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>{t('title')}</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>{t('movie')}</Nav.Link>
              <Nav.Link href='/tv'>{t('tv')}</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href='/login'>{t('login')}</Nav.Link>
              <Nav.Link href='/signup'>{t('signup')}</Nav.Link>
              <Nav.Link href='/profile'>{t('profile')}</Nav.Link>

              <NavDropdown title={t('langselect')} id='collasible-nav-dropdown'>
                <NavDropdown.Item href='#action/3.2'>한국어</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>영어</NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item href='#action/3.4'>일본어</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.4'>중국어</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
