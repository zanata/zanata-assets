# Zanata Assets

Zanata style guide and css

## Getting Started

- Install ruby and npm `yum install npm ruby-devel`
- Install Grunt CLI globally `npm install -g grunt-cli`
- Install ruby dependencies with `sudo gem install sass compass breakpoint compass-rgbapng jekyll`
- Install lastest dev version of sass and compass `sudo gem install sass --pre` and `sudo gem install compass --pre`

Go to zanata-assets dir
- Install node dependencies with: `npm install`

## In Use
To start developing run `grunt wo`. This will start a livereload server, open the server in your browser and run a watch task.

## Building
Just run `grunt build` which will concat and minify all files.

## Style Guide
This will be generated from the css comments in `css-sg/style.css`. You can view the style guide from [localhost:4000/styleguide](http://localhost:4000/styleguide/).

## Release History
- Global styles
- Basic dashboard styling

## License
Copyright (c) 2013 Luke Brooker  
Licensed under the MIT license.
