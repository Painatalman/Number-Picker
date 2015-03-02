(function($) {

    var node = document.createElement('div');
    node.classList.add('autocomplete');

    node.id = 'autocomplete';

    var ATTRIBUTES_DEFAULT = {
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        transition: 'opacity ease-in 200ms',
        display: 'block',
        'min-height': '300px',
        'background-color': '#eee',
        'z-index': 100
    };

    for (var key in ATTRIBUTES_DEFAULT) {
        node.style[key] = ATTRIBUTES_DEFAULT[key];
    }

    $(document).ready(function() {
        document.body.appendChild(node);
    });

    //alert(node);

    $.fn.autocomplete = function(options) {


        var settings = $.extend({
            // url for ajax call
            source: undefined,
            // source object with extra parameters for ajax call
            sourceData: {},
            // to mimic jquery-ui's own...
            request: {
                term: undefined
            },
            select: function(event, ui) {
                console.log(ui);
            },
            response: function(data) {

                var theElement = document.getElementById("autocomplete"),
                    theInput = settings.inputElement;
                
                // reset the autocomplete box
                theElement.innerHTML = "";


                // create node and attach results
                data.forEach(function(item, iterator) {

                    var option_node = document.createElement('div');
                    var text_node = document.createElement('span');
                    var label_node = document.createElement('label');

                    option_node.classList.add('autocomplete__item');
                    option_node.id = "autocomplete__item-" + iterator;

                    // add value, could be title, a span element...
                    if (item.label)
                    {
                        label_node.innerHTML = item.label;
                    }
                    text_node.innerHTML = item.value;

                    option_node.appendChild(label_node);
                    option_node.appendChild(text_node);


                    var ui = {
                        element: option_node,
                        item: item
                    }

                    option_node.addEventListener('click', function(event) {
                        settings.select(event, ui);
                    });

                    theElement.appendChild(option_node);
                });

                var position = $(theInput).offset();
                var attributes = ATTRIBUTES_DEFAULT;
                attributes.top = (position.top + theInput.clientHeight) + "px";
                attributes.left = position.left + "px";
                attributes.width = this.clientWidth + 'px';
                attributes.display = 'block';
                attributes.opacity = 1;
                for (var key in attributes) {
                    theElement.style[key] = attributes[key];
                }
            },
            // DEPRECATED - function to call with data
            callbackOnInput: function(data) {
                document.getElementById("autocomplete").innerHTML = data;
            },
            // function to call if there is an error during the ajax call
            callbackOnError: function(errorData) {
                console.error(errorData);
            },
            // when querying via ajax, this will be the name of the parameter that will use the input value as its own
            dataField: 'q',
            // size of the ul of results
            maxSize: 10,
            // minimum of characters required to trigger action
            trigger: 3
        }, options);


        var t, t2;


        var self = this;

        var autoComplete = document.getElementById('autocomplete');

        for (var thisIndex = 0; thisIndex < self.length; thisIndex++) {

            self[thisIndex].addEventListener('input', function(event) {
                
                // create new autocompleter
                // but hide it first
                var old_element = autoComplete;
                old_element.style.display="none";
                autoComplete = old_element.cloneNode(true);
                old_element.parentNode.replaceChild(autoComplete, old_element);

                if (this.value.length >= settings.trigger) {
                    // party time!

                    settings.inputElement = this;

                    settings.request.term = this.value;

                    if (settings.source) {

                        var source = settings.source,
                            request = settings.request,
                            response = settings.response;

                        if (source instanceof Array) {
                            // just consider these the results
                            settings.callbackOnInput(source);
                        } else if (typeof(source) === "function") {
                            // check for parameters  
                            // "this" - the event target, the inputbox
                           source(request, response);
                        } else {
                            var parameters = settings.sourceData || {};
                            if (settings.dataField) {
                                parameters[settings.dataField] = this.value;
                            }

                            $.ajax({
                                url: source,
                                dataType: settings.dataType,
                                data: parameters,
                                success: function(data) {
                                    source(request, response);
                                },
                                error: function(error, data) {

                                    if (settings.callbackOnError) {
                                        settings.callbackOnError(error);
                                    }
                                }
                            });
                        }
                    } else if (settings.callbackOnInput) {
                        settings.callbackOnInput(data);
                    }
                }

            });

            // attach events

            self[thisIndex].addEventListener('blur', function(event) {

                t = setTimeout(function() {
                    autoComplete.style.display = "none";

                }, 300);

                var t2 = setTimeout(function() {
                    autoComplete.style.opacity = 0;
                }, 100);

            });
        }
        return this;
    };



}(jQuery));
