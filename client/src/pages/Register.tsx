import React, {SyntheticEvent, useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';

import {useActions} from '../hooks/use-actions';
import {useTypedSelector} from '../hooks/use-typed-selector';


const Register: React.FC = () => { 
    
    const {error, noted, isAuthenticated} = useTypedSelector(state => state.auth);
    const {register, clear} = useActions();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(error){
            alert(error);
            clear();
        };
    }, [error, clear])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault(); 
        register({email, password, name}); 
    }

    if (noted) {
        return <Navigate to="/login"/>;
    }

    if(isAuthenticated){
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <input className="form-control" placeholder="Name" required
                   onChange={e => setName(e.target.value)}
            />

            <input type="email" className="form-control" placeholder="Email address" required
                   onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default Register;
