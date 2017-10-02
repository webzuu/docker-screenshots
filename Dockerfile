FROM cheeaun/puppeteer:1.1.1
COPY ./package.json /app/package.json
RUN cd /app && yarn --production --pure-lockfile
EXPOSE 3000
WORKDIR /app
CMD yarn start
COPY ./app/index.js /app/index.js