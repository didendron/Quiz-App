
import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import './AppHeader.css';


class AppHeader extends Component{
    

    constructor(props){
        super(props);

        this.handleMenuClick = this.handleMenuClick.bind(this); 

    }

    handleMenuClick({key}){
        if(key==="logout"){
            this.props.onLogout();
        }
    }

    render(){
        let menuItems;
        if(this.props.currentUser){
            menuItems = [
                <Menu.Item key="/new">
                  <Link to="/new">Nowy Quiz</Link>
                </Menu.Item>,
                <Menu.Item key="logout" className="logout">
                  Wyloguj się
                </Menu.Item>, 
                <Menu.Item key="user" className="user" >
                    @{this.props.currentUser}
                </Menu.Item>                
              ]; 

        }else{
            menuItems = [
                <Menu.Item key="/new">
                  <Link to="/new">Nowy Quiz</Link>
                </Menu.Item>,
                <Menu.Item key="/login">
                  <Link to="/login">Logowanie</Link>
                </Menu.Item>,
                <Menu.Item key="/signup">
                  <Link to="/signup">Rejestracja</Link>
                </Menu.Item>                  
              ]; 
        }
        
           
        
        return(
            <Header className="app-header">
                <div className="container">
                    <div className="app-title" >
                        <Link to="/">Quiz App</Link>
                    </div>
                     <Menu onClick={this.handleMenuClick} className="app-menu"
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{ lineHeight: '64px' }}>
                        {menuItems}

                    </Menu>
                </div>

            </Header>
        );
    }

}

export default withRouter(AppHeader);