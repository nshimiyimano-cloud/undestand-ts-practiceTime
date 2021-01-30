const path=require('path');
const CleanPlugin=require('clean-webpack-plugin');  //to clean our dist folder whenever we rebuild our project

module.exports={
    mode:"none",

    entry:"./src/app.ts",
    output:{
filename:"bundle.js",  //you scan say app.js so here is to specify where output will come from
//to construct an absolute paths which webpack used to write your output
   path:path.resolve(__dirname,'dist'),   //to extract dist folder of our js files from undestand-ts-practiceTime folder as parent folder of our project
   publicPath:"dist"
},
devtool:'inline-source-map',
module:{
    rules:[
        {
            test:/\.ts$/,
            use:'ts-loader',
           exclude:/node_modules/
        }
    ]
},
resolve:{
    extensions:[".ts",".js"]
},
plugins:[
    new CleanPlugin.CleanWebpackPlugin()
]
};


