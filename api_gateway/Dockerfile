FROM node:alpine

RUN mkdir -p /api/src/
RUN mkdir -p /api/dist/
COPY package.json /api
COPY .babelrc /api
COPY .eslintrc.json /api
COPY .prettierrc /api
COPY /src/ /api/src/
COPY /dist/ /api/dist/
WORKDIR /api
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "build"]
CMD ["npm", "run", "dev" ]
