export default class Player {
    player = '[data-player]';
    controls = '[data-player-controls]';
    play = '[data-player-controls-play]';
    prev = '[data-player-controls-prev]';
    next = '[data-player-controls-next]';
    audioPassed = '[data-player-timeline-passed]';
    audioDuration = '[data-player-timeline-duration]';
    progressbar = '[data-player-timeline-progressbar]';

    constructor() {
        this.bindEvents();
    }

    audioPlay() {
        let $audio = document.getElementById("audio");

        if ($audio.paused) {
            $audio.play();
            this.timePassed();
        } else {
            $audio.pause();
        }
    }

    // setTime(time) {
    //     let $minutes = Math.floor(time / 60);
    //     let $seconds = Math.floor(time - ($minutes * 60));
    //     let $timeString = $minutes + ":" + $seconds;
    // }

    timePassed() {
        let self = this;
        let $audio = document.getElementById("audio");

        $audio.ontimeupdate = function() {
            let $audioCurrentTime = this.currentTime;
            let $audioDuration = this.duration;

            let $minutes = Math.floor(this.currentTime / 60);
            let $seconds = Math.floor(this.currentTime - ($minutes * 60));
            let $timeString = $minutes + ":" + $seconds;

            $(self.audioPassed).text($timeString);

            let $progression = Math.floor($audioCurrentTime / $audioDuration * 100);
            document.getElementById("progressbar").style.width = $progression + "%";

        };
    }

    bindEvents() {
        let self = this;
        let $audio = document.getElementById("audio");

        $audio.oncanplay = function() {
            let $minutes = Math.floor(this.duration / 60);
            let $seconds = Math.floor(this.duration - ($minutes * 60));
            let $timeString = $minutes + ":" + $seconds;

            $(self.audioDuration).text($timeString);
        };

        $(this.play).on("click", function(e) {
            e.preventDefault();
            self.audioPlay();
        });

        $(this.progressbar).on("click", function(e) {
            e.preventDefault();
            let $audio = document.getElementById("audio");
            let timeLinePos = $(this).offset().left;
            let timeLineWidth = $(this).width();
            let position = e.pageX - timeLinePos;
            let percents = position / timeLineWidth * 100;
            let trackPosition = $audio.duration / 100 * percents;

            $audio.currentTime = trackPosition;
        });

    }
}