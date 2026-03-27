# Step 1: Use the official Playwright image
FROM mcr.microsoft.com/playwright:v1.38.0-focal

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install project dependencies (including Playwright)
RUN npm install

# Step 5: Copy the rest of your project files
COPY . .

# Step 6: Ensure Playwright browsers are installed
RUN npx playwright install --with-deps

# Step 7: Run Playwright tests
CMD ["npx", "playwright", "test"]
