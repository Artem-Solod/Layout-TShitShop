import rename from 'gulp-rename';

export const favicon = () => {
	return app.gulp.src(app.path.src.favicon)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FAVICON",
				message: "Error: <%= error.message %>"
			})))
		.pipe(
			rename({
				basename: "favicon",
				extname: ".ico"
			}))
		.pipe(app.gulp.dest(app.path.build.favicon))
}