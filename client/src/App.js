import React from 'react';

// We use Route in order to define the different routes of our application
import { Route } from 'react-router-dom';

// We import all the components we need in our app
import Navbar from './components/navbar';
import Edit from './components/edit';
import Register from './components/register';
import RecordList from './components/recordList';

const App = () => {
  return (
    <div>
      <Navbar />
      <Route exact path='/'>
        <RecordList />
      </Route>
      <Route path='/edit/:id' component={Edit} />
      <Route path='/register'>
        <Register />
      </Route>
    </div>
  );
};

export default App;
