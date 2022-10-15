import React,{useEffect,useState}from 'react'
import Left from "./left"
import Hopage from "./homePage"
import { Outlet } from 'react-router-dom'
import HomePage from './homePage'
export default function MainMusic() {

  return (
    <div className="music-container">
        <div className="container-left">
          <div  className="left-sticky" >
              <Left></Left>
              <HomePage></HomePage>
          </div>
        </div>
        <div className="container-right">
            <Outlet/>
        </div>
    </div>
  )
}
