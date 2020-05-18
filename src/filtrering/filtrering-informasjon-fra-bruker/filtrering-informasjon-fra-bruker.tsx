import * as React from 'react';
import { cvJobbprofil, registreringstype } from '../filter-konstanter';
import Dropdown from '../../components/dropdown/dropdown';
import CheckboxFilterform from '../../components/checkbox-filterform/checkbox-filterform';
import { Normaltekst } from 'nav-frontend-typografi';
import { ReactComponent as InfoIkon } from '../../components/ikoner/info-ikon.svg';
import './filtrering-info-fra-bruker.less';

interface FiltreringInformasjonOmBrukerProps {
    filtervalg: any;
    endreFiltervalg: (filterId: string, filterVerdi: any) => void;
}

const FiltreringInformasjonOmBruker = ({filtervalg, endreFiltervalg}: FiltreringInformasjonOmBrukerProps) => (
    <div className="row">
        <div className="col-sm-12 blokk-xs info-om-brukere__wrapper">
            <Dropdown
                name="CV og jobbprofil"
                render={(lukkDropdown) =>
                    <CheckboxFilterform
                        form="cvJobbprofil"
                        valg={cvJobbprofil}
                        filtervalg={filtervalg}
                        endreFilterValg={endreFiltervalg}
                        closeDropdown={lukkDropdown}
                        className="cvJobbprofil"
                    />
                }
            />
            <Dropdown
                name="Svar fra registrering"
                render={(lukkDropdown) =>
                    <>
                        <div className="registreringsfilter__infocontainer">
                            <InfoIkon className="registreringsfilter__infoikon"/>
                            <Normaltekst className="registreringsfilter__infotekst">
                                Situasjonen brukeren oppgir på registreringstidspunktet.
                            </Normaltekst>
                        </div>
                        <CheckboxFilterform
                            form="registreringstype"
                            valg={registreringstype}
                            filtervalg={filtervalg}
                            endreFilterValg={endreFiltervalg}
                            closeDropdown={lukkDropdown}
                            className="registreringstype"
                        />
                    </>
                }
            />

        </div>
    </div>
);

export default FiltreringInformasjonOmBruker;
