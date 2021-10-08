import { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About'
import Posts from './pages/Posts'
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import DetailPost from './pages/DetailPost';
import ListPost from './pages/ListPost';
import Join from './pages/Join';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/create-post" component={CreatePost} />
          <Route exact path="/update-post/:id" component={UpdatePost} />
          <Route exact path="/read-post/:id" component={DetailPost} />
          <Route exact path="/list-post/:sortType" component={ListPost} />
          <Switch>
            <Route path="/about/:name" component={About} />
            <Route path="/about" component={About} />
          </Switch>
          <Route path="/posts" component={Posts} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
