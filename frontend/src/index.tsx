import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MyRoutes from './routes/MyRoutes';
import { store } from './store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <BrowserRouter >
      <Provider store={store}>
          <MyRoutes />
      </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
