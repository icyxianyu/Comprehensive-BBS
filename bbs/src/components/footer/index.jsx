import React from 'react'
import {GithubOutlined,InfoCircleFilled} from '@ant-design/icons';
export default function Footerplace() {
  return (
    <div className="footer">
        <div className="container">
            <div className="about">
                <span className="box">
                    <span>关于 </span>
                    <span>博客 </span>
                    <span>网站 </span>
                </span>
            </div>
            <div className="media">
            <InfoCircleFilled  spin={true}/>  <GithubOutlined spin={true}/>
            </div>
            <div className="name">
            Made with ❤ by Fish
            </div>
        </div>
    </div>
  )
}
