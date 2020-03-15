import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import UserListTable from './components/UserListTable';

const UserList = () => (
    <Container>
        <Row>
            <Col md={12}>
                <h3 className="page-title">User List</h3>
            </Col>
        </Row>
        <Row>
            <UserListTable />
        </Row>
    </Container>

);

export default UserList;
