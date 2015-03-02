// @version     0.1
// @author      Mickael Morgado
// @grant       none


/*
  ## Helpbar

  Enables helping functionalities, like item and class detection

  ### Parameters

  + cssBar
    + type: object
    + description: css properties for the bar itself
    + default: the default settings defined for the bar
    + required: true
  + options
    + type: object
    + description: specific options
    + required: true
    + default: undefined
  + extra_classes
    + type: List of String
    + default: undefined
    + required: false
    + description: classes to be added to the bar
 */

function Hytekbar(cssBar_pars, extra_classes, options) {
    "use strict";

    var cssBar = cssBar_pars || {
            "z-index": "1000",
            "background-color": "#222",
            "width": "250px",
            "padding": "20px",
            "display": "none",
            "border-right": "5px solid #057",
            "border-bottom": "5px solid #057",
            "transition": "all .5",
            "position": "fixed",
            "top": "0",
            "left": "0",
            "right": "0",
        },
        enabled = true,
        topBar = document.createElement("div"),
        toggled_element = undefined,
        currentBorder = undefined;

    function toggle_bar() {
        /*
                ## Apply Style
                Shows or hides bar element.
                Then, returns it

                ### Parameters

                None
                
                ##### returns

                The bar element

                ##### side effects

                The bar will have a display of "block" or "none", based on its current value.

               */

        if (topBar.style['display'] === "none") {

            topBar.style['display'] = "block";
            enabled = true;
            // bind default events

        } else {
            // unbind all events

            topBar.style['display'] = "none";
            enabled = false;
            if (toggled_element) {
                remove_highlight(toggled_element);
            }
        }

        toggle_tag_detector();

        return topBar;
    }

    function show_element(event) {
        var el = event.toElement,
            classes = el.classList,
            id = el.id,
            status = topBar.querySelector("#target_tag");

        // reset value
        status.innerHTML = el.tagName;

        if (id) {
            status.innerHTML += "#" + el.id;
        }
        if (classes.length > 0) {
            for (var _class = 0; _class < classes.length; _class++) {
                status.innerHTML += "." + classes[_class];
            }
        }

        /*
        add the "enabler", by default a dashed border
        So, change the border
         */

        currentBorder = {
            "border-style": el.style.borderStyle,
            "border-color": el.style.borderColor,
            "border-width": el.style.borderWidth,
            "box-sizing": el.style.boxSizing
        };

        el.style.borderStyle = "dashed";
        el.style.borderWidth = "2px";
        el.style.borderColor = "red";
        el.style.boxSizing = "border-box";



        // add event listener for mouseout
        el.addEventListener("mouseout", function() {
            /*
            Reset enabler
            By default, the border
             */
            remove_highlight(this);

            this.removeEventListener("mouseout", remove_highlight);
        });
    }

    function toggle_tag_detector() {
        /*
                ## Apply Style
                Enable or tag data on the bar and border

                ### Parameters

                ##### type

                + type: "options (String)",
                + options: "dashed", etc.
                + required: false
                + default: "dashed"
                
                ### returns

                nothing at all

                ### side effects

                a mouseover event will be added to the document

               */





        if (enabled) {
            document.addEventListener("mouseover", show_element);
        } else {
            document.removeEventListener("mouseover", show_element);
        }
    }

    function remove_highlight(element) {
        /*
        Reset enabler
        By default, the border
         */

        element.style.borderStyle = currentBorder["border-style"];
        element.style.borderWidth = currentBorder["border-width"];
        element.style.borderColor = currentBorder["border-color"];
        element.style.boxSizing = currentBorder["box-sizing"];

        currentBorder = {};
        status.innerHTML = "";
    }

    function apply_style(node, attributes) {
        /*
            ## Apply Style
            Applies style properties/attributes to a node
            Then, returns it

            ### Parameters

            ##### node

            The node the styling will be applied to

            + type: Node
            + default: undefined
            + required: true

            ##### attributes
            
            The attributes object

            + type: Object
            + default: undefined
            + required: true
            + conditions: each attribute must have a valid name and value, according to css

            ##### returns

            the node itself

            ##### side effects

            the node will be changed based on the styles attributes

           */

        for (var key in attributes) {
            node.style[key] = attributes[key];
        }

        return node;
    }


    /*
        ## Detect Events

        Visual and console cues regarding a specific event

        #### Parameters

        + tags - an array of tags which will be evaluated
            + type - list of strings
            + default value - ['div', 'span', 'body', 'ul', 'li', 'a', 'code', 'section', 'header', 'b', 'i']
        + color - the color the tags will be with when the defined event occurs
            + type - string with color as it would be displayed in the css code
            + default value - 'yellow'
     */
    function detect_events(tags, color) {


        var divs = document.getElementsByTagName('div');

        for (var i = 0; i < divs.length; i++) {

            divs[i].addEventListener('click', function(e) {
                e = e || event;
                var target = e.target || e.srcElement;

                var currentStyle = {
                        "transition": target.style.transition,
                        "background-color": target.style.backgroundColor
                    },
                    triggeredStyle = {
                        "transition": "background-color 1s ease-in",
                        "background-color": "yellow"
                    }

                this.style.transition = triggeredStyle['transition'];
                this.style.backgroundColor = triggeredStyle['background-color'];


                console.log("target = " + target.className + ", this=" + this.className);

                e.stopPropagation() // CAREFUL!

                this.style.backgroundColor = currentStyle['background-color'];
                this.style.transition = currentStyle['transition'];
            });
        }

    }


    /*
    Setup the topbar element
     */
    apply_style(topBar, cssBar); // TODO: test if it works
    topBar.classList.add("HYTEK");

    /*
     Apply classes
     */
    if (typeof(extra_classes) !== "undefined") {
        extra_classes.forEach(function(_class, index) {
            topBar.classList.add(_class);
        });
    }

    /*
     prepare the status section
     */
    var status = document.createElement("span");
    status.id = "target_tag";
    topBar.appendChild(status);

    /* add to document body */
    document.body.appendChild(topBar);

    /*
    add event listeners
     */
    document.addEventListener("keydown", function(e) {
        if (e.which == 72 && e.altKey) {
            toggle_bar();
        }
    });

    toggle_bar();
    detect_events();
    console.log("enabled");

}
