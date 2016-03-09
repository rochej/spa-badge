var indexView = function(){

}

indexView.prototype.hashMaster = function(peepName) {
  var peepUrl = {name: peepName};
  history.pushState(peepUrl, "Squirrel Badges", peepName);
}

indexView.prototype.loadPeeps = function(allThePeeps){
  var source = $.select("#index-template").textContent
  var template = Handlebars.compile(source);
  var context = {peeps: allThePeeps}
  var html = template(context);
  var element = document.createElement('div');
  element.innerHTML = html;
  $.select("#peeps").appendChild(element);
}

indexView.prototype.loadShow = function(peepShow){
  var name = peepShow.peep.name;
  index.hashMaster(name);
  var source = $.select("#show-template").textContent
  var template = Handlebars.compile(source);
  var context = peepShow;
  var html = template(context);
  $.select("#missy-elliot").innerHTML = html;
  $.show("#nicki-minaj");
}

indexView.prototype.loadForm = function(peepShow){
  var source = $.select("#form-template").textContent
  var template = Handlebars.compile(source);
  var context = peepShow
  var html = template(context);
  $.select("#q-tip").innerHTML = html;
}

indexView.prototype.loadIndexPage = function(){
  $.ajax({url:'http://localhost:3000/peeps', type: "GET"}).then(function(response){
    var allThePeeps = JSON.parse(response)
    index.loadPeeps(allThePeeps)
  })
}


indexView.prototype.linkToName = function(uri){
  $.ajax({url: uri, type: "GET"}).then(function(response){
    var peepShow = JSON.parse(response)
    console.log(peepShow);
    console.log(peepShow);
    index.loadShow(peepShow);
    index.loadForm(peepShow);
  })
}

indexView.prototype.linkToVote = function(uri) {
  $.ajax({url: uri, type: "GET"}).then(function(response){
    console.log(response);
    var response = JSON.parse(response)
    var upSelector = "up" + response.badge_id
    $.select(upSelector).textContent = response.votes[0]
    var downSelector = "down" + response.badge_id
    $.select(downSelector).textContent = response.votes[1]
  })
}

indexView.prototype.linkToBadge = function(uri) {
  $.ajax({url: uri, type: "POST"}).then(function(response){
    console.log(response);
    var response = JSON.parse(response)
    var source = $.select("#badge-partial").textContent
    var template = Handlebars.compile(source);
    var context = response;
    var html = template(context);
    console.log(html)
    var element = document.createElement('li');
    element.innerHTML = html
     $.select("#badges").appendChild(element)
  })
}

indexView.prototype.bindListeners = function() {
  $.select('#peeps').addEventListener("click", function(event){
    event.preventDefault();
    var uri = event.target.href;
    index.linkToName(uri);
  })

  $.on("#missy-elliot", "click", function(event){
    event.preventDefault();
    var uri = event.target.parentNode.href;
    index.linkToVote(uri);
  })

  $.on("#q-tip", "submit", function(event){
    event.preventDefault();
    badgeText = document.forms[0].elements[0].value
    var uri = event.target.attributes[1].nodeValue + "?text=" + badgeText
    index.linkToBadge(uri);
    document.forms[0].reset
  })

  $.on("#nicki-minaj", "click", function(event){
    event.preventDefault();
    console.log(event)
    $.select('#q-tip').innerHTML = ''
    $.select('#missy-elliot').innerHTML = ''
    index.loadIndexPage();
  })
}
var index = new indexView

$.ready(function(){
  Handlebars.registerPartial("badge", $.select("#badge-partial").innerHTML);
  index.loadIndexPage();
  index.bindListeners();
})

