const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const htmlmin = require('gulp-htmlmin');
const lighthouse = require('gulp-lighthouse');

// Automated build process
const buildTasks = {
    // Image optimization
    images: () => {
        return gulp.src('src/images/**/*')
            .pipe(imagemin([
                imagemin.mozjpeg({ quality: 80, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: false }]
                })
            ]))
            .pipe(gulp.dest('dist/images'));
    },

    // SASS compilation
    styles: () => {
        return gulp.src('src/scss/**/*.scss')
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(gulp.dest('dist/css'));
    },

    // JavaScript linting and bundling
    scripts: () => {
        return gulp.src('src/js/**/*.js')
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .pipe(gulp.dest('dist/js'));
    },

    // HTML minification
    html: () => {
        return gulp.src('src/**/*.html')
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest('dist'));
    },

    // Performance testing
    lighthouse: () => {
        return lighthouse('http://localhost:3000', {
            chromeFlags: ['--headless'],
            output: 'html',
            outputPath: './lighthouse-report.html'
        });
    }
};

module.exports = buildTasks;