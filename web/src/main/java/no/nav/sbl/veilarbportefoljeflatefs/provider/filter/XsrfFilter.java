package no.nav.sbl.veilarbportefoljeflatefs.provider.filter;

import no.nav.modig.core.exception.AuthorizationException;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static no.nav.sbl.veilarbportefoljeflatefs.provider.sikkerhet.XsrfUtils.sjekkXsrfToken;
import static no.nav.sbl.veilarbportefoljeflatefs.provider.sikkerhet.XsrfUtils.xsrfCookie;

public class XsrfFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        switch (httpRequest.getMethod()) {
            case "GET":
                httpResponse.addCookie(xsrfCookie(httpRequest.getSession()));
                chain.doFilter(request, response);
                break;
            case "POST":
            case "PUT":
                sjekkToken(request, response, chain, httpRequest, httpResponse);
                break;
        }
    }

    private void sjekkToken(ServletRequest request, ServletResponse response, FilterChain chain,
                            HttpServletRequest httpRequest, HttpServletResponse httpResponse)
            throws IOException, ServletException {

        try {
            sjekkXsrfToken(httpRequest.getHeader("X-XSRF-TOKEN"), httpRequest.getSession());
            chain.doFilter(request, response);
        } catch (AuthorizationException e) {
            httpResponse.sendError(SC_UNAUTHORIZED, e.getMessage());
        }
    }

    @Override
    public void destroy() {
    }
}
