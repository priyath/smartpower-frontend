import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import UserEditForm from './components/UserEditForm';

const UserList = () => (
    <Container>
        <Row>
            <Col md={12}>
                <h3 className="page-title">Add User</h3>
            </Col>
        </Row>
        <Row>
            <UserEditForm onSubmit />
        </Row>
    </Container>
);

export default UserList;
