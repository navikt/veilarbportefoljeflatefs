import {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {BrukerModell, HuskelappModell} from '../../model-interfaces';
import {HuskelappModal} from './redigering/HuskelappModal';
import {ReactComponent as HuskelappIkon} from '../../components/ikoner/huskelapp/Huskelappikon_bakgrunnsfarge.svg';
import {ReactComponent as HuskelappIkonTomt} from '../../components/ikoner/huskelapp/Huskelappikon_stiplet.svg';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {SKJUL_ARBEIDSLISTEFUNKSJONALITET} from '../../konstanter';

export const HuskelappIkonInngang = ({bruker}: {bruker: BrukerModell}) => {
    const [skalViseHuskelappModal, setSkalViseHuskelappModal] = useState<boolean>(false);

    const arbeidslistefunksjonalitetSkalVises = !useFeatureSelector()(SKJUL_ARBEIDSLISTEFUNKSJONALITET);
    const arbeidslisteAktiv = bruker.arbeidsliste?.arbeidslisteAktiv;
    const harHuskelappEllerArbeidsliste =
        !!bruker.huskelapp || (arbeidslisteAktiv && arbeidslistefunksjonalitetSkalVises);

    const titletekst = () => {
        if (bruker.huskelapp) {
            return 'Endre huskelapp';
        }
        return arbeidslisteAktiv ? 'Bytt fra arbeidsliste til huskelapp' : 'Opprett huskelapp';
    };

    return (
        <>
            <Button
                size="small"
                variant="tertiary"
                icon={harHuskelappEllerArbeidsliste ? <HuskelappIkon /> : <HuskelappIkonTomt />}
                title={titletekst()}
                onClick={() => setSkalViseHuskelappModal(true)}
            />
            {skalViseHuskelappModal && (
                <HuskelappModal
                    onModalClose={() => setSkalViseHuskelappModal(false)}
                    isModalOpen={skalViseHuskelappModal}
                    huskelapp={bruker.huskelapp as HuskelappModell}
                    arbeidsliste={bruker.arbeidsliste.arbeidslisteAktiv ? bruker.arbeidsliste : null}
                    bruker={bruker}
                />
            )}
        </>
    );
};
