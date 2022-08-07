// I want good control flow and function encapsulation for this project. 
// I don't want just lines and lines of code written in the global scope or in one huge function.

// Wants the getUsers button, When page loads, make a get request that gets all users and creates divs for each user. 
    // Each user div should have the users name, username, and city they are located in.
    // when a div is clicked on, it should fetch all posts associated with the user id.

const container = document.querySelector('#container')
const userList = document.querySelector('#userList')
const userMsg = document.querySelector('#userMsg')

refreshButton()
toggleBlock(userMsg)
goBack()

function refreshButton() {
    const btn = document.getElementById('btn')
    btn.addEventListener('click', allUser)
}

function allUser() {
    $.get('https://jsonplaceholder.typicode.com/users', getObj)
}

function createDiv(obj) {
    const div = document.createElement('div');
    div.textContent = (`Name : ${obj.name} Username: ${obj.username} City: ${obj.address.city}`)
    div.setAttribute('id', obj.id)
    div.className = 'userId'
    div.addEventListener('click', function(e){
        $.get(`https://jsonplaceholder.typicode.com/posts?userId=${e.target.id}`, getBody)
        toggleBlock(userList)
        toggleBlock(userMsg)
   })
    
    pinToUser(div)
    
}

function getBody(dataTwo){
    const elementsToRemove = userMsg.querySelectorAll('div')
    for(let i = 0; i < elementsToRemove.length; i++){
        elementsToRemove[i].remove()
    }
    for(let i = 0; i < dataTwo.length; i++){
         let currentTwo = dataTwo[i];
        createNewDiv(currentTwo);
    }
}

function createNewDiv(obj){
    const divTwo = document.createElement('div')
    divTwo.textContent = (`${obj.body}`)
    pinToMsg(divTwo) //needs to be appended to a toggle function with a body?

}

function getObj(data) {
    for (let i = 0; i < data.length; i++) {
        let current = data[i]
        createDiv(current)
    }
}


  function toggleBlock(htmlNode){
    console.log('hiding element', htmlNode)
    if(htmlNode.style.display == 'none'){
        htmlNode.style.display = 'block'
    }else{
        htmlNode.style.display ='none'
    }
    
  }

function appendDivToContainer(htmlNodes) {
    container.appendChild(htmlNodes);
}

function pinToUser(htmlNodes){
    userList.appendChild(htmlNodes);
}

function goBack(){
    const backBtn = document.createElement('button')
    backBtn.textContent = 'Go Back'
    backBtn.addEventListener('click', () =>{
        toggleBlock(userList)
        toggleBlock(userMsg)
    
    })
    userMsg.appendChild(backBtn)
}

function pinToMsg(htmlNodes){
    userMsg.appendChild(htmlNodes)
   
}