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


menuPic = document.querySelector(".menuPic")
navBar = document.querySelector(".navBar")
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

menuOn = false

let afterChange = false


pokemonPic.style.display="none"
stopButton.style.display="none"
clearButton.style.display="none"
mainBox.style.display="none"
inputBox.style.display="none"
catchTime.style.display="none"
addPartyButton.style.display="none"
progressContainer.style.display="none"
pokemonMenu.style.display="none"
//navBar.style.display="none"
skip.style.display="none"
menuPic.style.display="none"

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
        console.log("hi")
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
function secondLap(){
    second++
    seconds2++

    progressIncrement = 100/randomSeconds
    progress+= progressIncrement
    console.log(progress)
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
    second = second+5
    seconds2 = seconds2+5
    progress+= 5*progressIncrement
    console.log(progress)
    progressBar.style.width= progress +'%'
    display.innerHTML=`${hourVar}${hour}:${minuteVar}${minute}:${secondVar}${second}`
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
        const data = await response.json()
        pokemonPic.src =data.sprites.front_default;
        return true
    }
}
catchButton.addEventListener("click",function(){
    catchButton.style.display="none"
    inputBox.style.display="flex"
}
)
async function inputted(){
    if (!afterChange){
        randomNumber = 2;
        randomSeconds = randomNumber*60
    }else{
        randomNumber = savedRandom
    }
    pokemon = pokemonInput.value
    pokemon = pokemon.toLowerCase();
    let truth = await pokemonSelect(pokemon)
    if(truth){
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
    catchButton.style.display="flex"
    pokemonInput.value=""
    pokemonPic.style.display="none"
}
function checkValidPokemon(){

}
