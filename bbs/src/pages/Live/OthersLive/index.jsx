import React from 'react'
const temp=new Array(20).fill(0)
export default function index() {
  return (
    <>
    {
      temp.map((_,key)=>{
          return (<div style={{textAlign:"center"}}  key={Math.random()}>占位占位，以后可能会加入新东西</div>)
      })
    }
    </>
  )
}
