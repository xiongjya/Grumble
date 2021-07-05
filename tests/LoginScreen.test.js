import 'react-native';
import React from 'react';
import { LoginScreen } from '../src/screens/Authentication/LoginScreen';
import { render, fireEvent } from '@testing-library/react-native';

it('renders default elements', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    getByPlaceholderText('Email');
    getByPlaceholderText('Password');
    getByText('Login');
});

/*
it('', () => {
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const login = getByText('Login');

    const email = 'testing@gmail.com';
    const password = 'password';

    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, password);
    fireEvent.press(login);
});
*/