(function () {
    var page = {
        init: function () {
            // 参数预处理
            const params = new URLSearchParams(window.location.search);
            json = '';
            var type = params.get('t');
            this.type = type;
            switch (type) {
                case 'hiragana':
                case 'katakana':
                case 'all':
                    json = type;
                    break;
                default:
                    break;
            }
            if (json && json != 'all') {
                var part = params.get('p');
                switch (part) {
                    case 'all':
                    case 'akstn':
                    case 'hmyrwn':
                    case 'seion':
                    case 'dakuon':
                    case 'yoon':
                        json += '/' + part;
                        break;
                    default:
                        break;
                }
            }
            if (!json) { location.href = '/'; }
            // 程序初始化
            var app = this;
            $.ajax({
                url: '/json/' + json + '.json',
                type: 'get',
                dataType: 'json',
                success: function (result) {
                    // 标题
                    $('title').text(result.title);
                    // 数据
                    app.hiragana = result.hiragana;
                    app.katakana = result.katakana;
                    app.vowel = result.vowel;
                    app.now = -1;
                    app.oView = document.querySelector('.view');
                    app.oView_main = document.querySelector('.view-main');
                    app.oView_anthor = document.querySelector('.view-anthor');
                    app.oVowel = document.querySelector('.view-vowel');
                    app.oBtn_change = document.querySelector('.btn-change');
                    app.initEvent();
                    app.renderView();
                }
            });
        },
        initEvent: function () {
            this.oView.addEventListener('click', this.showMore.bind(this), false);
            this.oBtn_change.addEventListener('click', this.renderView.bind(this), false);
        },
        randomIndex: function () {
            var nRandom = Math.floor(Math.random() * this.hiragana.length);
            if (nRandom != this.now) {
                this.now = nRandom;
                return nRandom + '';
            } else {
                return this.randomIndex();
            }
        },
        renderView: function () {
            var index = this.randomIndex();
            // 拗音加宽显示
            if (this["hiragana"][index].length == 2) {
                document.getElementsByClassName('view-main')[0].classList.add('yoon');
            } else {
                document.getElementsByClassName('view-main')[0].classList.remove('yoon');
            }
            var key = this.type;
            if (key == 'all') {
                key = Math.floor(Math.random() * 2) == 0 ? 'hiragana' : 'katakana';
            }
            var anthor = (key == "hiragana") ? 'katakana' : 'hiragana';
            this.hideMore();
            this.oView_main.innerHTML = this[key][index];
            this.oView_anthor.innerHTML = this[anthor][index];
            this.oVowel.innerHTML = this.vowel[index];
            // 发音
            this.oAudio = new Audio('/audio/' + this.hiragana[index] + '.mp3');
        },
        showMore: function () {
            this.oView_anthor.classList.remove('hide');
            this.oVowel.classList.remove('hide');
            // 发音
            this.oAudio.currentTime = 0;
            this.oAudio.play();
        },
        hideMore: function () {
            this.oView_anthor.classList.add('hide');
            this.oVowel.classList.add('hide');
        }
    };

    page.init();
})(window);