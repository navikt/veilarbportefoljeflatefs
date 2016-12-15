package no.nav.fo.veilarbportefoljeflatefs.servlet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ApplicationServlet extends HttpServlet {
    private String applicationFile;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        applicationFile = config.getInitParameter("applicationFile");
        if (!applicationFile.startsWith("/")) {
            applicationFile = "/" + applicationFile;
        }
    }

    @Override
    protected final void doGet(final HttpServletRequest request, final HttpServletResponse response) throws IOException, ServletException {
        RequestDispatcher dispatcher = getServletContext().getNamedDispatcher("default");
        String fileRequestPattern = "^(.+\\..{1,4})$";

        if (!request.getRequestURI().matches(fileRequestPattern)) {
            RequestDispatcher index = getServletContext().getRequestDispatcher(applicationFile);
            index.forward(request, response);
        } else {
            dispatcher.forward(request, response);
        }
    }
}