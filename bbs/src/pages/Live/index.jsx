import React from 'react'
import OthersLive from "./OthersLive/index.jsx"
import {Outlet} from  "react-router-dom"
export default function LivePage() {

  return (
    <>
      <Outlet/>
      <hr></hr>
      <OthersLive></OthersLive>
    </>
  )
}
