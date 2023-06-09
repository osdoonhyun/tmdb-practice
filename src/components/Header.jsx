import { useState } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import i18n from '../lang/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import ProductNav from './ProductNav';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { t } = useTranslation();
  const [languageTitle, setLanguageTitle] = useState('한국어');

  const categories = ['All', 'LapTop', 'Mobile', 'iPad', 'Watch', 'AirPods'];

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.split(',')[0]);
    setLanguageTitle(e.split(',')[1]);
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    // navigate('/');
  };
  console.log('유저인포_+_+_+_+', userInfo);

  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>{t('title')}</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <ProductNav categories={categories} />

            <Nav>
              <NavDropdown
                title={languageTitle}
                id='collasible-nav-dropdown'
                onSelect={changeLanguage}
              >
                <NavDropdown.Item eventKey={['ko-KR', '한국어']}>
                  한국어
                </NavDropdown.Item>
                <NavDropdown.Item eventKey={['en-US', 'English']}>
                  English
                </NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item eventKey={['jp-JP', '日本語']}>
                  日本語
                </NavDropdown.Item>
                <NavDropdown.Item eventKey={['cn-CN', '中国人']}>
                  中国人
                </NavDropdown.Item>
              </NavDropdown>
              {/* {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='collasible-nav-dropdown'>
                  <NavDropdown.Item>유저관리</NavDropdown.Item>
                  <NavDropdown.Item>제품관리</NavDropdown.Item>
                  <NavDropdown.Item>주문관리</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    로그아웃
                  </NavDropdown.Item>
                </NavDropdown>
              )} */}

              {userInfo ? (
                userInfo.isAdmin ? (
                  <NavDropdown title='Admin' id='collasible-nav-dropdown'>
                    <NavDropdown.Item href='/profile'>프로필</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='/admin/users'>
                      유저관리
                    </NavDropdown.Item>
                    <NavDropdown.Item href='/admin/products'>
                      제품관리
                    </NavDropdown.Item>
                    <NavDropdown.Item>주문관리</NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      로그아웃
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <NavDropdown
                    title={userInfo?.name}
                    id='collasible-nav-dropdown'
                  >
                    <NavDropdown.Item href='/profile'>프로필</NavDropdown.Item>
                    <NavDropdown.Item>장바구니</NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      로그아웃
                    </NavDropdown.Item>
                  </NavDropdown>
                )
              ) : (
                <>
                  <Nav.Link href='/login'>{t('login')}</Nav.Link>
                  <Nav.Link href='/signup'>{t('signup')}</Nav.Link>
                  <Nav.Link href='/profile'>{t('profile')}</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
