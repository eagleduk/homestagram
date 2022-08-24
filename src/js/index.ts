import {months} from "./data";
import "../css/styles.css";

const regex = /\d+'\d+\W/g;

const main = document.querySelector("main");

const xml = new DOMParser().parseFromString(months, "text/html");

// console.log(xml);
// console.log(data.split("<tbody>")[1].split("</tbody>")[0]);

const tbody = xml.querySelector("tbody");
const trs = tbody.querySelectorAll("tr");
const lists = Array.from(trs).map(tr => tr.querySelector("td.n").querySelector("a").innerText);

lists.forEach((month) => {
    const match = month.match(regex);
    if(match) {
        const section = document.createElement("section");
        
        const div = document.createElement("div");
        div.innerText = month;
        
        section.appendChild(div);
        main.appendChild(section);
    }
})