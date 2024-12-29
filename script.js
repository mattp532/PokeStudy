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
second=0
minute=0
hour=0
seconds2=0
let pokemon=null
let randomNumber=null;
secondVar=null
minuteVar=null
hourVar=null
let timer=null;
let timer2=null;
pokemonPic.style.display="none"
stopButton.style.display="none"
clearButton.style.display="none"
mainBox.style.display="none"
inputBox.style.display="none"
catchTime.style.display="none"
addPartyButton.style.display="none"
startButton.addEventListener("click",function(){
    timerStart()
})
stopButton.addEventListener("click",function(){
    timerStop(timer)
})
clearButton.addEventListener("click",function(){
    timerClear(timer);
})
function secondLap(){
    second++
    seconds2++
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
    display.innerHTML=`${hourVar}${hour}:${minuteVar}${minute}:${secondVar}${second}`
    catchTime.innerHTML =`${randomNumber} minutes to catch`
    if (randomNumber==0){
        catchSuccess();
    }
}
function timerStart(){
    //clearButton.style.display="flex"
    startButton.style.display="none"
    stopButton.style.display="flex"
    if (timer!== null){
        clearInterval(timer)
    }
    timer = setInterval(secondLap, 1000)
    timer2=setInterval(countDown,1000)

}
function timerStop(t){
    stopButton.style.display="none"
    startButton.style.display="flex"
    clearInterval(t)
}
function timerClear(){
    //timerStop(timer)
    second+=5
    seconds2+=5
    //minute=0
    //hour=0
    //display.innerHTML=`0${hour}:0${minute}:0${second}`
    //clearButton.style.display="none"
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
    const data = await response.json()
    pokemonPic.src =data.sprites.front_default;

}
catchButton.addEventListener("click",function(){
    catchButton.style.display="none"
    inputBox.style.display="flex"
}
)
function inputted(){
    randomNumber = 1;
    pokemon = pokemonInput.value
    pokemonSelect(pokemon)
    inputBox.style.display="none"
    mainBox.style.display="flex"
    pokemonPic.style.display="flex"
    catchTime.style.display="flex"
    catchTime.innerHTML =`${randomNumber} minutes to catch`
    timerStart()
}
function catchSuccess(){

    mainBox.style.display="none"
    addPartyButton.style.display="flex"
    timerStop(timer)
    seconds2=0

    catchTime.innerHTML = `Success! ${pokemon} has been caught`

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