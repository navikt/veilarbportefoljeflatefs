import React, {useState} from 'react';
import {BodyShort, Button, Heading, List, Modal} from '@navikt/ds-react';
import {FargekategoriModell, Fargekategorinavn} from '../../model-interfaces';
import fargekategoriIkonMapper from './fargekategori-ikon-mapper';
import './bekreft-endre-fargekategori-pa-mange-modal.css';

interface Props {
    valgteBrukereFnrs: string[];
    valgtFargekategori: FargekategoriModell;
    onBekreft: () => void;
    onAvbryt: () => void;
}

export const BekreftEndreFargekategoriPaMangeModal = ({
    valgteBrukereFnrs,
    valgtFargekategori,
    onBekreft,
    onAvbryt
}: Props) => {
    const [loading, setLoading] = useState(false);
    const onBekreftClick = () => {
        onBekreft();
        setLoading(true);
    };

    return (
        <Modal
            open={true} // Rendring styrt utanfrå
            className="bekreft-fargekategori-pa-mange-modal"
            onClose={onAvbryt}
            closeOnBackdropClick={true}
        >
            <Modal.Header>
                <Heading size="small" level="1">
                    Er du sikker på at du vil endre kategori?
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyShort spacing>
                    Du har valgt {valgteBrukereFnrs.length} personer og kategorien{' '}
                    {fargekategoriIkonMapper(
                        valgtFargekategori,
                        'kategori-som-skal-bekreftes',
                        Fargekategorinavn[valgtFargekategori]
                    )}
                </BodyShort>
                <List as="ul" size="small" title="Valgte brukere:">
                    {valgteBrukereFnrs.map(fnr => (
                        <List.Item key={fnr}>{fnr}</List.Item>
                    ))}
                </List>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onBekreftClick} size="small" loading={loading}>
                    Ja, jeg vil endre kategorier
                </Button>
                <Button onClick={onAvbryt} size="small" variant="secondary">
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
