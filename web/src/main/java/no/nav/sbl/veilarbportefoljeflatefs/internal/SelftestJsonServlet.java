package no.nav.sbl.veilarbportefoljeflatefs.internal;

import no.nav.sbl.dialogarena.common.web.selftest.SelfTestJsonBaseServlet;
import no.nav.sbl.dialogarena.types.Pingable;
import org.springframework.web.context.support.WebApplicationContextUtils;

import java.util.Collection;

public class SelftestJsonServlet extends SelfTestJsonBaseServlet {


    @Override
    protected Collection<Pingable> getPingables() {
        return WebApplicationContextUtils.getWebApplicationContext(getServletContext()).getBeansOfType(Pingable.class).values();
    }
}
