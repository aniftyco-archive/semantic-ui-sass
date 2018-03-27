# Semantic UI, converted to Sass

`semantic-ui-sass` is a Sass-powered version of [Semantic UI](http://www.semantic-ui.com) and ready to drop into any project.

**LOOKING FOR MAINTAINER** Read more [here](https://github.com/aniftyco/semantic-ui-sass/issues/7).

## NOTE

The package only has the default theme.

## Installation and Usage

```shell
yarn add --dev semantic-ui-sass
```

### JavaScript

```javascript
import 'semantic-ui-sass';
```

### CSS

Import Semantic in an SCSS file (for example, `application.scss`) to get all of Semantic's styles

```css
@import "semantic-ui";
```

### Custom Font

```css
$font-url: 'http://fonts.useso.com/css?family=Lato:400,700,400italic,700italic&subset=latin';
@import 'semantic-ui';
```

### Skip font loading

```css
$import-google-fonts: false;
@import 'semantic-ui';
```

### Custom font family

```css
$font-family: 'custom-font-family';
@import 'semantic-ui';
```

### Customizable Variables

```css
$import-google-fonts: true !default;
$font-url: 'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin,latin-ext' !default;
$font-name: 'Lato' !default;
$font-family: $font-name, 'Helvetica Neue', Arial, Helvetica, sans-serif !default;
$icons-font-path: '../../icons' !default;
$flags-image-path: '../../images' !default;
```
