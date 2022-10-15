import { useRoutes } from "react-router-dom"
import HeaderPage from "./components/header"
import routes from "./router"
import {Layout} from "antd";
const {Header,Content,Footer}=Layout;
export default function App() {
  const style="white";
  const element=useRoutes(routes);
    return(
      <Layout>
        <Header 
        
          style={{
          backgroundColor:style,
          position:'fixed',
          width:'100%' ,
          zIndex:2}}>
            <HeaderPage></HeaderPage>
        </Header>
        <Content 
          style={{ 
            padding: '0 50px',
           marginTop: 64 ,
           backgroundColor:"#f3f5f5",
           minHeight:"50vh",
           position:"relative"}}>
            {element}
         </Content>
        <Footer>

        </Footer>
      </Layout>
    )
}
