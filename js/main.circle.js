const xSize = $(".table-container").attr("xsize");
const ySize = $(".table-container").attr("ysize");
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
    $.each(points, function(e, val) {
        $(`#x${val[0]}y${val[1]}`).addClass('bg-primary');
    });

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

function distance(dot) {
    let s_x = dot[0][0];
    let s_y = dot[0][1];
    let e_x = dot[1][0];
    let e_y = dot[1][1];

    var point_result = [];

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

            if (e2 >= dy) {
                err += dy;
                currentX += sx;
            };

            if (e2 <= dx) {
                err += dx;
                currentY += sy;
            };
        }

        return point_result;
}

function calculate(dot) {
    if(dot.length < 2) return;

    let s_x = dot[0][0];
    let s_y = dot[0][1];
    let e_x = dot[1][0];
    let e_y = dot[1][1];

    var point_result = [];
    var r = distance(dot).length - 1;

    $('.pixel').removeClass('bg-success');

    currentX = 0
    currentY = r;

    var d = 3 - 2 * r;

    var d1 = draw_circle(s_x, s_y, currentX, currentY);
    point_result.push(...d1);

    while(currentY >= currentX) {
        // for each pixel we will
        // draw all eight pixels
        currentX++;

        // check for decision parameter
        // and correspondingly
        // update d, x, y
        if (d > 0)
        {
            currentY--;
            d = d + 4 * (currentX - currentY) + 10;
        }
        else
            d = d + 4 * currentX + 6;

        var bagian = draw_circle(s_x, s_y, currentX, currentY);
        point_result.push(...bagian);
    }

    return point_result;
}

function draw_circle(xc, yc, x, y) {
    var drawResult = [];

    drawResult.push([+xc+x, +yc+y]);
    drawResult.push([+xc-x, +yc+y]);
    drawResult.push([+xc+x, +yc-y]);
    drawResult.push([+xc-x, +yc-y]);
    drawResult.push([+xc+y, +yc+x]);
    drawResult.push([+xc-y, +yc+x]);
    drawResult.push([+xc+y, +yc-x]);
    drawResult.push([+xc-y, +yc-x]);

    return drawResult;
}
