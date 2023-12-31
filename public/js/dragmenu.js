var timeOut;

class Item {
    constructor(icon, backgroundColor) {
        this.$element = $(document.createElement("div"));
        this.icon = icon;
        this.$element.addClass("item");
        this.$element.attr("id","item-"+icon);
        this.$element.css("background-color", backgroundColor);
        var i = document.createElement("i");
        $(i).addClass("fi-" + icon);
        this.$element.append(i);
        this.prev = null;
        this.next = null;
        this.isMoving = false;
        var element = this;
        this.$element.on("mousemove", function() {
            clearTimeout(timeOut);
            timeOut = setTimeout(function() {
                if (element.next && element.isMoving) {
                    element.next.moveTo(element);
                } 
            }, 10);
        });
    }
    
    moveTo(item) {
        anime({
            targets: this.$element[0],
            left: item.$element.css("left"),
            top: item.$element.css("top"),
            duration: 700,
            elasticity: 500
        });
        if (this.next) {
            this.next.moveTo(item);
        }
    }

    updatePosition() {    
        anime({
            targets: this.$element[0],
            left: this.prev.$element.css("left"),
            top: this.prev.$element.css("top"),
            duration: 200
        });
        
        if (this.next) {
            this.next.updatePosition();
        }
    }
}

class Menu {
    constructor(menu) {
        this.$element = $(menu);
        this.size = 0;
        this.first = null;
        this.last = null;
        this.timeOut = null;
        this.hasMoved = false;
        this.status = "closed";
    }
    
    add(item) {
        var menu = this;
        if (this.first == null) {
            this.first = item;
            this.last = item;
            this.first.$element.on("mouseup", function() {
                if (menu.first.isMoving) {
                    menu.first.isMoving = false;        
                } else {
                    menu.click();
                }
            }); 
            item.$element.draggable(
                {
                    start: function() {
                        menu.close();
                        item.isMoving = true;
                    }  
                },
                {
                    drag: function() {
                        if (item.next) {
                            item.next.updatePosition();
                        }
                    }
                },
                {
                    stop: function() {
                        item.isMoving = false;
                        item.next.moveTo(item);
                    }
                }
            );
        } else {
            this.last.next = item;
            item.prev = this.last;
            this.last = item;
        }
        this.$element.after(item.$element);
        
        
    }
    
    open() {
        this.status = "open";
        var current = this.first.next;
        var iterator = 1;
        var head = this.first;
        var sens = head.$element.css("left") < head.$element.css("right") ? 1 : -1;
        while (current != null) {
            anime({
                targets: current.$element[0],
                left: parseInt(head.$element.css("left"), 10) + (sens * (iterator * 50)),
                top: head.$element.css("top"),
                duration: 500
            });
            iterator++;
            current = current.next;
        }    
    }
    
    close() {
        this.status = "closed";
        var current = this.first.next;
        var head = this.first;
        var iterator = 1;
        while (current != null) {
            anime({
                targets: current.$element[0],
                left: head.$element.css("left"),
                top: head.$element.css("top"),
                duration: 500
            });
            iterator++;
            current = current.next;
        }
    }
    
    click() {
        if (this.status == "closed") {
            this.open();
        } else {
            this.close();
        }
    }
    
}

var menu = new Menu("#myMenu");
var item1 = new Item("list");
var item2 = new Item("home", "#FF5C5C");
var item3 = new Item("torso-business", "#FFF15C");
var item4 = new Item("usb", "#64F592");
// var item5 = new Item("list-bullet", "#5CD1FF");
var item6 = new Item("social-github", "#ffeaa7");
var item7 = new Item("mail", "#00b894");

menu.add(item1);
menu.add(item2);
menu.add(item3);
menu.add(item4);
// menu.add(item5);
menu.add(item6);
menu.add(item7);
$(document).delay(50).queue(function(next) {
    menu.open();
    next();
    $(document).delay(1000).queue(function(next) {
        menu.close();
        next();
    });
});

// $("#item.social-github").attr('target','blank');
$("#item-list").hover(function() {
    $(this).css('cursor','url(img/mandelbrotcursornew.png), pointer');
}, function() {
    $(this).css('cursor','auto');
});
$("#item-home").hover(function() {
    $(this).css('cursor','url(img/mandelbrotcursornew.png), pointer');
}, function() {
    $(this).css('cursor','auto');
});
$("#item-home").click(function() {
    window.location.href = "index.html";
});
$("#item-usb").hover(function() {
    $(this).css('cursor','url(img/mandelbrotcursornew.png), pointer');
}, function() {
    $(this).css('cursor','auto');
});
$("#item-usb").click(function() {
    window.location.href = "resume.html";
});
$("#item-torso-business").hover(function() {
    $(this).css('cursor','url(img/mandelbrotcursornew.png), pointer');
}, function() {
    $(this).css('cursor','auto');
});
$("#item-torso-business").click(function() {
    window.location.href = "about.html";
});
// $("#item-list-bullet").hover(function() {
//     $(this).css('cursor','url(img/mandelbrotcursornew.png), pointer');
// }, function() {
//     $(this).css('cursor','auto');
// });
// $("#item-list-bullet").click(function() {
//     window.location.href = "projects.html";
// });
$("#item-social-github").hover(function() {
    $(this).css('cursor','url(img/mandelbrotcursornew.png), pointer');
}, function() {
    $(this).css('cursor','auto');
});
$("#item-mail").hover(function() {
    $(this).css('cursor','url(img/mandelbrotcursornew.png), pointer');
}, function() {
    $(this).css('cursor','auto');
});

$("#item-social-github").click(function() {
    window.open("https://github.com/rnucuta/");
});
$("#item-mail").click(function() {
    window.location.href = "mailto:rnucuta@gmail.com";
});
// window.location.href = "mailto:rnucuta@gmail.com";