# Ghost to HTML Converter

A tiny script to convert a [Ghost blog](http://tryghost.org) into a set of HTML files and an image folder. 
You can use this to convert Ghost into a editing platform for systems that expect raw HTML.

**Disclaimer:** This is pretty hacky. Beware.

## Usage

**Warning:** This will clear any `/html` and any `/markdown` folders you have in the directory you run the command in.

```bash
npm install -g ghost-to-html
cd your-ghost-directory
ghost-to-html
```

After running these commands you get this folder structure generated:

```
- markdown/             All your blogposts in markdown
- html/                 All your blogposts in html
    - images/           All the images in your blogsposts
```