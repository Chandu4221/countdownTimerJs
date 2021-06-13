"use strict";

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}

function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}

function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return fn;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}

function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError(
      "attempted to " + action + " private field on non-instance"
    );
  }
  return privateMap.get(receiver);
}

function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}

var _startTime = /*#__PURE__*/ new WeakMap();

var _endTime = /*#__PURE__*/ new WeakMap();

var _interval = /*#__PURE__*/ new WeakMap();

var _currentTime = /*#__PURE__*/ new WeakMap();

var _remainingTime = /*#__PURE__*/ new WeakMap();

var _isStarted = /*#__PURE__*/ new WeakMap();

var _isPaused = /*#__PURE__*/ new WeakMap();

var _isRunning = /*#__PURE__*/ new WeakMap();

var _intervalFunction = /*#__PURE__*/ new WeakMap();

var _getTimeRemaining = /*#__PURE__*/ new WeakSet();

class CountDownTimer {
  constructor(
    { startHour = 0, startMinute = 0, startSecond = 0 },
    { endHour = 0, endMinute = 0, endSecond = 0 }
  ) {
    _getTimeRemaining.add(this);

    _startTime.set(this, {
      writable: true,
      value: null,
    });

    _endTime.set(this, {
      writable: true,
      value: null,
    });

    _interval.set(this, {
      writable: true,
      value: null,
    });

    _currentTime.set(this, {
      writable: true,
      value: null,
    });

    _remainingTime.set(this, {
      writable: true,
      value: null,
    });

    _isStarted.set(this, {
      writable: true,
      value: false,
    });

    _isPaused.set(this, {
      writable: true,
      value: false,
    });

    _isRunning.set(this, {
      writable: true,
      value: false,
    });

    _intervalFunction.set(this, {
      writable: true,
      value: (callback) => {
        _classPrivateFieldSet(this, _currentTime, new Date().getTime());

        _classPrivateFieldSet(
          this,
          _remainingTime,
          _classPrivateMethodGet(
            this,
            _getTimeRemaining,
            _getTimeRemaining2
          ).call(
            this,
            _classPrivateFieldGet(this, _currentTime),
            _classPrivateFieldGet(this, _endTime)
          )
        );

        if (
          _classPrivateFieldGet(this, _currentTime) >=
          _classPrivateFieldGet(this, _endTime)
        )
          clearInterval(_classPrivateFieldGet(this, _interval));
        callback(_classPrivateFieldGet(this, _remainingTime));
      },
    });

    _classPrivateFieldSet(
      this,
      _startTime,
      new Date().setHours(startHour, startMinute, startSecond)
    );

    _classPrivateFieldSet(
      this,
      _endTime,
      new Date().setHours(endHour, endMinute, endSecond)
    );
  }

  start(callback) {
    if (
      !_classPrivateFieldGet(this, _isStarted) ||
      (_classPrivateFieldGet(this, _isRunning) &&
        _classPrivateFieldGet(this, _isPaused))
    ) {
      _classPrivateFieldSet(
        this,
        _interval,
        setInterval(
          () =>
            _classPrivateFieldGet(this, _intervalFunction).call(this, callback),
          1000
        )
      );
    }

    _classPrivateFieldSet(this, _isRunning, true);

    _classPrivateFieldSet(this, _isStarted, true);
  }

  pause() {
    if (
      _classPrivateFieldGet(this, _isRunning) &&
      !_classPrivateFieldGet(this, _isPaused)
    )
      clearInterval(_classPrivateFieldGet(this, _interval));

    _classPrivateFieldSet(this, _isPaused, true);
  }

  resume(callback) {
    if (
      _classPrivateFieldGet(this, _isRunning) &&
      _classPrivateFieldGet(this, _isPaused)
    ) {
      this.start(callback);

      _classPrivateFieldSet(this, _isPaused, false);
    }
  }

  stop() {
    clearInterval(_classPrivateFieldGet(this, _interval));

    _classPrivateFieldSet(this, _isRunning, false);

    _classPrivateFieldSet(this, _isStarted, false);
  }

  reset() {
    _classPrivateFieldSet(this, _startTime, null);

    _classPrivateFieldSet(this, _endTime, null);

    _classPrivateFieldSet(this, _interval, null);

    _classPrivateFieldSet(this, _currentTime, null);

    _classPrivateFieldSet(this, _remainingTime, null);

    clearInterval(_classPrivateFieldGet(this, _interval));
  }
}

function _getTimeRemaining2(startTime, endTime) {
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
