FROM docker.adeo.no:5000/bekkci/npm-builder as npm-build
ADD /web/src/frontend /source
RUN build


FROM docker.adeo.no:5000/bekkci/maven-builder
ADD / /source
# [ /main/webapp ] TODO prosjektet har klønete struktur, fiks dette når vi er over på nais!
COPY --from=npm-build /main/webapp /source/web/src/main/webapp
RUN build


FROM docker.adeo.no:5000/bekkci/skya-deployer as deployer
FROM docker.adeo.no:5000/bekkci/frontend-smoketest as smoketest

# TODO oppsett for nais
