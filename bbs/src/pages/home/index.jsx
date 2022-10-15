import {Carousel} from 'antd';
import React, {} from 'react';
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#CCC',
};

export default function HomePage() {
  return (
    <>      
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>占位</h3>
        </div>
        <div>
          <h3 style={contentStyle}>占位</h3>
        </div>
        <div>
          <h3 style={contentStyle}>占位</h3>
        </div>
        <div>
          <h3 style={contentStyle}>占位</h3>
        </div>
      </Carousel>
      </>
  )
}
