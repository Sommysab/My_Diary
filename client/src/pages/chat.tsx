import React from 'react';
import {Navigate} from 'react-router-dom';
// import {io} from "socket.io-client";

import { useTypedSelector } from '../hooks/use-typed-selector';
import  './style_.css';

const Home: React.FC = () => {

    const {isAuthenticated} = useTypedSelector(state => state.auth);
    
    !isAuthenticated && <Navigate to="/login" /> 
    
    return (
        <>
            <div className="row" style={{paddingTop:'10px'}} >
                <div className="col">
                    <hr />
                </div>
                <div className="col-auto"><p className="h3" style={{margin: 'auto'}}>Start Chatting</p></div>
                <div className="col"><hr /></div>
            </div>

            <div className="container">
                <div id="messages" className="overflow-auto msgs" style={{overflowY: 'scroll', height:'500px'}}>
                </div>
                <form id="msgForm" action="" method="POST" style={{bottom:0, margin:'0% 0% 0% 0%'}}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Message" aria-label="Message" id="msg" />
                        <div className="input-group-append">
                            <button className="btn btn-success" type="submit" id="sendBtn">Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Home;
