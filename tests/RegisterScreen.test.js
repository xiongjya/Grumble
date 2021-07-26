import 'react-native';
import React from 'react';
import { RegisterScreen } from '../src/screens/Authentication/RegisterScreen';
import { render } from '@testing-library/react-native';

it('renders default elements', () => {
    const { getByText, getByPlaceholderText, debug } = render(<RegisterScreen />);

    getByPlaceholderText('Username');
    getByPlaceholderText('Email');
    getByPlaceholderText('Password');
    getByText('Register');
})

