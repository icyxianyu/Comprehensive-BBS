
import { Menu } from 'antd';
import React from 'react';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('网易云', '1', <img style={{width:'20px'}} src="https://s1.music.126.net/style/favicon.ico?v20180823" ></img>),
  getItem('在写了在写了', '2'),
];

const App = () => {

  return (
    <div
      style={{
        width: 52,
        position:"absolute",
        left: 0,
        top:"20vh"
      }}
    >
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        items={items}
        style={{width:"52px"}}
      />
    </div>
  );
};

export default App;

