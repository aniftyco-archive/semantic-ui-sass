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
  return del(['./.temp', './semantic-ui.scss', './semantic-ui', './icons', './images']);
});

gulp.task('fetch', (done) => {
  clone(SRC_REPO, { args: TEMP_DIR, quiet: true }, done);
});

gulp.task('move-scss', () => {
  return gulp.src(`${TEMP_DIR}/app/assets/stylesheets/**/*.scss`)
    .pipe(replace(/semantic-ui\/icons/g, '#{\$icons-font-path}/icons'))
    .pipe(replace(/semantic-ui\/flags\.png/g, '#{\$flags-image-path}/flags.png'))
    .pipe(replace(/src: font-url/g, 'src: url'))
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

gulp.task('append-to-variables', () => {
  return gulp.src('./semantic-ui/globals/_variables.scss')
    .pipe(append(`$icons-font-path: '../../icons' !default;\n`))
    .pipe(append(`$flags-image-path: '../../images' !default;\n`))
    .pipe(gulp.dest('./semantic-ui/globals'));
});

gulp.task('build', (done) => {
  run('clean', 'fetch', ['move-scss', 'move-images', 'move-icons'], 'append-to-variables', done);
});

gulp.task('test', () => {
  return log('testing...');
});

gulp.task('release', () => {
  return log('releasing...');
});
