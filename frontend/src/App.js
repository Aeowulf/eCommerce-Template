import { React } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'

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

            <Route path='/login' element={<LoginScreen />} />

            <Route path='/register' element={<RegisterScreen />} />

            <Route path='/profile' element={<ProfileScreen />} />

            <Route path='/shipping' element={<ShippingScreen />} />
            
            {/* This route isn't working properly, possibly due to use of React Router Dom V6's updated useNavigate function, which is being used in the CartScreen instead of the outdated "history" prop. Will look into this later, right now I'll fix the issue with the route path specified below. */}

            <Route path='/login/shipping' element={<ShippingScreen />} />

            <Route path='/payment' element={<PaymentScreen />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App;
