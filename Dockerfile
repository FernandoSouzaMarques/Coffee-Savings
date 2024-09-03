# Using the official Node.js base image
FROM node:18-alpine

# Working directory inside the container
WORKDIR /

# Copy the package.json and package-lock.json files (or yarn.lock if using Yarn)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all application code into the container
COPY . .

# Run Prisma migrations - TODO: implement automation to run migrations when uploading images
# RUN npx prisma migrate deploy

# Build the Next.js application
RUN npm run build

# Expose the port that Next.js will use
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]