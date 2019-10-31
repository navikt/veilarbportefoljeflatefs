import {ENDRINGSLOGG, FLYTT_STATUSFILTER, SPOR_OM_TILBAKEMELDING, VIS_MOTER_MED_NAV, OPPFOLGING_STARTET} from '../konstanter';

const toggles = {
    [SPOR_OM_TILBAKEMELDING]: false,
    [ENDRINGSLOGG]: true,
    [VIS_MOTER_MED_NAV]: true,
    [FLYTT_STATUSFILTER]: true,
    [OPPFOLGING_STARTET]: true
};

export default toggles;
