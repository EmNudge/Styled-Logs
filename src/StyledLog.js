class StyledLog {
  constructor() {
    // object representation of CSS
    this.styles = {};
    // array representation of HTML
    this.dom = [];
    // log friendly version of HTML
    this.logStr = "";
    // strings to use for specific tags
    this.alias = { br: "\n" };
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
    const logStr = this.dom.reduce((log, el) => {
      if (typeof el === "string") return log + el;
      if (this.alias[el.tag]) return log + `%c${this.alias[el.tag]}%c`;
      return log + `%c${el.text}%c`;
    });

    // get names of all special texts in an array
    const names = this.dom
      .filter(el => typeof el === "object")
      .map(el => el.className);

    // using flatmap to add a spacer, creates list of styles
    const styles = names.flatMap(name => [this.styles[name], ""]);

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
        arr.push(str.replace(/\n/g, "").trimLeft());
        str = "<";
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
    const strArr = String.raw(vals[0], ...vals.slice(1)).split("}");

    const stylesObj = {};
    for (const str of strArr) {
      const keyName = str
        .slice(0, str.indexOf("{"))
        .trim()
        .slice(1);
      if (!keyName.length) continue;
      const propStr = str.slice(str.indexOf("{") + 1).trim();
      stylesObj[keyName] = propStr;
    }

    return stylesObj;
  }
}

export default StyledLog;
