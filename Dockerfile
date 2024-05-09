FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.json

RUN yarn install --frozen-lockfile

COPY . .

# RUN npx tsc

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

