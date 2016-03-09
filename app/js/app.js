var indexView = function(){

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
  var source = $.select("#show-template").textContent
  var template = Handlebars.compile(source);
  var context = peepShow
  var html = template(context);
  console.log(html);
  $.select("#missy-elliot").innerHTML = html;
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
    // console.log(peepAndBadges);
    console.log(peepShow);
    index.loadShow(peepShow);
  })
}

indexView.prototype.bindListeners = function() {
  $.select('#peeps').addEventListener("click", function(event){
    event.preventDefault();
    var uri = event.target.href;
    index.linkToName(uri);
  })
}
var index = new indexView

$.ready(function(){
  index.loadIndexPage();
  index.bindListeners();
})

