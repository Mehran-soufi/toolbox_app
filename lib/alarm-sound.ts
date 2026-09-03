let alarmAudio: HTMLAudioElement | null = null;


export function playAlarm() {

  if (!alarmAudio) {

    alarmAudio =
      new Audio(
        "/sound/alarm.mp3"
      );

    alarmAudio.loop = true;

  }


  alarmAudio.play();

}



export function stopAlarm() {

  if (alarmAudio) {

    alarmAudio.pause();

    alarmAudio.currentTime = 0;

  }

}