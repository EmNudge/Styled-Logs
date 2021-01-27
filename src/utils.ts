export const parseRegex = (regex: RegExp) => (str: string) => {
  const res = str.match(regex);
  if (!res) return null;

  const data = Array.from(res);
  return {
    str: str.slice(data[0].length),
    data,
  };
};

export type Parser<T> = (str: string) => null | { str: string, data: T };
export const parseAll = <T>(...parseFuncs: Parser<T>[]): Parser<T[]> => (str: string) => {
  let currString = str;
  const data = [];
  
  let hasMatched = false;
  do {
    hasMatched = false;
    for (let i = 0; i < parseFuncs.length; i++) {
      const parseFunc = parseFuncs[i];
      
      const parseRes = parseFunc(currString);
      if (parseRes == null) continue;

      hasMatched = true;
      currString = parseRes.str;
      data.push(parseRes.data);
      break;
    }
  } while (hasMatched);

  return data.length 
    ? { str: currString, data } 
    : null;
};

export const parseMap = <T, U>(parser: Parser<T>, mapFunc: (item: T) => U): Parser<U> => (str: string) => {
  const res = parser(str);
  if (!res) return null;
  return {
    str: res.str,
    data: mapFunc(res.data),
  };
};