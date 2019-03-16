var c = document.querySelector("canvas");

c.width = 628;
c.height = 428;

var ctx = c.getContext("2d");

var charMap = new Image();
charMap.src = "petscii.bmp";

var t = 0;
var cursor = {
    x: 0,
    y: 5,
    blinkOn: false,
    lineOrigin: 5,
    lineString: ""
}

var screen = [
    "*","*","*","*"," ","b","o","o","b","o","o","b","u","n","t","u"," "," ","*","*","*","*",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    "8","0","0","8","0","0"," ","b","y","t","e","s"," ","f","r","e","e"," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    "r","e","a","d","y","."," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
    " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "
];

var bitmap = {
    "@": [0,0],
    "a": [1,0],
    "b": [2,0],
    "c": [3,0],
    "d": [4,0],
    "e": [5,0],
    "f": [6,0],
    "g": [7,0],
    "h": [8,0],
    "i": [9,0],
    "j": [10,0],
    "k": [11,0],
    "l": [12,0],
    "m": [13,0],
    "n": [14,0],
    "o": [15,0],
    "p": [16,0],
    "q": [17,0],
    "r": [18,0],
    "s": [19,0],
    "t": [20,0],
    "u": [21,0],
    "v": [22,0],
    "w": [23,0],
    "x": [24,0],
    "y": [25,0],
    "z": [26,0],
    "[": [27,0],
    "]": [29,0],
    ";": [31,0],
    "block": [0,1],
    "!": [1,1],
    "\"": [2,1],
    "?": [3,1],
    " ": [5,1],
    "*": [10,1],
    ",": [12,1],
    ".": [14,1],
    "0": [16,1],
    "1": [17,1],    
    "2": [18,1],
    "3": [19,1],
    "4": [20,1],
    "5": [21,1],
    "6": [22,1],
    "7": [23,1],
    "8": [24,1],
    "9": [25,1]
}

function drawChar(x, y, char) {
    var mapX = bitmap[char][0];
    var mapY = bitmap[char][1];
    var screenX = (x * 24) + 50; 
    var screenY = (y * 17) + 30;
    ctx.drawImage(charMap, mapX * 24, mapY * 17, 24, 17, screenX, screenY, 24, 17);
}

function displayScreen() {
    for (var i = 0; i < screen.length; i++) {
        var x = i % 22;
        var y = (i - x) / 22;
        var char = screen[i];
        drawChar(x, y, char);
    }
}

function shiftScreen() {
    if (cursor.y > 20) {
        for ( var i = 0; i < 22; i++) {
            screen.shift();
            screen.push(" ");
        }
        cursor.y = 20;
        cursor.lineOrigin--;
        if (cursor.lineOrigin < 0) cursor.lineOrigin = 0;
    }
}

function booBoo() {
    screen[cursor.y * 22] = "b"
    screen[1 + (cursor.y * 22)] = "o"
    screen[2 + (cursor.y * 22)] = "o"
    screen[3 + (cursor.y * 22)] = "b"
    screen[4 + (cursor.y * 22)] = "o"
    screen[5 + (cursor.y * 22)] = "o"
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            screen[6 + (cursor.y * 22)] = "."
        break;
        case 1:
            screen[6 + (cursor.y * 22)] = "!"
        break;
        case 2:
            screen[6 + (cursor.y * 22)] = "?"
        break;
    }
}

document.onkeydown = function(e) {
    e = e || window.event;
    if (bitmap[e.key]) {
        screen[cursor.x + (cursor.y * 22)] = e.key;
        cursor.lineString += e.key;
        cursor.x++;
    }
    if (e.keyCode == 13) {
        cursor.x = 0;
        if (cursor.lineString != "") {
            cursor.y++;
            shiftScreen();
            booBoo();
        }
        cursor.y++;
        cursor.lineString = ""
        cursor.lineOrigin = cursor.y;
    }
    if (e.keyCode == 8) {
        cursor.x--;
        if (cursor.x < 0 && cursor.y != cursor.lineOrigin) {
            cursor.x = 21;
            cursor.y--;
            if (cursor.y < 0) cursor.y = 0;
        }
        else if (cursor.x < 0) cursor.x = 0;
        screen[cursor.x + (cursor.y * 22)] = " "
    }
    if (cursor.x > 21) {
        cursor.x -= 22;
        cursor.y++;
    }
    shiftScreen();
}

function loop() {
    requestAnimationFrame(loop);
    ctx.fillStyle = "cyan"
    ctx.fillRect(0, 0, c.width, c.height);
    displayScreen();
    t++;
    if (t % 25 == 0) cursor.blinkOn = !cursor.blinkOn;
    if (cursor.blinkOn) drawChar(cursor.x, cursor.y, "block");
}
loop();
