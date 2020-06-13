import React, { PureComponent } from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import renderSelectField from '../../../../shared/components/form/Select';

class UserEditForm extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            showPassword: false,
        };
    }

    showPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));
    };


    render() {
        const { handleSubmit, reset, t } = this.props;
        const { showPassword } = this.state;

        return (
            <Col md={12} lg={12}>
                <Card>
                    <CardBody>
                        <div className="card__title">
                            <h5 className="bold-text">User Details</h5>
                        </div>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form__form-group">
                                <span className="form__form-group-label">First Name</span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="defaultInput"
                                        component="input"
                                        type="text"
                                        placeholder="First Name"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="form__form-group">
                                <span className="form__form-group-label">Last Name</span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="defaultInput"
                                        component="input"
                                        type="text"
                                        placeholder="Last Name"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="form__form-group">
                                <span className="form__form-group-label">Username</span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="defaultInput"
                                        component="input"
                                        type="text"
                                        placeholder="Username"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="form__form-group">
                                <span className="form__form-group-label">Role</span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="select"
                                        component={renderSelectField}
                                        options={[
                                            { value: 'one', label: 'Administrator' },
                                            { value: 'two', label: 'Employee' },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="form__form-group">
                                <span className="form__form-group-label">E-mail</span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="email"
                                        component="input"
                                        type="email"
                                        placeholder="example@mail.com"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="form__form-group">
                                <span className="form__form-group-label">Password</span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="password"
                                        component="input"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        className={`form__form-group-button${showPassword ? ' active' : ''}`}
                                        onClick={e => this.showPassword(e)}
                                    ><EyeIcon />
                                    </button>
                                </div>
                            </div>
                            <ButtonToolbar className="form__button-toolbar">
                                <Button color="primary" type="submit">Submit</Button>
                                <Button type="button" onClick={reset}>
                                    Cancel
                                </Button>
                            </ButtonToolbar>
                        </form>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default reduxForm({
    form: 'vertical_form', // a unique identifier for this form
})(withTranslation('common')(UserEditForm));
