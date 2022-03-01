import logo from './logo.svg';
import './App.css';
import { Container } from '@material-ui/core';
import NavBar from './components/navbar/NavBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Container maxwith="lg">
        <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Auth" component={Auth} />
          </Switch>
          </Container>
        </BrowserRouter>
    </div>
  );
}

export default App;
