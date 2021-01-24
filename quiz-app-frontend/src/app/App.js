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

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      currentUser:null,
      isAuthenticated:false
    }

    this.handleLogin = this.handleLogin.bind(this);
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

  componentDidMount(){
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    
    getCurrentUser()
    .then(response => {
      console.log(response.name);
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        
      });
      console.log("currentUser: "+this.state.currentUser.name);
    }).catch(error => {
      this.setState({
        isAuthenticated: false 
      });

    });
  }l


  render(){
    return(
      <Layout className="app-container">
        <AppHeader isAuthenticated={this.state.isAuthenticated}
        currentUser={this.state.currentUser}/>


        <Content className="app-content">
          <div className="container">
            <Switch>

            <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
            <Route path="/signup" component={Signup}></Route>
              
            </Switch>
          </div>
        </Content>

      </Layout>


    );
  }

}

export default withRouter(App);