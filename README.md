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

## Release
To release a new version, run `grunt build --rel ${version.number}`

## Package and release
- To package as JAR file, run `mvn clean install`. This will run `grunt build --rel ${version-in.pom.xml}` and package it as zanata-assets.jar file.
- To release JAR file to cloudbees, run `mvn deploy:deploy`.

## Style Guide
This will be generated from the css comments in `css-sg/style.css`. You can view the style guide from [localhost:4000/styleguide](http://localhost:4000/styleguide/).

## Release History
- Global styles
- Basic dashboard styling

## License
Zanata is Free software, licensed under the [LGPL](http://www.gnu.org/licenses/lgpl-2.1.html).

Copyright 2015, Red Hat, Inc. and individual contributors
as indicated by the @author tags. See the copyright.txt file in the
distribution for a full listing of individual contributors.

This is free software; you can redistribute it and/or modify it
under the terms of the GNU Lesser General Public License as
published by the Free Software Foundation; either version 2.1 of
the License, or (at your option) any later version.

This software is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this software; if not, write to the Free
Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
02110-1301 USA, or see the FSF site: http://www.fsf.org.
