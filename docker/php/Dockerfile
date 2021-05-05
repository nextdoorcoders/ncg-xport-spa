FROM php:7.4-apache

MAINTAINER p-Clerick
RUN apt-get update && apt-get install -y --fix-missing \
    apt-utils \
    gnupg

RUN echo "deb http://packages.dotdeb.org jessie all" >> /etc/apt/sources.list
RUN echo "deb-src http://packages.dotdeb.org jessie all" >> /etc/apt/sources.list
RUN curl -sS --insecure https://www.dotdeb.org/dotdeb.gpg | apt-key add -

RUN apt-get update && apt-get install -y \
    zlib1g-dev \
    libzip-dev \
    libxml2-dev \
    mc \
    git \
    unzip \
    wget \
    libpng-dev

RUN docker-php-ext-install  soap zip mysqli pdo_mysql bcmath exif sockets gd

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mkdir -p /usr/local/bin
RUN mv composer.phar /usr/local/bin/composer

RUN a2enmod rewrite
RUN service apache2 restart

RUN groupadd --gid 1000 dev \
  && useradd --uid 1000 --gid dev --shell /bin/bash --create-home dev

USER 1000



