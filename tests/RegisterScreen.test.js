import 'react-native';
import React from 'react';
import { RegisterScreen } from '../src/screens/Authentication/RegisterScreen';
import { render } from '@testing-library/react-native';

it('renders correctly', () => {
    render(<RegisterScreen />);
})