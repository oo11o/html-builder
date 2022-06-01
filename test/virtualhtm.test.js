import VirtualHTML from '../src/VirtualHTML';

const virtualHTML = new VirtualHTML();
const emptyParameters = {attributes: [], content: '', children: []}

describe('createTag(): convert data set to html string', () => {
  test('get tag without attributes', () => {
    expect(virtualHTML.createTag({tag: 'html', ...emptyParameters}))
        .toEqual({startTag: '<html>', closedTag: '</html>'});
    expect(virtualHTML.createTag({tag: 'div', ...emptyParameters}))
        .toEqual({startTag: '<div>', closedTag: '</div>'});
  });

  test('get tag self-closing tag', () => {
    expect(virtualHTML.createTag({tag: 'hr', ...emptyParameters}))
        .toEqual({startTag: '<hr>', closedTag: ''});
    expect(virtualHTML.createTag({tag: 'img', ...emptyParameters}))
        .toEqual({startTag: '<img>', closedTag: ''});
  });

  test('get tag with attributes and content', () => {
    const elementHtmlWithAttributes = {
      tag: 'html',
      children: [],
      content: [],
      attributes: [
        {name: 'lang', value: 'ru'},
        {name: 'empty', value: ''},
        {name: 'class', value: 'container'},
      ],
    };
    expect(virtualHTML.createTag(elementHtmlWithAttributes))
        .toEqual({startTag: '<html lang="ru" empty="" class="container">', closedTag: '</html>'});
    elementHtmlWithAttributes.tag = 'hr';
    expect(virtualHTML.createTag(elementHtmlWithAttributes))
        .toEqual({startTag: '<hr lang="ru" empty="" class="container">', closedTag: ''});
    elementHtmlWithAttributes.tag = 'p';
    elementHtmlWithAttributes.content  = 'This some text';
    elementHtmlWithAttributes.class = 'container red mg-5';
    expect(virtualHTML.createTag(elementHtmlWithAttributes))
        .toEqual({startTag: '<p lang="ru" empty="" class="container">', closedTag: '</p>'});
  });
})
