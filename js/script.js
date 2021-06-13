const timer = new CountDownTimer(
  { startHour: 15, startMinute: 59, startSecond: 00 },
  { endHour: 16, endMinute: 00, endSecond: 00 }
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
