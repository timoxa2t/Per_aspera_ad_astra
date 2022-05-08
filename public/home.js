'use strict'


let tasks = fetch('./getTasks')
    .then(res => res.json())
    .then(res => {
        if(!res) return
        res.map(item => {
            const {text, creation_date, completed} = item
            createElement(text, creation_date, completed)   
    })
})

let myNodelist = document.getElementsByTagName("LI");
let i;
for (i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7")
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span)
}

// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
let j;
for (j = 0; j < close.length; j++) {
    close[j].onclick = function () {
        let div = this.parentElement;
        div.style.display = 'none'
    }
}

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');

list.addEventListener('click', function (ev){
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    
    let inputValue = document.getElementById('myInput').value;
   
    if (inputValue === '') {
        alert("You must type something!");
    }
    else{
        createElement(inputValue)
    }
    document.getElementById('myInput').value = ''
}

function createElement(inputValue, date = Date(), checked = false){
    let li = document.createElement('li');
    let t = document.createTextNode(inputValue);

    li.appendChild(t);
    checked && li.classList.toggle('checked');
    document.getElementById("myUL").appendChild(li);
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = 'close';
    span.appendChild(txt)
    li.appendChild(span)

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = 'none';
        }
    }
}