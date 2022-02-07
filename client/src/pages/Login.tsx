import React, {SyntheticEvent, useState, useEffect} from 'react';
import {Navigate} from "react-router-dom";

import { useActions } from '../hooks/use-actions'; 
import { useTypedSelector } from '../hooks/use-typed-selector';


const Login: React.FC = () => {
    
    const {login, clear} = useActions();
    const {error, isAuthenticated} = useTypedSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      if(error){
          alert(error);
          clear();
      };
      
    }, [error, clear]);
    
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        login({email, password});
    }

    if (isAuthenticated) { 
        return <Navigate to="/"/>;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input type="email" className="form-control" placeholder="Email address" required
                   onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
};

export default Login;
