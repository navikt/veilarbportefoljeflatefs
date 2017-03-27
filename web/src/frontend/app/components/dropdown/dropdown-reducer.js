const CLOSE_ALL = 'dropdown/CLOSE_ALL';
const TOGGLE = 'dropdown/TOGGLE';

const initalState = {
    name: undefined
};

export default function reducer(state = initalState, action) {
    const { type, data } = action;
    switch (type) {
        case CLOSE_ALL:
            return { name: undefined };
        case TOGGLE:
            return { name: (data === state.name ? undefined : data) };
        default:
            return state;
    }
}

export function toggleDropdown(name) {
    return { type: TOGGLE, data: name };
}

export function closeAll() {
    return { type: CLOSE_ALL };
}
