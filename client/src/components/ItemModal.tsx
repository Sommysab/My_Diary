import React, {SyntheticEvent, useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {useActions} from '../hooks/use-actions';



const ItemModal: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setCont] = useState('');

  const {addItem} = useActions();

  const toggler = () => setToggle(!toggle);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
  }

  const contentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCont(e.target.value);
  }

  const onSubmit = (e: SyntheticEvent) => {
      e.preventDefault(); 

      // Add item via addItem action
      addItem({
        id:0,
        title, 
        content
      });

      // Close modal
      toggler();
  }


  return (
      <div>
          <Button 
              color="dark" 
              onClick={toggler}
              style={{marginBottom: '2rem'}}
          >Add</Button>
          
          <Modal 
            isOpen={toggle}
            toggle={toggler}
          >
            <ModalHeader toggle={toggler}>Add to your diary</ModalHeader>
            <ModalBody>
              <Form onSubmit={onSubmit}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input 
                    type="text" name="title" placeholder="Add title" className='mb-3'
                    onChange={e => titleChange(e)}
                  /> 
                  <Label for="details">Details</Label>
                  <Input 
                    type="text" name="content" placeholder="Add details"
                    onChange={e => contentChange(e)}
                  /> 
                  <Button color="dark" style={{marginTop: '2rem'}} block>
                    Save 
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
      </div>
  )

};

export default ItemModal;
