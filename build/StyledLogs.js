'use strict';

class StyledLog {
  constructor() {
    // object representation of CSS
    this.styles = {};
    // array representation of HTML
    this.dom = [];
    // log friendly version of HTML
    this.logStr = "";
    // strings to use for specific tags
    this.alias = {br: "\n"};
  }

  html(...vals) {
    this.dom = this._getArrFromHTML(...vals);

    return this;
  }

  css(...vals) {
    // turn template literal into traversable object
    this.styles = this._getObjFromCSS(...vals);

    return this;
  }

  log() {
    console.log(this.dom);
    const logStr = this.dom.reduce((log, el) => {
      if (typeof el === "string") return log + el;
      if (this.alias[el.tag]) return log + `%c${this.alias[el.tag]}%c`;
      return log + `%c${el.text}%c`;
    });

    // get names of all special texts in an array
    const elements = this.dom.filter(el => typeof el === "object");

    // using flatmap to add a spacer, creates list of styles
    const styles = elements.flatMap(el => {
      // adds tag and class styles only if they exist
      const tagStyles = this.styles[el.tag] ? this.styles[el.tag] : "";
      const classStyles = this.styles[`.${el.className}`]
        ? this.styles[`.${el.className}`]
        : "";

      // since tag styles are first, they will be overwritten by class styles
      // regardless of their actual order in the CSS
      return [`${tagStyles};${classStyles}`, ""];
    });

    console.log(logStr, ...styles);
  }

  // helper function to convert template literal to object
  _getArrFromHTML(...vals) {
    const fullText = String.raw(vals[0], ...vals.slice(1));
    let str = "";
    let arr = [];

    for (const [index, char] of fullText.split("").entries()) {
      // if a new HTML tag is coming up, clear string
      if (char === "<" && str.length && !str.includes("<")) {
        // if it's empty, push a space. If note, push the string
        arr.push(str.trimLeft().length ? str.trimLeft() : " ");
        str = "<";
        continue;
      }

      // collapses all newlines and tabs into one space
      if (char === "\n" || char === "\t") {
        if (str.slice(-1) !== " ") str += " ";
        continue;
      }

      str += char;

      // if we've reached the end
      if (index === fullText.length - 1) {
        arr.push(str.replace(/\n/g, "").trimLeft());
      }

      // check if current string is an html tag
      const matchHTML = new RegExp("<s*div[^>]*>(.*?)<s*/s*divs*>");
      const matchSelfClosing = new RegExp("<s*.+s*/s*>");
      const isFullTag = str.search(matchHTML) > -1;
      const isSelfClosingTag = str.search(matchSelfClosing) > -1;

      if (isFullTag || isSelfClosingTag) {
        // get the class
        const matchClass = new RegExp('class=".*"');
        const className = str.match(matchClass)
          ? str.match(matchClass)[0].slice(7, -1)
          : "";

        // get the tag
        const matchTag = new RegExp("<s*.*?(?=/| )");
        const untilAndIncludingTag = str.match(matchTag)[0];
        const tag = untilAndIncludingTag.slice(
          untilAndIncludingTag.includes(" ")
            ? untilAndIncludingTag.lastIndexOf(" ") + 1
            : 1
        );

        // get the text
        const matchText = new RegExp(">.*<");
        const text = str.match(matchText)
          ? str.match(matchText)[0].slice(1, -1)
          : "";

        arr.push({
          text,
          className,
          tag
        });

        str = "";
      }
    }

    return arr;
  }

  // helper function to convert template literal to object
  _getObjFromCSS(...vals) {
    //String.raw() turns it into a normal string
    const styles = String.raw(vals[0], ...vals.slice(1)).split("}");

    const stylesObj = {};
    for (const style of styles) {
      // gets all selectors, be they classes or elements, separated by commas
      const selectors = style
        .slice(0, style.indexOf("{"))
        .split(",")
        .map(selector => selector.trim());

      // doesn't get rid of whitespace since console.log() doesn't care about that
      const styleBlock = style.slice(style.indexOf("{") + 1);

      for (const selector of selectors) {
        stylesObj[selector] = styleBlock;
      }
    }

    return stylesObj;
  }
}

module.exports = StyledLog;
