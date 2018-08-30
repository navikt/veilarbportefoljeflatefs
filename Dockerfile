# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
ARG BASE_IMAGE_PREFIX="docker.adeo.no:5000/pus/"
FROM ${BASE_IMAGE_PREFIX}node as builder

WORKDIR /source
COPY package.json ./
COPY package-lock.json ./
ENV CI=true
RUN npm ci

ADD / ./
ENV NODE_ENV=production
RUN npm run build

FROM ${BASE_IMAGE_PREFIX}fss-frontend
COPY --from=builder /source/build /app
