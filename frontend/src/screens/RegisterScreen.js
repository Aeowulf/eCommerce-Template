import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)

  const { loading, error, userInfo } = userRegister

  const location = useLocation()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const history = useNavigate();

  useEffect(() => {
    if(userInfo) {
      history(redirect)
    }
  }, [history, userInfo, redirect])  

  const submitHandler = (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
        setMessage('Passwords do not match')
    } else {
        dispatch(register(name, email, password))
    }
  }

  return <FormContainer>
    <h1>Sign Up</h1>

    {message && <Message variant='danger'>{message}</Message>}

    {error && <Message variant='danger'>{error}</Message>}

    {loading && <Loader />}

    <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>

        <Form.Control 
          type='name' 
          placeholder='Enter name' 
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='email'>
        <Form.Label className='margin-top-1point5rem'>Email Address</Form.Label>

        <Form.Control 
          type='email' 
          placeholder='Enter email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='password'>
        <Form.Label className='margin-top-1point5rem'>Password</Form.Label>

        <Form.Control 
          type='password' 
          placeholder='Enter password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='confirmPassword'>
        <Form.Label className='margin-top-1point5rem'>Confirm password</Form.Label>

        <Form.Control 
          type='password' 
          placeholder='Confirm password' 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button type='submit' variant='primary' className='margin-top-1point5rem'>
        Register
      </Button>
    </Form>

    <Row className='py-3 margin-top-point5rem'>
      <Col>
        Have an Account? 
        <Link 
          to={redirect 
            ? `/login?redirect=${redirect}` 
            : '/login'}
          
          className='text-decoration-line-none'
        > Login
        </Link>
      </Col>
    </Row>
  </FormContainer>
}

export default RegisterScreen