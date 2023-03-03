import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import * as serviceWorker from './serviceWorker';

window.MAX_IMAGE_SIZE = 500;
// window.IMG_HOST_URL = '/be/accel/bits';
//window.IMG_HOST_URL = 'http://homable.in/be/accel/bits';
window.IMG_HOST_URL = 'http://localhost/koora-stars';
// window.BACK_END_URL = "/be/accel/bits/php/";
window.BACK_END_URL = "http://localhost/koora-stars/php/";
//window.BACK_END_URL = "http://homable.in/be/accel/bits/php/";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
