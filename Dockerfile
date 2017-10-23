FROM docker.adeo.no:5000/bekkci/npm-builder as npm-build
# [ ARG STEP_MARKER ] se http://stash.devillo.no/projects/BEKKCI/repos/jenkins-plugin/browse
ARG STEP_MARKER

ADD /web/src/frontend /source
RUN build


FROM docker.adeo.no:5000/bekkci/maven-builder
# [ ARG STEP_MARKER ] se http://stash.devillo.no/projects/BEKKCI/repos/jenkins-plugin/browse
ARG STEP_MARKER
ADD / /source

# [ /main/webapp ] TODO prosjektet har klønete struktur, fiks dette når vi er over på nais!
COPY --from=npm-build /main/webapp /source/web/src/main/webapp
RUN build


# TODO oppsett for nais
