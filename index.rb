require 'sinatra' 					# includes gem to process web pages
set :bind, '0.0.0.0'

get '/' do
  '<p>Hello World</p>'
end
