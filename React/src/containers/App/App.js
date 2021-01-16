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


const App = () => {


    return (
        <section className="App">
            <NavigationBar />
            <Switch>
                <Route exact path='/' component={LoginPage} />
                <Route exact path='/user/home' component={HomePageContainer} />
                <Route exact path='/' render={(routerProps) => {
                    console.log(routerProps)
                    return (
                        <LoginPage location={routerProps} />
                    )
                }} />
                <Route exact path='/user/registration' component={RegistrationPage} />
                <Route exact path='/user/email-reset-password' component={Email} />
                <Route exact path='/user/reset-password' component={ResetPassword} />
                <Route component={NotFoundPage} />
            </Switch>
        </section>
    )
}

export default App;


