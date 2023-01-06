FROM ruby:3.0

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

CMD ["rails s"]

# sudo apt update
# sudo apt install postgresql nodejs ruby ruby-bundler npm libpq-dev
#sudo apt-get install libz-dev

# how-to on 
# https://www.techiediaries.com/install-ruby-2-7-rails-6-ubuntu-20-04/

# cd client && npm install && npm run build && cd -
# git clone https://github.com/rbenv/rbenv.git ~/.rbenv
# echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
# echo 'eval "$(rbenv init -)"' >> ~/.bashrc
# exec $SHELL
# git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
# rbenv install 2.7.1
# rbenv global 2.7.1
# gem install bundler
# rbenv rehash
# bundle install

# TODO 
# Set up web server w/ nginx and Passenger(?)
# https://gorails.com/deploy/ubuntu/20.04
# Add SSL certificates / HTTPS (try letsencrypt after setting up NGINX)
#   - Get certificates
#   - Add certificates to Nginx configuration
#   - Schedule certificate updates