
var boards;
var scores = 0;
var rowes = 4;
var columnes = 4;


window.onload = function() { 		
 		setGames();
		flappy();
 
}

function setGames() {
    boards = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]]

    for (let r = 0; r < rowes; r++) {
        for (let c = 0; c < columnes; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = boards[r][c];
            updateTile(tile, num);
            document.getElementById("boards").append(tile);
        }
    }
    //tao 2 so 2 de bat dau game
    setTwo();
    setTwo();

}
function resetGame() {
    scores = 0;
    gameOvers = false;
    document.getElementById("scores").innerText = scores;
    document.getElementById("boards").innerHTML = ""; // Xóa bảng hiện tại

    setGames(); // Thiết lập game mới
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear danh sach lop
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }                
    }
}

document.addEventListener('keyup', (ee) => {
    if (ee.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (ee.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (ee.code == "ArrowUp") {
        slideUp();
        setTwo();

    }
    else if (ee.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("scores").innerText = scores;
})

function filterZero(rowss){
    return rowss.filter(num => num != 0); //create new array of all nums != 0
}

function slide(rowss) {
    //[0, 2, 2, 2] 
    rowss = filterZero(rowss); //[2, 2, 2]
    for (let i = 0; i < rowss.length-1; i++){
        if (rowss[i] == rowss[i+1]) {
            rowss[i] *= 2;
            rowss[i+1] = 0;
            scores += rowss[i];
        }
    } //[4, 0, 2]
    rowss = filterZero(rowss); //[4, 2]
    //add zeroes
    while (rowss.length < columnes) {
        rowss.push(0);
    } //[4, 2, 0, 0]
    return rowss;
}

function slideLeft() { //mui ten trai
    for (let r = 0; r < rowes; r++) {
        let rowss = boards[r];
        rowss = slide(rowss);
        boards[r] = rowss;
        for (let c = 0; c < columnes; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = boards[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() { //mui ten phai
    for (let r = 0; r < rowes; r++) {
        let rowss = boards[r];         //[0, 2, 2, 2]
        rowss.reverse();              //[2, 2, 2, 0]
        rowss = slide(rowss)            //[4, 2, 0, 0]
        boards[r] = rowss.reverse();   //[0, 0, 2, 4];
        for (let c = 0; c < columnes; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = boards[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() { //mui ten tren
    for (let c = 0; c < columnes; c++) {
        let rowss = [boards[0][c], boards[1][c], boards[2][c], boards[3][c]];
        rowss = slide(rowss);
        // boards[0][c] = row[0];
        // boards[1][c] = row[1];
        // boards[2][c] = row[2];
        // boards[3][c] = row[3];
        for (let r = 0; r < rowes; r++){
            boards[r][c] = rowss[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = boards[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() { //mui ten duoi
    for (let c = 0; c < columnes; c++) {
        let rowss = [boards[0][c], boards[1][c], boards[2][c], boards[3][c]];
        rowss.reverse();
        rowss = slide(rowss);
        rowss.reverse();
        // boards[0][c] = row[0];
        // boards[1][c] = row[1];
        // boards[2][c] = row[2];
        // boards[3][c] = row[3];
        for (let r = 0; r < rowes; r++){
            boards[r][c] = rowss[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = boards[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rowes);
        let c = Math.floor(Math.random() * columnes);
        if (boards[r][c] == 0) {
            boards[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rowes; r++) {
        for (let c = 0; c < columnes; c++) {
            if (boards[r][c] == 0) { //at least one zero in the boards
                return true;
            }
        }
    }
    return false;
} 
