import "../css/reset.css";
import "../css/styles.css";

import {getFolders,getFiles} from "./data";
import { selectTextList, folderPatten, filePatten, fileImagePatten } from "./common";

const main = document.querySelector("main");
const content = main.querySelector("div#contents");
const ul = main.querySelector("nav ul");

(async() => {
    const domString = await getFolders();
    const domDocument =  new DOMParser().parseFromString(domString, "text/html");
    const lists = selectTextList(domDocument);

    lists.forEach((month) => {
        const match = month.match(folderPatten);
        if(match) {
            const section = document.createElement("section");
            
            const titleDiv = document.createElement("div");
            titleDiv.className = "contents--title"
            titleDiv.innerText = month;
            titleDiv.id = month;
    
            const contentDiv = document.createElement("div");
            contentDiv.className = "contents--body";
            
            section.appendChild(titleDiv);
            section.appendChild(contentDiv);
            section.dataset.url = month;

            content.appendChild(section);
    
            const anchor = document.createElement("a");
            anchor.href = `#${month}`;
            anchor.innerText = month;

            const li = document.createElement("li");
            li.appendChild(anchor);
           
    
            ul.appendChild(li);
        }
    });

    const sections = content.querySelectorAll("section");
    Array.from(sections).map(section => {
        const url = section.dataset.url;
        console.log(url);
        const content = section.querySelector("div.contents--body");
        (async() => {
            const files = await getFiles(url);
            const domDocument =  new DOMParser().parseFromString(files, "text/html");
            const fileLists = selectTextList(domDocument);
            fileLists.forEach(file => {
                const match = file.match(filePatten);
                if(match) {
                    const div = document.createElement("div");
                    div.className = "content";

                    const isImage = file.match(fileImagePatten);
                    if(isImage) {
                        const img = document.createElement("img");
                        img.src=`Gyum's/${url}/${file}`;
    
                        div.appendChild(img);
                    } else {
                        const video =document.createElement("video");

                        const source = document.createElement("source");
                        source.src = `Gyum's/${url}/${file}`;
                        source.type = "video/mp4";

                        video.appendChild(source);

                        div.appendChild(video);
                    }

                    content.appendChild(div);
                }
            })
        })();

    });
})();

console.log("ff", );

if(false) {
    

console.log("main", main);

console.log("content", content);

console.log("ul", ul);

console.log("data", getFolders());
const xml =  new DOMParser().parseFromString("", "text/html");
console.log("xml", xml);
const lists = selectTextList(xml);
console.log("lists", lists);


}