(function($) {
    var node = document.createElement('div');
    node.classList.add('nPicker');
        for (var i = 1; i <= 9; i++){
        node.appendChild('<span class="nPicker__key">'+i+'</span>');
        }
        node.appendChild('<span class="nPicker__key">'+0+'</span>');
    $.fn.nPicker = function() {

        


        var position = this.offset();

        return this;
    };
}(jQuery));
