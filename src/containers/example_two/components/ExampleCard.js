import React, {PureComponent} from 'react';
import {Card, CardBody, Col} from 'reactstrap';

export default class ExampleCard extends PureComponent {
  render() {
    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>Exemple de titre</h5>
              <h5 className='subhead'>Exemple de sous-titre</h5>
            </div>
            <p>
              Notre contenu ici
            </p>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

