'use strict'


let tasks = []

fetch('./getTasks')
    .then(res => res.json())
    .then(res => {
        if(!res) return
        tasks = [...res]
        res.map(item => {
            const {id, text, creation_date, completed} = item
            createElement(id, text, creation_date, completed)   
        })
    }
)

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
        const task = tasks.find(item => item.id == ev.target.id)

        if(task){
            task.completed = ev.target.classList.value === "checked"
            fetch('./changeTask', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(task) 
            })
        }
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    
    let inputValue = document.getElementById('myInput').value;
   
    if (inputValue === '') {
        alert("You must type something!");
    }
    else{
        let newTask = {
            text: inputValue,
            creation_date: new Date(),
            checked: false
        }
        tasks.push(newTask)
        fetch('./addTask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newTask) 
        })
        let nextId = tasks.reduce((max, item) => {
            return item > max ? item: max
        }, 1)
        createElement(nextId, inputValue)
    }
    document.getElementById('myInput').value = ''
}

function createElement(id, inputValue, date = Date(), checked = false){
    let li = document.createElement('li');
    let t = document.createTextNode(inputValue);

    li.appendChild(t);
    li.id = id 
    checked && li.classList.toggle('checked');
    document.getElementById("myUL").appendChild(li);
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = 'close';
    span.appendChild(txt)
    li.appendChild(span)

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            const task = tasks.find(item => item.id == this.parentElement.id)

            if(task){
                
                fetch('./deleteTask', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(task) 
                })
                tasks.splice(tasks.indexOf(task), 1)
            }
            let div = this.parentElement;
            div.style.display = 'none';
        }
    }
}