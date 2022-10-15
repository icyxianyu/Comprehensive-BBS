import React from 'react'
import { Button, Result } from 'antd';
export default function Error() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你所寻找的页面不存在"
      extra={<Button type="primary">Back Home</Button>}
  />
  )
}
