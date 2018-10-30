import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import ExampleCard from './components/ExampleCard';

export default class ExamplePage extends PureComponent {
  render() {
    return (
      <Container className='dashboard'>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>Exemple d'évènement un</h3>
          </Col>
        </Row>
          <ExampleCard/>
      </Container>
    )
  }
}

