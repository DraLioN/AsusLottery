function action() {
    var b = getCurrentStep();
    2 == b ? startLottery() : 4 != getCurrentStep() && stopLottery(), b = 4 > b ? ++b : 2, changeStep(b)
}
function getCurrentStep() {
    var a = $("body").attr("class");
    return a && "string" == typeof a && parseInt(a.substr(-1, 1))
}
function changeStep(a) {
    $("body").removeClass(), $("body").addClass("step" + a)
}
function startLottery() {
    numbersHolder.html(""), interval = setInterval(function() {
        numbersHolder.html(getRandomInt(options.randMin, options.randMax))
    }, options.rollingSpeed)
}
function getRandomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}
function stopLottery() {
    checkIfNumberIsUsed(), "" != numbersHolder.html() && usedNumbers.push(numbersHolder.html()), interval && (clearInterval(interval), interval = null)
}
function checkIfNumberIsUsed() {
    if (0 != usedNumbers.length) {
        var a = options.randMax - options.randMin;
        if (1 > a - recurtionCount)
            return numbersHolder.html(1), void 0;
        for (var c, b = 0; c = usedNumbers[b]; b++)
            if (numbersHolder.html() == c) {
                numbersHolder.html(getRandomInt(options.randMin, options.randMax)), checkIfNumberIsUsed(), recurtionCount++;
                break
            }
    }
}
function setMinMaxValues() {
    var a = $("#minValue"), b = $("#maxValue"), c = parseInt(a.val()), d = parseInt(b.val());
    return 1 > c || 1 > d ? (alert("Values should be positive numbers!"), void 0) : c >= d ? (alert("'min value' should be smaller than 'max value'!"), void 0) : (c !== parseInt(c, 10) && a.val(options.randMin), d !== parseInt(d, 10) && b.val(options.randMax), console.log("minInput.value(): ", c), console.log("maxInput.value(): ", d), options.randMin = c, options.randMax = d, "undefined" != typeof Storage && (localStorage.setItem("minValue", options.randMin), localStorage.setItem("maxValue", options.randMax)), void 0)
}
function toggleImage(a) {
    console.log("imageWrapper:", imageWrapper), imageShown ? (imageWrapper.removeClass("show1 show2 show3 animated rotateIn"), imageShown = !1) : (imageWrapper.addClass("show" + a), imageWrapper.addClass("animated rotateIn"), imageShown = !0)
}
var options = {afterSpinDelay: 500,rollingSpeed: 75,randMin: 1,randMax: 200}, imageWrapper, imageShown = !1, numbersHolder, usedNumbers = [], recurtionCount = 0, interval;
$(document).ready(function() {
    if (imageWrapper = $("#imageWrapper"), numbersHolder = $("#numbersHolder"), $(".flip").click(action), $(document).keypress(function(a) {
            var b = a.keyCode || a.charCode;
            switch (b) {
                case 32:
                    action(a);
                    break;
                case 49:
                    toggleImage(1);
                    break;
                case 50:
                    toggleImage(2);
                    break;
                case 51:
                    toggleImage(3)
            }
        }), $(".setUpMenu .showHideArrow ").click(function() {
            var b = $(".setUpMenu");
            b && b.toggleClass("show")
        }), $(".setUpMenu button").click(function(a) {
            a.preventDefault(), setMinMaxValues()
        }), "undefined" != typeof Storage) {
        var a = parseInt(localStorage.getItem("minValue")) || 10, b = parseInt(localStorage.getItem("maxValue")) || 200;
        options.randMin = a, options.randMax = b, a && $("#minValue").val(a), b && $("#maxValue").val(b)
    }
});
