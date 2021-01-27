import { parseRegex, parseAll, parseMap } from './utils';
import type { Parser } from './utils';

const collapseWhitespace = (text: string) => text
  .replace(/\s+/g, ' ')
  .replace(/ +(<[^>]+?>) +/, ' $1');

const REGEX = {
  // html
  TAG_ATTRIBUTES: new RegExp(String.raw`([a-zA-Z-]+?) *= *(?:('|")(.+)\2|(\S+))`, 'g'),
  UNTIL_TAG: new RegExp(String.raw`^.+?(?=<[a-zA-Z]|$)`, 's'),
  TAG: new RegExp(String.raw`^<([a-zA-Z\-]+) *([^>]+?)?>(.+?)<\/\1>`, 's'),
  SELF_CLOSING_TAG: new RegExp(String.raw`^<([a-zA-Z-]+) *(.+?)?\/>`),

  //css
  BLOCK: new RegExp(String.raw`\s*(.+?)\s*{\s*(.+?)\s*}`, 'sg'),
  NAME_DELIMITER: new RegExp(String.raw`\s*,\s*`),
  RULE: new RegExp(String.raw`([a-zA-Z-]+)\s*:\s*(.+?)(?:;|$)`, 'sg'),
};

const getAttributes = (str: string) => {
  const obj = {};
  if (!str) return obj;
  
  for (const matches of str.matchAll(REGEX.TAG_ATTRIBUTES)) {
    const [, key, ,quotedValue, unquotedValue] = matches;
    obj[key] = quotedValue ?? unquotedValue;
  }
  return obj;
}

enum NodeType {
  TEXT = 'TEXT',
  TAG = 'TAG',
  SELF_CLOSING_TAG = 'SELF_CLOSING_TAG',
}

interface HtmlTag {
  type: NodeType.TAG;
  content: {
    name: string;
    attributes: any;
    content: string;
  }
}
interface HtmlSelfClosingTag {
  type: NodeType.SELF_CLOSING_TAG;
  content: {
    name: string;
    attributes: any;
  }
}
interface HtmlText {
  type: NodeType.TEXT;
  content: string;
}
export type HtmlNode = HtmlTag | HtmlSelfClosingTag | HtmlText;

export const parseHtml = (str: string) => {
  const parser = parseAll<HtmlNode>(
    parseMap(
      parseRegex(REGEX.TAG),
      matches => ({ 
        type: NodeType.TAG, 
        content: {
          name: matches[1], 
          attributes: getAttributes(matches[2]),
          content: collapseWhitespace(matches[3]), 
        },
      }),
    ) as Parser<HtmlTag>,
    parseMap(
      parseRegex(REGEX.SELF_CLOSING_TAG),
      matches => ({ 
        type: NodeType.SELF_CLOSING_TAG, 
        content: {
          name: matches[1], 
          attributes: matches[2] ? getAttributes(matches[2]) : {},
        },
      }),
    ) as Parser<HtmlSelfClosingTag>,
    parseMap(
      parseRegex(REGEX.UNTIL_TAG),
      matches => ({ 
        type: NodeType.TEXT, 
        content: collapseWhitespace(matches[0]) 
      }),
    ) as Parser<HtmlText>,
  );

  const htmlStr = collapseWhitespace(str.trim());
  const res = parser(htmlStr);
  if (!res) return [];
  return res.data;
}

export type CssBlock = { names: string[], rules: Map<string, string> };
export function parseCss(text: string) {
  const blocks: CssBlock[] = [];

  for (const match of text.matchAll(REGEX.BLOCK)) {
    const [,name, content] = match;
    const names = name.split(REGEX.NAME_DELIMITER);

    const rules = new Map();
    for (const match of content.matchAll(REGEX.RULE)) {
			const [key, value] = match.slice(1);
      rules.set(key, value);
    }

    blocks.push({ names, rules });
  }

  return blocks;
}