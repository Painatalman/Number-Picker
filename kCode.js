(function(window){



    function konamiCode(options, callback, params) {
      // TODO: code option must have at least 2 characters


      var options = options || {};

      function disableKonamiCode() {
          window.document.removeEventListener('keyup', konamiCodePress, false);
          pressedKeys = [];
       }


      var TIMER = 1000 || options.timer, //1s
          COMBINATION=[38,38,40,40,37, 39,37,39,66,65] || options.combination, //e.which, the keycode
          DEBUG = false || options.debug,
          CALLBACK = callback || function defaultCallback(){alert("porn");},
          PARAMS = params || {},
          DISABLE = options.disable || false;

      var interval,
          pressedKeys = [],
          konamiCodePress = function konamiCodePressEvent(e){

          if (interval) {
             // clear timeout on key pressed
             clearTimeout(interval);
          }

          var curPos = pressedKeys.length,
              pressedKeyCode = e.which;

         if (DEBUG) { console.log("You pressed",pressedKeyCode); }

          if (pressedKeyCode === COMBINATION[curPos]) {
              pressedKeys.push(pressedKeyCode);
              if (DEBUG) { console.log(pressedKeys); }

              if (curPos + 1 === COMBINATION.length) {
                 // then it was enabled
                 if (DEBUG) { console.log("enabled!") }
                  CALLBACK(PARAMS);

                  // reset pressed keys
                  pressedKeys = [];

              }
              else {
                  // right key, but code still incomplete
                  interval = setTimeout(function(){ pressedKeys = [];}, TIMER)
              }
          }
          else {
            // wrong key, biatch!
            if (DEBUG) { console.log("wrong key, reset!\nBut is it the first one?");}

            // still, you may be on to something if, for example, the 3rd character pressed is actually the same as the second right one... you just need to ignore the first pressed key
            // that will be done... later!
            pressedKeys = [];
            // if (pressedKeyCode === COMBINATION[0]) {
            //       pressedKeys.push(pressedKeyCode);
            //       interval = setTimeout(function(){ pressedKeys = [];}, TIMER);
            // }
          }
      };


      if (DEBUG){
          console.log(TIMER, COMBINATION, DEBUG, CALLBACK, PARAMS);
      }

      if (DISABLE){
          disableKonamiCode();
          return;
      }

      window.document.addEventListener("keyup", konamiCodePress, false);


}

// link to window element
if (window.konamiCode) {
    window.konamiCode({disable:true})
}
window.konamiCode = konamiCode;

})(window);