package no.nav.fo.veilarbportefoljeflatefs;

import no.nav.brukerdialog.security.context.InternbrukerSubjectHandler;
import no.nav.brukerdialog.security.context.JettySubjectHandler;
import no.nav.sbl.dialogarena.common.jetty.Jetty;
import no.nav.sbl.dialogarena.test.SystemProperties;
import org.apache.geronimo.components.jaspi.AuthConfigFactoryImpl;

import javax.security.auth.message.config.AuthConfigFactory;
import java.security.Security;

import static java.lang.System.setProperty;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.*;

public class StartJetty {

    public static void main(String[] args) {
        SystemProperties.setFrom("jetty-veilarbportefoljeflatefs.properties");

        System.setProperty("develop-local", "true");
        System.setProperty("org.apache.geronimo.jaspic.configurationFile", "src/test/resources/jaspiconf.xml");
        Security.setProperty(AuthConfigFactory.DEFAULT_FACTORY_SECURITY_PROPERTY, AuthConfigFactoryImpl.class.getCanonicalName());

        InternbrukerSubjectHandler.setVeilederIdent("Z990610");
        InternbrukerSubjectHandler.setServicebruker("srvveilarbportefoljeflatefs");
        setProperty("no.nav.modig.core.context.subjectHandlerImplementationClass", InternbrukerSubjectHandler.class.getName());

        //Må ha https for csrf-token
        final Jetty jetty = Jetty.usingWar()
                .at("veilarbportefoljeflatefs")
                .port(9593)
                .sslPort(9592)
                .overrideWebXml()
                .configureForJaspic()
                .buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }
}
