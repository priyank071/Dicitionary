const deletepass=(website)=>{
    let data=localStorage.getItem("passwords");
    let arr=JSON.parse(data);
    arrupdated=arr.filter((e)=>{
        return e.website!=website
    })
    localStorage.setItem("passwords",JSON.stringify(arrupdated))
    showPass();
}
const showPass=()=>{
    let tab=document.querySelector("table")
    let data=localStorage.getItem("passwords")
    try{
        if(tab==null){
            throw "not found";
        }
        tab.innerHTML=`<tr>
        <th scope="col">Website</th>
        <th scope="col">Username</th>
        <th scope="col">Password</th>
        <th scope="col">Remove</th>
      </tr>`
        let arr=JSON.parse(data);
        let str=""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            str=`<tr class="my-row">
                <td class="my-row-data">${element.website}</td>
                <td class="my-row-data">${element.username}</td>
                <td class="my-row-data">${element.password} </td>
                <td class="my-row-data" ><button onclick="deletepass('${element.website}')" type="button" class="btn btn-outline-primary remove">Remove</button></td>
                </tr>`
            tab.innerHTML=tab.innerHTML+str;
        }
    }
    catch(err){
        console.log(err);
    }
    website.value=""
    username.value=""
    password.value=""
}
showPass();
document.querySelector(".mybtn").addEventListener("click",(e)=>{
    e.preventDefault();
    console.log(username.value,password.value);
    let passwords=localStorage.getItem("passwords");
    console.log(passwords)
    if(passwords==null){
       let json=[]
       json.push({website:website.value,username:username.value,password:password.value})
       console.log("password saved")
       localStorage.setItem("passwords",JSON.stringify(json))
    }
    else{
        let json=JSON.parse(localStorage.getItem("passwords"));
        json.push({website:website.value,username:username.value,password:password.value})
       console.log("password saved")
       localStorage.setItem("passwords",JSON.stringify(json))
    }
    showPass();
})


function generatePassword(){
    let pass=""
    var temp=""
    var uppercaseChar="" 
    uppercaseChar+= getRandomChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ") + getRandomChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    var lowercaseChar="" 
    lowercaseChar+= getRandomChar("abcdefghijklmnopqrstuvwxyz") + getRandomChar("abcdefghijklmnopqrstuvwxyz") + getRandomChar("abcdefghijklmnopqrstuvwxyz");
    var numberChar ="" 
    numberChar+=getRandomChar("0123456789") +  getRandomChar("0123456789");
    var specialChar="" 
    specialChar+= getRandomChar("!@#$%^&*");
    temp+=uppercaseChar+lowercaseChar+numberChar+specialChar;
    for (let index = 0; index < temp.length; index++) {
        const element = temp.charAt(Math.floor(Math.random()*temp.length));
        pass+=element;
    }
    passbox.value=pass;
}
function getRandomChar(charset) {
    var randomIndex = Math.floor(Math.random() * charset.length);
    return charset.charAt(randomIndex);
}
function copy() {
  var copyText = document.getElementById("passbox");
  copyText.select();
  copyText.setSelectionRange(0, 99999); 
  navigator.clipboard.writeText(copyText.value);
  alert("Copied the text: " + copyText.value);
}