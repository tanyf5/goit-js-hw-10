import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const ref = {
  form: document.querySelector('form'),
  delayInput: document.querySelector('.delay input'),
};

function createPromise(res, time) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (res === 'fulfilled') {
        resolve(time);
      } else reject(time);
    }, time);
  });

  promise
    .then(value => {
      iziToast.success({
        message: `Fulfilled promise in ${value}ms`,
        position: 'topCenter',
      });
    })
    .catch(error => {
      iziToast.error({
        message: `Rejected promise in ${error}ms`,
        position: 'topCenter',
      });
    });
}

ref.form.addEventListener('submit', event => {
  event.preventDefault();
  const res = ref.form.querySelector('input[name="state"]:checked').value;

  createPromise(res, ref.delayInput.value * 1000);
  ref.form.reset();
});
