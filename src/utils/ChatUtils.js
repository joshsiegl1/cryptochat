
//legacy
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

export const parseReplies = (text) => { 
    let replyArray = []; 

    let n = text.split(" "); 
    for (let i = 0; i < n.length; i++) { 
        if (n[i].startsWith("@"))  { 
            replyArray.push(n[i]); 
        }
    }

    return replyArray; 
}

export const parseRealLinks = (text) => { 
    let linkArray = []; 

    let n = text.split(" "); 
    for (let i = 0; i < n.length; i++) { 
        if (n[i].startsWith('http')) { 
            linkArray.push(n[i]); 
        }
    }

    return linkArray; 
}

export const parseImage = (text) => { 

    //if user enters an angle bracket then it will be wrong
    let start_pos = text.indexOf('{') + 1; 
    let end_pos = text.indexOf('}', start_pos); 
    var link = text.substring(start_pos, end_pos); 

    return link; 
}