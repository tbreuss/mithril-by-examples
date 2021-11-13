const { DateTime } = require('luxon');
const fs = require('fs');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginNavigation = require('@11ty/eleventy-navigation');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const {decode} = require('html-entities');
const util = require('util')

module.exports = function(eleventyConfig) {

  function getCharCodes(s){
    let charCodeArr = [];
    for(let i = 0; i < s.length; i++){
      let code = s.charCodeAt(i);
      charCodeArr.push(code);
    }
    return charCodeArr;
  }

  function parseItems(items, conjunction)
  {
    if (!Array.isArray(items)) {
      return '';
    }
    let mappedItems = items.map((item) => {
      return '`' + item + '`';
    });
    let lastItem = mappedItems.pop();
    if (mappedItems.length > 0) {
      return mappedItems.join(', ') + ' ' + conjunction + ' ' + lastItem;
    }
    return lastItem;
  }

  function sumDigits(n) {
    return (n - 1) % 9 + 1;
  }

  function calcSumDigitsOfString(s) {
    let ascii = getCharCodes(s);
    let sum = ascii.reduce(function (a, b) {
      return a + b;
    }, 0);
    return sumDigits(sum);
  }

  eleventyConfig.addFilter('dumper', obj => {
    return util.inspect(obj)
  });

  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Alias `layout: post` to `layout: layouts/post.njk`
  // eleventyConfig.addLayoutAlias('example', 'layouts/example.html');

  // see https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/
  eleventyConfig.addFilter('bust', (url) => {
    const [urlPart, paramPart] = url.split('?');
    const params = new URLSearchParams(paramPart || '');
    params.set('v', DateTime.local().toFormat('X'));
    return `${urlPart}?${params}`;
  });

  eleventyConfig.addFilter('stringify', (csvString) => {
    if (!Array.isArray(csvString)) {
      return '[]';
    }
    return JSON.stringify(csvString);
  });

  eleventyConfig.addShortcode('textifyTop', (title, description, date, tags, level, version, author, authorUrl, link, authorMap) => {
    // some nice procedural programming ;-)

    let textVariantNumber = calcSumDigitsOfString(title) % 3;

    let authorExampleCount = 1;
    authorMap.forEach((data) => {
      if (author === data[0]) {
        authorExampleCount = data[1].count;
        return;
      }
    });

    let apiMethods = (tags || []).filter(function (tag) {
      return tag.includes('m.');
    });

    let lifecycleMethods = (tags || []).filter(function (tag) {
      const methods = ['onbeforeupdate', 'onremove', 'onbeforeremove', 'onupdate', 'oncreate', 'oninit'];
      return methods.indexOf(tag) >= 0;
    });

    let text = [];

    if (description && (description.length > 0)) {
      text.push(description);
      text.push('');
    }

    if (author.length > 0) {
      text.push([
        'The example was contributed by ' + author + ' and last modified on ' + date + '.',
        'The code sample was authored by ' + author + '. It was last modified on ' + date + '.',
        'The example was written by ' + author + ', last edits were made on ' + date + '.',
      ][textVariantNumber]);
      if (authorExampleCount > 2) {
        text.push([
          '[Click here](' + authorUrl + ') to see more examples contributed by the author.',
          'Want to see more examples written by ' + author + '? Then [Click here](' + authorUrl + ').',
          'The author has contributed some more snippets. [Click here](' + authorUrl + ') to see them all.'
        ][textVariantNumber]);
      } else if(authorExampleCount === 2) {
        text.push([
          '[Click here](' + authorUrl + ') to see another example contributed by the author.',
          'Do you want to see another one written by ' + author + '? Then [Click here](' + authorUrl + ').',
          'The author has written one more snippet. [Click here](' + authorUrl + ') to see it.'
        ][textVariantNumber]);
      }
    }

    if (version.length > 0) {
      text.push ("\n");
      if (version === '2.0.4') {
        text.push([
          'The snippet is using the most current version ' + version + ' of Mithril JS framework.',
          'The snippet requires the latest version ' + version + ' of Mithril JS framework.',
          'As a prerequisite for this snippet, the latest version ' + version + ' of Mithril JS framework is required.'
        ][textVariantNumber]);
      } else {
        text.push([
          'The snippet is using version ' + version + ' of Mithril JS framework.',
          'The snippet requires version ' + version + ' of Mithril JS framework.',
          'As a prerequisite for this snippet, version ' + version + ' of Mithril JS framework is required.'
        ][textVariantNumber]);
      }
    }

    if (level.length > 0) {
      switch(level) {
        case 'beginner':
          text.push([
            'It is aimed at beginners and shows some basic recipes.',
            'It is ideal for beginners showing some basic recipes.',
            'Beginners should have no problems following this example, that simply shows some basic recipies.'
          ][textVariantNumber]);
          break;
        case 'advanced':
          text.push([
            'It is aimed at more advanced users and shows some things, that are not easy to achieve.',
            'More advanced users should be able to follow this example, however it contains some first difficulties.',
            'Advanced users belong to the target group of this example, meaning some framework knowledge should be there.'
          ][textVariantNumber]);
          break;
        case 'intermediate':
          text.push([
            'It is aimed at intermediate users who are familiar with most of the aspects of the framework.',
            'You should be familiar with most aspects of the framework. So the example is aimed at advanced users.',
            'The example targets intermediate users, that are familiar with with most aspects of the framework.'
          ][textVariantNumber]);
          break;
        case 'expert':
          text.push([
            'It is aimed at expert users who are familiar with all of the aspects of the framework and JavaScript itself.',
            'As an expert user, who is familiar with all the aspects of Mithril and JS itself, you are able the follow the example easily.',
            'The example really targets users on expert level, that are familiar with all aspects of Mithril and JS itself.'
          ][textVariantNumber]);
          break;
      }
    }

    if ((apiMethods.length > 0) || (lifecycleMethods.length > 0) || (tags.indexOf('vnode') > 0)) {
      text.push('');
    }

    if (apiMethods.length > 1) {
      text.push([
        'Besides Mithril\'s hyperscript function m() we can see different Mithril API methods like ' + parseItems(apiMethods, 'or') + '.',
        'In this example we can see some Mithril API methods like ' + parseItems(apiMethods, 'or') + ', besides Mithril\'s basic m() hyperscript function.',
        'Here we can see use cases of different Mithril API methods like ' + parseItems(apiMethods, 'or') + ', besides the centrepiece m() hyperscript function.'
      ][textVariantNumber]);
    } else if (apiMethods.length === 1) {
      text.push([
        'In addition to the Mithril hyperscript function m(), here we can see an example of Mithril\'s ' + parseItems(apiMethods, 'or') + ' API method.',
        'In this example we can see an example of Mithril\'s ' + parseItems(apiMethods, 'or') + ' API method, besides it core m() hyperscript function.',
        'In this code sample Mithril\'s ' + parseItems(apiMethods, 'or') + ' API method is use, besides the basic hyperscript function m().'
      ][textVariantNumber]);
    }

    if (lifecycleMethods.length > 1) {
      text.push([
        'It also shows, how Mithril\'s hooks (called lifecycle methods) like ' + parseItems(lifecycleMethods, 'and') + ' can be used.',
        'It also demonstrates, how Mithril\'s lifecycle methods (aka hooks) like ' + parseItems(lifecycleMethods, 'and') + ' can be used.',
        'Moreover, it can also be seen how lifecycle methods (as known as hooks) like ' + parseItems(lifecycleMethods, 'and') + ' can be used.'
      ][textVariantNumber]);
    } else if (lifecycleMethods.length === 1) {
      text.push([
        'It also shows, how Mithril\'s lifecycle methods can be used. This can be seen here by using the ' + parseItems(lifecycleMethods, 'and') + ' hook.',
        'It is also showing the ' + parseItems(lifecycleMethods, 'and') + ' hook, which is one of several Mithril\'s lifecycle methods.',
        'Moreover, it shows how the lifecycle method ' + parseItems(lifecycleMethods, 'and') + ' can be used (better know as hook).'
      ][textVariantNumber]);
    }

    if (tags.indexOf('vnode') > 0) {
      text.push([
        'In this example we can also see the usecase of Vnodes (virtual DOM nodes) which is a JavaScript data structure that describes a DOM tree.',
        'We can also see the usecase of virtual DOM nodes (Vnodes) that is a JavaScript data structure describing a DOM tree.',
        'Also covered in this example is the use of Vnodes or virtual DOM nodes, a JavaScript data structure that describes a DOM tree.'
      ][textVariantNumber]);
    }

    if (link && (link.length > 0)) {
      text.push('');
      text.push([
        'You can find [more information](' + link + ') here.',
        'More information about this example [can be found here](' + link + ').',
        '[Click here](' + link + '), if you need more information on that.',
      ][textVariantNumber]);
    }

    text.push('');
    text.push([
      'Enough said, here it is!',
      'Ready? Here we go!',
      'So, here are the code snippets.',
    ][textVariantNumber]);

    if (text.length > 0) {
      return markdownLibrary.render(text.join("\n"));
    }
    return '';
  });

  eleventyConfig.addShortcode('textifyBottom', (title, date, tags, level, version) => {
    // some nice procedural programming ;-)

    let textVariantNumber = calcSumDigitsOfString(title) % 3;

    let text = [];

    if (version.length > 0) {
      text.push ("\n");
      if (version === '2.0.4') {
        text.push([
          'If anyone has some improvements, that should be addressed, let me know by [opening an issue](https://github.com/tbreuss/mithril-by-examples/issues).',
          'Do you see some improvements, that could be addressed here? Then let me know by [opening an issue](https://github.com/tbreuss/mithril-by-examples/issues).',
          'Did you note a typo or something else? So let me know by [opening an issue](https://github.com/tbreuss/mithril-by-examples/issues).',
        ][textVariantNumber]);
      } else {
        text.push([
          '🤫 Shh! If anyone want\'s to bring this code snippet up to the current version, or has other improvements, that should be addressed, let me know by [opening an issue](https://github.com/tbreuss/mithril-by-examples/issues).',
          '❓ Hey! Do you want to bring this code sample up to the latest version? Or do you see a bug or other improvements for this snippet? Then let me know by [opening an issue](https://github.com/tbreuss/mithril-by-examples/issues).',
          '💪 This snippet uses an older Mithril version. Let me know by [opening an issue](https://github.com/tbreuss/mithril-by-examples/issues) if you want to improve this example or update it to the latest Mithril version.'
        ][textVariantNumber]);
      }

      text.push([
        'Or simply fork the repository on GitHub, push your commits and send a pull request.',
        'As an alternative, you can fork the repository on GitHub, push your commits and send a pull request.',
        'Or much better: just fork the repository on GitHub, push your commits and send a pull request.'
      ][textVariantNumber]);

      text.push([
        'For starting your work, you can click the edit link below. Thanks for contributing.',
        'To start your work, click on the edit link below. Thank you for contributing to this repo.',
        'Ready to start your work? Then click on the edit link below. Thanks in advance!'
      ][textVariantNumber]);
    }

    if (text.length > 0) {
      return markdownLibrary.render(text.join("\n"));
    }
    return '';
  });

  eleventyConfig.addShortcode('flems', (content, title, flemsSelected, flemsFiles, flemsLinks, version) => {
    // some nice procedural programming ;-)

    if (!flemsSelected || flemsSelected === '') {
      flemsSelected = '.js';
    }

    if (!Array.isArray(flemsFiles)) {
      flemsFiles = ['.html', '.css', '.ts', '.js'];
    }

    let flemsLinksArray = [];

    if (!Array.isArray(flemsLinks)) {
      flemsLinks = [];
    }

    flemsLinksArray.push({
      name: 'mithril@' + version,
      type: 'script',
      url: 'https://unpkg.com/mithril@' + version
    });

    for (let link of flemsLinks) {
      if (typeof link === 'object') {
        flemsLinksArray.push({
          name: link.name,
          type: link.type,
          url: link.url
        })
      } else {
        flemsLinksArray.push({
          name: link,
          type: 'script',
          url: 'https://unpkg.com/' + link
        })
      }
    }

    const languages = [
      {
        type: 'html',
        name: '.html',
        openTag: '<code class="language-html">',
        closeTag: '</code>',
        filenameRegex: /<!-- (.+?\.html) -->/s
      },
      {
        type: 'css',
        name: '.css',
        openTag: '<code class="language-css">',
        closeTag: '</code>',
        filenameRegex: /\/\* (.+?\.css) \*\//s
      },
      {
        type: 'ts',
        name: '.ts',
        openTag: '<code class="language-ts">',
        closeTag: '</code>',
        filenameRegex: /\/\/ (.+?\.ts)/s
      },
      {
        type: 'js',
        name: '.js',
        openTag: '<code class="language-js">',
        closeTag: '</code>',
        filenameRegex: /\/\/ (.+?\.js)/s
      },
    ]

    const matches = content.match(/<code class="language-(.+?)">(.*?)<\/code>/sg);

    if (!Array.isArray(matches)) {
      return '';
    }

    let flemsFilesArray = [];
    let fileNames = [];
    for (let match of matches) {
      for (let language of languages) {
        let openTagLength = language.openTag.length;

        if (match.substr(0, openTagLength) !== language.openTag) {
          continue;
        }

        if (fileNames.includes(language.name)) {
          continue;
        }

        let flemsName = language.name;
        let flemsCompiler = '';
        let flemsContent = decode(match.substr(openTagLength, match.length - openTagLength - language.closeTag.length));
        let firstLine = flemsContent.split('\n')[0];
        let nameMatch = firstLine.match(language.filenameRegex);

        if (nameMatch && nameMatch[1]) {
          flemsName = nameMatch[1];
        }

        let found = false;
        for (let tmpFile of flemsFiles) {
          if (typeof tmpFile === 'object') {
            if (tmpFile.name === flemsName) {
              if (tmpFile.compiler) {
                flemsCompiler = tmpFile.compiler;
              }
              found = true;
              break;
            }
          } else {
            if (tmpFile === flemsName) {
              found = true;
              break;
            }
          }
        }

        if (!found) {
          continue;
        }

        if (flemsCompiler !== '') {
          flemsFilesArray.push({
            name: flemsName,
            compiler: flemsCompiler,
            content: flemsContent
          });
        } else {
          flemsFilesArray.push({
            name: flemsName,
            content: flemsContent
          });
        }

        fileNames.push(flemsName);
      }
    }

    if (flemsFilesArray.length === 0) {
      return '';
    }

    const jsonFlemsFiles = JSON.stringify(flemsFilesArray);
    const jsonFlemsLinks = JSON.stringify(flemsLinksArray);

    let html = `
      <div class="modal-container">
        <label for="modal" class="example-label">Show Live Example in Flems</label>
        <label for="modal" class="modal-background"></label>
        <input type="checkbox" id="modal">
        <div class="modal">
          <div class="modal-header">
            <h3>${title}</h3>
            <label for="modal">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAdVBMVEUAAABNTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU0N3NIOAAAAJnRSTlMAAQIDBAUGBwgRFRYZGiEjQ3l7hYaqtLm8vsDFx87a4uvv8fP1+bbY9ZEAAAB8SURBVBhXXY5LFoJAAMOCIP4VBRXEv5j7H9HFDOizu2TRFljedgCQHeocWHVaAWStXnKyl2oVWI+kd1XLvFV1D7Ng3qrWKYMZ+MdEhk3gbhw59KvlH0eTnf2mgiRwvQ7NW6aqNmncukKhnvo/zzlQ2PR/HgsAJkncH6XwAcr0FUY5BVeFAAAAAElFTkSuQmCC" width="16" height="16" alt="">
            </label>
          </div>
          <div id="flems" class="modal-body"></div>
        </div>
      </div>
      <script>
      Flems(document.getElementById("flems"), {
        selected: '${flemsSelected}',
        files: ${jsonFlemsFiles},
        links: ${jsonFlemsLinks}
      });
      </script>
    `;

    const htmlDepsRows = flemsLinksArray.map((v) => {
      return `<tr><td class="capitalize">${v.type}</td><td>${v.name}</td><td>${v.url}</td></tr>`;
    }).join();

    if (htmlDepsRows.length > 0) {
      html += `
        <div class="dependencies">
          <h2 id="dependencies" class="dependencies__heading" tabindex="-1">Dependencies</h2>
          <div class="dependencies__tableWrap">
            <table class="dependencies__table dependencies__table--${flemsLinksArray.length}">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                ${htmlDepsRows}
                </tbody>
            </table>
          </div>
        </div>
        <style>
        .dependencies {
            color: #282c34;
            margin-bottom: 2rem;
        }
        .dependencies__tableWrap {
            background-color: #282c34;
        }
        /* strange things happen here */
        .dependencies__table {
            margin: -1rem 0 0 0 !important;
            padding: 1em;
        }
        .dependencies__table--1 {
            margin-top: 0 !important;
        }
        .dependencies__table th, .dependencies__table td {
            color: #abb2bf;
            font-family: Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace;
            font-size: 14px;
        }
        .dependencies__table th {
          text-align: left;
        }
        .capitalize {
            text-transform: capitalize;
        }
        </style>
      `;
    }

    return html;
  });

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('dd LLLL yyyy');
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter('min', (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  function filterTagList(tags) {
    return (tags || []).filter(tag => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1);
  }

  eleventyConfig.addFilter('filterTagList', filterTagList)

  eleventyConfig.addFilter('filterByAuthor', function(collection, author) {
    if (!author) return collection;
    return collection.filter(item => item.data.author === author)
  });

  eleventyConfig.addFilter('filterByLevel', function(collection, level) {
    if (!level) return collection;
    return collection.filter(item => item.data.level === level)
  });

  eleventyConfig.addFilter('filterByTag', function(collection, tag) {
    if (!tag) return collection;
    return collection.filter(item => item.data.tags.indexOf(tag) !== -1)
  });

  eleventyConfig.addCollection('levelMap', function(collection) {
    let map = new Map();
    collection.getFilteredByGlob('./examples/*.*').forEach(item => {
        let key = item.data.level
        if (!key || key.length <= 0) {
          return
        }
        key = key.toLowerCase()
        let level = {
          name: item.data.level,
          count: 1
        }
        if (map.has(key)) {
          let count = map.get(key).count
          level.count = count + 1
        }
        map.set(key, level)
      }
    );
    return [...map.entries()];
  });

  eleventyConfig.addCollection('levelList', function(collection) {
    let levelSet = new Set();
    collection.getFilteredByGlob('./examples/*.*').forEach(item => {
      if (item.data.level && item.data.level.length > 0) {
        levelSet.add(item.data.level)
      }
    });
    return [...levelSet];
  });

  eleventyConfig.addCollection('authorMap', function(collection) {
    let map = new Map();
    collection.getFilteredByGlob('./examples/*.*').forEach(item => {
        let key = item.data.author
        if (!key || key.length <= 0) {
          return
        }
        key = key.toLowerCase()
        let author = {
          name: item.data.author,
          count: 1
        }
        if (map.has(key)) {
          let count = map.get(key).count
          author.count = count + 1
        }
        map.set(key, author)
      }
    );
    return [...map.entries()];
  });

  eleventyConfig.addCollection('authorList', function(collection) {
    let authorSet = new Set();
    collection.getFilteredByGlob('./examples/*.*').forEach(item => {
        if (item.data.author && item.data.author.length > 0) {
          authorSet.add(item.data.author)
        }
      });
    return [...authorSet];
  });

  eleventyConfig.addCollection('tagMap', function(collection) {
    let map = new Map();
    collection.getFilteredByGlob('./examples/*.*').forEach(item => {
        (item.data.tags || []).forEach(tag => {
          let key = tag
          if (!key || key.length <= 0) {
            return
          }
          key = key.toLowerCase()
          let tagObj = {
            name: tag,
            count: 1
          }
          if (map.has(key)) {
            let count = map.get(key).count
            tagObj.count = count + 1
          }
          map.set(key, tagObj)
        });
      });
    return [...map.entries()];
  });

  // Create an array of all tags
  eleventyConfig.addCollection('tagList', function(collection) {
    let tagSet = new Set();
    collection.getFilteredByGlob('./examples/*.*').forEach(item => {
        (item.data.tags || []).forEach(tag => tagSet.add(tag));
      });
    return filterTagList([...tagSet]);
  });

  eleventyConfig.addCollection('examplesLatest', collection => {
    return collection.getFilteredByGlob('./examples/*.md').sort(function(a, b) {
        if (a.data.date > b.data.date) return -1;
        else if (a.data.date < b.data.date) return 1;
        else return 0;
      });
  });

  eleventyConfig.addCollection('examples', collection => {
    return collection.getFilteredByGlob('./examples/*.md').sort(function(a, b) {
        let nameA = a.data.title.toUpperCase();
        let nameB = b.data.title.toUpperCase();
        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
      });
  });

  // Copy the `img` and `css` folders to the output
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('.htaccess');
  eleventyConfig.addPassthroughCopy('robots.txt');

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: false,
    linkify: true
    }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: 'after',
      class: 'direct-link',
      symbol: '#',
      level: [1,2,3,4],
    }),
    slugify: eleventyConfig.getFilter('slug')
  });
  eleventyConfig.setLibrary('md', markdownLibrary);

  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'});
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      'md',
      'njk',
      'html',
      'liquid'
    ],

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: '/',
    // -----------------------------------------------------------------

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',

    // Opt-out of pre-processing global data JSON files: (default: `liquid`)
    dataTemplateEngine: false,

    // These are all optional (defaults are shown):
    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  };
};
