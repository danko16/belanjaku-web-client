import React, { useEffect, useState } from 'react';
import './css/countdown.css';

const Countdown = () => {
  const [hours, setHours] = useState('24');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  useEffect(() => {
    const countdown = setInterval(() => {
      let parseHours = parseInt(hours);
      let parseMinutes = parseInt(minutes);
      let parseSeconds = parseInt(seconds);

      let totalSeconds = parseHours * 60 * 60 + parseMinutes * 60 + parseSeconds;

      if (totalSeconds > 0) {
        --parseSeconds;
        if (parseMinutes >= 0 && parseSeconds < 0) {
          parseSeconds = 59;
          --parseMinutes;
        }

        if (parseHours >= 0 && parseMinutes < 0) {
          parseMinutes = 59;
          --parseHours;
        }

        if (parseHours < 10) {
          setHours('0' + parseHours.toString());
        } else {
          setHours(parseHours.toString());
        }

        if (parseMinutes < 10) {
          setMinutes('0' + parseMinutes.toString());
        } else {
          setMinutes(parseMinutes.toString());
        }

        if (parseSeconds < 10) {
          setSeconds('0' + parseSeconds.toString());
        } else {
          setSeconds(parseSeconds.toString());
        }
      }
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [hours, minutes, seconds]);
  return (
    <div className="countdown">
      <div className="bloc-time hours">
        <div className="figure hours hours-1">
          <span className="top">{hours.charAt(0)}</span>
          <span className="top-back">
            <span>{hours.charAt(0)}</span>
          </span>
          <span className="bottom">{hours.charAt(0)}</span>
          <span className="bottom-back">
            <span>{hours.charAt(0)}</span>
          </span>
        </div>

        <div className="figure hours hours-2">
          <span className="top">{hours.charAt(1)}</span>
          <span className="top-back">
            <span>{hours.charAt(1)}</span>
          </span>
          <span className="bottom">{hours.charAt(1)}</span>
          <span className="bottom-back">
            <span>{hours.charAt(1)}</span>
          </span>
        </div>
      </div>

      <span className="dot-separator">:</span>

      <div className="bloc-time min">
        <div className="figure min min-1">
          <span className="top">{minutes.charAt(0)}</span>
          <span className="top-back">
            <span>{minutes.charAt(0)}</span>
          </span>
          <span className="bottom">{minutes.charAt(0)}</span>
          <span className="bottom-back">
            <span>{minutes.charAt(0)}</span>
          </span>
        </div>

        <div className="figure min min-2">
          <span className="top">{minutes.charAt(1)}</span>
          <span className="top-back">
            <span>{minutes.charAt(1)}</span>
          </span>
          <span className="bottom">{minutes.charAt(1)}</span>
          <span className="bottom-back">
            <span>{minutes.charAt(1)}</span>
          </span>
        </div>
      </div>

      <span className="dot-separator">:</span>

      <div className="bloc-time sec">
        <div className="figure sec sec-1">
          <span className="top">{seconds.charAt(0)}</span>
          <span className="top-back">
            <span>{seconds.charAt(0)}</span>
          </span>
          <span className="bottom">{seconds.charAt(0)}</span>
          <span className="bottom-back">
            <span>{seconds.charAt(0)}</span>
          </span>
        </div>

        <div className="figure sec sec-2">
          <span className="top">{seconds.charAt(1)}</span>
          <span className="top-back">
            <span>{seconds.charAt(1)}</span>
          </span>
          <span className="bottom">{seconds.charAt(1)}</span>
          <span className="bottom-back">
            <span>{seconds.charAt(1)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
