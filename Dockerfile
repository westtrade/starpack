FROM node:alpine

MAINTAINER Popov Gennadiy <@westrade.tk>

WORKDIR /etc/application

RUN npm i starpack -g \
	&& npm i

CMD ["starpack", "dev"]
