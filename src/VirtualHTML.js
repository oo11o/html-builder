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

  generateHtml(tags = this.html) {
    let accHtml = '';
    const stackClosedTags = [];
    const recursionByVirtualHtml = (node) => {
      const { startTag, closedTag } = this.createTag(node);
      accHtml += startTag;

      // self-closing tags don't have closed pair and children
      if (!closedTag) return accHtml;

      stackClosedTags.push(closedTag);
      if (Object.keys(node.children).length > 0) {
        node.children.forEach((item) => recursionByVirtualHtml(item));
      }
      accHtml += stackClosedTags.pop();

      return accHtml;
    };

    return recursionByVirtualHtml(tags);
  }
}
