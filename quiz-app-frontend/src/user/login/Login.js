import { Button, Input,Form, notification } from 'antd';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import  Api  from '../../api/Api';

import { UserAddOutlined,LockOutlined } from '@ant-design/icons';




class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:{
               value: ''
            },
            password:{
                value:''
            }
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     
    handleSubmit =(values)=>  {

        

            

        console.log(values.name);
        console.log(values.password);
        //const loginRequest = Object.assign({}, values);
        Api.login(values)
        .then(response => {
            this.props.onLogin();
            console.log(response.data.message);
            }).catch(error => {
                if(error.response.status === 401) {
                    notification.error({
                        message: 'Quiz App',
                        description: 'Nazwa uzytkownika lub hasło nieprawidłowe.Spróbuj ponownie!'
                    });                    
                } else {
                    console.log('response: ', error.response.data);
                    notification.error({
                        message: 'Quiz App',
                        description: error.message || 'Błąd!'
                    });                                            
                }
        });
    }
    
    

    render() {
        

        
        return (
            <div className="login-container">
                <h1 className="login-title">Logowanie</h1>
                <div className="login-content">
                    <Form onFinish={this.handleSubmit} className="login-form">
                        <Form.Item name="name" rules={[{ required: true, message: 'Wpisz nazwę użytkownika!' }]}>
                            <Input 
                                prefix={<UserAddOutlined />}
                                size="large"
                                placeholder="Nazwa użytkownika"
                                />    
                            
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Wpisz hasło!' }]}>
                            <Input 
                                prefix={<LockOutlined />}
                                size="large"
                                type="password" 
                                placeholder="Hasło" 
                                />                        
                            
                        </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" size="large"
                                className="login-button">Zaloguj się</Button>
                                lub <Link to="/signup">zarejestruj się!</Link>
                            </Form.Item>
                    </Form>
                </div>
            </div>
                          
        );
    }

      
}


export default Login;