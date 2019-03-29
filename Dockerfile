FROM ubuntu
ENV ROOTDIR=/usr/src/app APPDIR=/usr/src/app/FirstStory
RUN mkdir -p /usr/src/app
WORKDIR ${ROOTDIR}
RUN apt update -y
RUN apt install git-core -y
RUN git clone https://github.com/jseuribe/FirstStory.git
WORKDIR /usr/src/app/FirstStory
RUN apt install nodejs npm -y
WORKDIR /usr/src/app/FirstStory/firststory-back
RUN npm install
RUN npm i -g typescript
RUN tsc
RUN apt install python3.7
#CMD ["node", "dist/src/index.js"]
#RUN mkdir -p /usr/src/app
#WORKDIR /usr/src/app
#COPY . .
#Build Backend
#RUN cd firststory-back/ && npm install && tsc && cd ..
#Build Angular Components
#RUN cd firststory-front && npm install && ng build
#EXPOSE 3000
#CMD ["node", "firststory-back/dist/src/index.js"]
