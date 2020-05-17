import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CompControlForm from './CompControlForm';

const CompPanel = ({ t }) => (
        <CompControlForm onSubmit />
);

CompPanel.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(CompPanel);
