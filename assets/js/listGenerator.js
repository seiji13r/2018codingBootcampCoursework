// Define the Objects with all the data Assignements Contained

var data = [
  {
    assignmentWeekTitle: "Assignment 1: Wireframe",
    assignmentItems: 2,
    date: "25/Aug/2018",
    assignmentItem1URL: "01-HW-Wireframe/easier/",
    assignmentItem1Title: "Easier",
    assignmentItem2URL: "01-HW-Wireframe/Basic-Portfolio/",
    assignmentItem2Title: "Basic Portfolio",
    local: true,
    page: true
  },
  {
    assignmentWeekTitle: "Assignment 2: Responsiveness Assignment",
    assignmentItems: 2,
    date: "1/Sept/2018",
    assignmentItem1URL: "02-HW-Portfolios/Bootstrap-Portfolio/",
    assignmentItem1Title: "Bootstrap-Portfolio",
    assignmentItem2URL: "02-HW-Portfolios/Responsive-Portfolio/",
    assignmentItem2Title: "Responsive-Portfolio",
    local: true,
    page: true
  },
  {
    assignmentWeekTitle: "Assignment 3: JavaScript",
    assignmentItems: 2,
    date: "8/Sept/2018",
    assignmentItem1URL: "03-HW-JavaScript/Word-Guess-Game/",
    assignmentItem1Title: "Word-Guess-Game",
    assignmentItem2URL: "03-HW-JavaScript/Psychic-Game/",
    assignmentItem2Title: "Psychic-Game",
    local: true,
    page: true
  },
  {
    assignmentWeekTitle: "Assignment 4: jQuery",
    assignmentItems: 2,
    date: "15/Sept/2018",
    assignmentItem1URL: "04-HW-jQuery/01CrystalsCollector/",
    assignmentItem1Title: "Crystals Collector",
    assignmentItem2URL: "04-HW-jQuery/02StarWarsRPGGame/",
    assignmentItem2Title: "Star Wars RPG Game",
    local: true,
    page: true
  },
  {
    assignmentWeekTitle: "Assignment 5: Javascript Timers",
    assignmentItems: 1,
    date: "22/Sept/2018",
    assignmentItem1URL: "05-HW-JavaScriptTimers/TriviaGame/",
    assignmentItem1Title: "Totally Trival Trivia",
    assignmentItem2URL: "",
    assignmentItem2Title: "",
    local: true,
    page: true
  },
  {
    assignmentWeekTitle: "Assignment 6: APIs GifTastic",
    assignmentItems: 1,
    date: "29/Sept/2018",
    assignmentItem1URL: "06-HW-APIs/GifTastic",
    assignmentItem1Title: "GifTastic",
    assignmentItem2URL: "",
    assignmentItem2Title: "",
    local: true,
    page: true
  },
  {
    assignmentWeekTitle: "Assignment 7: Firebase Assignment - Train Scheduler",
    assignmentItems: 1,
    date: "6/Oct/2018",
    assignmentItem1URL: "07-HW-Firebase/TrainScheduler",
    assignmentItem1Title: "Train Scheduler",
    assignmentItem2URL: "",
    assignmentItem2Title: "",
    local: true,
    page: true
  },
  {
    assignmentWeekTitle: "Project 1 - Purchasing Orders Follow Up System",
    assignmentItems: 1,
    date: "13/Oct/2018",
    assignmentItem1URL: "https://nicolaskennof.github.io/PO-Boss/",
    assignmentItem1Github: "https://github.com/nicolaskennof/PO-Boss",
    assignmentItem1Title: "Purchasing Orders Follow Up System",
    assignmentItem2URL: "",
    assignmentItem2Title: "",
    local: false,
    page: true
  },
  {
    assignmentWeekTitle: "Assignment X: Porfolio Updated",
    assignmentItems: 1,
    date: "20/Oct/2018",
    assignmentItem1Title: "Porfolio Updated",
    assignmentItem1URL: "https://seiji13r.github.io/WebPortfolio/",
    assignmentItem1Github: "https://github.com/seiji13r/WebPortfolio",
    // assignmentItem2Title: "",
    // assignmentItem2URL: "",
    // assignmentItem2Github: "",
    local: false,
    page: true
  },
  {
    assignmentWeekTitle: "Assignment 8: Liri Node JS App",
    assignmentItems: 1,
    date: "27/Oct/2018",
    assignmentItem1Title: "Liri Node JS App",
    assignmentItem1URL: "10-HW-NodeJS/liri-node-app",
    assignmentItem1Github: "",
    // assignmentItem2Title: "",
    // assignmentItem2URL: "",
    // assignmentItem2Github: "",
    local: true,
    page: false
  },
  {
    assignmentWeekTitle: "Assignment 9: Constructor Word Guess",
    assignmentItems: 1,
    date: "3/Nov/2018",
    assignmentItem1Title: "Constructor - Word Guess Game",
    assignmentItem1URL: "11-HW-AdvJavascript/ConstructorWordGuess/",
    // assignmentItem1Github: "",
    // assignmentItem2Title: "",
    // assignmentItem2URL: "",
    // assignmentItem2Github: "",
    local: true,
    page: false
  },
  {
    assignmentWeekTitle: "Assignment 10: Node.js & MySQL",
    assignmentItems: 1,
    date: "10/Nov/2018",
    assignmentItem1Title: "Bamazon",
    assignmentItem1URL: "12-HW-NodeJS_MySQL/bamazon/",
    // assignmentItem1Github: "",
    // assignmentItem2Title: "",
    // assignmentItem2URL: "",
    // assignmentItem2Github: "",
    local: true,
    page: false
  },
  // {
  //   assignmentWeekTitle: "",
  //   assignmentItems: 1,
  //   date: "",
  //   assignmentItem1Title: "",
  //   assignmentItem1URL: "",
  //   assignmentItem1Github: "",
  //   assignmentItem2Title: "",
  //   assignmentItem2URL: "",
  //   assignmentItem2Github: "",
  //   local: true,
  //   page: true
  // },
  // {
  //   assignmentWeekTitle: "",
  //   assignmentItems: 1,
  //   date: "",
  //   assignmentItem1Title: "",
  //   assignmentItem1URL: "",
  //   assignmentItem1Github: "",
  //   assignmentItem2Title: "",
  //   assignmentItem2URL: "",
  //   assignmentItem2Github: "",
  //   local: true,
  //   page: true
  // },
  // {
  //   assignmentWeekTitle: "",
  //   assignmentItems: 1,
  //   date: "",
  //   assignmentItem1Title: "",
  //   assignmentItem1URL: "",
  //   assignmentItem1Github: "",
  //   assignmentItem2Title: "",
  //   assignmentItem2URL: "",
  //   assignmentItem2Github: "",
  //   local: true,
  //   page: true
  // },
]

var githubio = "https://seiji13r.github.io/2018codingBootcampCoursework/";
var githubmaster = "https://github.com/seiji13r/2018codingBootcampCoursework/tree/master/";

var htmlContent = "";

for (let i = 0; i < data.length; i++){
  if(data[i].local && data[i].page){
    myhome1 = githubio + data[i].assignmentItem1URL;
    myhomemaster1 = githubmaster + data[i].assignmentItem1URL;
    myhome2 = githubio + data[i].assignmentItem2URL;
    myhomemaster2 = githubmaster + data[i].assignmentItem2URL;
  } else if (data[i].local && !data[i].page){
    myhome1 = githubmaster + data[i].assignmentItem1URL;
    myhomemaster1 = githubmaster + data[i].assignmentItem1URL;
    myhome2 = githubmaster + data[i].assignmentItem2URL;
    myhomemaster2 = githubmaster + data[i].assignmentItem2URL;
  }else {
    myhome1 = data[i].assignmentItem1URL;
    myhomemaster1 = data[i].assignmentItem1Github;
    myhome2 = data[i].assignmentItem2URL;
    myhomemaster2 = data[i].assignmentItem2Github;
  }

  var listItemHtml = [
    '<div class="list-group-item list-group-item-action flex-column align-items-start">',
    '  <div class="d-flex w-100 justify-content-between">',
    '    <h5 class="mb-1">' + data[i].assignmentWeekTitle + '</h5>',
    '    <small>' + data[i].date + '</small>',
    '  </div>'
  ]

  if(data[i].assignmentItems===1){
    var html2 = [
      '  <div class="d-flex w-100 justify-content-between">',
      '    <a class="ml-3" href="' + myhome1 + '" target="_blank">' + data[i].assignmentItem1Title + '</a>',
      '    <a href="' + myhomemaster1 + '" target="_blank"><i class="fab fa-github"></i></a>',
      '  </div>'
      ]
  } else {
    var html2 = [
      '  <div class="d-flex w-100 justify-content-between">',
      '    <a class="ml-3" href="' + myhome1 +'" target="_blank">' + data[i].assignmentItem1Title + '</a>',
      '    <a href="' + myhomemaster1 + '" target="_blank"><i class="fab fa-github"></i></a>',
      '  </div>',
      '  <div class="d-flex w-100 justify-content-between">',
      '    <a class="ml-3" href="' + myhome2 + '" target="_blank">' + data[i].assignmentItem2Title + '</a>',
      '    <a href="' + myhomemaster2 + '" target="_blank"><i class="fab fa-github"></i></a>',
      '  </div>'
      ]
  }

  var htmlend = [
    '</div>',
  ]

  listItemHtml = listItemHtml.concat(html2);
  listItemHtml = listItemHtml.concat(htmlend);

  htmlContent += listItemHtml.join("\n") + "\n\n"
}
console.log("=========================================\n\n\n\n\n\n")
console.log(htmlContent);