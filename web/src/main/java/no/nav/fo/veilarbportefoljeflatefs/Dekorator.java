package no.nav.fo.veilarbportefoljeflatefs;

import no.nav.innholdshenter.common.EnonicContentRetriever;
import no.nav.innholdshenter.filter.DecoratorFilter;
import org.slf4j.Logger;

import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;
import static org.slf4j.LoggerFactory.getLogger;

public class Dekorator extends DecoratorFilter {
    private static final Logger LOG = getLogger(Dekorator.class);

    private static final String FRAGMENTS_URL = "?visSokefelt=true&visVeileder=true&visEnhet=true";
    private static final String APPLICATION_NAME = "Oppfølging";
    private static final List<String> NO_DECORATOR_PATTERNS = new ArrayList<>(asList(".*/img/.*", ".*/css/.*", ".*/js/.*", ".*/font/.*", ".*selftest.*"));
    private static final List<String> FRAGMENT_NAMES = new ArrayList<>(asList("header-withmenu", "styles"));

    public Dekorator() {
        super();
        setFragmentsUrl(FRAGMENTS_URL);
        setContentRetriever(setUpContentRetriever());
        setApplicationName(APPLICATION_NAME);
        setNoDecoratePatterns(NO_DECORATOR_PATTERNS);
        setFragmentNames(FRAGMENT_NAMES);
    }

    private EnonicContentRetriever setUpContentRetriever() {
        EnonicContentRetriever contentRetriever = new EnonicContentRetriever(10000);
        String baseUrl = System.getProperty("internarbeidsflatedecorator.endpoint.url");
        LOG.info("Setter opp content retriever med base url: " + baseUrl);
        contentRetriever.setBaseUrl(baseUrl);
        contentRetriever.setRefreshIntervalSeconds(1800);
        return contentRetriever;
    }
}
