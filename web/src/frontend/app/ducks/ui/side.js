// Actions
export const SETT = 'veilarbportefoljeflatefs/ui/side/SETT';

const initalState = {
    side: ''
};

// Reducer
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case SETT:
            return { ...state, ...action.data };
        default:
            return state;
    }
}

// Action Creators
export function settSide(side) {
    if (side.includes(':ident')) {
        return { type: SETT, data: { side: 'veilederoversikt' } }; // Pga snåle greier i react-router
    }
    return { type: SETT, data: { side } };
}
