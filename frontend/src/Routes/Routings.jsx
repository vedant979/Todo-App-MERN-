import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { Tasks } from '../Pages/Tasks/Tasks'
import { Deleted } from '../Pages/Deleted/Deleted'
import { Done } from '../Pages/Done/Done'

export const Routings = () => {
  return (
    <Router>
        <Routes>
        <Route exact path="/" Component={Tasks}></Route>
        <Route exact path="/deleted" Component={Deleted}></Route>
        <Route exact path="/done" Component={Done}></Route>
        </Routes>
    </Router>
  )
}
