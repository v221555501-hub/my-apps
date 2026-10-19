/* Shared scheduling model. Time zone for timed calendar events: Asia/Taipei. */
const Schedule={
  date(value){if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const d=new Date(value+'T12:00:00Z');return !isNaN(d)&&d.toISOString().slice(0,10)===value},
  time(value){return typeof value==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(value)},
  normalize(t){const x={...t};x.startDate=x.startDate||x.date;x.endDate=x.endDate||x.date;x.date=x.endDate;x.allDay=typeof x.allDay==='boolean'?x.allDay:true;x.startTime=x.allDay?'':(x.startTime||'');x.endTime=x.allDay?'':(x.endTime||'');return x},
  valid(t){if(!this.date(t.startDate)||!this.date(t.endDate)||t.endDate<t.startDate)return false;if(t.allDay)return true;return this.time(t.startTime)&&this.time(t.endTime)&&t.endDate+'T'+t.endTime>t.startDate+'T'+t.startTime},
  covers(t,date){return date>=(t.startDate||t.date)&&date<=(t.endDate||t.date)},
  overdue(t){if(t.status==='已完成')return false;const end=(t.endDate||t.date)+'T'+(t.allDay===false?t.endTime+':00':'23:59:59');return new Date(end+'+08:00').getTime()<Date.now()},
  label(t){const start=t.startDate||t.date,end=t.endDate||t.date;return t.allDay===false?`${start} ${t.startTime} → ${end} ${t.endTime}`:start===end?`${start} · 全天`:`${start} → ${end} · 全天`},
  google(t){t=this.normalize(t);if(!this.valid(t))throw Error('開始或截止日期時間無效');if(t.allDay){const end=new Date(t.endDate+'T12:00:00');end.setDate(end.getDate()+1);const date=`${end.getFullYear()}-${String(end.getMonth()+1).padStart(2,'0')}-${String(end.getDate()).padStart(2,'0')}`;return{start:{date:t.startDate},end:{date}}}return{start:{dateTime:t.startDate+'T'+t.startTime+':00+08:00',timeZone:'Asia/Taipei'},end:{dateTime:t.endDate+'T'+t.endTime+':00+08:00',timeZone:'Asia/Taipei'}}},
  templateDates(t){const event=this.google(t);if(t.allDay!==false)return event.start.date.replaceAll('-','')+'/'+event.end.date.replaceAll('-','');const compact=s=>s.replaceAll('-','').replaceAll(':','')+'00';return compact(t.startDate+'T'+t.startTime)+'/'+compact(t.endDate+'T'+t.endTime)}
};
