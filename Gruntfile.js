/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  require('jit-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      arLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/ar:./lang/ar']
        },
        dest: 'dist/lang/ar.js'
      },
      azLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/az:./lang/az']
        },
        dest: 'dist/lang/az.js'
      },
      beLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/be:./lang/be']
        },
        dest: 'dist/lang/be.js'
      },
      bgLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/bg:./lang/bg']
        },
        dest: 'dist/lang/bg.js'
      },
      bsLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/bs:./lang/bs']
        },
        dest: 'dist/lang/bs.js'
      },
      caLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/ca:./lang/ca']
        },
        dest: 'dist/lang/ca.js'
      },
      csLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/cs:./lang/cs']
        },
        dest: 'dist/lang/cs.js'
      },
      cyLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/cy:./lang/cy']
        },
        dest: 'dist/lang/cy.js'
      },
      daLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/da:./lang/da']
        },
        dest: 'dist/lang/da.js'
      },
      deLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/de:./lang/de']
        },
        dest: 'dist/lang/de.js'
      },
      elLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/el:./lang/el']
        },
        dest: 'dist/lang/el.js'
      },
      enLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/en:./lang/en']
        },
        dest: 'dist/lang/en.js'
      },
      esLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/es:./lang/es']
        },
        dest: 'dist/lang/es.js'
      },
      etLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/et:./lang/et']
        },
        dest: 'dist/lang/et.js'
      },
      euLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/eu:./lang/eu']
        },
        dest: 'dist/lang/eu.js'
      },
      faLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/fa:./lang/fa']
        },
        dest: 'dist/lang/fa.js'
      },
      fiLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/fi:./lang/fi']
        },
        dest: 'dist/lang/fi.js'
      },
      frLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/fr:./lang/fr']
        },
        dest: 'dist/lang/fr.js'
      },
      hrLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/hr:./lang/hr']
        },
        dest: 'dist/lang/hr.js'
      },
      huLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/hu:./lang/hu']
        },
        dest: 'dist/lang/hu.js'
      },
      idLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/id:./lang/id']
        },
        dest: 'dist/lang/id.js'
      },
      itLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/it:./lang/it']
        },
        dest: 'dist/lang/it.js'
      },
      jaLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/ja:./lang/ja']
        },
        dest: 'dist/lang/ja.js'
      },
      kaLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/ka:./lang/ka']
        },
        dest: 'dist/lang/ka.js'
      },
      koLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/ko:./lang/ko']
        },
        dest: 'dist/lang/ko.js'
      },
      kmLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/km:./lang/km']
        },
        dest: 'dist/lang/km.js'
      },
      ltLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/lt:./lang/lt']
        },
        dest: 'dist/lang/lt.js'
      },
      lvLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/lv:./lang/lv']
        },
        dest: 'dist/lang/lv.js'
      },
      mkLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/mk:./lang/mk']
        },
        dest: 'dist/lang/mk.js'
      },
      mnLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/mn:./lang/mn']
        },
        dest: 'dist/lang/mn.js'
      },
      msLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/ms:./lang/ms']
        },
        dest: 'dist/lang/ms.js'
      },
      nbNOLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/nb_NO:./lang/nb_NO']
        },
        dest: 'dist/lang/nb_NO.js'
      },
      nlLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/nl:./lang/nl']
        },
        dest: 'dist/lang/nl.js'
      },
      plLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/pl:./lang/pl']
        },
        dest: 'dist/lang/pl.js'
      },
      ptLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/pt:./lang/pt']
        },
        dest: 'dist/lang/pt.js'
      },
      ptBRLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/pt_BR:./lang/pt_BR']
        },
        dest: 'dist/lang/pt_BR.js'
      },
      roLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/ro:./lang/ro']
        },
        dest: 'dist/lang/ro.js'
      },
      ruLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/ru:./lang/ru']
        },
        dest: 'dist/lang/ru.js'
      },
      seLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/sl:./lang/se']
        },
        dest: 'dist/lang/se.js'
      },
      slLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/sl:./lang/sl']
        },
        dest: 'dist/lang/sl.js'
      },
      sqLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/sq:./lang/sq']
        },
        dest: 'dist/lang/sq.js'
      },
      srLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/sr:./lang/sr']
        },
        dest: 'dist/lang/sr.js'
      },
      svLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/sv:./lang/sv']
        },
        dest: 'dist/lang/sv.js'
      },
      trLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/tr:./lang/tr']
        },
        dest: 'dist/lang/tr.js'
      },
      uaLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/ua:./lang/ua']
        },
        dest: 'dist/lang/ua.js'
      },
      ukLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/uk:./lang/uk']
        },
        dest: 'dist/lang/uk.js'
      },
      viLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/vi:./lang/vi']
        },
        dest: 'dist/lang/vi.js'
      },
      zhLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/zh:./lang/zh']
        },
        dest: 'dist/lang/zh.js'
      },
      zhTWLang: {
        src: [],
        options: {
          require: ['./src/lib/lang/zh_TW:./lang/zh_TW']
        },
        dest: 'dist/lang/zh_TW.js'
      },
      dist: {
        files: {
          'dist/index.js': 'src/lib/index.js'
        },
        options: {
          banner:
            '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.homepage %> - ' +
            '<%= grunt.template.today(\'yyyy-mm-dd\') %> */',
          browserifyOptions: {
            standalone: 'Validator'
          }
        }
      }
    },
    watch: {
      files: ['src/**/*.js'],
      tasks: ['default']
    }
  });

  // Default task.
  grunt.registerTask('build', ['browserify']);
  grunt.registerTask('dist', ['build']);
  grunt.registerTask('default', ['dist']);
};
