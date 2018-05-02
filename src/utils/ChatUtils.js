
export const parseLinks = (text) => { 
    let linkArray = []; 

    let n = text.split("|"); 
    for (let i = 0; i < n.length; i++) { 
        let s = n[i].split(";"); 
        let link = { 
            name: "", 
            url: ""
        }
        for (let x = 0; x < s.length; x++) { 
            let a = s[x].split("="); 
            if (a[0] === "name") { 
                link.name = a[1]; 
            }
            else if (a[0] === "url") { 
                link.url = a[1]; 
            }
        }
        if (link.name !== "" && link.url !== "") { 
            linkArray.push(link); 
        }
    }

    return linkArray; 
}