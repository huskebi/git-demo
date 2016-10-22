/**
 * Created by hadoop on 2016/10/21.
 */
/** 严格模式*/
'use strict';

/**
 * 1、LESS编译、压缩、合并
 * 2、JS合并、压缩、混淆
 * 3、img的复制
 * 4、html压缩
 */

// 在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require("gulp"); // 这里的名称就是 npm install 包名
var less = require("gulp-less"); // 编译less
var cssnano = require('gulp-cssnano');// 压缩
var concat = require('gulp-concat'); // JS合并
var uglify = require('gulp-uglify'); // JS压缩
var obfuscate = require('gulp-obfuscate'); // JS混淆
var htmlmin = require('gulp-htmlmin'); // html压缩
var browserSync = require('browser-sync'); // 自动化同步的
var reload = browserSync.reload;

// 1、LESS编译、压缩、合并在这里没有必要，使用less自己的@import导包
gulp.task('style',function(){
    // 这里是在执行style任务时自动执行的，前面加!表示不匹配
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less()) // 编译less
        .pipe(cssnano()) // 压缩
        .pipe(gulp.dest('dist/styles/'))
        .pipe(reload({stream : true}));
});

// 2、JS合并、压缩、混淆
gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(reload({stream : true}));

});

// 3、img的复制
gulp.task('image',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({stream : true}));
});

// 4、html压缩
gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({
                collapseWhitespace: true,   //  表示去除空白字符
                removeComments: true,   //  表示去除注释script标签的type="text/javascript"
                removeStyleLinkTypeAttributes :true,    // 表示去除link或style标签的type="text/css"
                removeScriptTypeAttributes : true})) // 表示去除
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream : true}));
});

//
gulp.task('serve',function(){
    browserSync({
        server:{
            baseDir : ['dist']  //设置根路径
        },

    },function(err,bs){
        console.log(bs.options.getIn(["urls","local"]));
    });

    // 监控当指定目录发生变化，执行指定任务
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});






