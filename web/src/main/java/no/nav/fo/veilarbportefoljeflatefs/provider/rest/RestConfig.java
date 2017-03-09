package no.nav.fo.veilarbportefoljeflatefs.provider.rest;

import no.nav.brukerdialog.isso.RelyingPartyCallback;
import no.nav.fo.veilarbportefoljeflatefs.provider.rest.resources.TeksterController;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RestConfig extends ResourceConfig {

    public RestConfig() {
        super(
                TeksterController.class,
                RelyingPartyCallback.class
        );
    }
}
