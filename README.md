# Ghost to HTML Converter

A tiny script to convert a [Ghost Blog](http://tryghost.org) into a set of HTML files and an image folder. 
You can use this to convert Ghost into a editing platform for systems that expect raw HTML (as we do at [gw2efficiency](http://gw2efficiency.com)).

**Disclaimer:** This is pretty hacky. Beware.

## Usage

```bash
cd your-ghost-directory
git clone https://github.com/queicherius/ghost-to-html.git
node ghost-to-html/index.js
```

After running these commands there should be a `markdown/` folder, containing all your blog posts in markdown and a `html/` folder containing all your blogposts and images in parsed html.
