// The DOM HUD: crosshair, hit marker, ammo, score and the one overlay panel. It never touches
// the simulation; main.js pushes numbers in and reads the play callback out.
const COPY = {
  start: {
    title: 'Neon Sector Ops',
    copy: 'A neon cyberpunk tactical range. Two teams, short rounds, one rifle. Click to play.',
    action: 'Click to play',
  },
  paused: {
    title: 'Neon Sector Ops',
    copy: 'Paused. Click to resume.',
    action: 'Click to resume',
  },
  end: {
    title: 'Sector cleared',
    copy: 'Every drone is down.',
    action: 'Play again',
  },
};

export function createHud() {
  const overlay = document.getElementById('overlay');
  const title = document.getElementById('overlay-title');
  const copy = document.getElementById('overlay-copy');
  const play = document.getElementById('play');
  const ammo = document.getElementById('ammo');
  const ammoMag = document.getElementById('ammo-mag');
  const ammoReserve = document.getElementById('ammo-reserve');
  const scoreValue = document.getElementById('score-value');
  const hitmarker = document.getElementById('hitmarker');
  let hitTimer = 0;
  let lastMag = -1;
  let lastReserve = -1;
  let lastScore = -1;

  return {
    setAmmo(mag, reserve) {
      if (mag === lastMag && reserve === lastReserve) return;
      lastMag = mag;
      lastReserve = reserve;
      ammoMag.textContent = String(mag);
      ammoReserve.textContent = `/ ${reserve}`;
      ammo.classList.toggle('empty', mag === 0);
    },
    setScore(value) {
      if (value === lastScore) return;
      lastScore = value;
      scoreValue.textContent = String(value);
    },
    hitMarker(killed, holdMs = 90) {
      hitmarker.classList.add('on');
      hitmarker.style.transform = killed ? 'translate(-50%, -50%) rotate(45deg) scale(1.25)' : '';
      clearTimeout(hitTimer);
      hitTimer = setTimeout(() => {
        hitmarker.classList.remove('on');
        hitmarker.style.transform = '';
      }, holdMs);
    },
    showOverlay(mode, score) {
      const text = COPY[mode];
      title.textContent = text.title;
      copy.textContent = mode === 'end' ? `${text.copy} You scored ${score}.` : text.copy;
      play.textContent = text.action;
      overlay.hidden = false;
      play.focus();
    },
    hideOverlay() {
      overlay.hidden = true;
    },
    onPlay(handler) {
      play.addEventListener('click', handler);
    },
  };
}
