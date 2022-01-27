// const prompt = require('prompt-sync')()
const maxAge = 75


const player = {
  name: prompt('Greetings, actor! What is your name?'),
  age: 20,
  xp: 1,
  isActive: true,
  currentJob: ""
  //rolesEarned
}

const jobs = [
  {typeOfJob: "Low-budget horror film", xp: 1, picURL: 'img/horror.jpeg'},
  {typeOfJob: "Toothpaste Commercial", xp: 10, picURL: 'img/paste.jpeg'},
  {typeOfJob: "Off-Broadway Experimental Theatre", xp: 20, picURL: 'img/theatre.jpeg'},
  {typeOfJob: "Indy Film at Sundance", xp: 50, picURL: 'img/sundance.png'},
  {typeOfJob: "Broadway lead", xp: 60, picURL: 'img/broadway.jpeg'},
  {typeOfJob: "Super Bowl Doritos Commercial", xp: 100, picURL: 'img/dorritos.jpeg'},
  {typeOfJob: "Summer Blockbuster", xp: 1500, picURL: 'img/spidey2a.jpeg'}
]

//add a bunch more jobs
//need function that only offers 3 (or 3-5) random jobs for that year
const selectRandomJobs = () => {
  const randomJobs = []
  for (let i=0; i < 3; i++) { //populate randomJobs array with 3 total job objects
    const job = jobs[Math.floor(Math.random()*jobs.length)]
    if (randomJobs.includes(job)) {
      i--
    } else {
      randomJobs.push(job)
    }
  }
  return randomJobs //returns an array of objects
}

const win = () => {
  if (player.age < maxAge && player.currentJob === "Summer Blockbuster") {
    $('#current-message').text('You Win!')
    return true
  } 
  
}

const loss = () => {
  if (player.age >= maxAge) { // or player dies (to be written later)
    const $lossDiv = $('<div id="loss" class="result">').text('Your career is over!')
    $('body').append($lossDiv)
    return true
  }
}

const checkForWinLoss = () => {
  //return Boolean
  if (win() || loss()) {
    return true
  } 
}

//each turn you get opportunity to audition for one "primo" job from list of jobs
const whichJob = () => {
  $('#continue').off()
  const randomJobList = selectRandomJobs() //an array of objects
  

  const $p1 = $('<p>').text('Your agent managed to score the following "primo" auditions for you this year.')
  const $p2 = $('<p>').text(`You have accumulated ${player.xp} experience.`)
  const $p3 = $('<p>').text('Which job will you audition for this year?')
  $('#current-message').append($p1, $p2, $p3)
  
  for (let i = 0; i < randomJobList.length; i++) {
    const $p = $('<p>').text(`${randomJobList[i].typeOfJob}. XP value: ${randomJobList[i].xp}`)
    $('#current-message').append($p)
  }
  
  const $p4 = $('<p>').text("Which job do you choose? Click the appropriate button.")
  $('#current-message').append($p4)
 
   //just display the message in current message box

  //change button text to reflect job options
  $('#btn1').text(`${randomJobList[0].typeOfJob}`).show()
  $('#btn2').text(`${randomJobList[1].typeOfJob}`).show()
  $('#btn3').text(`${randomJobList[2].typeOfJob}`).show()
  
  //player chooses job to audition for

}  

const getAuditionResult = (e) => {
  //chance of earning job will be roughly equal to player.xp / targetJob.xp --- we can potential alter the formula later
  //either player gets the job and earns the appropriate xp
  //player.xp += jobs[job].xp
  //or player earns nothing! 
  
  //if button is 1, that means we need to access the text inside
  $('.choice-button').hide()
  const choiceText = e.target.innerText
  // console.log(e);
  // console.log(e.target)
  // console.log(e.target.innerText)
  let targetJob = null
  for (let i=0; i < jobs.length; i++) {
    if (jobs[i].typeOfJob === choiceText) {
      targetJob = jobs[i] //this sets the choice made when the user clicked the button 1, 2, or 3
      console.log(targetJob)
    }
  }
 
  let oddsOfSuccess = player.xp / targetJob.xp 
  // if (oddsOfSuccess > 1) {
  //   oddsOfSuccess = 0.75
  // }
  if (oddsOfSuccess > Math.random() && Math.random() < .75) { //ensures maximum chance of earning role at 75%
    //earn the job
    player.xp += targetJob.xp
    $('#current-message').text(`You got the job. ${targetJob.xp} XP earned this year!`)
    player.currentJob = targetJob.typeOfJob

    //prepend img to #current-job div
    $('#current-job').empty()
    $('#current-job').text(`Most recent job: ${player.currentJob}`)
    const jobImg = $('<img>')
    jobImg.attr('src', targetJob.picURL)
    console.log(jobImg);
    $('#current-job').append(jobImg)
  } else {
    //no job earned
    $('#current-message').text(`You didn't get the job. 0 XP earned this year.`)
  }

  $('#continue').on('click', completePlayerTurn)
}

const completePlayerTurn = () => {
  $('#continue').off()
  if (checkForWinLoss() !== true) {
    player.age++
    $('#age').text(`Current age: ${player.age}`)
    $('#player-xp').text(`XP: ${player.xp}`)
    $('#continue').on('click', whichJob)
  }
  //else game will be done because continue button won't work
}

const intro = () => {
  $('#current-message').text(`Welcome to Blockbuster or Bust. You're an actor trying to get cast in a Hollywood blockbuster. You plan to retire at ${maxAge}. You are currently ${player.age}. Good luck in your career! Click 'continue' to proceed.`)

  $('#continue').on('click', whichJob)

}

$(() => {
  // while (checkForWinLoss() !== true) {
  // }
  $('#name').text(`Name: ${player.name}`)
  $('#age').text(`Age: ${player.age}`)
  $('#player-xp').text(`XP: ${player.xp}`)
  $('#current-job').text(`Current Job: ${player.currentJob}`)
  $('#btn1').on('click', getAuditionResult).hide()
  $('#btn2').on('click', getAuditionResult).hide()
  $('#btn3').on('click', getAuditionResult).hide()
  intro()
})

///////PSEUDOCODE/////WIREFRAMING/////

//Actor game flow
//objective: get cast in Summer Blockbuster

//must accumulate xp from other roles

//game turn is equivalent to one year of actor career
  //generate job options
    //agent has got some primo jobs for you to consider. click continue to see them
  //print job options
    //here are the options. click the button that corresponds to your choice (1-3)
    //continue button should be inactive
    //buttons 1, 2, and 3 should be clickable
    //regardless, button 1, 2, or 3 runs getAuditionResult()
  //
  //
  //click button it runs function a

  //function
  



//Button will advance to next year

//----- potential variables -----
//player object

////money
//parts - resume
////classes
//XP is a function of parts earned, classes taken
////award wins
//


// //Super Bowl Commerical chance of getting cast


////////REWORK////////

  

// $(() => {

//   //attach event listeners to buttons



//     //btn1, btn2, btn3 stores value in the input/form, then runs getAuditionResult, passing in that value
//     //getAuditionResult(jobList, choice)


// })