import {HomeOutlined,PlayCircleOutlined,BarChartOutlined,DesktopOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {Link} from "react-router-dom"
import Search from "./search"
import Person from "./person"
const items = [
  {
    label:(
        <Link to="/homePage">主页</Link>
    ),
    key: 'homePage',
    icon: <HomeOutlined/>
  },
  {
    label:(<Link to="/rankPage">排行</Link>),
    key:"rankPage",
    icon:<BarChartOutlined />
  },
  {
    label:(<Link to="/livePage">直播</Link>),
    key:"livePage",
    icon:<DesktopOutlined />
  },{
    label:(<Link to="/musicPage">音乐</Link>),
    key:"musicPage",
    icon:<PlayCircleOutlined />
  },
  {
    label:(
      <Search/>
    ),
    key: 'searchPage',
  },
  {
    label:(
      <Person/>
    ),
    key: 'PersonPage',
  },
];

const App = () => {
  const localtion=useLocation ();
  const [current,setCurrent] = useState(localtion.pathname.slice(1));
  const selectItem=(e)=>{
    setCurrent(e.key)
  }
  return (
      <Menu 
          selectedKeys={[current]} 
          mode="horizontal" 
          items={items} 
          style={{
            justifyContent: 'space-around',
            height: '100%',
          }}
          onSelect={selectItem}
          />
          );
};

export default App;
