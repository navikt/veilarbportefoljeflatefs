package no.nav.fo.veilarbportefoljeflatefs;

import no.nav.dialogarena.config.DevelopmentSecurity;
import no.nav.sbl.dialogarena.common.jetty.Jetty;
import no.nav.sbl.dialogarena.test.SystemProperties;

import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.*;

public class StartJetty {
    public static final String APPLICATION_NAME = "veilarbportefoljeflatefs";

    public static void main(String[] args) {
        SystemProperties.setFrom("jetty-veilarbportefoljeflatefs.properties");
//        Må ha https for csrf-token
        Jetty jetty = DevelopmentSecurity.setupISSO(Jetty.usingWar()
                .at("veilarbportefoljeflatefs")
                .sslPort(9592)
                .port(9593), new DevelopmentSecurity.ISSOSecurityConfig(APPLICATION_NAME))
                .buildJetty();
        System.setProperty("folder.ledetekster.path", "../../veilarbportefoljeflatefs-tekster/target/classes");
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }
}
