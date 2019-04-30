let Sound = {};

let $skill_voice_el = null;

/**
 * 声音播放
 * @param e
 */
import getUuid from './uuid'

Sound.play = function (e) {
  let $currentPlayEl = e.currentTarget;
  let uuid = getUuid();
  let $soundAry = document.querySelectorAll('.j_sound');
  for (let i = 0; i < $soundAry.length; i++) {
    $soundAry[i].classList.remove('is-play');
  }
  let id_audio = document.getElementById('J_Skill_Voice');
  id_audio && id_audio.remove();
  $skill_voice_el = document.createElement('audio');
  $skill_voice_el.setAttribute('src', $currentPlayEl.dataset.src);
  $skill_voice_el.setAttribute('id', 'J_Skill_Voice');
  $skill_voice_el.setAttribute('data-play-id', uuid);
  document.getElementsByTagName('body')[0].appendChild($skill_voice_el);
  $skill_voice_el.play();
  $currentPlayEl && $currentPlayEl.classList.add('is-play');
  $currentPlayEl.dataset.playId = uuid;
  $skill_voice_el.onended = () => {
    $currentPlayEl && $currentPlayEl.classList.remove('is-play');
  };
}

/**
 * 清除播放控件
 */
Sound.destroy = function () {
  if ($skill_voice_el) {
    let current_play_el = document.querySelector("[data-play-id=\"" + $skill_voice_el.dataset.playId + "\"]");
    current_play_el && current_play_el.classList.remove('is-play');
    $skill_voice_el.remove();
  }
};


export default Sound