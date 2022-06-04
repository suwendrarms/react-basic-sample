import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

function Footer() {
    return (
        <div>
            <Row className="">
                <Col lg={12} md={12} sm={12} className="shadow-sm rounded-lg test-left">
                    <Card.Footer className="text-muted">Copyright © 2021. All Rights Reserved.</Card.Footer>
                </Col>
            </Row>
        </div>
    )
}

export default Footer