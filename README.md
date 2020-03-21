# Elevenpack

An [Eleventy](https://www.11ty.dev/) starter template that comes with [webpack](https://webpack.js.org/), [PostCSS](https://postcss.org/) and [Bulma](https://bulma.io/).

The focus is to have a minimal setup that allows you to generate a static website, while allowing
modern JS &amp; CSS workflows and cache busting for production deployments. Here's a quick list
of features:

* standard structure for new projects
* basic initial layout
* asset bundling through webpack
* **cache busting** for production deployments
* ES6 support through Babel
* PostCSS, with [autoprefixer](https://github.com/postcss/autoprefixer) &amp; [cssnano](https://cssnano.co/) included - easy to add additional plugins
* Vendor assets - as an example, the design of the homepage uses [Bulma](https://bulma.io/)

This repository is automatically published on Netlify at <a href="https://elevenpack.netlify.com/">https://elevenpack.netlify.com/</a>.

Contributions are welcome!

## Usage

```
git clone git@github.com:deviousdodo/elevenpack.git mysite
cd mysite
yarn
yarn dev
# ... edit anything in src, yarn add other packages, etc
```

To publish your website, run `yarn build` and the output will be in the `dist` directory.

### File structure

Everything in `src/site` will be converted by Eleventy - this is the input folder. The ouput folder is `dist`.

The `src/img` and `src/vendor` folders will be copied verbatim and you can reference any file by using the direct path, eg.
```
<img src="/img/example.png">
<link rel="stylesheet" href="/vendor/bulma.min.css">
```
The `src/vendor` folder is meant for external assets that you don't want to bundle (because they change rarely compared to your own source or for performance reasons).

The `src/js` and `src/css` folders will be bundled. The `index.js` &amp; `index.css` files are the entry points and thus required.

## Similar projects

If you'd like to try other starter projects then check out https://www.11ty.dev/docs/starter/
