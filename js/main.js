function Popup(options){
  this.popup = document.querySelector('.js-popup');
  if(!this.popup) return;
  this.btn = options.btn;
  this.close = document.querySelector('.js-close');
  
  this.showPopup = this.showPopup.bind(this);
  this.hidePopup = this.hidePopup.bind(this);
  
  for(var i = 0; i<this.btn.length; i++){
    this.btn[i].addEventListener('click', this.showPopup);
  }
  
  this.close.addEventListener('click', this.hidePopup);
}

Popup.prototype.showPopup = function(e){
  e.preventDefault();
  this.popup.classList.add('popup--show');
};

Popup.prototype.hidePopup = function(e){
  e.preventDefault();
  this.popup.classList.remove('popup--show');
};


function MenuMobile(){
  this.menu = document.querySelector('.js-menu');
  this.btn = this.menu.querySelector('.js-button-menu');
  
  this.menu.classList.remove('menu--nojs');

  this.toggleMenu = this.toggleMenu.bind(this);
  
  this.btn.addEventListener('click', this.toggleMenu);
}

MenuMobile.prototype.toggleMenu = function(){
  this.menu.classList.toggle('menu--open');
};

function Mask(options) {
    this.input = options.input;
    if (!this.input) return;

    this.check = this.check.bind(this);
    this.input.addEventListener("input", this.check);
    this.input.addEventListener("focus", this.check);
    this.input.addEventListener("blur", this.check);
}
Mask.prototype.check = function(event){
    var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.input.value.replace(/\D/g, "");

    if (def.length >= val.length){
        val = def
    };

    this.input.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });

    if (event.type == "blur") {
        if (this.input.value.length == 2) this.input.value = ""
    }else{
        this.setCursorPosition(this.input.value.length, this.input)
    }
}
Mask.prototype.setCursorPosition = function (pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
    }
};

function blockBtn(Obj) {
    var btn = document.querySelector('#popup-button');

    if(!this.checked){
        btn.disabled = true;
    }else{
        btn.disabled = false;
    }
}

document.querySelector('#check').addEventListener("change", blockBtn);

new MenuMobile;
new Popup({
    btn: document.querySelectorAll('.js-call')
});
new Mask({
    input: document.querySelector('#tel')
});