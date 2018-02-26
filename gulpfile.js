/* eslint global-require: 0, import/no-extraneous-dependencies: 0 */
const gulp = require('gulp');
const tslint = require('gulp-tslint');
// const gulpSequence = require('gulp-sequence');
// const chai = require('chai');
// const exec = require('child_process').execFileSync;

// const env = process.env.NODE_ENV || '';
// const execOpts = { stdio: 'inherit', timeout: 1000 * 60 * 4 };
// const space = `EngageSupport-${env.toUpperCase()}`;
// const manifest = `${__dirname}/manifest-${env.toLowerCase()}.yml`;
// const blueInstance = `ESFINDCMR-${env.toUpperCase()}`;
// const greenInstance = `ESFINDCMR-${env.toUpperCase()}-new`;
// const tempInstance = `ESFINDCMR-${env.toUpperCase()}-temp`;
// const domain = 'w3ibm.mybluemix.net';

// global.expect = chai.expect;

// const testGlobs = [
//   'tests/**/*.spec.js',
//   '!tests/api/**/*',
//   '!node_modules/**',
//   '!coverage/**',
// ];
// let istanbul = '';

// /* Setup Istanbul for test reporting */
// gulp.task('test:setupIstanbul', () => {
//   istanbul = require('gulp-istanbul');

//   const globs = [
//     '**/*.js',
//     '!gulpfile.js',
//     '!node_modules/**',
//     '!coverage/**',
//     '!tests/**',
//     '!dist/**',
//     '!config/**',
//   ];
//   return gulp.src(globs)
//   .pipe(istanbul({ includeUntested: true }))
//   .pipe(istanbul.hookRequire());
// });

// /* Unit Test Runner (Mocha) */
// gulp.task('test', ['localEnv', 'test:setupIstanbul'], () => {
//   process.env.NODE_ENV = 'test';
//   const mocha = require('gulp-mocha');
//   const exit = require('gulp-exit');

//   return gulp.src(testGlobs, { read: false })
//   .pipe(mocha({
//     ui: 'bdd',
//     timeout: 10000,
//     require: ['mocha'],

//   }))
//   .pipe(istanbul.writeReports({
//     reporters: ['text-summary', 'html'],
//     timeout: 10000,
//   }))
//   .pipe(exit());
// });

// gulp.task('test:api', () => {
//   const apiGlobs = [
//     'tests/api/**/*.spec.js',
//   ];
//   const mocha = require('gulp-mocha');

//   return gulp.src(apiGlobs, { read: false })
//   .pipe(mocha({
//     ui: 'bdd',
//     timeout: 45000,
//     require: ['mocha'],

//   }));
// });

gulp.task('localEnv', () => {
  process.env.NODE_ENV = 'development';
  // process.env.SLACK_WEBHOOK = 'https://hooks.slack.com/services/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';
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  // process.env.CONSOLE_LOG_LEVEL = 'trace';
  // process.env.CRONJOB = '00 */1 * * * *';
});

/* Start server in debug */
gulp.task('serve', ['localEnv'], () => {
  const nodemon = require('gulp-nodemon');

  nodemon({
    script: 'app.js',
    ext: 'js json',
    ignore: ['gulpfile.js', '**/*.spec.js'],
    nodeArgs: ['--inspect'],
  });
});

// /* Blue Green Deployment */
// function targetSpace() {
//   if (!env) throw new Error('NODE_ENV must be set.');
//   exec('cf', ['target', '-s', space], execOpts);
// }

// function stageGreenApp() {
//   if (!env) throw new Error('NODE_ENV must be set.');
//   exec('cf', ['push', greenInstance, '-n', greenInstance, '-f', manifest], execOpts);
// }

// function mapGreenApp() {
//   if (!env) throw new Error('NODE_ENV must be set.');
//   exec('cf', ['map-route', greenInstance, domain, '-n', blueInstance.toLowerCase()], execOpts);
// }

// function switchRoutes() {
//   if (!env) throw new Error('NODE_ENV must be set.');
//   exec('cf', ['unmap-route', blueInstance, domain, '-n', blueInstance.toLowerCase()], execOpts);
//   exec('cf', ['unmap-route', greenInstance, domain, '-n', greenInstance.toLowerCase()], execOpts);
// }

// function unstageBlueApp() {
//   if (!env) throw new Error('NODE_ENV must be set.');
//   exec('cf', ['stop', blueInstance], execOpts);
// }

// function renameApps() {
//   if (!env) throw new Error('NODE_ENV must be set.');
//   exec('cf', ['rename', blueInstance, tempInstance], execOpts);
//   exec('cf', ['rename', greenInstance, blueInstance], execOpts);
//   exec('cf', ['rename', tempInstance, greenInstance], execOpts);
// }

// gulp.task('push:targetSpace', () => {
//   targetSpace();
// });

// gulp.task('push:stageGreenApp', () => {
//   stageGreenApp();
// });

// gulp.task('push:mapGreenApp', () => {
//   mapGreenApp();
// });

// gulp.task('push:switchRoutes', () => {
//   switchRoutes();
// });

// gulp.task('push:unstageBlueApp', () => {
//   unstageBlueApp();
// });

// gulp.task('push:renameApps', () => {
//   renameApps();
// });

// gulp.task('push', () => {
//   targetSpace();
//   stageGreenApp();
//   mapGreenApp();
//   switchRoutes();
//   unstageBlueApp();
//   renameApps();
// });

// gulp.task('lint', ['eslint', 'tslint']);

gulp.task("tslint", () => {
  return gulp.src("src/**/*.ts") //./src/**/*.ts
  .pipe(tslint({
    // contains rules in the tslint.json format 
    configuration: "src/client/tsconfig.app.json"
  }))
  .pipe(tslint({
      formatter: "prose"
  }))
  // .on('error', printError)
  .pipe(tslint.report({
      summarizeFailureOutput: true
  }))
});

let printError = function(error) {
  console.log(error.toString());
}

/* ESLint using Airbnb styleguide */
gulp.task('eslint', () => {
  const eslint = require('gulp-eslint');

  return gulp.src(['src/server/**/*.js', '!coverage/**', '!node_modules/**', '!dist/**', '!public/**', '!swagger/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

// gulp.task('default', ['serve']);
// // gulp.task('build', ['lint', 'test']);
// gulp.task('build', gulpSequence('lint', 'test'));
// gulp.task('build', ['tslint']);
