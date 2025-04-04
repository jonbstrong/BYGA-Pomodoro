class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        this.mode = 'pomodoro';
        
        // Timer durations in minutes
        this.durations = {
            pomodoro: 25,
            shortBreak: 5,
            longBreak: 15
        };

        // DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.modeButtons = {
            pomodoro: document.getElementById('pomodoro'),
            shortBreak: document.getElementById('short-break'),
            longBreak: document.getElementById('long-break')
        };

        // Bind event listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        
        // Mode switch listeners
        Object.keys(this.modeButtons).forEach(mode => {
            this.modeButtons[mode].addEventListener('click', () => this.switchMode(mode));
        });

        // Initialize display
        this.updateDisplay();
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => this.tick(), 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timerId);
        }
    }

    reset() {
        this.pause();
        this.timeLeft = this.durations[this.mode] * 60;
        this.updateDisplay();
    }

    tick() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.updateDisplay();
        } else {
            this.pause();
            this.playNotification();
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update the timer display
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        
        // Update the browser tab title
        document.title = `${timeString} - Pomodoro Timer`;
    }

    switchMode(mode) {
        this.mode = mode;
        this.pause();
        this.timeLeft = this.durations[mode] * 60;
        this.updateDisplay();

        // Update active button
        Object.keys(this.modeButtons).forEach(m => {
            this.modeButtons[m].classList.remove('active');
        });
        this.modeButtons[mode].classList.add('active');
    }

    playNotification() {
        const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 