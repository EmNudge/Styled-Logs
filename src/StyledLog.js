class StyledLog {
  constructor() {
    this.styles = {};
    this.dom = [];
    this.logStr = "";
  }

  html(...vals) {
    this.dom = this._getArrFromHTML(...vals);

    for (const el of this.dom) {
      if (typeof el === "string") this.logStr += el;
      else this.logStr += "%c" + el.text + "%c";
    }

    return this;
  }

  css(...vals) {
    // turn template literal into traversable object
    this.styles = this._getObjFromCSS(...vals);

    return this;
  }

  log() {
    // get names of all special textst in an array
    const names = this.dom
      .filter(el => typeof el === "object")
      .map(el => el.name);

    // using flatmap to add a spacer, creates list of styles
    const styles = names.flatMap(name => [this.styles[name], ""]);

    console.log(this.logStr, ...styles);
  }

  _getArrFromHTML(...vals) {
    //String.raw() turns it into a normal string
    return String.raw(vals[0], ...vals.slice(1))
      .split("<")
      .flatMap(item => item.split("</div>"))
      .map(item => {
        let str = item.trim();
        if (str.indexOf("br") === 0) return "\n";
        if (str.indexOf("spacer") === 0) return " ";
        if (str.indexOf("div") === 0) {
          str = str.slice(3).trim();
          const name = str.slice(7, str.indexOf('"', 7));
          const text = str.slice(str.indexOf(">") + 1);
          return { name, text };
        }

        return str.indexOf("/div>") === 0 ? str.slice(5).trim() : str;
      });
  }

  // helper function to convert template literal to object
  _getObjFromCSS(...vals) {
    //String.raw() turns it into a normal string
    const strArr = String.raw(vals[0], ...vals.slice(1)).split("}");

    const stylesObj = {};
    for (const str of strArr) {
      const keyName = str.slice(0, str.indexOf("{")).trim();
      if (!keyName.length) continue;
      const propStr = str.slice(str.indexOf("{") + 1).trim();
      stylesObj[keyName] = propStr;
    }

    return stylesObj;
  }
}

export default StyledLog;
