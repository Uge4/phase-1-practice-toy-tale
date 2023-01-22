let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  document.querySelector(".add-toy-form").addEventListener("submit", (e) => {
    e.preventDefault()
    let newToy = {
      name:e.target.name.value,
      image:e.target.image.value,
      likes:0
    }
    renderToy(newToy),
    addNewToy(newToy)
  })
  

  
  function renderToy(toy){
    let card = document.createElement('li')
    card.className = "card" 
    card.innerHTML = `
      <img src="${toy.image}" class="toy-avatar"/>
      <p>${toy.likes} Likes</P>
      <button class="like-btn" id="${toy.id}">Like</button>`
    document.querySelector("#toy-collection").appendChild(card)  
    card.querySelector(".like-btn").addEventListener("click", handleLike)
  }

  function getAllToys(){
    fetch(`http://localhost:3000/toys`)
      .then(res => res.json())
      .then(allToys => allToys.forEach(toy => renderToy(toy))) 
}

  function addNewToy(newToy){
    
    fetch(`http://localhost:3000/toys`,{
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify(newToy)
    })
    
    .then(res => res.json())
    .then(toy => console.log(toy))
  }



  
  function handleLike(e){
    
    let p = e.target.previousElementSibling.innerText
    let newLikes = parseInt(p.charAt(0)) + 1
    
    fetch(`http://localhost:3000/toys/`+e.target.id, {
      
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        likes: newLikes
      })
      
    })
      .then((res) => res.json())
      .then((json) => {

        Array.from(document.querySelectorAll(".card")).find(card => {
          if (parseInt(card.childNodes[5].id, 10) === json.id){
            card.childNodes[3].innerText = `${json.likes} Likes`
          }
        })
        
        }
      )
  }

  


function intialise(){
  getAllToys()
}




intialise()



})
