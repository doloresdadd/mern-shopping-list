import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import uuid from 'uuid';

class ShoppingList extends Component {
    state = {
        items:[
            { id: uuid(), name:'Eggs'},
            { id: uuid(), name:'Milk'},
            { id: uuid(), name:'Steak'},
            { id: uuid(), name:'Water'}
        ]
    }
  render() {
      const { items } = this.state;
    return (
      <Container>
          <Button
            color="info"
            style={{marginBottom: '2rem'}}
            onClick={() => {
                const name = prompt('Enter Item');
                if(name) {
                    this.setState(state => ({
                        items: [...state.items, { id: uuid(), name}]
                    }));
                }
            }}
          >Add Item</Button>
          <ListGroup>
              <TransitionGroup className="shopping-list">
                {items.map(({ id, name}) => (
                    <CSSTransition key={id} timeout={500} classNames="fade">
                        <ListGroupItem>
                            <Button 
                            color="info"
                            className="edit-btn"
                            size="sm"
                            ><FontAwesomeIcon icon="edit" /></Button> &nbsp;
                            <Button
                             color="danger"
                             className="remove-btn"
                             size="sm"
                             onClick={() => {
                                 this.setState(state => ({
                                     items: state.items.filter(item => item.id !== id)
                                 }));
                             }}
                             ><FontAwesomeIcon icon="times" background="red" /></Button> &nbsp;
                            {name}
                        </ListGroupItem>
                    </CSSTransition>
                ))}
              </TransitionGroup>
          </ListGroup>
      </Container>
    )
  }
}

export default ShoppingList;
