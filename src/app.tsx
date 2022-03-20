import React from 'react';
import ReactDOM from 'react-dom';
import './global.less';
import Home from '@/views/Home';

const App = () => {
  return (
    <>
      {'Hello React'}
      <Home />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
