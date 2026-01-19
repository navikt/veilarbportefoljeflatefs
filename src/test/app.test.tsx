import {createRoot} from 'react-dom/client';
import Application from '../application';

it('renders without crashing', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = createRoot(container);
    expect(() => root.render(<Application />)).not.toThrow();

    root.unmount();
    container.remove();
});
