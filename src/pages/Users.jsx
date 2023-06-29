import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner, Table } from 'react-bootstrap';
import { FormContainer } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  adminGetUsers,
  adminUpdateUser,
  adminDeleteUser,
} from '../actions/adminActions';

export default function Users() {
  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  // 삭제 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [isChecked, setIsChecked] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const getUsersByAdmin = useSelector((state) => state.getUsersByAdmin);
  const { loading: getLoading, users, error: getError } = getUsersByAdmin;

  console.log('***************', users, getLoading, getError);

  const updateUserByAdmin = useSelector((state) => state.updateUserByAdmin);
  const {
    loading: updateLoading,
    result: updateUser,
    error: updateError,
  } = updateUserByAdmin;

  const deleteUserByAdmin = useSelector((state) => state.deleteUserByAdmin);
  const {
    loading: deleteLoading,
    result: deleteUser,
    error: deleteError,
  } = deleteUserByAdmin;

  const handleShow = (user) => {
    setSelectedData(user);
    setShow(true);
    console.log('계정삭제 모달 true');
  };

  // 수정 모달
  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);

  const handleEditModalShow = (user) => {
    setSelectedData(user);
    setEditShow(true);
    console.log('계정수정 모달 true');
  };

  const [selectedData, setSelectedData] = useState(null);

  console.log('선택된 데이터', selectedData);
  console.log('전체 유저 데이터', users);

  // 그리고 여기에 인수에 들어가는 값들이 만약 글로벌하다면, 인수로 사용하지 않아도 되는지? users와 selectedData 값을 이렇게 넣어줘도 되는지?
  const updateUserHandler = (id) => {
    const updatedData = {
      email,
      username,
      isAdmin,
    };
    dispatch(adminUpdateUser(updatedData, id));
  };

  const deleteUserHandler = (id) => {
    dispatch(adminDeleteUser(id));
  };

  // const removeUser = async (id) => {
  //   const address = `http://localhost:8080/api/users/${id}`;
  //   try {
  //     const { status } = await axios.delete(address, config);
  //     if (status === 200) {
  //       setShow(false);
  //       setUsers(users.filter((user) => user._id !== id));
  //     }
  //   } catch (error) {
  //     console.log('Remove User Error', error.message);
  //   }
  // };

  // const updateUser = async (id) => {
  //   const address = `http://localhost:8080/api/users/${id}`;
  //   setEmail(selectedData.email);
  //   setUsername(selectedData.username);
  //   setIsAdmin(selectedData.isAdmin);
  //   try {
  //     const updateData = {
  //       email,
  //       username,
  //       isAdmin,
  //     };
  //     const { data, status } = await axios.put(address, updateData, config);

  //     console.log('유저 업데이트', data, status);
  //     // status 값 뭘로 들어오는지 확인하기, data 확인하고 지우기
  //     if (status === 200) {
  //       // 200, 201
  //       console.log('+++++++++++', email, username, isAdmin);
  //       setUsers(
  //         users.map((user) =>
  //           user.id === id ? { ...user, email, username, isAdmin } : user
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.log('Update User', error.message);
  //   }
  //   setEditShow(false);
  // };

  // const getUsers = async () => {
  //   const address = 'http://localhost:8080/api/users';
  //   try {
  //     setLoading(true);
  //     const { data, status } = await axios.get(address, config);

  //     if (status === 200) {
  //       setUsers(data);
  //       setLoading(false);
  //     }
  //     console.log(status, data);
  //   } catch (error) {
  //     console.log('Users Error', error.message);
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   getUserHandler();
  //   console.log('데이터불러오기');
  // }, []);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(adminGetUsers());
    } else {
      navigate('/');
    }
    if (deleteUser) {
      setShow(false);
    }
    if (updateUser) {
      setEditShow(false);
    }
  }, [dispatch, navigate, deleteUser, updateUser]);

  return (
    <FormContainer title={'유저 리스트'} style={{ maxWidth: '800px' }}>
      {loading && <Spinner />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>유저 이름</th>
            <th>이메일</th>
            <th>가입 날짜</th>
            <th>유저 등급</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((user, index) => (
              <>
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user.createdAt.slice(0, 10)}</td>
                  <td>{user.isAdmin ? '관리자' : '유저'}</td>
                  {/* <td>
                    <DropdownButton
                      id='user-level'
                      title={user.isAdmin ? '관리자' : '유저'}
                    >
                      <Dropdown.Item href='user'>유저</Dropdown.Item>
                      <Dropdown.Item href='admin'>관리자</Dropdown.Item>
                    </DropdownButton>
                  </td> */}
                  <td>
                    <Button
                      className='ml-3'
                      variant='warning'
                      onClick={() => handleEditModalShow(user)}
                    >
                      수정
                    </Button>{' '}
                    <Button variant='danger' onClick={() => handleShow(user)}>
                      삭제
                    </Button>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>계정 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type='email'
                placeholder={selectedData?.email}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>유저 이름</Form.Label>
              <Form.Control
                type='text'
                placeholder={selectedData?.name}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>유저 등급</Form.Label>
              <Form.Control
                type='text'
                placeholder={selectedData?.isAdmin ? '관리자' : '유저'}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>가입 날짜</Form.Label>
              <Form.Control
                type='text'
                placeholder={selectedData?.createdAt.slice(0, 10)}
                disabled
              />
            </Form.Group>
          </Form>
          <Form.Check // prettier-ignore
            type={'checkbox'}
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            label='계정 삭제하시면 다시 되돌리지 못합니다. 정말 삭제하시겠습니까?'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            취소
          </Button>
          <Button
            variant='danger'
            disabled={!isChecked}
            onClick={() => deleteUserHandler(selectedData?._id)}
          >
            계정 삭제
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>계정 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type='email'
                placeholder={selectedData?.email}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>유저 이름</Form.Label>
              <Form.Control
                type='text'
                placeholder={selectedData?.name}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>유저 등급</Form.Label>
              <Form.Select
                aria-label='Default select example'
                onChange={(e) => {
                  console.log('유저등급 클릭함!!!', e.target.value);
                  setIsAdmin(e.target.value);
                }}
              >
                <option value='default'>
                  {selectedData?.isAdmin ? '관리자' : '유저'}
                </option>
                <option value='select' disabled>
                  선택해 주세요
                </option>
                <option value='false'>유저</option>
                <option value='true'>관리자</option>
              </Form.Select>
            </Form.Group>

            {/* <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='추가 예정' disabled />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleEditClose}>
            취소
          </Button>
          <Button
            variant='primary'
            onClick={() => updateUserHandler(selectedData?._id)}
          >
            수정하기
          </Button>
        </Modal.Footer>
      </Modal>
    </FormContainer>
  );
}
