module.exports = {
    devtool:'inline-source-map',
    entry:'./src/index.tsx',
    output:{
        path:__dirname + './public',
        filename:'build/app.js',
    },
    resolve:{
        extensions:['.ts','.tsx','.js'],

    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                loader:'ts-loader'                
            }
        ]
    }
}//end:exports