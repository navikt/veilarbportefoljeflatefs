package no.nav.sbl.veilarbportefoljeflatefs.provider.rest.resources;


import no.nav.sbl.tekster.TeksterAPI;
import no.nav.sbl.tekster.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/tekster")
@Produces(APPLICATION_JSON)
public class TeksterController {

    private final Logger logger = LoggerFactory.getLogger(TeksterController.class);

    public static final String NORSK = "nb";
    @Inject
    @Named("teksterApi")
    TeksterAPI teksterApi;

    @GET
    public Map<String, Properties> hentApplikasjonstekster() {
        logger.info("Henter tekster fra server");

        Properties nb = Utils.convertResourceBundleToProperties(teksterApi.hentTekster(NORSK));

        Map<String, Properties> map = new HashMap<>();
        map.put(NORSK, nb);

        return map;
    }

}
