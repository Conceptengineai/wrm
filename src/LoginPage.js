import React from 'react';

import { userService } from './services/user.service';

import './css/login.scss';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (
            <div className="login_form">
                <div className="login_form--header">Logowanie</div>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={"login_form--group" + (submitted && !username ? ' login_form--group_has-error' : '')}>
                        <input type="text" name="username" value={username} placeholder="Nazwa użytkownika" onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="login_form--group_required">Field is required</div>
                        }
                    </div>
                    
                    <div className={"login_form--group" + (submitted && !password ? ' login_form--group_has-error' : '')}>
                        <input type="password" name="password" value={password} placeholder="Hasło" onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="login_form--group_required">Field is required</div>
                        }
                    </div>
                    
                    <div className="login_form--button">
                        <button className="login_form--button_submit" disabled={loading}>Logowanie</button>
                    </div>
                </form>
                {error &&
                    <div className={'login_form--alert login_form--alert-danger'}>{error}</div>
                }
            </div>
        );
    }
}

export { LoginPage };