package no.nav.sbl.veilarbportefoljeflatefs.internal;


import org.springframework.web.HttpRequestHandler;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class IsAliveServlet implements HttpRequestHandler {

    @Inject
    private HealthCheckService healthCheckService;

    @Override
    public void handleRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String status = "DOWN";
        if ((healthCheckService != null) && healthCheckService.isStatusOk()) {
            status = "UP";
        }

        response.setContentType("text/html");
        response.getWriter().write("Application: " + status);
    }
}
