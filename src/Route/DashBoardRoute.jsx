import Home from '../Pages/DashBoard/Home'
import Inotebook from '../Pages/DashBoard/InoteBook'
import DisplayNote from '../Pages/DashBoard/DisplayNote'
import SearchDisplay from '../Component/SearchDisplay'
import HomeNews from '../Pages/DashBoard/HomeNews'
import News from '../Pages/DashBoard/News'
import TextUtils from '../Pages/DashBoard/Text-Utils'
import TaskManager from '../Pages/DashBoard/TaskManager'



export const DashBoardRoute = [
    {
        path:'/home',
        element: <Home/>,
    children:[
    {
        path: '',
        element: <Inotebook/>
    },
    { 
      path:'news',
      element:<HomeNews/>,
      children:[
        {
            path:'',
            element: <News/>
        },
        {
        path:':category',
        element: <News/>
        },    
    ]
    },
    
    {
        path: 'textutils',
        element: <TextUtils/>
    },
    {
        path: 'taskmanager',
        element: <TaskManager/>
    },
    {
        path:'displaynote',
        element: <DisplayNote/>
    },
    {
        path:'displaynote/searchresult',
        element: <SearchDisplay/>
    }
]
    }
   
]
