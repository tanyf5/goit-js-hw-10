import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('input#datetime-picker');
const btn = document.querySelector('button');
const divTimer = document.querySelector('.timer');
let userSelectedDate = 0;

const options = {
  //   inline: true,
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate > options.defaultDate) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
      iziToast.error({
        title: 'Attention',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
    }
  },
};

// input.flatpickr(options);
flatpickr(input, options);

btn.addEventListener('click', start);

function start() {
  btn.disabled = true;
  input.disabled = true;

  let numberOfMs = userSelectedDate - options.defaultDate;

  const intervalId = setInterval(() => {
    if (numberOfMs > 0) {
      const time = convertMs(numberOfMs);
      render(time);
      numberOfMs -= 1000;
    } else {
      clearInterval(intervalId);
      btn.disabled = false;
      input.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function render(time) {
  divTimer.querySelector('span[data-days]').innerHTML = addLeadingZero(
    time.days.toString()
  );
  divTimer.querySelector('span[data-hours]').innerHTML = addLeadingZero(
    time.hours.toString()
  );
  divTimer.querySelector('span[data-minutes]').innerHTML = addLeadingZero(
    time.minutes.toString()
  );
  divTimer.querySelector('span[data-seconds]').innerHTML = addLeadingZero(
    time.seconds.toString()
  );
}
