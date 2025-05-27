import {GeografiskBosted} from '../../ducks/geografiskBosted';

export const geografiskBostedListMockData = (): GeografiskBosted[] => {
    return [
        {code: '0301', navn: '0301 Oslo'},
        {code: '030103', navn: '030103 Sagene'},
        {code: '1103', navn: '1103 Stavanger'},
        {code: '110307', navn: '110307 Hinna'}
    ];
};
