// VirtualHtml
import selfTags from "./selftag.js";

export default class VirtualHtml {
  constructor(html) {
    const defaultOptions = {
      tag: 'html',
      children: [
        {
          tag: 'head',
          children: [],
        },
        {
          tag: 'body',
          children: [],
        },
      ],
      attributes: [
        {name: 'lang', value: 'ru'},
      ],
    };
    this.html = html ?? defaultOptions;
  }

  createTag(element) {
    const {tag, content, attributes} = element;
    const attrForTag = attributes.reduce((acc, {name, value}) => acc.concat(` ${name}="${value}"`), '');

    return {
      startTag: `<${tag}${attrForTag}>${content}`,
      closedTag: selfTags.includes(tag) ? '' : `</${tag}>`,
    }
  }

  generateHtml() {
    //  console.log(this.html);
    const recursionByVirtualHtml = (data) => {
      console.log(data.tag);
      if (data.children) {
        recursionByVirtualHtml(data.children);
      }
    };
    recursionByVirtualHtml(this.html);
  }
}
