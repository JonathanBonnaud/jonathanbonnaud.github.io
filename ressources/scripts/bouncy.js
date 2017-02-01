function makeItBouncy(selecteur) {
    // stagger loading
    $('a').delay(200).each(function (i, elem) {
        //Display each link 50 milisecond after the former is displayed
        var d = 50 * i,
            e = $(elem);
        e.delay(d).fadeTo(200, 1.0);
    });

    $(selecteur).css('position', 'relative');

    $(selecteur).each(function () {

        $(this).mousemove(function (e) {
            if (this.isAlreadyAnimating) {
                return;
            }

            var baseExpX = 4,
                baseExpY = 2, // 2 ^ 4 == 16

                // element proportions
                w = this.offsetWidth,
                h = this.offsetHeight,
                hw = w / 2,
                hh = h / 2,

                t = $(this),

                offsets = t.offset(), // element position relative to page
                // mouse position relative to element (the origin is top left of the element)
                pos = {
                    x: e.pageX - offsets.left,
                    y: e.pageY - offsets.top
                },

                // mouse position offset from center of element
                cx = pos.x - hw,
                cy = pos.y - hh,

                // percentage from center to edge
                px = Math.abs(cx / hw),
                py = Math.abs(cy / hh),

                // new top/left positions
                nx = Math.round(Math.pow(2, px * baseExpX)) * (cx < 0 ? -1 : 1),
                ny = Math.round(Math.pow(2, py * baseExpY)) * (cy < 0 ? -1 : 1);

            t.css({
                zIndex: 10,
                left: nx + 'px',
                top: ny + 'px'
            });
        });

        $(this).mouseout(function (e) {
            var t = $(this),
                pos = {
                    x: parseInt(t.css('left'), 10),
                    y: parseInt(t.css('top'), 10)
                };
            t.css('z-index', 1);

            this.isAlreadyAnimating = true;
            t.animate({
                top: pos.y * -1,
                left: pos.x * -1
            }, 50, 'linear').animate({
                top: pos.y * 0.75,
                left: pos.x * 0.75
            }, 75, 'linear').animate({
                top: pos.y * -0.5,
                left: pos.x * -0.5
            }, 50, 'linear').animate({
                top: pos.y * 0.25,
                left: pos.x * 0.25
            }, 100, 'linear').animate({
                top: 0,
                left: 0
            }, 100, 'linear', function () {
                this.isAlreadyAnimating = false;
            });
        });
    });
}
