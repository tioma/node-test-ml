/**
 * Created by Artiom on 26/07/2017.
 */
var gulp = require('gulp');
var htmlReplace = require('gulp-html-replace');
var minify = require('gulp-minify');
var babel = require('gulp-babel');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('minify', function () {
	gulp.src(['!src/public/bower_components/**/*.js', 'src/**/*.js'])
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(minify({
			ext: {
				min: '.min.js'
			}
		})).on('error', function(e){
			"use strict";
			console.log(e);
		})
		.pipe(gulp.dest('build'))
});

gulp.task('clean-css', function(){
	"use strict";
	gulp.src('src/public/stylesheets/styles.css')
		.pipe(cleanCss())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('build/public/stylesheets'));
});

gulp.task('html-replace', function(){
	"use strict";
	gulp.src('src/public/index.html')
		.pipe(htmlReplace({
			css: {
				src: ['stylesheets/bootstrap.min.css', 'stylesheets/styles.min.css']
			},
			bower: {
				src: [
					'bower_components/angular/angular.min.js',
					'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
					'bower_components/angular-sanitize/angular-sanitize.min.js',
					'bower_components/angular-ui-router/angular-ui-router.min.js'
				]
			},
			app: {
				src: [
					'app.min.js',
					'busqueda/busqueda.controller.min.js',
					'resultado/resultado.controller.min.js',
					'detalle/detalle.controller.min.js',
					'busqueda/busqueda.factory.min.js',
					'class/item.class.min.js'
				]
			}
		}))
		.pipe(gulp.dest('build/public'))
});

gulp.task('copy-files', function(){
	"use strict";
	var templates = {
		busqueda: 'src/public/busqueda/busqueda.view.html',
		resultado: 'src/public/resultado/resultado.view.html',
		detalle: 'src/public/detalle/detalle.view.html',
		img: 'src/public/img/*',
		stylesheets: 'src/public/stylesheets/*.min*'
	};
	for (var template in templates){
		gulp.src(templates[template])
			.pipe(gulp.dest('build/public/' + template))
	}
	gulp.src('src/public/favicon.ico').pipe(gulp.dest('build/public'));
});

gulp.task('copy-libs', function(){
	"use strict";
	var bower = {
		'angular': 'angular/*.min*',
		'angular-bootstrap': 'angular-bootstrap/{*-tpls.min*,uib/**}',
		'angular-sanitize': 'angular-sanitize/*.min*',
		'angular-ui-router': 'angular-ui-router/release/*.min*'
	};

	for (var lib in bower){
		gulp.src('src/public/bower_components/' + bower[lib])
			.pipe(gulp.dest('build/public/bower_components/' + lib));
	}
});

gulp.task('default', ['minify', 'clean-css', 'html-replace', 'copy-files', 'copy-libs']);