import * as React from 'react';
import {ReactNode, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import {Checkbox} from 'nav-frontend-skjema';
import {endreFiltervalg} from '../../ducks/filtrering';
import {VeiledereState} from '../../ducks/veiledere';
import {FiltervalgModell, VeilederModell} from '../../model-interfaces';
import './veileder-checkbox-liste.less';
import {OversiktType} from '../../ducks/ui/listevisning';

interface StateProps {
    veiledere: VeiledereState;
    filtervalg: FiltervalgModell;
    veilederNavnQuery: string;
}

interface DispatchProps {
    sokEtterVeileder: (veiledere: string[]) => void;
}

interface KnappProps {
    onClick: (e) => void;
}

const LukkeKnapp: React.SFC<KnappProps> = (props: KnappProps) => (
    <button
        className="knapp knapp--mini checkbox-liste__valg-knapp"
        type="button"
        onClick={props.onClick}
        data-testid="veilederoversikt_sok-veileder_lukk-knapp"
    >
        Lukk
    </button>
);

const SubmitKnapp: React.SFC<KnappProps> = (props: KnappProps) => (
    <button
        className="knapp knapp--mini knapp--hoved checkbox-liste__valg-knapp"
        type="button"
        onClick={props.onClick}
        data-testid="veilederoversikt_sok-veileder_velg-knapp"
    >
        Velg
    </button>
);

function VeilederCheckboxListe(props: any) {
    const [valgteElementer, setValgteElementer] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>(props.open);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    useEffect(() => {
        setValgteElementer(props.filtervalg.veiledere);
    }, [props.filtervalg]);

    const erValgt = (value: string | undefined): boolean => {
        return !!value && !!valgteElementer.find(valgtElement => value === valgtElement);
    };

    const getFiltrerteVeiledere = (): VeilederModell[] => {
        const {veilederNavnQuery, veiledere} = props;

        const query = veilederNavnQuery ? veilederNavnQuery.toLowerCase().trim() : '';

        return veiledere.data.veilederListe.filter(
            veileder =>
                (veileder.navn && veileder.navn.toLowerCase().indexOf(query) >= 0) ||
                (veileder.ident && veileder.ident.toLowerCase().indexOf(query) >= 0)
        );
    };

    const handleCheckboxOnClick = (value: string | undefined) => {
        if (!value) {
            return;
        }

        const valueErValgt = erValgt(value);
        let valgteElem;

        if (!valueErValgt) {
            valgteElem = [...valgteElementer, value];
            setValgteElementer(valgteElem);
        } else if (valueErValgt) {
            valgteElem = valgteElementer.filter(valgtElement => value !== valgtElement);
            setValgteElementer(valgteElem);
        }
    };

    const handleSubmitKnappOnClick = e => {
        e.preventDefault();

        props.sokEtterVeileder(valgteElementer);

        if (props.onSubmit) {
            props.onSubmit();
        }
    };

    const handleLukkeKnappOnClick = e => {
        e.preventDefault();

        if (props.onClose) {
            props.onClose();
        }
    };

    const mapVeiledereToCheckboxList = (veiledere?: VeilederModell[]): ReactNode[] | null => {
        if (!veiledere) {
            return null;
        }

        return veiledere
            .filter(vlg => vlg.ident && vlg.navn)
            .map((vlg, index) => {
                const identErValgt = erValgt(vlg.ident);
                return (
                    <Checkbox
                        key={vlg.ident}
                        label={vlg.navn}
                        checked={identErValgt}
                        onChange={() => handleCheckboxOnClick(vlg.ident)}
                        data-testid={`veilederoversikt_sok-veileder_veilederliste_element_${index}`}
                    />
                );
            });
    };

    const valgCheckboxListe = mapVeiledereToCheckboxList(getFiltrerteVeiledere());
    const harValg = valgCheckboxListe && valgCheckboxListe.length > 0;
    const harValgteElementer = valgteElementer && valgteElementer.length > 0;

    if (!open) {
        return null;
    }

    if (harValg) {
        return (
            <form className="checkbox-liste">
                <div className="checkbox-liste__valg" data-testid="veilederoversikt_sok-veileder_veilederliste">
                    {valgCheckboxListe}
                </div>
                <div className="checkbox-liste__valg-footer">
                    {harValgteElementer ? (
                        <SubmitKnapp onClick={handleSubmitKnappOnClick} />
                    ) : (
                        <LukkeKnapp onClick={handleLukkeKnappOnClick} />
                    )}
                </div>
            </form>
        );
    } else {
        return (
            <div className="checkbox-liste__valg-footer">
                <AlertStripe
                    type="info"
                    className="checkbox-filterform__alertstripe"
                    data-testid="veilederoversikt_alertstripe_info"
                >
                    Ingen veiledere funnet
                </AlertStripe>
            </div>
        );
    }
}

const mapStateToProps = (state): StateProps => ({
    filtervalg: state.filtreringVeilederoversikt,
    veiledere: state.veiledere,
    veilederNavnQuery: state.filtreringVeilederoversikt.veilederNavnQuery
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    sokEtterVeileder(veiledere: string[]) {
        dispatch(endreFiltervalg('veiledere', veiledere, OversiktType.veilederOversikt));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederCheckboxListe);
