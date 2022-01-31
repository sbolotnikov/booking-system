import React, { useEffect, useState } from 'react';

export const useDate = (events, nav) => {
  const [dateDisplay, setDateDisplay] = useState('');
  const [days, setDays] = useState([]);

  const eventForDate = date =>events.find(e => e.date.split('T')[0] === date);
  useEffect(() => {
    // const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // for english need to change weekdays array and change locale in 2 places to 'en-us'
    const weekdays = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
    let dt = new Date();
    const day = dt.getDate();
    const monthCur = dt.getMonth();
    const year = dt.getFullYear();
    dt= new Date(year, monthCur, 1)
    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }
    const month=dt.getMonth();
    console.log(nav,dt,day, month, year)
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString('ru-ru', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    setDateDisplay(`${dt.toLocaleDateString('ru-ru', {month: 'long'})} ${year}`);

    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    const daysArr = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${year}-${(month+1<10)?'0':''}${month + 1}-${(i-paddingDays<10)?'0':''}${i - paddingDays}`;
      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
      } else {
        daysArr.push({
          value: 'padding',
          event: null,
          isCurrentDay: false,
          date: '',
        });
      }
    }

    setDays(daysArr);
  }, [events, nav]);

  return {
    days,
    dateDisplay,
  };
};