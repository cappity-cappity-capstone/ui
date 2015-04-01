FROM ubuntu:14.04

# Install system dependencies
RUN apt-get -y update
RUN apt-get -y install ruby-dev nodejs npm git curl build-essential libpcre3-dev zlib1g

# Build nginx
RUN mkdir /tmp/nginx
WORKDIR /tmp/nginx
RUN curl -o nginx.tar.gz http://nginx.org/download/nginx-1.7.11.tar.gz
RUN tar -xzf nginx.tar.gz
RUN cd nginx-1.7.11 && ./configure && make && make install

RUN ln -sfv "$(which nodejs)" /usr/bin/node
RUN ln -sfv /usr/local/nginx/sbin/nginx /usr/sbin/nginx

# Install language dependencies
RUN npm install -g gulp bower
RUN gem install bundler

# Add source code
ADD . /opt/cappy/ui
RUN useradd --create-home --user-group ui
RUN chown -R ui:ui /opt/cappy/

# Build the app
WORKDIR /opt/cappy/ui
RUN bundle install
USER ui
RUN npm install
RUN rm -rf static/js static/css
RUN bower install
RUN gulp build

# Default command
USER root
CMD /usr/sbin/nginx -c /opt/cappy/ui/nginx.conf -g "daemon off;"
