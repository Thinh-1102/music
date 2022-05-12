const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'SETTING BY ME'

const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player');
const progress = $('.progress');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')
const playList = $('.playlist')
const volume = $('.volume');
const columeIcon = $('.volume-icon');
const volumeMute = $('.volume-icon-off');
const volumeDown = $('.volume-icon-down');
const volumeUp = $('.volume-icon-up')
const app = {
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    currenIndex: 0,
    settingSave: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setting: function (key, value) {
        this.settingSave[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.settingSave))
    },
    listSong: [
        {
            name: "Cứ Chill Thôi",
            singer: ["Chillies", "Suni Hạ Linh", "Rhymastic"],
            path: "./assets/music/listSong1/song1.mp3",
            image: "./assets/img/music/listSong1/song1.jpg"
        },
        {
            name: "Crush",
            singer: ["WN", "Vani", "An An"],
            path: "./assets/music/listSong1/song2.mp3",
            image: "./assets/img/music/listSong1/song2.jpg"
        },
        {
            name: "Vô Tình",
            singer: ["Xesi", "Hoaprox"],
            path: "./assets/music/listSong1/song3.mp3",
            image: "./assets/img/music/listSong1/song3.jpg"
        },
        {
            name: "Because I'm Stupid",
            singer: ["SS501"],
            path: "./assets/music/listSong1/song4.flac",
            image: "./assets/img/music/listSong1/song4.jpg"
        },
        {
            name: "Mama Boy",
            singer: ["AMEE"],
            path: "./assets/music/listSong1/song5.mp3",
            image: "./assets/img/music/listSong1/song5.jpg"
        },
        {
            name: "Cửu Vĩ Hồ",
            singer: ["Yun", "Dr A"],
            path: "./assets/music/listSong1/song6.mp3",
            image: "./assets/img/music/listSong1/song6.jpg"
        },
        {
            name: "Anh Đã Quen Với Cô Đơn",
            singer: ["Soobin Hoàng Sơn"],
            path: "./assets/music/listSong1/song7.mp3",
            image: "./assets/img/music/listSong1/song7.jpg"
        },
        {
            name: "Túy Âm",
            singer: ["Xesi", "Masew", "Nhật Nguyễn"],
            path: "./assets/music/listSong1/song8.mp3",
            image: "./assets/img/music/listSong1/song8.jpg"
        },
        {
            name: "Kém Duyên",
            singer: ["Rum", "NIT", "Masew"],
            path: "./assets/music/listSong1/song9.mp3",
            image: "./assets/img/music/listSong1/song9.jpg"
        },
        {
            name: "Tình Bạn Diệu Kì",
            singer: ["AMEE", "Ricky Star", "Lăng LD"],
            path: "./assets/music/listSong1/song10.flac",
            image: "./assets/img/music/listSong1/song10.jpg"
        },
        {
            name: "Em Có Nghe",
            singer: ["Kha"],
            path: "./assets/music/listSong1/song11.mp3",
            image: "./assets/img/music/listSong1/song11.jpg"
        },
        {
            name: "Lạc Trôi",
            singer: ["Sơn Tùng M-TP"],
            path: "./assets/music/listSong1/song12.mp3",
            image: "./assets/img/music/listSong1/song12.jpg"
        },
        {
            name: "Một Năm Mới Bình An",
            singer: ["Sơn Tùng MTP"],
            path: "./assets/music/listSong1/song13.mp3",
            image: "./assets/img/music/listSong1/song13.jpg"
        },
        {
            name: "Hongkong1 (Official Version)",
            singer: ["Nguyễn Trọng Tài", "San Ji", "Double X"],
            path: "./assets/music/listSong1/song14.mp3",
            image: "./assets/img/music/listSong1/song14.jpg"
        },
        {
            name: "Gác Lại Âu Lo",
            singer: ["Da LAB", "Miu Lê"],
            path: "./assets/music/listSong1/song15.mp3",
            image: "./assets/img/music/listSong1/song15.jpg"
        },
        {
            name: "Chạy Ngay Đi",
            singer: ["Sơn Tùng MTP"],
            path: "./assets/music/listSong1/song16.mp3",
            image: "./assets/img/music/listSong1/song16.jpg"
        },
        {
            name: "Cùng Anh",
            singer: ["Ngọc Dolil", "Hagi", "STee"],
            path: "./assets/music/listSong1/song17.mp3",
            image: "./assets/img/music/listSong1/song17.jpg"
        },
        {
            name: "Hãy Trao Cho Anh",
            singer: ["Sơn Tùng MTP"],
            path: "./assets/music/listSong1/song18.mp3",
            image: "./assets/img/music/listSong1/song18.jpg"
        },
        {
            name: "Tộc Ca",
            singer: ["Phúc Du", "SONBEAT"],
            path: "./assets/music/listSong1/song19.mp3",
            image: "./assets/img/music/listSong1/song19.jpg"
        },
        {
            name: "Thiên Lý Ơi",
            singer: ["Jack", "Bikay"],
            path: "./assets/music/listSong1/song20.mp3",
            image: "./assets/img/music/listSong1/song20.jpg"
        },
        {
            name: "Phố Đã Lên Đèn",
            singer: ["Phố Đã Lên Đèn"],
            path: "./assets/music/listSong1/song21.mp3",
            image: "./assets/img/music/listSong1/song21.jpg"
        },
    ],
    render: function () {
        var htmls = this.listSong.map((song, index) => {
            return `
            <div class="song ${index === this.currenIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        })
        playList.innerHTML = htmls.join('')
    },
    defineProerties: function () {
        Object.defineProperty(this, 'currenSong', {
            get: function () {
                return this.listSong[this.currenIndex]
            }
        })
    },
    handleEvent: function () {
        // xử lý phóng to thu nhỏ
        const cdWidth = cd.offsetWidth;

        // xu ly CD quay va dung

        const cdThunbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg' }
        ], {
            duration: 10000,//10 giay
            iterations: Infinity
        })
        cdThunbAnimate.pause()
        document.onscroll = function () {
            const scrollTop = document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth
        }

        // thay đổi âm lượng theo thanh volume
        volume.onchange = function (e) {
            const seekVolume = e.target.value / 100
            audio.volume = seekVolume;    
        }

        // xử lý nút play
        playBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }

            // khi song play
            audio.onplay = function () {
                player.classList.add('playing');
                app.isPlaying = true;
                cdThunbAnimate.play()
            }

            // khi song pause
            audio.onpause = function () {
                player.classList.remove('playing');
                app.isPlaying = false;
                cdThunbAnimate.pause()
            }
            // khi tiến độ bài hát thay đổi
            audio.ontimeupdate = function () {
                if (audio.duration) {
                    var percentCurren = (audio.currentTime / audio.duration) * 100;
                    progress.value = percentCurren
                } else {
                    progress.value = 0
                }
            }

            // thay đổi tiến độ theo thanh chạy
            progress.onchange = function (e) {
                const seekTime = (e.target.value * audio.duration) / 100
                audio.currentTime = seekTime
            }

            // khi bam nut next
            btnNext.onclick = function () {
                if (app.isRandom) {
                    app.randomSong()
                } else {
                    app.nextSong()
                }
                audio.play()
                app.render()
                app.scroollToactiveToSong()
            }

            // khi bam nut prev
            btnPrev.onclick = function () {
                if (app.isRandom) {
                    app.randomSong()
                } else {
                    app.prevSong()
                }
                audio.play()
                app.render()
                app.scroollToactiveToSong()
            }

            // khi bam randomSong
            btnRandom.onclick = function () {
                app.isRandom = !app.isRandom;
                app.setting('isRandom', app.isRandom)
                btnRandom.classList.toggle('active', app.isRandom)
            }

            // khi bam nut repeat
            btnRepeat.onclick = function (e) {
                app.isRepeat = !app.isRepeat;
                app.setting('isRepeat', app.isRepeat)
                btnRepeat.classList.toggle('active', app.isRepeat)
            }

            //khi thanh audio full tu chuyen bai hat
            audio.onended = function () {
                if (app.isRepeat) {
                    audio.play()
                } else {
                    btnNext.click()
                }
            }
            playList.onclick = function (e) {
                const songNode = e.target.closest('.song:not(.active)')
                if (songNode || e.target.closest('.option')) {
                    // xu ly khi click vao song
                    if (songNode && !e.target.closest('.option')) {
                        app.currenIndex = Number(songNode.dataset.index);
                        app.loadCurrenSong()
                        audio.play()
                        app.render()
                    }
                    // xu ly khi click vao song
                    if (e.target.closest('.option')) {
                        console.log('asd')
                    }
                }
            }
        }
    },
    loadCurrenSong: function () {
        heading.textContent = this.currenSong.name;
        cdThumb.style.backgroundImage = `url(${this.currenSong.image})`;
        audio.src = this.currenSong.path;
    },
    loadSetting: function () {
        this.isRandom = this.settingSave.isRandom
        this.isRepeat = this.settingSave.isRepeat
    },
    nextSong: function () {
        this.currenIndex++
        if (this.currenIndex > this.listSong.length) {
            this.currenIndex = 0
        }
        this.loadCurrenSong()
    },
    prevSong: function () {
        this.currenIndex--;
        if (this.currenIndex < 0) {
            this.currenIndex = this.listSong.length - 1
        }
        this.loadCurrenSong()
    },
    randomSong: function () {
        let newIndex = this.currenIndex;
        do {
            newIndex = Math.floor(Math.random() * this.listSong.length)
        } while (newIndex === this.currenIndex);
        this.currenIndex = newIndex
        this.loadCurrenSong()
    },
    scroollToactiveToSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: "smooth", block: "end", inline: "nearest"
            })
        }, 300)
    },
    start: function () {
        this.loadSetting()
        this.defineProerties()
        this.handleEvent()
        this.loadCurrenSong()
        this.render()

        btnRepeat.classList.toggle('active', this.isRepeat)
        btnRandom.classList.toggle('active', this.isRandom)
    }
}
app.start()