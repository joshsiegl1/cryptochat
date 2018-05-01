function myFunction() {
    var str = "|LID=468451684| This is a cool link |LID=34dsewr|";
    var s = str.split("|"); 
    for (var i = 1; i < s.length; i++) { 
    	var word = s[i]; 
        var q = word.split('='); 
        if (q[0] === "LID") console.log('yay')
        console.log(q)
    }
    
    console.log(s); 
    document.getElementById("demo").innerHTML = s;
}