(function($){
    var sortListItems = function(items) {
        return items.sort(function(item1, item2) {
            if($(item1).html() == $(item2).html()) {
                return 0;
            }
            if($(item1).html() > $(item2).html()) {
                return 1;
            } else {
                return -1;
            }
        });
    };


    var setOption = function(ul, selectedLi, hiddenInput){
        ul.removeClass('opened')
        ul.find('li').hide();
        hiddenInput.attr('value', selectedLi.attr('data-value'))

        var listItems = ul.find('li').detach();
        sortListItems(listItems).appendTo(ul)


        selectedLi.detach();
        ul.prepend(selectedLi);

        selectedLi.show().bind('click', function(){
            ul.addClass('opened')
            ul.find('li').show().bind('click', function(){
                ul.find('li').unbind('click');
                setOption(ul, $(this), hiddenInput);
            })
        })
    };

    $.fn.dropdownSelect = function() {
        var select = this;

        var ul = $('<ul>', {'class': 'dropdown-select', 'tabindex': select.attr('tabindex')});

        select.find('option').each(function(){
            var option = $(this);
            var li = $("<li>", {'data-value': option.attr('value')}).html(option.html())
            ul.append(li);
            li.hide();
        })

        hiddenInput = $("<input>", {type: 'hidden', name: select.attr('name')});
        select.replaceWith(hiddenInput, ul);

        defaultLi = ul.find('li').first();
        setOption(ul, defaultLi, hiddenInput);

        return ul;
    }
})(jQuery)