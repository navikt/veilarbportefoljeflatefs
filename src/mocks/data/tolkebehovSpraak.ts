import {TolkebehovSpraak} from '../../ducks/tolkebehov';

export const tolkebehovSpraakMockData = (): TolkebehovSpraak[] => {
    return [
        {code: 'AR', spraak: 'Arabisk'},
        {code: 'NB', spraak: 'Norsk'},
        {code: 'ES', spraak: 'Spansk'},
        {code: 'UK', spraak: 'Ukrainsk'}
    ];
};
