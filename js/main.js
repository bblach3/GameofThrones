



var btn = document.getElementById("btn")
//var Hbtn = document.getElementById("houseBtn")
//var pageCounter = 1;



let pageNum = 0;
let charArr = [];
var exampleModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: true
  })


btn.addEventListener("click", function() {
    const getNames = (pageNum) => {
    
        fetch("https://www.anapioficeandfire.com/api/characters?page=" + pageNum + "&pageSize=50")
        .then(res => res.json())
        .then(response =>{
    
            if(response.length  > 0){
                pageNum += 1;
                charArr = [...charArr, ...response];
    
                getNames(pageNum);
    
            }
            else{
                //get dom element 
    
                let listGroupContainer = document.querySelector('.card-header');
                let liTags = "";
                charArr.forEach(char => {
                    if(char.name.length > 0 && char.allegiances.length > 0){
                        liTags += `
                        <div class="col-4">
        <div class="card">
            <div class="card-header bg-secondary">
                        
                        <a href="${char.url}" class="card text-light bg-dark">${char.name}</a>
                        </div>
                        </div>
                        </div>
                        `
                    }
                })
    
                listGroupContainer.innerHTML = liTags;
            }
        })
    }
    
        //<a href="${char.url}" class="card  ">${char.name} <b>houses</b> ${char.allegiances.length}</a>

    getNames(pageNum);
    
    console.log(`I'm done ${pageNum}`);
    
   
})



let div = document.querySelector('.card-header');

div.addEventListener('click', (e)=>{

    e.preventDefault();

    console.log(e.target.href);

    fetch(e.target.href)
    .then(result => result.json())
    .then( detailedCharObj => {

        let modalBody = document.querySelector('.modal-body');

        let modalTitle = document.querySelector('#exampleModalLabel');

        modalBody.innerHTML = "";

        modalTitle.innerHTML = detailedCharObj.name;

        // console.log(detailedCharObj);

        if(detailedCharObj.allegiances.length > 0){

            detailedCharObj.allegiances.forEach((houseUrl)=>{

                fetch(houseUrl)
                .then(result => result.json())
                .then(houseObj=>{
                    
                    modalBody.innerHTML = `<br>${modalBody.innerHTML}<br>${houseObj.name}`;
                })

            })
        }
        exampleModal.show();

    })
})

let modalButtons = document.querySelector('.modal-dialog');

modalButtons.addEventListener('click', e=>{
    exampleModal.hide();
})







