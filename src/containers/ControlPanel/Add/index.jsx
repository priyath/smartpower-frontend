import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import AddNewUserForm from './components/UserEditForm';

const UserList = () => (
    <Container>
        <Row>
            <Col md={12}>
                <h3 className="page-title">Add User</h3>
            </Col>
        </Row>
        <Row>
            <AddNewUserForm onSubmit />
        </Row>
    </Container>
);

export default UserList;
