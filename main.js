'use strict';

    // ===================   Generating a template ==============================
function generateTemplate(data){
    return `<div id="picture">
                <img src="${data.Poster}" alt="${data.Title}">
                <p><strong>${data.Title}</strong>, ${data.Year}</p>
            </div>`;
}

function loadTemplate(data){
    document.getElementById('content').innerHTML += data.map(item => generateTemplate(item)).join('');; 
}
    // =============================================================================

    // ===================   Making an xmlhttp request ==============================
function getData(link){
    return new Promise(function(resolve, reject){
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', link);
        xmlhttp.onload = function(){
            if (xmlhttp.status === 200){
                let data = JSON.parse(xmlhttp.response);
                resolve(data.Search);
            } else {
                reject(xmlhttp.statusText);
            }
        };

        xmlhttp.send();
    });
}

    // ============================================================================

const APIkey = (function(){
    let key = '3aad4b47';
    return function(){
        return key;
    }
}());

const theLordOfTheRings = getData(`http://www.omdbapi.com/?s=the+Lord+of+the+Rings&apikey=${APIkey()}`);
const batman = getData(`http://www.omdbapi.com/?s=batman&apikey=${APIkey()}`);
const avengers = getData(`http://www.omdbapi.com/?s=avengers&apikey=${APIkey()}`);
const xMen = getData(`http://www.omdbapi.com/?s=x+men&apikey=${APIkey()}`);

Promise.all([xMen, theLordOfTheRings, avengers, batman])
    .then(posters => posters.map(poster => loadTemplate(poster)))
    .catch(error => console.error(error));


// Promise.race([batman, avengers, theLordOfTheRings, xMen])
//     .then(data => loadTemplate(data))
//     .catch(error => console.error(error));