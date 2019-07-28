(function() {

    //создаем tag canvas
    var canvas = document.createElement('canvas');
    canvas.id = 'canvasId';
    canvas.width = '500';
    canvas.height = '500';
    document.getElementById('section').appendChild(canvas);

    var angle;
    var ctx = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    clock_outer();
    draw_circles();
    clock_center();

    //рисуем окружность
    function clock_outer() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 249, 0, Math.PI * 2); //arc(x, y, radius, startAngle, endAngle, anticlockwise)
        ctx.strokeStyle = 'rgb(240, 216, 5)';
        ctx.fillStyle = '#fffb02';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.closePath();
        ctx.stroke();
    }

    //рисуем центр
    function clock_center() {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'red';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.closePath();
        ctx.stroke();
    }

    // нарисовать зеленые кружки
    function draw_circles() {
        for (var i = 0; i < 12; i++) {
            angle = (Math.PI * 2) / 12 * (i - 2); //угол
            ctx.beginPath();
            var x1 = centerX + Math.cos(angle) * 205;
            var y1 = centerY + Math.sin(angle) * 205;
            ctx.arc(x1, y1, 25, 0, Math.PI * 2);
            ctx.fillStyle = 'rgb(24, 170, 24)';
            ctx.strokeStyle = 'rgb(24, 170, 24)';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.closePath();
            ctx.stroke();

            //надпись у кружков
            let text = `${i + 1}`;
            var x2 = 241 + Math.cos(angle) * 205;
            var y2 = 255 + Math.sin(angle) * 205;
            ctx.font = '20px Comic Sans MS';
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'black';
            ctx.lineWidth = 2;
            ctx.fillText(text, x2, y2);
            ctx.strokeText(text, x2, y2);
        };
    }

    //создаем 2 канвас
    var bufferCanvas = document.createElement('canvas');
    bufferCanvas.id = 'buffercanvasId';
    bufferCanvas.width = canvas.width;
    bufferCanvas.height = canvas.height;
    var bufferCtx = bufferCanvas.getContext('2d');
    document.getElementById('section').appendChild(bufferCanvas);
    bufferCanvas.style.cssText = 'position:absolute;right:0px;';


    //электронные часы
    var section = document.getElementById("section");
    var spanTime = document.createElement('span');
    spanTime.id = "electClock";
    section.appendChild(spanTime);

    setInterval(show, 1000);

    function show() {

        showClock();

        function showClock() {
            var date = new Date;
            var centerX = bufferCanvas.width / 2;
            var centerY = bufferCanvas.height / 2;
            var sec = date.getSeconds();
            var min = date.getMinutes();
            var hour = date.getHours();

            function blank() {
                bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
            }

            blank();
            show_seconds();
            show_minutes();
            show_hours();

            //рисуем секундную стрелку
            function show_seconds() {
                angle = ((Math.PI * 2) * (sec / 60)) - ((Math.PI * 2) / 4); //угол поворота
                bufferCtx.beginPath();
                bufferCtx.lineWidth = 1.9; //ширина стрелки
                bufferCtx.lineCap = 'round'; //округление на конце
                // начать с центра
                bufferCtx.moveTo(centerX, centerY);
                // нарисовать длину
                //centerX + radius * Math.cos(angle);Полный круг(360 град) - 2pi радианов
                //centerY + radius * Math.sin(angle);
                bufferCtx.lineTo((centerX + Math.cos(angle) * 200),
                    centerY + Math.sin(angle) * 200);
                bufferCtx.strokeStyle = 'red'; // цвет стрелки.
                bufferCtx.stroke();
                bufferCtx.closePath();
            }

            //рисуем минутную стрелку
            function show_minutes() {
                angle = ((Math.PI * 2) * (min / 60)) - ((Math.PI * 2) / 4); //угол поворота
                bufferCtx.beginPath();
                bufferCtx.lineWidth = 3; //ширина стрелки
                bufferCtx.lineCap = 'round'; //округление на конце 
                bufferCtx.moveTo(centerX, centerY); // начать с центра
                // нарисовать длину
                //centerX + radius * Math.cos(angle);Полный круг - 2pi радианов
                //centerY + radius * Math.sin(angle);
                bufferCtx.lineTo((centerX + Math.cos(angle) * 180),
                    (centerY + Math.sin(angle) * 180));
                bufferCtx.strokeStyle = 'black'; // цвет стрелки.
                bufferCtx.stroke();
                bufferCtx.closePath();
            }


            //рисуем часовую стрелку
            function show_hours() {
                angle = ((Math.PI * 2) * ((hour * 5 + (min / 60) * 5) / 60)) - ((Math.PI * 2) / 4); //угол поворота
                bufferCtx.beginPath();
                bufferCtx.lineWidth = 4; //ширина стрелки
                bufferCtx.lineCap = 'round'; //округление на конце
                bufferCtx.moveTo(centerX, centerY); // начать с центра
                // нарисовать длину
                //centerX + radius * Math.cos(angle);Полный круг - 2pi радианов
                //centerY + radius * Math.sin(angle);
                bufferCtx.lineTo((centerX + Math.cos(angle) * 140), centerY + Math.sin(angle) * 140);
                bufferCtx.strokeStyle = 'black'; // цвет стрелки.
                bufferCtx.stroke();
                bufferCtx.closePath();
            };

            showTime();

            function showTime() {
                var timeNow = new Date();
                var hh = timeNow.getHours();
                var mm = timeNow.getMinutes();
                var ss = timeNow.getSeconds();
                var formatedTime = `${addZero(hh)}:${addZero(mm)}:${addZero(ss)}`;
                document.getElementById('electClock').innerHTML = formatedTime;
            };

            function addZero(num) {
                return (parseInt(num, 10) < 10 ? "0" : "") + num;
            };

        };
    };


}())