const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
gulp.task('default', () => {
    nodemon({
        script:"src/main.js",
        ext:"js",
        env: {
            PORT: 3000
        },
        ignore: ["./node_modules;**"]
    }).on('restart', () => {
        console.log('SERVER RESTARTING')
    })
});