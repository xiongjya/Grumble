import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { LoginScreen } from '../src/screens/Authentication/LoginScreen';
import App from '../App';
import { expect, jest } from '@jest/globals';

it('renders default elements', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    getByPlaceholderText('Email');
    getByPlaceholderText('Password');
    getByText('Login');
});

it('navigates to Register Screen', () => {
    const navigate = jest.fn();
    const { getByText, debug } = render(<LoginScreen navigation={{ navigate }}/>);

    fireEvent.press(getByText("Don't have an account? Sign up here!"));
    expect(navigate).toHaveBeenCalledWith('Register');

    debug();
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