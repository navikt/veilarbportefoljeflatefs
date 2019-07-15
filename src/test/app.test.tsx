import React from 'react';
import ReactDOM from 'react-dom';
import Routes from '../routes';

it('renders without crashing', () => {
    const div = document.createElement('mainApp');
    ReactDOM.render(<Routes/>, div);
});
