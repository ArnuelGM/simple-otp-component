const ps = document.querySelectorAll('p');

ps.forEach((p) => {
  p.setAttribute('tabindex', '0');
  p.addEventListener('keyup', (event) => onKeyup(event.key, event.target));
});

function onKeyup(key, eventProducer) {
  if (key === 'Backspace' || key === 'Delete') {
    eventProducer.innerHTML = '';
    return;
  }

  const regex = new RegExp("[a-zA-Z0-9Ññ]");

  if (!regex.test(key) || key.length > 1) return;
  eventProducer.innerHTML = key;
  const isNext = setNextFocus(eventProducer);
  if (!isNext) {
    const code = [...ps].reduce((prev, item) => `${prev}${item.innerText.trim()}`, '')
    submit(code);
  }
}

function setNextFocus(eventProducer) {
  let nextFocusable = null;
  let setNextFocusable = false;
  ps.forEach(p => {
    if (p === eventProducer) setNextFocusable = true;
    if (p !== eventProducer && setNextFocusable) {
      nextFocusable = p;
      setNextFocusable = false;
    }
  });
  if (nextFocusable) {
    nextFocusable.focus();
    return true;
  }
  else return false
}

function submit(code) {
  alert(code);
}