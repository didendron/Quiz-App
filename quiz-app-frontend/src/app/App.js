import { notification } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import { Component } from 'react';
import {  Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import '../common/AppHeader';
import Signup from '../user/signup/Signup';
import AppHeader from '../common/AppHeader';
import Login from '../user/login/Login';
import  {getCurrentUser}  from '../api/Api';
import { ACCESS_TOKEN } from '../common/constants';
import PrivateRoute from '../common/PrivateRoute';
import NewQuiz from '../quiz/NewQuiz';
import QuizList from '../quiz/QuizList';
import Quiz from '../quiz/Quiz';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      currentUser:null,
      isAuthenticated:false,
      
   }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    

    notification.config({
      placement:'topRight',
      top:100,
      duration:4
    })
  }

  handleLogin() {
    notification.success({
      message: 'Quiz App',
      description: "Jesteś zalogowany.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN)
    this.setState({
      isAuthenticated:false,
      currentUser:null

    })

    this.props.history.push("/");
    notification.success({
          message: 'Quiz App',
          description: "Jesteś wylogowany.",
    });

  }


  componentDidMount(){
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    
    getCurrentUser()
    .then(response => {
      console.log(response.name);
      this.setState({
        currentUser: response.name,
        isAuthenticated: true,
        
      });
      console.log("currentUser: "+this.state.currentUser);
    }).catch(error => {
      this.setState({
        isAuthenticated: false 
      });

    });
  }
  


  render(){
    return(
      <Layout className="app-container">
        <AppHeader isAuthenticated={this.state.isAuthenticated}
        currentUser={this.state.currentUser}
        onLogout={this.handleLogout}/>


        <Content className="app-content">
          <div className="container">
            <Switch>
            <Route exact path="/" 
                  render={(props) => <QuizList  {...props} />}>
            </Route>
            <Route path="/quiz" 
                  render={(props) => <Quiz  {...props} />}></Route>

            <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
            <Route path="/signup" component={Signup}></Route>
            <PrivateRoute authenticated={this.state.isAuthenticated} path="/new" component={NewQuiz} handleLogout={this.handleLogout}></PrivateRoute>
              
            </Switch>
          </div>
        </Content>

      </Layout>


    );
  }

}

export default withRouter(App);