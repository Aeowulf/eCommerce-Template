import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
/* Imported useParams to replace "params" and "match" */
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { listProductDetails } from '../actions/productActions'

const ProductScreen = () => {
// const ProductScreen = ({ match }) => {
// const product = products.find((p) => p._id === match.params.id)}

// Version 6 of react-router-dom no longer uses the match prop
// Use the following link if you have this problem again with react-router-dom version 5 incompatibility
// https://stackoverflow.com/questions/70290770/react-typeerror-cannot-read-properties-of-undefined-reading-params
  const history = useNavigate();

  const { id } = useParams();

  console.log(id)

  // const product = products.find((p) => String(p._id) === id)

  // const [product, setProduct] = useState({}) // DON'T NEED THIS

  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)

  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    if (qty === 0) {
      history(`/cart/${id}?qty=1`)
    } else {
      history(`/cart/${id}?qty=${qty}`)
    }
  }

  return (
  <>
    <Link className='btn btn-light my-3' to='/'>
      Go Back
    </Link>

    {loading ? 
      <Loader /> 
    : error ? 
      <Message variant='danger'>{error}</Message> 
    :(
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating 
                value={product.rating} 
                text={`${product.numReviews} reviews`} 
              />
            </ListGroup.Item>

            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>

            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price: 
                  </Col>

                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    Status: 
                  </Col>

                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Select
                        value={qty}

                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button 
                  onClick={addToCartHandler}

                  className='btn-block'

                  type='button' 

                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    )}

    
  </>
  )
}

export default ProductScreen