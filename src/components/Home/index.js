import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import {HomeContainer, HomeTitle, DigitalCard} from './styledComponents'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <>
      <Header />
      <HomeContainer>
        <HomeTitle>Your Flexibility, Our Excellence</HomeTitle>
        <DigitalCard
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </HomeContainer>
    </>
  )
}

export default Home
