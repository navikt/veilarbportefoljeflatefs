package no.nav.sbl.veilarbportefoljeflatefs.provider.rest;

import no.nav.sbl.veilarbportefoljeflatefs.provider.rest.resources.TeksterController;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RestConfig extends ResourceConfig {

    public RestConfig() {
        super(
                TeksterController.class
        );
    }
}
