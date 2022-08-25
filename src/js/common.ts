export function selectTextList(domElements: Document) {
    const tbody = domElements.querySelector("tbody");
    const trs = tbody.querySelectorAll("tr");
    return Array.from(trs).map(tr => tr.querySelector("td.n").querySelector("a").innerText);
}

export const folderPatten = /\d+'\d+\W/g;

export const filePatten = /(\w+).(jpg|mp4)/gi;

export const fileImagePatten = /(\w+).(jpg)/gi;