const xSize = 50;
const ySize = 15;
const red = "#ff0000";
const green = "#00ff00";
var algo = "dda";

let points = [];

$(function(){
    generate_table();
});


$("input[name='options']").click(function() {
    reset();
    algo = $(this).val();
});

function generate_table() {
    console.log("Generating tables...");

    var container = $(".table-container");
    let table_out = "<table class='table table-bordered table-sm'>";

    for (let row=ySize; row>=0; row--) {
    table_out += "<tr>";

        for(let col=0; col<=xSize; col++) {
            table_out += `<td class="pixel" id="x${col}y${row}" onclick="select(${col}, ${row})">&nbsp;</td>`;
        }

        table_out += "</tr>";
    }

    table_out += "</table>";
    container.html(table_out);
}

function reset() {
    points = [];
    $('.pixel').removeClass('bg-primary');
    $('.pixel').removeClass('bg-success');
}

function select(x,y) {
    console.log(`Koordinat: (${x},${y})`);

    if(points.length <= 1) {
        points.push([x,y]);
        $(`#x${x}y${y}`).addClass('bg-primary');
    } else {
        update_ends(x,y);
    }

    var paint_dots = calculate(points);

    paint(paint_dots);
}

function paint(dot) {
    $.each(dot, function(e, val) {
        $(`#x${val[0]}y${val[1]}`).addClass('bg-success');
    });
}

function update_ends(x,y) {
    let popped = points.pop();
    $(`#x${popped[0]}y${popped[1]}`).removeClass('bg-primary');

    points.push([x,y]);
    $(`#x${x}y${y}`).addClass('bg-primary');
}

function calculate(dot) {
    if(dot.length < 2) return;

    let s_x = dot[0][0];
    let s_y = dot[0][1];
    let e_x = dot[1][0];
    let e_y = dot[1][1];

    let point_result = [];

    $('.pixel').removeClass('bg-success');

    console.log(dot);

    if(algo==="dda") {
        console.log("Using DDA");

        let currentX = s_x;
        let currentY = s_y;

        let dx = e_x - s_x;
        let dy = e_y - s_y;

        let step = Math.abs(dx) >= Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
        let xStep = dx / step;
        let yStep = dy / step;

        for (let i=0; i<step; i++) {
            point_result.push([Math.round(currentX), Math.round(currentY)]);
            currentX += xStep;
            currentY += yStep;
        }

        return point_result;
    } else if(algo==="bresenham") {
        console.log("Using Bresenham");

        let currentX = s_x;
        let currentY = s_y;

        let dx = Math.abs(e_x - s_x);
        let dy = -Math.abs(e_y - s_y);

        let sx = s_x < e_x ? 1 : -1;
        let sy = s_y < e_y ? 1 : -1;

        let err = dx + dy;

        while (true) {
            if (currentX === e_x && currentY === e_y) break;
            point_result.push([currentX, currentY]);

            e2 = err * 2;
            if (e2 >= dy) { err += dy; currentX += sx; };
            if (e2 <= dx) { err += dx; currentY += sy; };
        }

        return point_result;
    }
}
