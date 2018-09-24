ARG BASE_IMAGE_PREFIX="docker.adeo.no:5000/pus/"
FROM ${BASE_IMAGE_PREFIX}node as builder

ADD / /source
ENV CI=true
WORKDIR /source
RUN npm ci
ENV NODE_ENV=production
RUN npm run build

FROM ${BASE_IMAGE_PREFIX}fss-frontend
COPY --from=builder /source/build /app
