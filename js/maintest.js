


























btn.addEventListener("click", function() {
    let fetchArr = [];
    let url = "";
    for(let page=0; page <45; page++){
        url = fetch("https://www.anapioficeandfire.com/api/characters?page=" + page + "&pageSize=" + charPerPage +"")
        fetchArr.push(url);
    }
    let promise = Promise.all(fetchArr);
    promise.then((resultsArr)=>{
        return Promise.all(resultsArr.map(char =>{
            return char.json()
        }))
    })
    .t
        renderHTML(charList)
    })
})
function renderHTML(data) {
    var htmlString = "";
    var row = document.querySelector('.row')
//"<p>" + data[i].name + ".</p>"
    for (i =0; i < data.length; i++) {
        htmlString +=`
    <div class="col-4">
        <div class="card">
            <div class="card-header">
            ${data[i].name} 
              <a href="#" class="card-header"> <b>houses</b> ${data[i].allegiances} </a>
              
            </div>
          </div>
    </div>
`
    }


    // charContainer.insertAdjacentHTML('beforeend', htmlString )
    row.innerHTML = htmlString
    // tags = charList.map((char)=>{
    //     return `<a href="${char.url}" class="card-header">${char.name}<b>houses</b> ${char.allegiances.length}</a>`
    // })
    let $div = $(".row")
        $div.click((e)=> {
        e.preventDefault();
        console.log(e.target.href)

        $.get(e.target.href)
        .done((detailedCharObj)=> {

            let $modalBody = $('.modal-body');

            let $modalTitle = $('#exampleModalLabel');

            $modalBody.html("");

            $modalTitle.html(detailedCharObj.name)

            console.log(detailedCharObj.name);

            if(detailedCharObj.allegiances.length > 0){
                detailedCharObj.allegiances.forEach((houseUrl)=>{
                    $.get(houseUrl)
                    .done((houseObj)=>{
                        $modalBody.html(`<br>${$modalBody.html()}<br>${houseObj.name}`)
                    })
                })

            }

            $('#exampleModal').modal('show');

        }) //end of done statement
    })
    // const div = document.querySelector('.row');
    // div.addEventListener('click', event => {
    //     //console.log('huhuh')
    //     console.log(event.target.fetchArr)
    // });
}
    // let apiCall1 = fetch("https://www.anapioficeandfire.com/api/characters?page=1&pageSize=50")
    // let apiCall2 = fetch("https://www.anapioficeandfire.com/api/characters?page=1&pageSize=50")
    // let promise = Promise.all([apiCall1, apiCall2])
    // promise.then((resultsArr)=>{
    //     let results = [];
    //     results[0] = resutlsArr[0].json();
    //     results[1] = resutlsArr[1].json();
    //     return Promise.all(results)
    // })
    // .then((dataArr)=>{
    //     console.log(dataArr);
    //     let charArr = []
    //     dataArr.forEach((char)=>{
    //         charArray = [...charArray, ...char]
    //     })
    //     console.log(charArray);
    //     //manipulate the dom
    // })
// 45 fetch calls concurrently with promise all 
// Because javascript is asynchronous, there's no way we can interact with both of these datasets in memory
// Each character you add a button and attach a click event
// Then have it fetch to the houseURL when that click even happens
// then display fetched data