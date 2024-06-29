import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { Tasks } from '../Pages/Tasks/Tasks'
import { Deleted } from '../Pages/Deleted/Deleted'
import { Done } from '../Pages/Done/Done'
import { SignUp } from '../Pages/SignUp/SignUp'
import { SignIn } from '../Pages/SignIn/SignIn'

export const Routings = () => {
  return (
    <Router>
        <Routes>
        <Route exact path="/todo" Component={Tasks}></Route>
        <Route exact path="/deleted" Component={Deleted}></Route>
        <Route exact path="/done" Component={Done}></Route>
        <Route exact path="/signup" Component={SignUp}></Route>
        <Route exact path="/" Component={SignIn}></Route>
        </Routes>
    </Router>
  )
}
