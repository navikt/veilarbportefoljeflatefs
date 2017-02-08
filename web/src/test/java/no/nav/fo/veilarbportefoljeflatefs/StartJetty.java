package no.nav.fo.veilarbportefoljeflatefs;

import no.nav.sbl.dialogarena.common.jetty.Jetty;
import no.nav.sbl.dialogarena.test.SystemProperties;

import static no.nav.modig.testcertificates.TestCertificates.setupKeyAndTrustStore;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.*;

public class StartJetty {

    public static void main(String[] args) {
        SystemProperties.setFrom("jetty-veilarbportefoljeflatefs.properties");
        setupKeyAndTrustStore();

        //Må ha https for csrf-token
        final Jetty jetty = Jetty.usingWar()
                .at("veilarbportefoljeflatefs")
                .sslPort(9592)
                .port(9593)
//                .overrideWebXml()
                .buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }
}
