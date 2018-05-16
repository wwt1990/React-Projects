import React from 'react';
import { Redirect } from "react-router-dom";
import { Button, ControlLabel, Form, FormControl, FormGroup } from "react-bootstrap";
import authService from "../../services/authService";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: authService.isAuthenticated()
        };
        this.login = this.login.bind(this);
    }


    login = () => {
        authService.signIn(() => {
            this.setState({
                isLoggedIn: authService.isAuthenticated()
            })
        })
    };
    render() {

      const { target } = this.props.location.state || { target: {pathname: '/account'} };
        if (this.state.isLoggedIn) {
            return <Redirect to={target}/>;
        }


        return (
            <div style={{width: 200}}>
                <h1>Sign In</h1>
                <Form horizontal={true}>
                    <FormGroup>
                        <ControlLabel>Email Address</ControlLabel>
                        <FormControl
                            type="string"
                            placeholder="Email"
                            size={{length: 40}}
                        />

                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            placeholder="Password"
                            length={'40px'}
                        />

                        <Button className='btn btn-primary mt-3' onClick={this.login}>Sign in</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    };
}

export default LoginForm;
