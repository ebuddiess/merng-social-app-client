import { BrowserRouter as Router , Route , Switch}  from 'react-router-dom';

import SinglePost from './Pages/SinglePost';


import Post from './Pages/Post';


import PrivateRoute from './Pages/PrivateRoute';


import AuthProvider from './context/auth';


import Nav from './components/Nav';


import Register from './Pages/register';

import { Container } from 'semantic-ui-react'

import Login from './Pages/login';   
import  'semantic-ui-css/semantic.min.css';
import Main from './Pages/Index';

import './App.css';

function App() {
  return (
   <AuthProvider>
      <Router>
      <Nav/>
      <Container>
      <Switch>
        <Route exact path="/" component={Main} />
        <PrivateRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/register" component={Register} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/posts/:id" component={SinglePost} />
      </Switch>
      </Container>
    </Router>
   </AuthProvider>
  );
}

export default App;
