# Ghost to HTML Converter

[![No Maintenance Intended](https://img.shields.io/badge/No%20Maintenance%20Intended-%E2%9C%95-red.svg?style=flat-square)](http://unmaintained.tech/)

A tiny script to convert a [Ghost blog](http://tryghost.org) into a set of HTML files and an image folder. 
You can use this to convert Ghost into a editing platform for systems that expect raw HTML.

**:bomb: Disclaimer:** This is pretty hacky. Beware.

## Usage

**Warning:** This will clear any `/html` and any `/markdown` folders you have in the destination!

```bash
npm install -g ghost-to-html
cd your-ghost-directory
ghost-to-html your-destination/path/
```

After running these commands you get this folder structure generated:

```
- your-destination/path/
    - markdown/             All your blog posts in markdown
    - html/                 All your blog posts in html & a metadata.json
        - images/           All the images in your blog posts
```
