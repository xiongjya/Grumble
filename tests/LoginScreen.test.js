import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { LoginScreen } from '../src/screens/Authentication/LoginScreen';

test('renders default elements', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    /*
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    */

    getByPlaceholderText('Email');
});