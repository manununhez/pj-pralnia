import React from "react";

// reactstrap components
import {
  Alert,
  Container,
  Row,
  Col
} from "reactstrap";

import './Footer.css'

class FooterBack extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Alert className="footer-back" color="warning">
              {this.props.textBack}
            </Alert>
          </Col>
          <Col>
            <Alert className="footer" color="success">
              {this.props.text}
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FooterBack;
