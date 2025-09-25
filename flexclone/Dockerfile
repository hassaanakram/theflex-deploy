FROM node:22.11.0

WORKDIR /app

COPY package-lock.json package-lock.json

COPY package.json package.json

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "dev", "--", "-p", "4000"]