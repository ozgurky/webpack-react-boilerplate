# Webpack Babel React Babel Boilerplate (redux)

## STEP 1 - Start with Webpack

  - `npm init -y`
  - `npm install webpack webpack-cli --save-dev`
  - `mkdir src && touch src/index.js`
  - `mkdir public && touch public/index.html`
  - Copy html below and paste into public/index.html

    ```html
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="utf-8">
          <title>Webpack, React and Babel</title>
      </head>

      <body>
          <div class="container">
          </div>
      </body>
      <script src="../dist/main.js"></script>

      </html>
    ```
  - Update package.json
    ```json
      ...
      "scripts": {
        "build": "webpack --mode production"
      }
    ```  
  - `npm run build`
  - `rm -rf dist/`
  - `touch webpack.config.js`
  - webpack entry & output configuration
    ```javascript
      module.exports = {
          entry: __dirname + "/app/index.js",
          output: {
              path: __dirname + "/public",
              filename: "bundle.js"
          }
      }
    ```  
  - edit public/index.html
    ```html
      ...
      </body>
      <script src="./bundle.js"></script>
      ...
    ```
  
  - apply source-map -> webpack.config.js
    ```javascript
      ...
      devtool: "eval-source-map",
      ...
    ```


## STEP 2 - Webpack Development Server

  - `npm install webpack-dev-server --save-dev`
  - update webpack.config.js
    ```javascript
      ...
      devServer: {
          host: "0.0.0.0", //virtualbox
          port: 8000,
          contentBase: "./public",
          historyApiFallback: true
      },
      ...
    ```
  - update package.json scripts node
    ```json
    ...
    "scripts": {
      "start": "webpack-dev-server --mode development",
      ...
    },
    ```
  - `npm start`
  - visit at http://192.168.10.10:8000/


## STEP 3 - Installing Babel

  - `npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev`
  - `vi .babelrc`
    ```json
      {
        "presets": ["@babel/preset-env", "@babel/preset-react"]
      }
    ```
  - `vi webpack.config.js`
    ```javascript
      module.exports = {
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader"
              }
            }
          ]
        }
      };
    ```


## STEP 3 - Installing React & Writing React Components
  - `npm i react react-dom --save-dev`
  - update src/index.js
    ```javascript
    import React, { Component } from 'react';
    import ReactDOM from 'react-dom';


    class MyMessageClass extends Component {
        render() {
            return <div>Helloooo jsx!</div>;
        }
    }

    ReactDOM.render(<MyMessageClass />, document.querySelector(".container"));
    ```
  - `touch src/App.js`
    ```javascript
      import React, { Component } from 'react';

      class App extends Component {
          render() {
              return <div>Helloooo jsx---**!</div>;
          }
      }

      export default App;
    ```
  - remove component from src/index.js & import App component
    ```javascript
      import React from 'react';
      import ReactDOM from 'react-dom';

      import App from './App';

      ReactDOM.render(<App />, document.querySelector(".container"));
    ```

## STEP 4 - Hot Module Replacement & Html Webpack Plugin

  - update webpack.config.js
    ```javascript
      var webpack = require('webpack');
      ...
      watch: true,
      watchOptions: {
          poll: 1000,
          ignored: /node_modules/
      },
      devServer: {
          ...
          hot: true
      },
      plugins: [
          new webpack.HotModuleReplacementPlugin()
      ]
      ...
    ```
  - update src/index.js
    ```javascript
      ...
      if (module.hot) {
          module.hot.accept();
      }
    ```

  - `npm install html-webpack-plugin --save-dev`
  - `mkdir -p src/templates`
  - `touch src/templates/index.tmpl.html`
    ```html
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="utf-8">
          <title>Webpack, React and Babel</title>
      </head>

      <body>
          <div class="container">
          </div>
      </body>

      </html>
    ```
  - update webpack.config.js
    ```javascript
    ...
    var HtmlWebpackPlugin = require('html-webpack-plugin');

    ...
    plugins: [
        ...
        new HtmlWebpackPlugin({
            template: __dirname + '/src/templates/index.tmpl.html'    
        })
    ]
    ```
  - `npm run build`






