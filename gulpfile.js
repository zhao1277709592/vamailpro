var { src , dest , series , parallel , watch } = require('gulp');
var clean = require('gulp-clean');
var fileInclude = require('gulp-file-include');
var webserver = require('gulp-webserver');

//清楚
function cleanTask(){
    return src('./dist' , {allowEmpty : true})
            .pipe( clean() );
}
// 做成HTML片段
function fileIncludeTask(){
    return src('./src/view/*.html')
            .pipe(fileInclude({
                prefix : '@',
                basepath : './src/view/templates'
            }))
            .pipe(dest('./dist/view'));
}
//开启web服务器
function webserverTask(){
    return src('./dist/view')    
            .pipe( webserver({
                host : 'localhost',
                port : 4000,
                open : './index.html',
                livereload : true 
            }));
}


//监听文件变化，
function watchTask(){  
    watch('./src/view/**' , fileIncludeTask);
   
}


module.exports = {
    // 开发环境下的命令
    dev : series( cleanTask , fileIncludeTask  ,  parallel(webserverTask ,  watchTask)  ),    
    // 生产环境下的命令
    build : series( cleanTask )
};
 


