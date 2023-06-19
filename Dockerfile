# Base image
FROM node:18.16.0-alpine3.18 AS build

ENV JWT_ACCESS_SECRET=mUqsAYiMmqR5tO//6uFAbLwKMlq7usvROfdEEhNjatUJzPcVyRpPr4Fu5c4QA53v3GQwxsZ+plTc87gzrwPOofbmM354KWldM6fkQLLvFWQc9mj8B5DRtzumSbo8pAD06mLlvotALQ1ln5pTBlplIOzwNthb/I1zvrjhFyDgA2oC0stu0i8r8DHt/Rho4XombciG+hzc+AWC7hYfeJhmHNv6Rcm+ZTJ2nz7ts1e5Tey8Qt0469BEvbEby99XCHGa6y2JqTQEJ0b0yWjDtWkQ5uLVjCQumDnoPJ3m6XT29Q8lxJ6vXdGisna5uNbPobPGtvAEW2rzd2+sB8ZdD7lAWg==
ENV JWT_REFRESH_SECRET=CitGdlWZXVOoRR/0DOJHXx6xJg2v0g7NGLDw+EOnXuPvAMSHHu9uINc1m74pRiMXug530PXwiDRoeqDsZCmRDQutYX6ZgZToOTT0/RXsUQ+2pQCEPCU202AYdJ2kV0uSWHThC9sZ2YgvzNL8L0NI3VRMarGgm8ofyMK6mfmboXpXueAFTm0A497dh5pu6sZbZ09pl1p2L5tusdsM/RRdLMY9Dc0M9X74y4UTs6M0md1XqgM3pRwKeC4p7/otb0mpkp9aeY8H5cVatE7NeYBDtXWbDbEGUqtzWZM3b130CdfxysjCM8mHxAF6J+g4YwRjDhXWKvciyrdj11SV4YFxuA==
ENV DB_HOST=0.0.0.0
ENV DB_PORT=5435
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=postgres
ENV DB_NAME=YourPlatform
EXPOSE 3000

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./

# Install app dependencies
RUN npm install
RUN npm install --save @nestjs/swagger swagger-ui-express


# Bundle app source
COPY . .

CMD ["npm", "run", "start:dev"]






