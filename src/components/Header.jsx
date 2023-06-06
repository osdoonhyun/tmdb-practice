import { useState } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import i18n from '../lang/i18n';

export default function Header() {
  const { t } = useTranslation();
  const [languageTitle, setLanguageTitle] = useState('한국어');

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.split(',')[0]);
    setLanguageTitle(e.split(',')[1]);
  };

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
              <NavDropdown
                title={languageTitle}
                id='collasible-nav-dropdown'
                onSelect={changeLanguage}
              >
                <NavDropdown.Item
                  href='#action/3.2'
                  eventKey={['ko-KR', '한국어']}
                >
                  한국어
                </NavDropdown.Item>
                <NavDropdown.Item
                  href='#action/3.3'
                  eventKey={['en-US', 'English']}
                >
                  English
                </NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item
                  href='#action/3.4'
                  eventKey={['jp-JP', '日本語']}
                >
                  日本語
                </NavDropdown.Item>
                <NavDropdown.Item
                  href='#action/3.4'
                  eventKey={['cn-CN', '中国人']}
                >
                  中国人
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href='/login'>{t('login')}</Nav.Link>
              <Nav.Link href='/signup'>{t('signup')}</Nav.Link>
              <Nav.Link href='/profile'>{t('profile')}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
