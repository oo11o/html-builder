import VirtualHTML from '../src/VirtualHTML';

const virtualHTML = new VirtualHTML();

describe('createTag(): convert data set to html string', () => {
  test('get html tag without attributes', () => {
    expect(virtualHTML.createTag({ tag: 'html' })).toEqual('<html></html>');
    expect(virtualHTML.createTag({ tag: 'div' })).toEqual('<div></div>');
    expect(virtualHTML.createTag({ tag: 'div', attributes: [] })).toEqual('<div></div>');
  });
  test('get html tag with attributes', () => {
    const elementHtmlWithAttributes = {
      tag: 'html',
      children: [],
      attributes: [
        { name: 'lang', value: 'ru' },
        { name: 'empty', value: '' },
        { name: 'class', value: 'container' },
      ],
    };
    expect(virtualHTML.createTag(elementHtmlWithAttributes))
      .toEqual('<html lang="ru" empty="" class="container"></html>');
  });
});
