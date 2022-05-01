const path = require('path');

module.exports = {
    mode: "development",
    entry: "./source/main.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "main_bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            }
        ]
    }
}