
import './output.css'
import { ColProvider } from './Pages/Context/TextColContext.jsx'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { rou } from './Router.jsx'
import React from 'react'
import { NotesProvider } from './Pages/Context/AllNotesContext.jsx';
import { Provider} from 'react-redux'
import { store } from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColProvider>
<NotesProvider>
  <Provider store={store}>
   <RouterProvider router={rou}/>
   </Provider>
</NotesProvider>
   </ColProvider>
  </React.StrictMode>,
)
