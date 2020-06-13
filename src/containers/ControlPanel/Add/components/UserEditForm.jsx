import React, { PureComponent } from 'react';
import {
    Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import EyeIcon from 'mdi-react/EyeIcon';
import { withTranslation } from 'react-i18next';
import renderSelectField from '../../../../shared/components/form/Select';
import {createUser} from '../../../../repositories/loginRepository';
import validate from './validate';
import Modal from "../../../../shared/components/Modal";
import {getErrorMessage} from '../Constants';

const renderField = ({
                         input, placeholder, type, meta: { touched, error },
                     }) => (
    <div className="form__form-group-input-wrap">
        <input {...input} placeholder={placeholder} type={type} autoComplete="new-password" />
        {touched && error && <span className="form__form-group-error">{error}</span>}
    </div>
);

renderField.propTypes = {
    input: PropTypes.shape().isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }),
};

renderField.defaultProps = {
    placeholder: '',
    meta: null,
    type: 'text',
};

class AddUserForm extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
        pristine: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired,
    };

    constructor() {
        super();
        this.state = {
            showPassword: false,
            modal: false,
            modalMessage: '',
            modalColor: '',
        };
    }

    showPassword = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));
    };

    handleSubmit = (values) => {
        if (values && values.select && values.select.value) {
            const updatedValues = {role: values.select.value, ...values};
            createUser(updatedValues).then((res) => {
                this.setState({
                    modal: true,
                    modalMessage: `${getErrorMessage(201)}`,
                    modalColor: `success`,
                    modalTitle: `User Creation Successful`,
                })
            }).catch((e) => {
                const status = e.response.status;
                this.setState({
                    modal: true,
                    modalMessage: `${getErrorMessage(status)}`,
                    modalColor: `danger`,
                    modalTitle: `User Creation Failed`,
                })
            })
        }
    }

    modalToggle = (notification) => {
        console.log('notification: ', notification);
        this.setState(prevState => (
            {
                modal: !prevState.modal,
                modalMessage: notification ? 'test' : ''
            }));
    }

    render() {
        const {
            handleSubmit, pristine, reset, submitting, t,
        } = this.props;
        const { showPassword } = this.state;

        return (
            <Col md={12} lg={12} xl={12}>
                <Card>
                    <CardBody>
                        <div className="card__title">
                            <h5 className="bold-text">{t('forms.from_validation.vertical_form_validate')}</h5>
                            <h5 className="subhead">Errors are under fields</h5>
                        </div>
                        <form className="form" onSubmit={handleSubmit(this.handleSubmit)}>
                            <div className="form__form-group">
                                <span className="form__form-group-label">First Name</span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="firstName"
                                        component={renderField}
                                        type="text"
                                        placeholder="First Name"
                                    />
                                </div>
                            </div>
                            <div className="form__form-group">
                                <span className="form__form-group-label">Last Name</span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="lastName"
                                        component={renderField}
                                        type="text"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>
                            <div className="form__form-group">
                                <span className="form__form-group-label">Username</span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="username"
                                        component={renderField}
                                        type="text"
                                        placeholder="Name"
                                    />
                                </div>
                            </div>
                            <div className="form__form-group">
                                <span className="form__form-group-label">E-mail</span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="email"
                                        component={renderField}
                                        type="email"
                                        placeholder="example@mail.com"
                                    />
                                </div>
                            </div>
                            <div className="form__form-group">
                                <span className="form__form-group-label">Password</span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="password"
                                        component={renderField}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        className={`form__form-group-button${showPassword ? ' active' : ''}`}
                                        tabIndex="-1"
                                        onClick={e => this.showPassword(e)}
                                    ><EyeIcon />
                                    </button>
                                </div>
                            </div>
                            <div className="form__form-group">
                                <span className="form__form-group-label">Role</span>
                                <div className="form__form-group-field">
                                    <Field
                                        name="select"
                                        component={renderSelectField}
                                        type="text"
                                        options={[
                                            { value: 'admin', label: 'Admin' },
                                            { value: 'user', label: 'User' },
                                        ]}
                                    />
                                </div>
                            </div>
                            <ButtonToolbar className="form__button-toolbar">
                                <Button color="primary" disabled={submitting} type="submit">Submit</Button>
                                <Button type="button" onClick={reset} disabled={pristine || submitting}>
                                    Reset
                                </Button>
                            </ButtonToolbar>
                        </form>
                        <Modal
                            color={this.state.modalColor}
                            title={this.state.modalTitle}
                            colored
                            showModal={this.state.modal}
                            modalToggle={this.modalToggle}
                            message={this.state.modalMessage}
                        />
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default reduxForm({
    form: 'add_user_form', // a unique identifier for this form
    validate,
})(withTranslation('common')(AddUserForm));
