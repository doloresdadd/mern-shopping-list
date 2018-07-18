import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, 
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input} from 'reactstrap';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { getItems, deleteItem, updateItem, getItem } from '../actions/ItemActions';
import PropTypes from 'prop-types';
import uuid from 'uuid';

class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            isEditing: false,
            item: {}
            
        };
        
        this.setState({
            item: this.props.item
        })
      }
      
    
        
     
       
          onChange = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        }
        
        

        onSubmit = (e) => {
            e.preventDefault();
    
            const updatedItem = {
                id: this.state.id,
                name: this.state.name
            }
    
            //Add item via add item action
            this.props.updateItem(updatedItem);
    
            //Close Modal
            this.toggle()
        }
    

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    
    }

    editItem = (item) => {
        this.toggle();
        this.props.getItem(item);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
   

  render() {
      
      const { items } = this.props.item;
    return (
      <Container>
          
          <ListGroup>
              <TransitionGroup className="shopping-list">
                {items.map(({ id, name}) => (
                    <CSSTransition key={id} timeout={500} classNames="fade">
                        <ListGroupItem>
                            {/* <Button 
                            color="info"
                            className="edit-btn"
                            size="sm"
                            onClick={this.editItem.bind(this, id)}
                            ><FontAwesomeIcon icon="edit" /></Button> &nbsp; */}
                            
                            <Button
                             color="danger"
                             className="remove-btn"
                             size="sm"
                             onClick={this.onDeleteClick.bind(this, id)}
                             ><FontAwesomeIcon icon="times" background="red" /></Button> &nbsp;
                            {name}
                        </ListGroupItem>
                    </CSSTransition>
                ))}
              </TransitionGroup>
          </ListGroup>

          <Modal
                                isOpen={this.state.modal}
                                toggle={this.toggle}
                            >
                                <ModalHeader toggle={this.toggle}>Edit Item</ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={this.saveItem}>
                                        <FormGroup>
                                            <Label for="item">Item</Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                id="item"
                                                
                                                onChange={this.onChange}
                                            >{this.props.name}</Input>
                                            <Button
                                                color="info"
                                                style={{marginTop: '2rem'}}
                                                block
                                            >Add Item</Button>
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                            </Modal>
      </Container>
    )
  }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    items: state.items,
    item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem, updateItem, getItem })(ShoppingList);
