const timer = new CountDownTimer(
  { startHour: 10, startMinute: 10, startSecond: 10 },
  { endHour: 12, endMinute: 12, endSecond: 12 }
);

function start() {
  timer.start(function (val) {
    console.log(val);
  });
}

function pause() {
  timer.pause();
}

function stop() {
  timer.stop();
}

function resume() {
  timer.resume(function (val) {
    console.log(val);
  });
}
