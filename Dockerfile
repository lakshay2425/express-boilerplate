# Use a lightweight Node.js image as the base.
# 'alpine' variants are smaller, good for production.
# For development, you might sometimes use a larger base like 'node:20' (without alpine) if you need more build tools.
FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]

# Command to build the Docker image: 
    # docker build -t imageName .

# Command to run the Docker container:
    # docker run -p 3000:3000 -v $(pwd):/app imageName 