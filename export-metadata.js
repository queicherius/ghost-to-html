var dateFormat = require('dateformat')
var path = require('path')
var sqlite3 = require('sqlite3')

module.exports = function (source, callback) {
  var db = new sqlite3.Database(path.join(source, 'content/data/ghost.db'), function (err, db) {
    if (err) throw err
  })

  db.serialize(function () {
    db.all('SELECT posts.title, posts.slug, tags.name, posts.published_at \
            FROM posts \
            LEFT OUTER JOIN posts_tags ON posts.id = posts_tags.post_id \
            LEFT OUTER JOIN tags ON posts_tags.tag_id = tags.id \
            WHERE status IS NOT "draft"', function (err, rows) {
      if (err) throw err

      var post_metadata = {}

      // Go through every post and save them in the format filename -> {title, [tags]}
      for (var i = 0; i !== rows.length; i++) {
        var slug = dateFormat(new Date(rows[i].published_at), 'yyyy-mm-dd-') + rows[i].slug

        if (!post_metadata[slug]) {
          post_metadata[slug] = {title: rows[i].title, tags: []}
        }

        if (rows[i].name) {
          post_metadata[slug].tags.push(rows[i].name)
        }
      }

      callback(post_metadata)
    })
  })

  db.close()
}
