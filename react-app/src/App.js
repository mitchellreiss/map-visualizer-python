import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { authenticate } from './store/auth'
import { AuthForm, ProtectedRoute } from './components/AuthForm'
import NavBar from './components/Navbar'
import UsersList from './components/Profile/UsersList'
import User from './components/Profile/User'
import NewForm from './components/NewForm'
import Dashboard from './components/Dashboard'
import Aside from './components/Aside'

function App() {
  const dispatch = useDispatch()

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    dispatch(authenticate()).then(() => {
      setLoaded(true)
    })
  }, [dispatch])

  if (!loaded) {
    return <p>loading...</p>
  }

  return (
    <BrowserRouter>
      <NavBar />
      <MainContent>
        <Aside />
        <Route path="/login" exact={true}>
          <AuthForm form="Login" />
        </Route>
        <Route path="/sign-up" exact={true}>
          <AuthForm form="Sign Up" />
        </Route>
        <ProtectedRoute path="/" exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/new" exact={true}>
          <NewForm />
        </ProtectedRoute>
        <ProtectedRoute path="/routes" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/routes/:id" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/workouts" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/workouts/:id" exact={true}>
          <UsersList />
        </ProtectedRoute>
      </MainContent>
      <Route path="/" exact={true}>
        <AuthForm form="Login" />
      </Route>
    </BrowserRouter>
  )
}

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
`

export default App
