$(function() {
    $.fn.extend({
        dropdown: function(data) {
            let list = this.data('list')

            if(typeof(list) === 'undefined') {
                list = []
            }

            if(typeof(arguments[0]) === 'string') {
                const action = arguments[0]


                switch (action) {
                    // 작업중... 선택이 않됨.
                    // case 'value':
                    //     console.log(arguments, arguments[1], this.find('button[value=' + (arguments[1]) + ']'), 'button[value=' + (arguments[1]) + ']', $(this).get(0))
                    //     this.find('button[value=' + (arguments[1]) + ']').trigger('click');
                    //     break
                    case 'select':
                        this.find('.dropdown').html(list[arguments[1]]).end().find('.dropdown--item>span').html(list[arguments[1]])
                        this.data('selected', arguments[1])
                        break
                    case 'selected':
                        return this.data('selected')
                    case 'open':
                        break
                    case 'init':
                        if(this.find('.dropdown').length<1) {
                            this.append('<button type="button" class="dropdown"></button>')
                        }
                        if(this.find('.dropdown--item').length<1) {
                            this.append('<div class="dropdown--item"><ul class="mt-0"></ul></div>')
                        }
                        break
                    case 'add_search':
                        this.find('.dropdown--item').prepend('<input type="text" name="search" autocomplete="off" placeholder="' + '검색어를 입력해주세요.' + '">');
                        const $options = this.find('.dropdown--item').find('>ul').find('>li');
                        this.find('[name=search]').on('keyup', function () { 
                            const skey = $(this).val();
                            $options.each(function () { 
                                const text = $(this).text();
                                if (text.search(new RegExp(skey, 'i')) > -1) {
                                    $(this).show();
                                } else {
                                    $(this).hide();
                                }
                            })
                        })
                        break
                    case 'add':
                        if(typeof(arguments[1]) === 'string') {
                            const li = $('<li>')

                            list[arguments[1]] = arguments[1]
        
                            const button = $('<button>').attr('type', 'button').text(arguments[1])
            
                            button.appendTo(li)
        
                            this.find('.dropdown--item').find('>ul').append(li)
                        }
                        else if(typeof(arguments[1]) === 'object') {
                            list[arguments[1].value] = arguments[1].text

                            const li = $('<li>')

                            const button = $('<button>').attr('type', 'button').val(arguments[1].value).html(arguments[1].text)
            
                            button.appendTo(li)

                            li.data('value', arguments[1].value)
                            li.appendTo(this.find('.dropdown--item').find('>ul'))
                        }
                }
            }
            else if(typeof(arguments[0]) === 'object') {
                if(arguments.length === 1) {
                    this.data('options', arguments[0])
                }
            }


            this.data('list', list)

            return this
        }
    })


    // 드롭다운 메뉴의 바깥을 클릭할 경우
    $(document).on('click', ':not(.dropdown)', (e) => {
        if($(e.target).closest('.dropdown-wrapper').length) {
            $(e.target).closest('.dropdown--wrapper').find('.dropdown--open').toggleClass('dropdown--open')
            return
        }
        if(!$(e.target).closest('.dropdown').hasClass('dropdown--item')) {
            $('.dropdown--open').removeClass('dropdown--open')
			// $('.background').removeClass('active')
        }
    })

	// 드롭다운 메뉴의 바깥을 클릭할 경우
    $(document).on('click', '.dropdown', (e) => {
        e.stopPropagation()

        $('.dropdown--open').removeClass('dropdown--open')
		// $('.background').toggleClass('active');
        $(e.target).toggleClass('dropdown--open');
        
        $(e.target).parent().find('[name=search]').focus();
    })

    $(document).on('click', '.dropdown-wrapper .dropdown--item > ul > li', (e) => {
        const self = $(e.target).closest('li')
        const text = $(e.target).text()
        const value = self.data('value')

        const wrapper = $(e.target).closest('.dropdown-wrapper')
		// const Background = $('tab_bar').closest('.dropdown-wrapper')

        wrapper.dropdown('select', value)
        wrapper.data('selected', value)
        wrapper.find('.dropdown--selected').removeClass('dropdown--selected')
        wrapper.find('.dropdown').removeClass('dropdown--open')
		// Background.removeClass('active')

        $(e.target).closest('li').addClass('dropdown--selected')
        $(e.target).closest('.dropdown--item').find('>span').text(text)

        wrapper.trigger('change', [ value ])
    })


});

// DropDown 적용 
$(function() {
    $('#country').dropdown('init');
    $.get('country.json', function(r){
        if(r?.success) {
            console.log(r.payload);
            let firstItem = null;
            r.payload.map((country) => {
                if(!firstItem) {
                    firstItem = country.code.toLowerCase()
                }
                $('#country').dropdown('add', { value: country.code.toLowerCase(), text: `<i class="flag ${country.code.toLowerCase()}"></i> ${country.name}` })
            })
            $('#country').dropdown('select', firstItem);
            $('#country').dropdown('add_search');
        }
    })
});