package no.nav.sbl.veilarbportefoljeflatefs.servlet;

import no.nav.sbl.dialogarena.common.web.selftest.SelfTestJsonBaseServlet;
import no.nav.sbl.dialogarena.types.Pingable;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletException;
import java.util.Collection;

public class SelfTestJsonServlet extends SelfTestJsonBaseServlet {

    private ApplicationContext ctx = null;

    @Override
    public void init() throws ServletException {
        ctx = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
        super.init();
    }

    @Override
    protected Collection<Pingable> getPingables() {
        return ctx.getBeansOfType(Pingable.class).values();
    }
}
