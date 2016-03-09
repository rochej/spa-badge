var miniQuery = (function(){
// HELPERS
  var arrayify = function(collection){
    var newArray = Array.prototype.slice.call(collection);
    return newArray;
  }

  var collectCheck = function(element){
    if (element.length != undefined){
      return true
    } else{
      return false
    }
  }

  var checkAttribute = function (element, attribute){
    if (element.attribute == undefined){
      return true
    }
    else {
      return false
    }
  }

  var doAThingOnAThing = function (element, verb) {
    var selectedElement = SweetSelector.select(element);
    if (collectCheck(selectedElement)){
      collection = arrayify(selectedElement);
      collection.forEach(function(item){
        return verb.apply(item);
      })
    } else {
      verb.apply(selectedElement);
    }
  }
// END HELPERS
// PUBLIC METHODS
  var ready = function (callback) {
    if (document.readyState == "complete") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  }

  var hide = function (element){
    return DOM.hide(element)
  }
  var show = function (element){
    return DOM.show(element)
  }
  var select = function(element){
    return SweetSelector.select(element);
  }
  var addClass = function(className, otherClassName){
    return DOM.addClass(className, otherClassName);
  }
  var removeClass = function(className, otherClassName){
    return DOM.removeClass(className, otherClassName)
  }
  var on = function (className, eventName, passedVerb){
    return EventDispatcher.on(className, eventName, passedVerb);
  }
  var trigger = function (className, eventName){
    return EventDispatcher.trigger(className, eventName);
  }
  var ajax = function(hash){
    return AjaxWrapper.request(hash);
  }
// END PUBLIC METHODS
// PRIVATE METHODS
  var SweetSelector = (function() {
    var parser = function(element) {
      var element = element.replace(/[\.#]/, '')
      var id = document.getElementById(element);
      var klass = document.getElementsByClassName(element);
      var tag = document.getElementsByTagName(element);

      if (!(id===null)){
        return id
      }
      if (tag.length != 0){
        return tag
      }
      if (klass.length != 0){
        return klass
      }
    }
    return{
      select: parser
    }
  })()
  var DOM = (function() {

    var hide = function(element){
      var verb = function (){
        this.setAttribute("style", "visibility: hidden;")
      }
      doAThingOnAThing(element, verb);
    }

    var show = function(element) {
      var verb = function (){
        this.setAttribute("style", 'visibility: visible;')
      }
      doAThingOnAThing(element, verb);
    }

    var addClass = function(element, newClassName){
      var verb
      if (checkAttribute(element, 'className')) {
        verb = function (){
          this.className += " " + newClassName;
        }
      }
      else {
        verb = function() {
          this.className = newClassName;
        }
      }
      doAThingOnAThing(element, verb)
    }

    var removeClass = function(element, otherClassName){
      verb = function () {
        this.classList.remove(otherClassName);
      }
      doAThingOnAThing(element, verb);
    }

    return {
      hide: hide,
      show: show,
      addClass: addClass,
      removeClass: removeClass
    }
  })()

  var EventDispatcher = (function(){
    var on = function (className, eventName, passedVerb){
      var verb = function (){
        this.addEventListener(eventName, passedVerb)
      }
      doAThingOnAThing(className, verb)
    }
    var trigger = function (className, eventName){
      var verb = function (){
        var event = new Event(eventName);
        this.dispatchEvent(event);
      }
      doAThingOnAThing(className, verb)
    }
    return{
      on: on,
      trigger: trigger
    }
  })()

  var AjaxWrapper = (function(){
    var request = function(hash){
      var type = hash["type"]
      var url = hash["url"]

      var promise = new Promise (function(resolve, reject){
        var oReq = new XMLHttpRequest();
        oReq.open(type, url);
        oReq.onload = function(){
          if(this.status >= 200 && this.status < 300){
            resolve(this.response);
          } else{
            reject(this.statusText);
          }
        }
        oReq.onerror = function(){
          reject(this.statusText);
        }
        oReq.send();
      })
      return promise;
    }
    return{
      request: request
    }
  })()
//END PRIVATE METHODS
  return{
    hide: hide,
    show: show,
    addClass: addClass,
    removeClass: removeClass,
    select: select,
    on: on,
    trigger: trigger,
    ajax: ajax,
    ready: ready
  }
})()

$ = miniQuery;
