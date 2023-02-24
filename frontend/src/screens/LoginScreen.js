import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)

  const { loading, error, userInfo } = userLogin

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
    // DISPATCH LOGIN
    dispatch(login(email, password))
  }

  return <FormContainer>
    <h1>Sign In</h1>

    {error && <Message variant='danger'>{error}</Message>}

    {loading && <Loader />}

    <Form onSubmit={submitHandler}>
      <Form.Group controlId='email'>
        <Form.Label>Email Address</Form.Label>

        <Form.Control 
          type='email' 
          placeholder='Enter Email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='password'>
        <Form.Label className='margin-top-1point5rem'>Password</Form.Label>

        <Form.Control 
          type='password' 
          placeholder='Enter Password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button type='submit' variant='primary' className='margin-top-1point5rem'>
        Sign In
      </Button>
    </Form>

    <Row className='py-3 margin-top-point5rem'>
      <Col>
        New Customer? 
        <Link 
          to={redirect 
            ? `/register?redirect=${redirect}` 
            : '/register'}
          
          className='text-decoration-line-none'
        > Register
        </Link>
      </Col>
    </Row>
  </FormContainer>
}

export default LoginScreen