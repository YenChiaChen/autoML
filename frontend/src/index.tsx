import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages';
import { store } from './store';
import { Provider } from 'react-redux'



const App: React.FC = () => (
  <Router>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
  </Routes>
</Router>
);

export default App;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

