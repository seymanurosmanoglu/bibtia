const removeClasses = ({ keys, className }) => {
    const elements = document.querySelectorAll(keys);
    elements.forEach(e => e.classList.remove(className));
};

const tab = {
    el: {
        tab: '.tab',
        btn: '.tab-header a',
        content: '.tab-content'
    },
    class: {
        selected: 'selected'
    },
    handleTab: function (e) {
        const _t = tab,
            btn = e.target,
            contents = document.querySelectorAll(_t.el.content),
            rel = btn.getAttribute('rel') || '';

        removeClasses({ keys: _t.el.btn, className: _t.class.selected });

        btn.classList.add(_t.class.selected);

        if (rel !== '') {
            contents.forEach((el) => {
                if (el.getAttribute('rel') === rel) {
                    !el.classList.contains(_t.class.selected) && el.classList.add(_t.class.selected);
                } else {
                    el.classList.remove(_t.class.selected);
                }
            });
        }
    },
    addEvent: function () {
        const _t = this,
            buttons = document.querySelectorAll(_t.el.btn);
        buttons.forEach((el) => {
            el.addEventListener('click', _t.handleTab);
        });
    },
    init: function () {
        const _t = this,
            tab = document.querySelector(_t.el.tab);
        tab && _t.addEvent();
    }
};

tab.init();

const search = {
    el: {
        page: '.results-page',
        results: '.result',
        noResult: '#no-result'
    },
    class: {
        selected: 'selected'
    },
    handleSearch: function () {
        const _t = this,
            queryString = window.location.search,
            parameters = new URLSearchParams(queryString),
            key = parameters.get('key') || '',
            results = document.querySelectorAll(_t.el.results);
        
            let isFound = false;

        if (key !== '') {
            results.forEach(el => {
                const ref = el.getAttribute("ref").toLowerCase() || "";
                if (ref.includes(key.toLowerCase())) {
                    isFound = true;
                    el.classList.add(_t.class.selected);
                }
            });
        }

        if (key === '' || !isFound) {
            document.querySelector(_t.el.noResult).classList.add(_t.class.selected);
        }
    },
    init: function () {
        const _t = this,
            resultPage = document.querySelector(_t.el.page);
        resultPage && _t.handleSearch();
    }
}

search.init();