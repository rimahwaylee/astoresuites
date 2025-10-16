# Dockerfile
FROM mcr.microsoft.com/playwright:focal

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Installer les navigateurs Playwright
RUN npx playwright install --with-deps

CMD ["npx", "playwright", "test"]
