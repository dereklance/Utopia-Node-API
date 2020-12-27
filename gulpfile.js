import gulp from 'gulp';
import nodemon from 'gulp-nodemon';

gulp.task('default', () => {
    nodemon({
        script : 'src/main.js',
        ext    : 'js',
        env    : {
            PORT : 3000,
            MODE : 'dev'
        },
        ignore : [ './node_modules;**' ]
    }).on('restart', () => {
        console.log('SERVER RESTARTING');
    });
});
