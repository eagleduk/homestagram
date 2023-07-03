import "../css/reset.css";
import "../css/styles.css";

import {getFolders,getFiles} from "./data";
import { selectTextList, folderPatten, filePatten, fileImagePatten } from "./common";

const main = document.querySelector("main");
const header = document.querySelector("header");
const article = document.querySelector("article#popup");

const popup = article.querySelector("div.popup--screen");
const popupCloseBtn = article.querySelector("input.menu--close");

const contents = main.querySelector("div#contents");
const nav = main.querySelector("nav");

const ul = nav.querySelector("ul");
const menuCloseBtn = nav.querySelector("input.menu--close");

const section = contents.querySelector("section");

const openMenu = header.querySelector(".open--menu");
const titleDiv = header.querySelector(".contents--title");

const contentDiv = section.querySelector(".contents--body");

const handleToggleMenu = (isOpen:boolean) => {
    if(isOpen) {
        nav.classList.remove("openMenu");
    } else {
        nav.classList.add("openMenu");
    }
}

const handleContentSelect = (event: Event, url: string, file: string) => {
    article.classList.add("openPopup");
    popup.innerHTML = "";
    const isImage = file.match(fileImagePatten);
    if(isImage) {
        const img = document.createElement("img");
        img.src=`Gyum's/${url}/${file}`;
        img.loading = "lazy";
        img.decoding = "async";

        popup.appendChild(img);
    } else {
        const video =document.createElement("video");

        const source = document.createElement("source");
        source.src = `Gyum's/${url}/${file}`;
        source.type = "video/mp4";

        video.appendChild(source);

        popup.appendChild(video);
    }
    
}

const handleNavigation = (event:Event) => {
    handleToggleMenu(true);
    if(event.target instanceof HTMLAnchorElement) {
        const {target: {dataset: {url}}} = event;

        (async() => {

            const files = await getFiles(url);
            const domDocument =  new DOMParser().parseFromString(files, "text/html");
            const fileLists = selectTextList(domDocument);
            titleDiv.innerHTML = url;
            contentDiv.innerHTML = "";
            fileLists.forEach(file => {
                const match = file.match(filePatten);
                if(match) {
                    const div = document.createElement("div");
                    div.className = "content";

                    const isImage = file.match(fileImagePatten);
                    if(isImage) {
                        const img = document.createElement("img");
                        img.src=`Gyum's/${url}/${file}`;
                        img.loading = "lazy";
                        img.decoding = "async";
    
                        div.appendChild(img);
                    } else {
                        const video =document.createElement("video");

                        const source = document.createElement("source");
                        source.src = `Gyum's/${url}/${file}`;
                        source.type = "video/mp4";

                        video.appendChild(source);

                        div.appendChild(video);
                    }

                    div.addEventListener("click", (event) => handleContentSelect(event, url, file));
                    contentDiv.appendChild(div);
                }
            })
        })();
    }
}

(async() => {
    const domString = await getFolders();
    const domDocument =  new DOMParser().parseFromString(domString, "text/html");
    const lists = selectTextList(domDocument);

    let loaded = false;

    lists.forEach((month, index) => {
        const match = month.match(folderPatten);
        if(match) {    
            const anchor = document.createElement("a");
            anchor.href = `#${month}`;
            anchor.innerText = month;
            anchor.dataset.url = month;
            anchor.addEventListener("click", handleNavigation)

            const li = document.createElement("li");
            li.appendChild(anchor);           
    
            ul.appendChild(li);

            if(!loaded) {
                anchor.click();
                loaded = true;
            }
        }
    });
})();

openMenu.addEventListener("click", () => {
    handleToggleMenu(nav.classList.contains("openMenu"));
})

menuCloseBtn.addEventListener("click", () => {
    handleToggleMenu(true);
})

nav.addEventListener("click", () => {
    handleToggleMenu(true);
})

popupCloseBtn.addEventListener("click", () => {
    article.classList.remove("openPopup");
})