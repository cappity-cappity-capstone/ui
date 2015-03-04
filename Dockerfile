FROM ubuntu:14.04

# Install system dependencies
RUN apt-get -y update
RUN apt-get -y install ruby-dev nginx nodejs npm
RUN ln -sfv "$(which nodejs)" /usr/bin/node

# Install language dependencies
RUN npm install -g gulp
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
