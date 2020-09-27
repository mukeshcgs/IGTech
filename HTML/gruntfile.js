const sass = require('node-sass');

module.exports = function (grunt) {
    // Configurable paths
    var config = {
        src: 'src',
        dist: 'dist',
        tomcatjs: 'D:/apache-tomcat-7.0.47/webapps/Mice/resources/js',
        tomcatcss: 'D:/apache-tomcat-7.0.47/webapps/Mice/resources/css',
        tomcatimg: 'D:/apache-tomcat-7.0.47/webapps/Mice/resources/images'
    };


    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                files: ['src/sass/**/*.{scss,sass}', 'src/sass/_partials/**/*.{scss,sass}', 'src/css/**/*.css'],
                tasks: ['sass:dist', 'cssmin']
            },
            javascript: {
                files: ['src/js/**/*.js'],
                tasks: ['concat', 'uglify']
            },
            livereload: {
                files: ['dist/*.html', 'dist/js/**/*.{js,json}', 'dist/css/*.css', 'dist/img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
                options: {
                    livereload: true
                }
            }
        },
        sass: {
            options: {
                implementation: sass,
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'dist/css/bootstrap.min.css': 'src/sass/bootstrap.scss'
                }
            }
        },
        cssmin: {
            deps: {
                src: [
                    'src/css/custome.css',
                    'src/css/responsive.css',
                    'src/css/max-width1366.css',
                    'src/css/max-width1200.css',
                    'src/css/max-width1024.css',
                    'src/css/max-width992.css',
                    'src/css/max-width767.css',
                    'src/css/max-width768.css',
                    'src/css/max-width480.css',
                    'src/css/max-width425.css',
                    'src/css/max-width375.css',
                    'src/css/max-width320.css',
                    'src/css/slider-pro.min.css',
                    'src/css/font-awesome.min.css',
                    'src/fonts/roboto/stylesheet.css',
                    'src/css/news.css',
                    'src/css/opendays.css',
                    'src/css/event.css',
                    'src/css/owl.carousel.css'
                ],
                dest: 'dist/css/app_ish.css'
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'dist/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css/',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            options: {
                seperator: '\n\n',
                sourceMap: false,
                stripeBanners: true,
                banner: '/*!<%= pkg.name %> - v<%= pkg.version %> - ' + ' <%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            dist: {
                src: ['src/js/jquery.min.js',
                    'src/js/bootstrap.js'
                ],
                dest: 'dist/js/bootstrap_ish.js',
            },
            deps: {
                src: [
                    'src/js/plugins/jquery.jquery.parallax-1.1.3.js',
                    'src/js/plugins/jquery.sliderPro.min.js',
                    'src/js/plugins/owl.carousel.js',
                    'src/js/plugins/TweenMax.min.js',
                    'src/js/plugins/ScrollMagic.min.js',
                    'src/js/plugins/animation.gsap.min.js',
                    'src/js/plugins/debug.addIndicators.min.js',
                    'src/js/plugins/jquery.easing.min.js',
                    'src/js/app.js'
                ],
                dest: 'dist/js/app_ish.js'
            },
        },
        uglify: {
            options: {
                manage: false,
                sourceMap: true,
                preserveComments: 'all'
            },
            // Following task will take all the js in "dest/js" folder and combine in one minifyed js
            minifyalljs: {
                files: {
                    'dist/js/app_ish.min.js': ['dist/js/bootstrap_ish.js', 'dist/js/app_ish.js']
                }
            },
        },
        imagemin: {
            // static: {
            //     options: {
            //         optimizationLevel: 3,
            //         svgoPlugins: [{removeViewBox: false}],
            //         use: [mozjpeg()] // Example plugin usage 
            //     },
            //     files: {
            //         'dist/img.png': 'src/img.png',
            //         'dist/img.jpg': 'src/img.jpg',
            //         'dist/img.gif': 'src/img.gif'
            //     }
            // },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/tiny/'
                }]
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['dist/js/*.js', 'dist/css/*.css', 'dist/*.html']
                },
                options: {
                    watchTask: true,
                    server: 'dist/'
                }
            }
        },
    });
    grunt.registerTask('default', ['browserSync', 'watch', 'sass:dist', 'imagemin:dynamic']);
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
};