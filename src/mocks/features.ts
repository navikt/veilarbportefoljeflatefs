import { ENDRINGSLOGG, OPPFOLGING_STARTET, SPOR_OM_TILBAKEMELDING, VIS_MOTER_MED_NAV } from '../konstanter';

const toggles = {
    [SPOR_OM_TILBAKEMELDING]: true,
    [ENDRINGSLOGG]: true,
    [VIS_MOTER_MED_NAV]: true,
    [OPPFOLGING_STARTET]: false,
};

export default toggles;
