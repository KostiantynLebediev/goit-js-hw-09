import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysDisp = document.querySelector('[data-days]');
const hoursDisp = document.querySelector('[data-hours]');
const minutesDisp = document.querySelector('[data-minutes]');
const secondsDisp = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate && selectedDate.getTime() > Date.now()) {
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener('click', () => {
  const selectedDate = new Date(dateTimePicker.value);

  const countdownInterval = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const currentTime = new Date().getTime();
    const timeDifference = selectedDate.getTime() - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.info('Countdown finished!');
      return;
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
      return value.toString().padStart(2, '0');
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysDisp.textContent = addLeadingZero(days);
    hoursDisp.textContent = addLeadingZero(hours);
    minutesDisp.textContent = addLeadingZero(minutes);
    secondsDisp.textContent = addLeadingZero(seconds);
  }
});
