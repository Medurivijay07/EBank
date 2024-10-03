import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {HeaderContainer, WebsiteLogoImg, LogoutButton} from './styledComponents'

const Header = props => {
  const onClickingLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <HeaderContainer>
      <WebsiteLogoImg
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
      />
      <LogoutButton type="button" onClick={onClickingLogout}>
        Logout
      </LogoutButton>
    </HeaderContainer>
  )
}

export default withRouter(Header)
