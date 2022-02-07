import React, { useEffect } from 'react';
import {Navigate} from 'react-router-dom';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useTypedSelector } from '../hooks/use-typed-selector';
import { useActions,} from '../hooks/use-actions';

import ItemModal from '../components/ItemModal';
import './style_.css';



const Home: React.FC = () => {
    const {getItems, deleteItem, clear} = useActions();
    const {item: {items, error}, auth: {isAuthenticated}} = useTypedSelector(({item, auth}) => ({item, auth}));  
     
    useEffect(() => {
        getItems()
    }, [])

    useEffect(() => {
        if(error){
            alert(error);
            clear();
        }
    }, [error, clear])

    const onDeleteClick = (id: number) => deleteItem(id);
    
    if(!isAuthenticated){
        return <Navigate to="/login" />
    } 

    return (
        <>
            <div className="row" style={{paddingTop:'10px'}} >
                <div className="col">
                    <hr />
                </div>
                <div className="col-auto"><p className="h3" style={{margin: 'auto'}}>Diary</p></div>
                <div className="col"><hr /></div>
            </div>
            <Container> 
                <ItemModal />

                <ListGroup>
                    <TransitionGroup className="shoopping-list">
                        {items.map(({id, title, content}) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem className='mb-2'>                                 
                                    <Button 
                                        className="remove-btn float-right"
                                        color="danger" 
                                        size="sm"
                                        onClick={()=>onDeleteClick(id)}
                                    >&times;</Button>
                                    {title} 
                                    <div className="w-75 text-muted">{content}</div>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        </>
    )
};

export default Home;
