import VirtualHTML from '../src/VirtualHTML';
import defaultVirtualHTML from '../src/default';

const virtualHTML = new VirtualHTML();
const emptyParameters = { attributes: [], content: '', children: [] };

describe('createTag(): convert data set to html string', () => {
  test('get tag without attributes', () => {
    expect(virtualHTML.createTag({ tag: 'html', ...emptyParameters }))
      .toEqual({ startTag: '<html>', closedTag: '</html>' });
    expect(virtualHTML.createTag({ tag: 'div', ...emptyParameters }))
      .toEqual({ startTag: '<div>', closedTag: '</div>' });
  });

  test('get tag self-closing tag', () => {
    expect(virtualHTML.createTag({ tag: 'hr', ...emptyParameters }))
      .toEqual({ startTag: '<hr>', closedTag: '' });
    expect(virtualHTML.createTag({ tag: 'img', ...emptyParameters }))
      .toEqual({ startTag: '<img>', closedTag: '' });
  });

  test('get tag with attributes and content', () => {
    const elementHtmlWithAttributes = {
      tag: 'html',
      children: [],
      content: [],
      attributes: [
        { name: 'lang', value: 'ru' },
        { name: 'empty', value: '' },
        { name: 'class', value: 'container' },
      ],
    };
    expect(virtualHTML.createTag(elementHtmlWithAttributes))
      .toEqual({ startTag: '<html lang="ru" empty="" class="container">', closedTag: '</html>' });
    elementHtmlWithAttributes.tag = 'hr';
    expect(virtualHTML.createTag(elementHtmlWithAttributes))
      .toEqual({ startTag: '<hr lang="ru" empty="" class="container">', closedTag: '' });
    elementHtmlWithAttributes.tag = 'p';
    elementHtmlWithAttributes.content = 'This some text';
    elementHtmlWithAttributes.class = 'container red mg-5';
    expect(virtualHTML.createTag(elementHtmlWithAttributes))
      .toEqual({ startTag: '<p lang="ru" empty="" class="container">This some text', closedTag: '</p>' });
  });
});

describe('generateHTML(): build html', () => {
  const element1 = {
    tag: 'div',
    children: [],
    content: 'Some text',
    attributes: [
      { name: 'data-test', value: 'test' },
      { name: 'empty', value: '' },
      { name: 'class', value: 'container' },
    ],
  };

  const element2 = {
    tag: 'div',
    children: [
      {
        tag: 'img',
        children: [],
        attributes: [{ name: 'src', value: '/img/picture.jpg' }],
        content: '',
      },

    ],
    content: '',
    attributes: [
      { name: 'class', value: 'md-5' },
    ],
  };

  const element3 = {
    tag: 'div',
    children: [
      {
        tag: 'img',
        children: [],
        attributes: [{ name: 'src', value: '/img/picture.jpg' }],
        content: '',
      },
      {
        tag: 'br',
        children: [],
        attributes: [],
        content: '',
      },

    ],
    content: '',
    attributes: [
      { name: 'class', value: 'md-5' },
    ],
  };

  const element4 = {
    tag: 'article',
    children: [
      {
        tag: 'div',
        children: [],
        attributes: [],
        content: '',
      },
      {
        tag: 'div',
        children: [],
        attributes: [],
        content: '',
      },

    ],
    content: '',
    attributes: [],
  };

  test('get single tag', () => {
    expect(virtualHTML.generateHtml({ tag: 'div', ...emptyParameters }))
      .toEqual('<div></div>');
    expect(virtualHTML.generateHtml(element1))
      .toEqual('<div data-test="test" empty="" class="container">Some text</div>');
  });

  test('get single tag with self-closing tag', () => {
    expect(virtualHTML.generateHtml(element2))
      .toEqual('<div class="md-5"><img src="/img/picture.jpg"></div>');
    expect(virtualHTML.generateHtml(element3))
      .toEqual('<div class="md-5"><img src="/img/picture.jpg"><br></div>');
  });

  test('get child and brothers tags', () => {
    expect(virtualHTML.generateHtml(element4))
      .toEqual('<article><div></div><div></div></article>');
    expect(virtualHTML.generateHtml(defaultVirtualHTML))
      .toEqual('<html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><title>Title page</title></head><body></body></html>');
  });
});
