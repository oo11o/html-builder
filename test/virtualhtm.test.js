import VirtualHTML from "../src/VirtualHTML.js";

const virtualHTML = new VirtualHTML();

describe('getHtmlFromBlock(): convert data set to html string',() => {
  test('get html tag without attributes', () => {
    expect(virtualHTML.getHtmlFromBlock({tag:'html'})).toEqual('<html></html>');
    expect(virtualHTML.getHtmlFromBlock({tag:'div'})).toEqual('<div></div>');
    expect(virtualHTML.getHtmlFromBlock({tag:'div', attributes: []})).toEqual('<div></div>');
  });
  test('get html tag with attributes', () => {
    const elementHtmlWithAttributes = {
      tag: 'html',
      children: [],
      attributes: [
        {name: 'lang', value: 'ru'},
        {name: 'empty', value: ''},
        {name: 'class', value: 'container'},
      ],
    };
    expect(virtualHTML.getHtmlFromBlock(elementHtmlWithAttributes))
        .toEqual('<html lang="ru" empty="" class="container"></html>')
  })
});