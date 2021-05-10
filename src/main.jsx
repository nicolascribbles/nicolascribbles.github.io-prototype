import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { BrowserRouter } from 'react-router-dom';
import App from "/src/App";
import "/css/styles.css";

ReactDOM.render(
    <BrowserRouter>
      <App />
    </ BrowserRouter> , document.getElementById('root'));