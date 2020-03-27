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
