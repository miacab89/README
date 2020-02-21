const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
//const data = new Uint8Array(Buffer.from('index.js'));
//const isPromise = require("isPromise");
//const questions = require("questions"); 


inquirer
  .prompt ({
    type: 'text',
    message: "Enter your GitHub username.",
    name: "username"
  },
  {
    type: 'text',
    message: "Enter your project name.",
    name: "projectname"
  },
  {
    type: 'text',
    message: "Please give a short description of your project.",
    name: "description"
  },
  {
    type: 'text',
    message: "What command should be ran to install depedencies?",
    name: "command1"
    
  },
  {
    type: 'text',
    message: "What command should be ran to run tests?",
    name: "command2"
  },
  {
    type: 'text',
    message: "What kind of license should your project have? User can choose from list of items",
    name: "license",
    choices: [ "MIT License", "Apache License", "GPL License" ]
  },
  {
    type: 'text',
    message: "What does the user need to know about using the repo?",
    name: "usage"
  },
  {
    type: 'text',
    message: "What does the user need to know about contributing to the repo?",
    name: 'contributing'
  })

.then(function (response) {
  const queryUrl = `https://api.github.com/users/${response.username}/repos?per_page=100`;
  const licenseBadge = 'https://img.shields.io/badge/License-MIT-yellow.svg';
  const avatarUrl = 'https://avatars0.githubusercontent.com/u/58441831?v=4';
  const readmeMdGenerator = require("readme-md-generator");

 
  axios.get(queryUrl).then(function(repo) {
      //console.log("---------------")
     const repoNames = repo.data.map(function(full_name, index)  {
      //console.log("repo variable: ", repo);
          this.index = index;
          this.full_name = full_name; 
          this.avatarUrl = avatarUrl;
          //console.log("error"); 

    fs.writeFile('index.html', repo, "utf8", function(err) {
     if (err){
        throw err;   }
  //        console.log('Saved ${repoNames.length}');
           }) 
   
    
          readmeMdGenerator.get(queryUrl).then(function() {
                console.log("error"); 
              }); 

}) .catch(function (error) {
  console.log("error message:" + error);
})

        });
      }); 
