var GhostExport = require('ghost-export')
var parseMarkdown = require('js-markdown-extra').Markdown
var fs = require('fs-extra')
var mkpath = require('mkpath')
var md5 = require('md5')
var rimraf = require('rimraf')
var exportMetadata = require('./export-metadata')

function replaceAll (string, find, replace) {
  return string.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'), 'g'), replace)
}

function matchAll (string, regex, capture_group) {
  var matches = []
  var match = regex.exec(string)

  while (match != null) {
    matches.push(match[capture_group])
    match = regex.exec(string)
  }

  return matches
}

var destination = process.argv[2] ? process.argv[2].replace(/\/$/, '') : '.'

// Create directories
console.log('Cleaning and creating directories... (' + destination + '/)')
rimraf(destination + '/+(html|markdown)', function () {
  mkpath.sync(destination + '/markdown')
  mkpath.sync(destination + '/html')
  mkpath.sync(destination + '/html/images')

  // Export markdown
  console.log('Exporting ghost files to markdown...')
  GhostExport({
    source: '.',
    destination: destination + '/markdown',
    published: true,
    drafts: false
  }, function (err, count) {
    if (err) throw err

    console.log('Converting markdown into html...')

    // Read markdown files
    var markdown_files = fs.readdirSync(destination + '/markdown')
    console.log(markdown_files.length + ' markdown files')

    // Convert & save markdown files
    for (var i = 0; i !== markdown_files.length; i++) {
      var md = fs.readFileSync(destination + '/markdown/' + markdown_files[i], {encoding: 'utf-8'})
      var html = generateValidHtml(md)

      // Replace link urls with hashes that are easier to manage & save them in a subdirectory
      var html_links = matchAll(html, new RegExp('<img src="([^"]*)"', 'g'), 1)
      for (var j = 0; j !== html_links.length; j++) {
        var link = html_links[j]
        var ending = link.match(/\..*?$/)[0]
        var hash = 'images/' + md5(link) + ending

        html = replaceAll(html, link, hash)
        fs.copySync('.' + link, destination + '/html/' + hash)
      }

      fs.writeFileSync(destination + '/html/' + markdown_files[i].replace(/.md$/, '.html'), html)
    }

    console.log('Exporting metadata...')
    exportMetadata('.', function (meta) {
      fs.writeFileSync(destination + '/html/metadata.json', JSON.stringify(meta))
    })
  })
})

function generateValidHtml (markdown) {
  // Make sure our layout hacks go unnoticed
  markdown = markdown.replace(/\[\]\(\)<div>/g, '<div>')

  // Add the markdown parsing tag to the page divs
  markdown = markdown.replace(/<div( [^>]*)?>/g, '<div$1 markdown="1">')

  // Parse markdown
  var html = parseMarkdown(markdown)

  // Remove the page wrapper divs
  html = html.trim()
  html = html.replace(/<div class="bigPage">((?:.|\n)*)<\/div>/, '$1')
  html = html.trim()

  return html
}
