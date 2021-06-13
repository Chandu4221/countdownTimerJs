class CountDownTimer {
  #endTime = null;
  #interval = null;
  #currentTime = null;
  #remainingTime = null;
  #isStarted = false;
  #isPaused = false;
  #isRunning = false;

  #intervalFunction = (callback) => {
    this.#currentTime = new Date().getTime();
    this.#remainingTime = this.#getTimeRemaining(
      this.#currentTime,
      this.#endTime
    );

    if (this.#currentTime >= this.#endTime) clearInterval(this.#interval);
    callback(this.#remainingTime);
  };

  constructor({ endHour = 0, endMinute = 0, endSecond = 0 }) {
    this.#endTime = new Date().setHours(endHour, endMinute, endSecond);
  }

  start(callback) {
    if (!this.#isStarted || (this.#isRunning && this.#isPaused)) {
      this.#interval = setInterval(
        () => this.#intervalFunction(callback),
        1000
      );
    }
    this.#isRunning = true;
    this.#isStarted = true;
  }

  pause() {
    if (this.#isRunning && !this.#isPaused) clearInterval(this.#interval);
    this.#isPaused = true;
  }
  resume(callback) {
    if (this.#isRunning && this.#isPaused) {
      this.start(callback);
      this.#isPaused = false;
    }
  }

  stop() {
    clearInterval(this.#interval);
    this.#isRunning = false;
    this.#isStarted = false;
  }

  reset() {
    this.#endTime = null;
    this.#interval = null;
    this.#currentTime = null;
    this.#remainingTime = null;
    clearInterval(this.#interval);
  }

  #getTimeRemaining(startTime, endTime) {
    const totalTimeInMilliSeconds = new Date(endTime) - new Date(startTime);
    const seconds = Math.floor((totalTimeInMilliSeconds / 1000) % 60);
    const minutes = Math.floor((totalTimeInMilliSeconds / 1000 / 60) % 60);
    const hours = Math.floor((totalTimeInMilliSeconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalTimeInMilliSeconds / (1000 * 60 * 60 * 24));

    return {
      totalTimeInMilliSeconds,
      days,
      hours,
      minutes,
      seconds,
    };
  }
}
