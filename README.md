# Styled-Logs

This is a basic library for styling console logs.

[Play with this on codesandbox.io!](https://codesandbox.io/s/styledconsolelogs-pc4lv)

## Background
console.log() allows for basic css styling which uses a syntax similar to:
```javascript
console.log("This is %cstyled-logs%cv0.1.0%c\n\nStyle your %cconsole%clogs%c\nin a familiar way!", "color: white; background: linear-gradient(#555, #333); padding: 2px 6px; border-radius: 4px 0 0 4px;", "color: white; background: linear-gradient(#E86, #C64); padding: 2px 6px; border-radius: 0 4px 4px 0;", "", "color: white; background: linear-gradient(#555, #333); padding: 2px 6px; border-radius: 4px 0 0 4px;", "color: white; background: linear-gradient(#E86, #C64); padding: 2px 6px; border-radius: 0 4px 4px 0;", "");
```
which produces the following:

![stylized console log](https://i.imgur.com/vwKcepp.png)

As you can see, while this is a really cool feature, the syntax makes it fairly hard to read and create.
This miniature library creates a much more familiar syntax for styling complex stylized console logs.

## Syntax
```javascript
new StyledLog().html`
  This is <div class="name">styled-logs</div>
  <div class="version">v0.1.0</div>
  <br />
  <br />
  Style your <div class="name">console</div>
  <div class="version">logs</div>
  <br />
  in a familiar way!
`.css`
  .name { 
    color: white;
    background: linear-gradient(#555, #333);
    padding: 2px 6px;
    border-radius: 4px 0 0 4px;
  }
  .version {
    color: white;
    background: linear-gradient(#E86, #C64);
    padding: 2px 6px;
    border-radius: 0 4px 4px 0;
  }
`.log();
```

.html() and .css() can be chained or kept separately. They can also be called multiple times to change either html or css data.

The `StyleLog` class also includes an `alias` object. This matches up self-closing tags with particular texts. By default it is set to `{ br: '\n' }`, but it can be mutated to allow for custom self-closing tags.

## Note
Console logs have minimal and arbitrary styling options. Most styles will not work. Experiment.
This library transpiles the pseudo-html and pseudo-css into objects and/or arrays. This is not anywhere close to real html and css. 
The format is only similar to make creating these stylized logs more intuitive. 

Things like event listeners, pseudo-elements (ironic, I know), IDs, css variables, etc will not work.

As such, nesting is not yet supported. Not from the stylesheet nor the DOM.
