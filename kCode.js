(function() {

    // change this to whichever function you wanna run when the code is successful
    // TODO: maybe write random words
    var callback = function(){
      alert("You bitch...");
    }

    var kCode = ["Up", "Up", "Down", "Down", "Left", "Right", "Left", "Right", "U+0042", "U+0041"];
    var input = [];
    var alertTimerId = undefined;
    var time = 5000;

    function clear(input) {
        console.log("clearing...");
        while (input.length > 0) {
            input.pop();
        }
    }

    function compare(input, code) {
        /* check if input is at least, going the right way */
        var result = false;

        if (input.length <= code.length) {
            result = true;
            for (var i = 0; i < input.length; i++) {
                if (input[i] !== code[i]) {
                    result = false;
                }
            }
        }
        if (result === false) {
            clear(input);
        }

        return result;
    }

    document.addEventListener('keyup', function(event) {
        input.push(event.keyIdentifier);
        console.log("input:", input);
        if (compare(input, kCode)) {
            // please note that compare will return true if it matches the beginning of the code, even if it is not complete!
            if (input.length === kCode.length) {
                if (typeof("callback") === "undefined"){
                  console.log("enabled!");
                }
                else{
                  callback();
                }
                clearTimeout(alertTimerId);
                clear(input);
            } else {
                console.log("go on...");
            }
        } else {
            if (typeof(alertTimerId) === "undefined") {
                clearTimeout(alertTimerId);
            }
            alertTimerId = setTimeout(clear(input), time);
        }
    });

}());
