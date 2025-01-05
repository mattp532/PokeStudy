display = document.querySelector(".display")
startButton = document.querySelector(".startButton")
stopButton = document.querySelector(".stopButton")
clearButton = document.querySelector(".clearButton")
pokemonPic = document.querySelector(".pokemonPic")
enterButton = document.querySelector(".enter")
pokemonInput = document.querySelector(".pokemonInput")
mainBox = document.querySelector(".mainBox")
inputBox = document.querySelector(".inputBox")
catchButton = document.querySelector(".catchButton")
catchTime = document.querySelector(".catchTime")
addPartyButton = document.querySelector(".addParty")
progressBar = document.querySelector(".progressBar")
progressContainer = document.querySelector(".progressContainer")
pokemonMenu = document.querySelector(".pokemonMenu")
skip = document.querySelector(".skip")
menuPic2 = document.querySelector(".menuPic2")
pokemonCollection = document.querySelector(".pokemonCollection")
exitPokemonCollection = document.querySelector(".exitPokemonCollection")
pokemonGrid = document.querySelector(".pokemonGrid")
pokemonGridList=[]
currentGrid =0
menuPic = document.querySelector(".menuPic")
navBar = document.querySelector(".navBar")
rightArrow =document.querySelector(".rightArrow")
leftArrow= document.querySelector(".leftArrow")
randomize = document.querySelector(".randomize")

pageNum = document.querySelector(".pageNum")
let progress = 0
second=0
minute=0
hour=0
let seconds2=0
let pokemon=null
let randomNumber=null;
secondVar=null
minuteVar=null
hourVar=null
let timer=null;
let timer2=null;
let progressIncrement=0
let pokemonList = []
let currentPage=0
let screenSize = window.innerWidth
menuOn = false
let allPokemon =[]

let afterChange = false

let data =null
pokemonPic.style.display="none"
stopButton.style.display="none"
clearButton.style.display="none"
mainBox.style.display="none"
catchTime.style.display="none"
addPartyButton.style.display="none"
progressContainer.style.display="none"
pokemonMenu.style.display="none"
pokemonCollection.style.display="none"
console.log("version 1")

//navBar.style.display="none"
skip.style.display="none"
menuPic.style.display="none"
leftArrow.style.display="none"
window.addEventListener('resize', function(){
    updateGridSize();
    adjustArrows();
});
randomize.addEventListener("click",function(){
    randomPokemon();
})

async function randomPokemon(){
    const randomOrder = Math.floor(Math.random() * 1025) + 1;

    response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomOrder}`)
    const data3 = await response.json()
    pokemonInput.value=`${data3.name.charAt(0).toUpperCase() + data3.name.slice(1)}`
}
function containsNumber(str) {
    return !isNaN(str); // Check if converting the string to a number is valid
}
function adjustArrows(){
    if (window.innerWidth<560){
        //style arrows
        leftArrow.style.width="7vh"
        rightArrow.style.height="9vh"
        rightArrow.style.width="7vh"
        leftArrow.style.height="9vh"
    }else{

        //style arrows
        leftArrow.style.width="14vh"
        rightArrow.style.height="16vh"
        rightArrow.style.width="14vh"
        leftArrow.style.height="16vh"
    }
}
function updateGridSize(){
    if (window.innerWidth<560){
        pokemonGrid.style.rowGap="20px"
        pokemonGrid.style.columnGap="20px"
        pokemonGrid.style.gridTemplateColumns= "repeat(auto-fill, minmax(30%, 1fr)) "
        pokemonGrid.style.gridTemplateRows="repeat(auto-fill, minmax(20%, 1fr))"

        //style arrows
        leftArrow.style.width="11vh"
        rightArrow.style.height="9vh"
        rightArrow.style.width="11vh"
        leftArrow.style.height="9vh"
    }else{
        pokemonGrid.style.gridTemplateColumns= "repeat(auto-fill, minmax(20%, 1fr)) "
        pokemonGrid.style.gridTemplateRows="repeat(auto-fill, minmax(30%, 1fr))"
        pokemonGrid.style.rowGap="50px"
        pokemonGrid.style.columnGap="50px"

        //style arrows
        leftArrow.style.width="16vh"
        rightArrow.style.height="15vh"
        leftArrow.style.width="16vh"
        rightArrow.style.height="15vh"
    }
}


function pokeGuy(name){
    this.name=name;
}


startButton.addEventListener("click",function(){
    timerStart()
})
stopButton.addEventListener("click",function(){
    timerStop()
})
clearButton.addEventListener("click",function(){
    timerClear();
})
navBar.addEventListener("mouseleave",function(){

    if (menuOn){
        navBar.style.width=0 + '%'
        //navBar.style.display="none"
        pokemonMenu.style.display="none"
        menuPic.style.display="none"
        menuPic2.style.display="flex"
        menuOn=false

    }
    
})
menuPic.addEventListener("click",function(){

    if (menuOn){
        navBar.style.width=0 + '%'
        //navBar.style.display="none"
        pokemonMenu.style.display="none"
        menuPic.style.display="none"
        menuPic2.style.display="flex"
        menuOn=false

    }
    
})
menuPic2.addEventListener("mouseenter",function(){
    if (!menuOn){
        //navBar.style.display="flex"
        if (window.innerWidth<1200){
            navBar.style.width=35 + '%'
        }else{
            navBar.style.width=18 + '%'
        }
        pokemonMenu.style.display="flex"
        menuOn=true
        menuPic.style.display="flex"
        menuPic2.style.display="none"
    }
})
pokemonMenu.addEventListener("click",function(){
    currentPage=0
    pokemonCollection.style.display="flex"
    adjustArrows();
    if (pokemonGridList.length==0 || pokemonGridList.length==1){
        rightArrow.style.display="none"
    }else{
        rightArrow.style.display="flex"
    }
    updateGrid(pokemonGridList[currentPage])
    if(pokemonGridList.length!=0){
      pageNum.innerHTML=`${currentPage+1}/${pokemonGridList.length}`
    }else{
        pageNum.innerHTML="1/1"
    }

})
exitPokemonCollection.addEventListener("click",function(){
    pokemonCollection.style.display="none"
})
function secondLap(){
    second++
    seconds2++

    progressIncrement = 100/randomSeconds
    progress+= progressIncrement
    progressBar.style.width= progress +'%'
    if (second===60){
        second=0
        minute++
    }
    if (seconds2===60){
        seconds2=0
        randomNumber=randomNumber-1

    }
    if (minute===60){
        hour++
        minute=0
    }

    if (second<10){
        secondVar=0
    }else{
        secondVar=""
    }
    if (minute<10){
        minuteVar=0
    }else{
        minuteVar=""
    }
    if (hour<10){
        hourVar=0
    }else{
        hourVar=""
    }
    catchTime.innerHTML =`${randomNumber} minutes till caught`
    display.innerHTML=`${hourVar}${hour}:${minuteVar}${minute}:${secondVar}${second}`
    if (randomNumber==0){
        catchSuccess();
    }
}
skip.addEventListener("click",function(){
    randomNumber=0
    progress+= 5*progressIncrement
})
function timerStart(){
    clearButton.style.display="flex"
    startButton.style.display="none"
    stopButton.style.display="flex"
    if (timer!== null){
        clearInterval(timer)
    }
    timer = setInterval(secondLap, 1000)
}
function timerStop(){
    stopButton.style.display="none"
    startButton.style.display="flex"
    clearInterval(timer);
}
function timerClear(){
    afterChange=true
    savedRandom = randomNumber
    clearInterval(timer);
    mainBox.style.display="none"
    inputBox.style.display="flex"
    pokemonInput.value=""
    pokemonPic.style.display="none"
    catchTime.style.display="none"
    progressContainer.style.display="none"
    progressBar.style.width=0
    afterChange=False
}

enterButton.addEventListener("click",function(){
    inputted()
})
pokemonInput.addEventListener("keydown",function(){
    if (event.key === "Enter"){
        inputted()
    }
}
)
async function pokemonSelect(pokemon){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (!response.ok){
        return false
    }else{
        data = await response.json()
        pokemonPic.src =data.sprites.front_default;
        return true
    }
}

async function inputted(){
    if (!afterChange){
        randomNumber = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
        //randomNumber=2
        randomSeconds = randomNumber*60
    }else{
        randomNumber = savedRandom
    }
    pokemon = pokemonInput.value
    pokemon = pokemon.toLowerCase();
    let truth = await pokemonSelect(pokemon)
    if(truth){
        if(containsNumber(pokemon)){
            pokemon=data.name
        }
        inputBox.style.display="none"
        mainBox.style.display="flex"
        pokemonPic.style.display="flex"
        catchTime.style.display="flex"
        progressBar.style.display="flex"
        progressContainer.style.display="flex"
        catchTime.innerHTML =`${randomNumber} minutes to catch`
        timerStart()

    }
}
function catchSuccess(){
    pokemon=pokemon.charAt().toUpperCase() + pokemon.slice(1);
    progressBar.style.width=0+'%'
    progress=0
    mainBox.style.display="none"
    addPartyButton.style.display="flex"
    timerStop()
    seconds2=0
    progressContainer.style.display="none"
    catchTime.innerHTML = `Success! ${pokemon} has been caught`
    afterChange=false


}
addPartyButton.addEventListener("click",function(){
    reset()
})
function reset(){
    addPartyButton.style.display="none"
    catchTime.style.display='none'
    pokemonInput.value=""
    pokemonPic.style.display="none"
    inputBox.style.display="flex"
}
addPartyButton.addEventListener("click",function(){
    //add pokemon
    pokemonList.push(new pokeGuy(pokemon))
    allPokemon.push(new pokeGuy(pokemon))
    if (pokemonGridList.length!=0){
        pokemonGridList.splice(currentGrid,1)

    }
    pokemonGridList.push(pokemonList)
    if (pokemonList.length==8){
        //pokemonGridList.push(pokemonList.slice())
        currentGrid++
        pokemonList=[]
    }
    updateGrid(pokemonGridList[currentGrid]);
})
async function updateGrid(pokeList){
    //clear current grid
    while (pokemonGrid.firstChild) {
        pokemonGrid.removeChild(pokemonGrid.firstChild);
    }
    //check each pokemonList and add to current grid
    for (let i=0;i<pokeList.length;i++){
        currentPoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeList[i].name.toLowerCase()}`)
        currentData = await currentPoke.json()
        let newPokemon = document.createElement("img");
        newPokemon.src = currentData.sprites.front_default;
        newPokemon.style.width= '90%'
        newPokemon.style.height='90%'
        newPokemon.style.objectFit='contain'
    
        pokemonGrid.appendChild(newPokemon);
    }
}
function updatePage(){
    

}
rightArrow.addEventListener("click",function(){
    if (currentPage==0){
        leftArrow.style.display="flex"
    }
    if (currentPage<=pokemonGridList.length-1){
        currentPage++
        pageNum.innerHTML=`${currentPage+1}/${pokemonGridList.length}`
    }
    if (currentPage===pokemonGridList.length-1){
        rightArrow.style.display="none"
    }else{
        rightArrow.style.display="flex"
    }
    updateGrid(pokemonGridList[currentPage])
})
leftArrow.addEventListener("click",function(){
    if (currentPage>0){
        currentPage--
        pageNum.innerHTML=`${currentPage+1}/${pokemonGridList.length}`
        updateGrid(pokemonGridList[currentPage])
    }
    if(currentPage==0){
        leftArrow.style.display="none"
        if (pokemonGridList.length>1){
            rightArrow.style.display="flex"
        }
    }
})


