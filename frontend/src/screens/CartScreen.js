import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const CartScreen = () => {
  const { productId } = useParams();

  const history = useNavigate();

  const location = useLocation();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    console.log('Removed')
  }

  const checkoutHandler = () => {
    history('/login?redirect=shipping')
    {/* Redirects to Shipping screen if user is logged in, otherwise redirects to Login screen */}
  }
  {/* Defining checkoutHandler ahead of time to ensure Checkout button below works properly */}

  return (<Row>
    <Col md={8}>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 
        ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> 
        : (
        <ListGroup variant='flush'>
          {cartItems.map(item => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>

                <Col md={3}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>

                <Col md={2}>${item.price}</Col>

                <Col md={2}>
                  <Form.Select
                    value={item.qty}

                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={2}>
                  <Button 
                    type='button' 
                    variant='light' 
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        )
      }
    </Col>

    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </h2>
            {/* Adds up the "qty" of every "item" in "cartItems" to render the total quantity of items in Shopping Cart */}

            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            {/* Adds up the "price" of every "item" in "cartItems" to render the total price of items in Shopping Cart */}
            {/* The ".toFixed()" method converts a number to a string, rounding it to a specified number of decimals; in this case, 2. */}
          </ListGroup.Item>

          <ListGroup.Item>
            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
              Proceed To Checkout
            </Button>
            {/* Created a button that calls the "checkoutHandler" function when clicked. Button is Disabled if cart is empty. */}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  </Row>
  )
}

export default CartScreen