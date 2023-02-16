import CheckboxValg from './checkbox-valg';
import * as React from 'react';
import {Button, Textarea} from '@navikt/ds-react';

interface TilbakemeldingCheckboxProps {
    handleFormSubmitted: () => void;
    kommentarRows: number;
    kommentarMaxChar: number;
    kommentar: string;
    handleKommentarChanged: (e) => void;
    handleCheckboxvalgChanged: (verdi: number[]) => void;
}

function TilbakemeldingsskjemaCheckbox({
    handleFormSubmitted,
    kommentarRows,
    kommentarMaxChar,
    kommentar,
    handleKommentarChanged,
    handleCheckboxvalgChanged
}: TilbakemeldingCheckboxProps) {
    return (
        <form
            className="tilbakemelding-modal__ekspander"
            onSubmit={() => handleFormSubmitted()}
            data-widget="accessible-autocomplete"
        >
            <CheckboxValg onCheckboxChanged={handleCheckboxvalgChanged} />
            <div className="tilbakemelding-modal__kommentar">
                <Textarea
                    className="tilbakemelding-modal__kommentar-felt"
                    label="Si gjerne litt mer om hvordan du bruker opplysningene i oppfølgingen. (Frivillig)"
                    rows={kommentarRows}
                    maxLength={kommentarMaxChar}
                    value={kommentar}
                    onChange={handleKommentarChanged}
                    data-testid="tilfredshet_kommentarfelt"
                />
            </div>
            <Button size="small" type="submit" className="knapp--hoved" data-testid="tilfredshet_send-knapp">
                Send
            </Button>
        </form>
    );
}

export default TilbakemeldingsskjemaCheckbox;
