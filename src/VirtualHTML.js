// VirtualHtml
export default class VirtualHtml {
  constructor(html) {
    const defaultOptions = {
      tag: "html",
      children: [
        {
          tag: "head",
          children: [],
        },
        {
          tag: "body",
          children: [],
        }
      ],
      attributes: [
        { name: "lang", value: 'ru' }
      ]
    };
    this.html = html ?? defaultOptions;
  }
  showHtml() {
    console.log()
  }
  getTag(){

  }
  createTag(element){
    const attributes = element.attributes ?? [];
    let strAttributes = '';

    //if attributes have convert collection attributes to string
    if (attributes.length > 0) {
      strAttributes  = attributes.reduce((acc, {name, value}) => acc.concat(` ${name}="${value}"`), '');
    }

    return `<${element.tag}${strAttributes}></${element.tag}>`;
  }


  generateHtml() {
  //  console.log(this.html);
    const recursionByVirtualHtml = (data) => {
        console.log(data.tag)
        if(data.children) {
           recursionByVirtualHtml(data.children);
        }
      }
      recursionByVirtualHtml(this.html)
  }
}


