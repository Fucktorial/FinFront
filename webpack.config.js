const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
    const modules = {
        js: {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'ts-loader',
                },
            ],
        },
        less: {
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'less-loader',
                    options: {
                        import: [ // Тут для Stylus'а можем объявить глобальные переменные или функции, чтобы каждый раз их не импортировать
                            path.resolve(__dirname, 'src/common/styles/variables.less'),
                        ],
                    }
                },
            ],
        },
        //
        stylusIsomorph: {
            test: /\.styl$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'stylus-loader',
                    options: {
                        import: [
                            path.resolve(__dirname, './src/Common/Styles/variables.styl'),
                        ],
                    }
                },
            ],
        },
    }

    if (env === 'production') {
        //modules.stylus.use.splice(2, 0, { loader: 'postcss-loader' })
        //modules.stylusIsomorph.use.splice(2, 0, { loader: 'postcss-loader' })
    }

    const resolve = {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            App: path.resolve(__dirname, 'src/App/'),
            Pages: path.resolve(__dirname, 'src/Pages/'),
        },
    }

    return {
        modules,
        resolve,
    }
}
