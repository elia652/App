import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter} from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <AppContextProvider>
    <App />
    </AppContextProvider>
    </BrowserRouter>
 
);

reportWebVitals();
