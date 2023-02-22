import { React } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

const App = () => {
  return (
    <Router>
      <Header />

      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            {/*
              Had to wrap "Route" tag in "Routes"
              Had to use "element" instead of "component"
              Had to format "HomeScreen" as an element
            */}
            <Route path='/product/:id' element={<ProductScreen />} />

            <Route path='/cart/:productId?' element={<CartScreen />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App;
