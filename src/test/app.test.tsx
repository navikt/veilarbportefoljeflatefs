import ReactDOM from 'react-dom';
import Application from '../application';

it('renders without crashing', () => {
    const div = document.createElement('mainApp');
    ReactDOM.render(<Application />, div);
});
