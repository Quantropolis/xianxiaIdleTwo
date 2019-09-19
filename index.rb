require 'sinatra' 					# includes gem to process web pages
set :bind, '0.0.0.0'
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins

get '/' do
  '<p>Hello World</p>'
end
