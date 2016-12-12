package no.nav.sbl.portefolje;

import no.nav.sbl.dialogarena.common.jetty.Jetty;
import no.nav.sbl.dialogarena.test.SystemProperties;

import static no.nav.modig.testcertificates.TestCertificates.setupKeyAndTrustStore;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.*;
//import static no.nav.sbl.xmlstillingadmin.config.JndiLocalContextConfig.setupJndiLocalContext;

public class StartJetty {

    public static void main(String[] args) {
        SystemProperties.setFrom("jetty-veilarbportefoljeiaf.properties");
        setupKeyAndTrustStore();
//        setupJndiLocalContext();

        //Må ha https for csrf-token
        final Jetty jetty = Jetty.usingWar()
                .at("veilarbportefoljeiaf")
                .sslPort(9594)
                .port(9595)
//                .overrideWebXml()
                .buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }
}
