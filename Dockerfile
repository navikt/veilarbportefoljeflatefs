FROM docker.adeo.no:5000/bekkci/npm-builder as npm-build
ADD /web/src/frontend /source
RUN build /source

FROM docker.adeo.no:5000/bekkci/maven-builder as maven-build
ADD / /source
# [ /main/webapp ] TODO prosjektet har klønete struktur, fiks dette når vi er over på nais!
COPY --from=npm-build /main/webapp /source/web/src/main/webapp
RUN build /source

FROM docker.adeo.no:5000/bekkci/skya-deployer as deployer
COPY --from=maven-build /source /deploy

FROM docker.adeo.no:5000/bekkci/frontend-smoketest as smoketest

# TODO oppsett for nais
