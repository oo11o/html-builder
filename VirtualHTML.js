export default class VirtualHtml {
        constructor(html) {
                const defaultOptions = {
                        tag: "html",
                        children: [
                                {
                                        tag: "head",
                                        children: [

                                        ],
                                },
                                {
                                        tag: "body"
                                }
                        ],
                        attributes: [
                                { lang : "ru" }
                        ]
                };
                this.html = html ?? defaultOptions;
        }

        showHtml(){
                console.log()
        }

        generateHtml(){

        }
}


