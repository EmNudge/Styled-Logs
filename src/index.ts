import { parseHtml, parseCss } from './parser';
import type { HtmlNode, CssBlock } from './parser';

class StyledLog {
	styles: CssBlock[] = [];
	dom: HtmlNode[] = [];
	// log friendly version of HTML
	logStr: string = '';
	// strings to use for specific tags
	aliases: object = { br: '\n' };

	html(template: TemplateStringsArray, ...substitutions: any[]): StyledLog {
		const regString = String.raw(template, ...substitutions);
		this.dom = parseHtml(regString);

		return this;
	}

	css(template: TemplateStringsArray, ...substitutions: any[]): StyledLog {
		const regString = String.raw(template, ...substitutions);
		this.styles = parseCss(regString);

		return this;
	}

	getLog() {
		const logStrings = [];
		const elements = [];
		for (const block of this.dom) {
			if (block.type === 'TEXT') {
				logStrings.push(block.content);
				continue;
			}
			
			// this is a tag
			const { attributes, name } = block.content;
			const className = attributes.class || attributes.className;
			elements.push({name, className: className ? `.${className}` : null });
			
			if (block.type === 'SELF_CLOSING_TAG') {
				const alias = this.aliases[name];
				const str = typeof alias === 'function' ? alias(attributes) : attributes;
				logStrings.push(`%c${str}%c`);
				continue;
			}
			
			const { content } = block.content;
			logStrings.push(`%c${content}%c`);
		}
		
		const styles = [];
			for (const { name, className } of elements) {
				const tagStyles = new Map();
				for (const { names, rules } of this.styles) {
					// check if css block matches current element
					const permutations = [name, className, name+className];
					if (!names.some(blockName => permutations.includes(blockName))) continue;
					
					for (const [name, value] of rules) {
						tagStyles.set(name, value);
					}
				}
				
				const styleStr = [...tagStyles].map(([key, value]) => `${key}:${value}`).join(';');
				styles.push(styleStr, '');
			}
	
			return [logStrings.join(''), ...styles];
	}

	log(): void {
		console.log(...this.getLog());
	}
}

export default StyledLog;
