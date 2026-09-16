import {useSelector} from 'react-redux';
import {OversiktType} from '../../ducks/ui/valgte-kolonner';
import {BodyShort, Button, HStack, InfoCard, List} from '@navikt/ds-react';
import {AppState} from '../../reducer';
import {InformationSquareIcon} from '@navikt/aksel-icons';
import {useState} from 'react';
import {useAppDispatch} from '../../hooks/redux/use-app-dispatch';
import {lagreEndringerForFilter} from '../../ducks/mine-filter';
interface FiltreringLabelContainerProps {
    oversiktType: OversiktType;
}

export const FiltreringAlert = ({oversiktType}: FiltreringLabelContainerProps) => {
    const dispatch = useAppDispatch();
    const valgtMineFilter = useSelector((state: AppState) =>
        oversiktType === OversiktType.minOversikt
            ? state.mineFilterMinOversikt.valgtMineFilter
            : state.mineFilterEnhetensOversikt.valgtMineFilter
    );
    const infoOmSlettetFiltervalg = valgtMineFilter?.infoOmSlettetFiltervalg;
    const [visAlert, setVisAlert] = useState(true);

    return (
        <>
            {visAlert && infoOmSlettetFiltervalg && infoOmSlettetFiltervalg.length > 0 && (
                <InfoCard data-color="neutral" size="small" className={'filtreringlabel-infoboks'}>
                    <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                        <InfoCard.Title>Filteret inneholder filtervalg som ikke lenger finnes</InfoCard.Title>
                    </InfoCard.Header>
                    <InfoCard.Content>
                        <BodyShort size="small">Filteret ditt inneholder filtervalg som ikke lenger finnes:</BodyShort>
                        <List size="small">
                            {infoOmSlettetFiltervalg.map(info => (
                                <List.Item key={info} className={'filtreringlabel-infoboks__liste'}>
                                    {info}
                                </List.Item>
                            ))}
                        </List>
                        <BodyShort size="small">Endre filteret eller slett og lag nytt.</BodyShort>
                        <HStack gap="space-8">
                            <Button
                                className={'filtreringlabel-infoboks__knapp'}
                                variant="primary"
                                data-color="neutral"
                                size="small"
                                onClick={() => {
                                    setVisAlert(false);
                                }}
                            >
                                Lukk
                            </Button>
                            <Button
                                className={'filtreringlabel-infoboks__knapp'}
                                variant="secondary"
                                data-color="neutral"
                                size="small"
                                onClick={() => {
                                    if (valgtMineFilter) {
                                        dispatch(
                                            lagreEndringerForFilter({
                                                filterNavn: valgtMineFilter.filterNavn,
                                                filterId: valgtMineFilter.filterId,
                                                filterValg: valgtMineFilter.filterValg
                                            })
                                        );
                                    }
                                }}
                            >
                                Ikke vis denne meldingen igjen
                            </Button>
                        </HStack>
                    </InfoCard.Content>
                </InfoCard>
            )}
        </>
    );
};
