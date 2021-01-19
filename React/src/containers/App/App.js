import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import NavigationBar from '../../components/Navbar/Navbar'
import HomePageContainer from '../../routes/HomePage/HomePageContainer'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import Email from '../../components/ResetPassword/Email/Email'
import ResetPassword from '../../components/ResetPassword/ResetPassword/ResetPassword'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import UserSettings from '../../routes/UserSettings/UserSettings'
import ProfilePageContainer from '../../routes/ProfilePage/ProfilePageContainer'
import { useParams } from 'react-router'
import axios from 'axios';


const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});


  const getUpdatedUser = (user) => {
    axios.post('http://localhost:9001/SocialApp/getUser', {
      userId: user.userId
    })
      .then((response) => {
        setUpdatedUser(response.data)
        window.localStorage.setItem('updatedProfilePic', response.data.profilePicURL);
      })
      .catch((error) => {
        console.log(error);
      });

  }


  function GetProfilePage() {
    let { userId } = useParams();
    return <ProfilePageContainer userId={userId} />
  }



  return (
    <section className="App">
      <NavigationBar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      <Switch>
        <Route exact path='/user/home' component={HomePageContainer} />
        <Route exact path='/user/profile' component={ProfilePageContainer} />
        <Route path='/user/profile/:userId' children={<GetProfilePage />} />
        <Route exact path='/' render={(routerProps) => {
          return (
            <LoginPage location={routerProps} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
          )
        }} />
        <Route exact path='/user/registration' component={RegistrationPage} />
        <Route exact path='/user/email-reset-password' component={Email} />
        <Route exact path='/user/reset-password' component={ResetPassword} />
        <Route exact path='/user/settings' render={(routerProps) => {
          return (
            <UserSettings getUpdatedUser={getUpdatedUser} updatedUser={updatedUser} />
          )

        }} />
        <Route component={NotFoundPage} />
      </Switch>
    </section>
  )
}

export default App;