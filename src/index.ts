interface Tag {
	text: string;
	className: string;
	tag: string;
}

class StyledLog {
	// object representation of CSS
	styles = {};
	// array representation of HTML
	dom: (Tag | string)[] = [];
	// log friendly version of HTML
	logStr: string = '';
	// strings to use for specific tags
	alias: object = { br: '\n' };

	html(template: TemplateStringsArray, ...substitutions: any[]): StyledLog {
		const regString = String.raw(template, ...substitutions);
		this.dom = this.getArrFromHTML(regString);

		return this;
	}

	css(template: TemplateStringsArray, ...substitutions: any[]): StyledLog {
		const regString = String.raw(template, ...substitutions);

		// turn template literal into traversable object
		this.styles = this.getObjFromCSS(regString);

		return this;
	}

	log(): void {
		const logStrs: string[] = [];
		const elements: Tag[] = [];

		for (const el of this.dom) {
			if (typeof el === 'string') {
				logStrs.push(el);
				continue;
			}

			// add any non-string elements to he array
			elements.push(el);

			// add the alias instead, if this is an alias tag
			const tagAlias = this.alias[el.tag];
			if (tagAlias) {
				logStrs.push(`%c${tagAlias}%c`);
				continue;
			}

			// if it's a regular tag
			logStrs.push(`%c${el.text}%c`);
		}

		const styles: string[] = [];
		for (const el of elements) {
			const tagStyles = this.styles[el.tag];
			const classStyles = this.styles[`.${el.className}`];

			// since tag styles are first, they will be overwritten by class styles
			// regardless of their actual order in the CSS
			styles.push(`${tagStyles || ''};${classStyles || ''}`);

			// adds a spacer for styles
			styles.push('');
		}

		console.log(logStrs.join(''), ...styles);
	}

	private getArrFromHTML(fullText: string): (Tag | string)[] {
		let str: string = '';
		let arr: (Tag | string)[] = [];

		const chars: string[] = fullText.split('');
		for (let i = 0; i < chars.length; i++) {
			const char = chars[i];

			// if a new HTML tag is coming up, clear string
			if (char === '<' && str.length && !str.includes('<')) {
				arr.push(str.trimLeft());
				str = '<';
				continue;
			}

			// collapses all newlines and tabs into one space
			if (char === '\n' || char === '\t' || char === ' ') {
				// if an element was just before this, preserve the space
				// except if it's a line break tag
				const lastEl = arr[arr.length - 1];

				if (!str.length && typeof lastEl === 'object' && (lastEl as Tag).tag !== 'br') {
					arr.push(' ');
					continue;
				}
				if (str.slice(-1) !== ' ') str += ' ';
				continue;
			}

			str += char;

			// if we've reached the end and it's just a normal string
			if (i >= fullText.length - 2 && char !== '>') {
				arr.push(str.trim());
				continue;
			}

			// check if current string is an html tag
			const matchHTML = new RegExp('<.+.*</.+>');
			const matchSelfClosing = new RegExp('<s*.+s*/s*>');
			const isFullTag = str.search(matchHTML) > -1;
			const isSelfClosingTag = str.search(matchSelfClosing) > -1;

			if (isFullTag || isSelfClosingTag) {
				// get the class
				const matchClass = new RegExp('class=".*"');
				const className = str.match(matchClass) ? str.match(matchClass)[0].slice(7, -1) : '';

				// get the tag
				const matchTag = new RegExp('<s*.*?(?=/| )');
				const untilAndIncludingTag = str.match(matchTag)[0];
				const tag = untilAndIncludingTag.slice(
					untilAndIncludingTag.includes(' ') ? untilAndIncludingTag.lastIndexOf(' ') + 1 : 1
				);

				// get the text
				const matchText = new RegExp('>.*<');
				const text = str.match(matchText) ? str.match(matchText)[0].slice(1, -1) : '';

				arr.push({
					text,
					className,
					tag
				});

				str = '';
			}
		}

		return arr;
	}

	private getObjFromCSS(cssText: string): object {
		const styles = cssText.split('}');

		const stylesObj = {};
		for (const style of styles) {
			let [selectorsStr, rules] = style.split('{');

			// get comma separated selectors
			const selectors: string[] = selectorsStr.split(',').map((selector) => selector.trim());

			for (const selector of selectors) {
				if (!stylesObj[selector]) stylesObj[selector] = rules;
				else stylesObj[selector] += rules;
			}
		}

		return stylesObj;
	}
}

export default StyledLog;
