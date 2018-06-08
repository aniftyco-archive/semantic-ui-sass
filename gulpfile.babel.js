import gulp from 'gulp';
import del from 'del';
import run from 'run-sequence';
import replace from 'gulp-replace';
import { append } from 'gulp-insert';
import { log } from 'gulp-util';
import { clone } from 'gulp-git';

const SRC_REPO = 'https://github.com/doabit/semantic-ui-sass';
const TEMP_DIR = '.temp';

gulp.task('clean', () => {
  return del(['./.temp', './semantic-ui.scss', './semantic-ui.js', './scss', './icons', './images', './js']);
});

gulp.task('fetch', (done) => {
  clone(SRC_REPO, { args: TEMP_DIR, quiet: true }, done);
});

gulp.task('move-scss', () => {
  return gulp.src(`${TEMP_DIR}/app/assets/stylesheets/semantic-ui/**/*.scss`)
    .pipe(replace(/semantic-ui\/icons/g, '#{\$icons-font-path}/icons'))
    .pipe(replace(/semantic-ui\/brand-icons/g, '#{\$icons-font-path}/brand-icons'))
    .pipe(replace(/semantic-ui\/outline-icons/g, '#{\$icons-font-path}/outline-icons'))
    .pipe(replace(/semantic-ui\/flags\.png/g, '#{\$flags-image-path}/flags.png'))
    .pipe(replace(/font-url\(/g, 'url('))
    .pipe(gulp.dest('./scss/'));
});

gulp.task('move-semantic', ['move-scss'], () => {
  return gulp.src(`${TEMP_DIR}/app/assets/stylesheets/semantic-ui.scss`)
    .pipe(replace(/semantic-ui/g, `scss`))
    .pipe(gulp.dest('./'));
});

gulp.task('move-images', () => {
  return gulp.src(`${TEMP_DIR}/app/assets/images/semantic-ui/**/*`)
    .pipe(gulp.dest('./images/'));
});

gulp.task('move-icons', () => {
  return gulp.src(`${TEMP_DIR}/app/assets/fonts/semantic-ui/**/*`)
    .pipe(gulp.dest('./icons/'));
});

gulp.task('move-javascript', () => {
  return gulp.src(`${TEMP_DIR}/app/assets/javascripts/semantic-ui/**/*`)
    .pipe(gulp.dest('./js/'));
});

gulp.task('move-js', ['move-javascript'], () => {
  return gulp.src(`${TEMP_DIR}/app/assets/javascripts/semantic-ui.js`)
    .pipe(replace(/\/\/= require semantic-ui\/(.+)/g, `require('./js/$1');`))
    .pipe(gulp.dest('./'));
});

gulp.task('append-to-variables', () => {
  return gulp.src('./scss/globals/_variables.scss')
    .pipe(append(`$icons-font-path: '../../icons' !default;\n`))
    .pipe(append(`$flags-image-path: '../../images' !default;\n`))
    .pipe(gulp.dest('./scss/globals'));
});

gulp.task('build', (done) => {
  run('clean', 'fetch', ['move-semantic', 'move-images', 'move-icons', 'move-js'], 'append-to-variables', done);
});

gulp.task('test', () => {
  return log('testing...');
});

gulp.task('release', () => {
  return log('releasing...');
});
