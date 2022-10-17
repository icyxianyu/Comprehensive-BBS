import { useRoutes } from "react-router-dom"
import HeaderPage from "./components/header"
import Footerplace from "./components/footer"
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
          height:"6vh",
          minHeight:"50px",
          zIndex:2}}>
            <HeaderPage></HeaderPage>
        </Header>
        <Content 
          style={{ 
            padding: '0 50px',
           marginTop: "6vh" ,
           backgroundColor:"#f3f5f5",
           minHeight:"84vh",
           position:"relative"}}>
            {element}
         </Content>
        <Footer style={{height:"10vh",padding:"0",minHeight:"80px"}}>
                <Footerplace/>
        </Footer>
      </Layout>
    )
}
