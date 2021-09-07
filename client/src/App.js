import React from 'react';

// We use Route in order to define the different routes of our application
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// We import all the components we need in our app
import Navbar from './components/navbar';
import Edit from './components/edit';
import Register from './components/register';
import Login from './components/login';
import RecordList from './components/recordList';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Route exact path='/'>
          <RecordList />
        </Route>
        <Route path='/edit/:id' component={Edit} />
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
      </div>
    </Provider>
  );
};

export default App;
