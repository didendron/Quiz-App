import { notification } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import { Component } from 'react';
import {  Switch, withRouter } from 'react-router-dom';
import './App.css';
import '../common/AppHeader';
import AppHeader from '../common/AppHeader';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      currentUser:null,
      isAuthenticated:false
    }

    notification.config({
      placement:'top',
      top:100,
      duration:4
    })
  }


  render(){
    return(
      <Layout className="app-container">
        <AppHeader isAuthenticated={this.state.isAuthenticated}
        currentUser={this.state.currentUser}/>


        <Content className="app-content">
          <div className="container">
            <Switch>
              
              
              
            </Switch>
          </div>
        </Content>

      </Layout>


    );
  }

}

export default withRouter(App);