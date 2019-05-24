# Styled-Logs

This is a basic library in pre-alpha for styling console logs.

[Play with this on codesandbox.io!](https://codesandbox.io/s/styledconsolelogs-pc4lv)

## Background
console.log() allows for basic css styling which uses a syntax similar to:
```javascript
console.log('This is a %c styled %c console log%c! ', 'background: #222; color: white; padding: 0 2px;', '', 'font-size: 2em');
```
which produces the following:

![stylized console log](https://i.imgur.com/6zSYwpC.png)

As you can see, while this is a really cool feature, the syntax makes it fairly hard to read and create.
This miniature library creates a much more familiar syntax for styling complex stylized console logs.

## Syntax
```javascript
new StyledLog().html`
  this is a 
  <spacer/><div class="cool">cool</div><spacer/>
  and
  <br>
  <spacer/><div class="stylized">stylized</div><spacer/>
  console log
  <div class="excalamation">!</div>
`.css`
  cool { color: yellow; }
  stylized { 
    background: #C06344;
    padding: 2px 4px;
    border-radius: 10px;
  }
  excalamation {
    font-size: 2em;
  }
`.log();
```
Which produces

![stylized console log with library](https://i.imgur.com/QddBUM1.png)

.html() and .css() can be chained or kept separately. They can also be called multiple times to change either html or css data.

## Note
Console logs have minimal and arbitrary styling options. Most styles will not work. Experiment.
This library transpiles the pseudo-html and pseudo-css into objects and/or arrays. This is not anywhere close to real html and css. 
The format is only similar to make creating these stylized logs more intuitive. 

Things like event listeners, pseudo-elements (ironic, I know), IDs, css variables, etc will not work.
