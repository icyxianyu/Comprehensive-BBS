import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import PersonPage from "../pages/person";
import CreatePage from "../pages/person/createPage";
import PersonList from "../pages/person/personList";
import ReadPage from "../pages/ReadPage"
import RankPage from "../pages/Rank"
import LivePage from "../pages/Live"
import LiveInfo from "../pages/Live/Info"
import LiveMain from "../pages/Live/LiveMain"
import MusicPage from "../pages/Music";
import Quick from "../pages/Music/QuickResponse"
import MusicMain from "../pages/Music/Main"
import Playlist from "../pages/Music/Main/content/right/Playlist.jsx"
import Song from "../pages/Music/Main/content/right/Song.jsx"
import Error  from "../components/error";
import { Navigate } from "react-router-dom";
const router= [{
    // 主页路由
    path:'/homePage',
    element:<HomePage/>
},{
    //登录界面
    path:'/loginPage',
    element:<LoginPage/>
},{
    //个人主页
    path:'/personPage',
    element:<PersonPage/>,
    children:[
        {
            path:"",
            element:<PersonList></PersonList>
        }]
},
{
    //排行页面
    path:"/rankPage",
    element:<RankPage/>
},
{   
    //直播页面
    path:"/livePage",
    element:<LivePage/>,
    children:[
        {
            path:"",
            element:<LiveMain/>
        }
        ,
        {
            path:"LiveInfo/:RoomID",
            element:<LiveInfo/>
        }
    ]
},
{
    path:"/musicPage",
    element:<MusicPage/>,
    children:[
    {
        path:"MusicLogin",
        element:<Quick/>
        
    },{
        path:"Main",
        element:<MusicMain/>,
        children:[
            {
                path:"",
                element:<Playlist/>
            },{
                path:"Playlist/:MusicID",
                element:<Song/>
            }
        ]
    },{
        path:"",
        element:<Navigate to="Main"></Navigate>
    }
]
},
{
    // 阅读界面
path:"/readPage/:BBSID",
element:<ReadPage/>
},
{
    //创作界面
    path:"/createPage",
    element:<CreatePage/>
    },
{
    //重定向界面
    path:"/",
    element:<Navigate to="/homePage"/>

},{
    //鬼晓得输入了啥页面
    path:"*",
    element:<Error/>
}
]
export default router