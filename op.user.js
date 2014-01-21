// ==UserScript==
// @name        op
// @namespace   http://userscripts.org/users/111
// @include     http://www.wykop.pl/moj/*
// @include     http://www.wykop.pl/mikroblog/*
// @include     http://www.wykop.pl/ludzie/*
// @include     http://www.wykop.pl/wpis/*
// @include     http://www.wykop.pl/tag/*
// @include     http://www.wykop.pl/ustawienia/
// @version     1.1
// @grant       none
// ==/UserScript==

function main() {
    function addOp(liContainer)
    {
        var op = liContainer.find('.showProfileSummary:first').text();
        var spanOp = $('<span>').css({color: localStorage.opColor}).text(localStorage.opText);
        liContainer.find('strong.fbold:contains("' + op + '")').each(function(i, e) {
            spanOp.clone().appendTo($(e));
        });
    }

    $(document).ready(function() {
        //strona wpisu
        if (window.location.href.indexOf("http://www.wykop.pl/wpis/") !== -1)
        {
            var li = $('li[data-type="entry"]');
            addOp(li);
        }

        $(document).ajaxSuccess(function(e, xhr, settings) {
            //następna strona na mirko
            if (settings.url.indexOf("http://www.wykop.pl/mikroblog/next/") !== -1)
            {
            }
            //rozwinięcie wpisu
            if (settings.url.indexOf("http://www.wykop.pl/ajax/entries/comments/") !== -1)
            {
                var liId = /entries\/comments\/(\d*)/img.exec(settings.url);
                var li = $('li[data-id="' + liId[1] + '"]');
                addOp(li);
            }
        })
    })

    resolveLocalStorageTexts();
    if (document.location.href.indexOf("http://www.wykop.pl/ustawienia") !== -1) {
        var settingsBox = generateSettingsBox('OP delivered');

        var opText = $('<p />');
        opText.append($('<label />').addClass('fb_dig').text('Tekst przy OPie:').css({'width': '150px', 'display': 'inline-block'}));
        opText.append($('<input />').addClass('opText').val(localStorage.opText));


        var opColor = $('<p />');
        opColor.append($('<label />').addClass('fb_dig').text('Kolor tekstu:').css({'width': '150px', 'display': 'inline-block'}));
        opColor.append($('<input />').addClass('opColor').val(localStorage.opColor));

        var test = $('<p />');
        test.append($('<label />').addClass('fb_dig').text('Test:').css({'width': '150px', 'display': 'inline-block'}));
        test.append($('<strong />').css({color: localStorage.opColor}).addClass('test fbold').text(localStorage.opText));

        settingsBox.find('.content').append(opText).append(opColor).append(test);

        $('div.marginbott20').has('fieldset').last().after(settingsBox);
        $('.opColor, .opText').keyup(handleTextChange);
    }



    function handleTextChange(e, x)
    {
        $('strong.test').text($('.opText').val()).css({color: $('.opColor').val()});
        localStorage[$(e.target).attr('class')] = $(e.target).val();
    }

    function generateSettingsBox(title)
    {
        var settingsBox = $('<div />');
        settingsBox.addClass('fblock margin10_0 marginbott20');
        var fieldset = $('<fieldset />').addClass('bgf6f6f6 pding5');

        var h3 = $('<h3 />').addClass('large fbold fleft').text(title);
        var fleft = $('<div />').addClass('fleft content');

        settingsBox.append(fieldset.append(h3).append(fleft));

        return settingsBox;
    }

    function resolveLocalStorageTexts()
    {
        if (localStorage.opColor === undefined)
            localStorage.opColor = "#85BF25";
        if (localStorage.opText === undefined)
            localStorage.opText = " op ";
    }
}


if (typeof $ == 'undefined') {
    if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
        var $ = unsafeWindow.jQuery;
        main();
    } else {
        addJQuery(main);
    }
} else {
    main();
}
function addJQuery(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}

