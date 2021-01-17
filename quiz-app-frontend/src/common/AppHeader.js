
import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import './AppHeader.css';


class AppHeader extends Component{
    
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);

    }

    render(){
        let menuItems;

        
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
        
        return(
            <Header className="app-header">
                <div class="container">
                    <div className="app-title" >
                        <Link to="/">Quiz App</Link>
                    </div>
                     <Menu className="app-menu"
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