const webpack = require('webpack');
const path = require('path');
require('dotenv').config(); 
module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
    },
    target: 'node',
    plugins: [
        
    ],

};