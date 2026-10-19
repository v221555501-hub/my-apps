/* All calendar entry points use Google Calendar and the same local Gmail choice. */
(() => {
 const accountKey='rose-lixu-gmail-local';
 function calendarLink(){const url=new URL('https://calendar.google.com/calendar/render');try{const email=localStorage.getItem(accountKey);if(email)url.searchParams.set('authuser',email)}catch{}return url.href}
 function updateCalendarUI(){
  document.querySelectorAll('nav [data-nav]').forEach(button=>{const definition=viewDefinitions[button.dataset.nav];if(definition?.kind!=='calendar')return;const link=document.createElement('a');link.dataset.gmailCalendar='true';link.className='calendar-nav';link.target='_blank';link.rel='noopener noreferrer';link.textContent='▦　Gmail 行事曆 ↗';button.replaceWith(link)});
  document.querySelectorAll('[data-gmail-calendar]').forEach(link=>link.href=calendarLink());
  document.querySelectorAll('[data-calendar]').forEach(button=>{if(button.textContent!=='加入 Gmail 行事曆')button.textContent='加入 Gmail 行事曆'});
  const mini=document.querySelector('#mini-calendar');if(mini?.parentElement)mini.parentElement.hidden=true;
 }
 const localRender=render;
 render=function(){localRender();const definition=viewDefinitions[view];if(definition?.kind==='calendar'){
   document.querySelector('#heading').textContent='Gmail 的 Google 行事曆';document.querySelector('header .muted').textContent='所有行程統一在 Google 行事曆查看與儲存。';document.querySelector('#list-title').textContent='開啟 Gmail 行事曆';document.querySelector('.toolbar').hidden=true;document.querySelector('#selected-label').innerHTML='';document.querySelector('#records').innerHTML='<section class="gmail-calendar-gateway"><div class="gmail-calendar-symbol">▦</div><h2>使用 Gmail 的 Google 行事曆</h2><p>點下方按鈕，直接查看 Google 行事曆。登入、活動提醒與假日顯示都在 Google 裡設定。</p><a class="primary" data-gmail-calendar target="_blank" rel="noopener noreferrer">開啟 Gmail 行事曆 ↗</a><p class="muted">要把待辦加到行事曆，請按每筆事項的「加入 Gmail 行事曆」，到 Google 頁面確認並儲存。</p></section>';
  }else document.querySelector('.toolbar').hidden=false;
  updateCalendarUI();
 };
 const form=document.querySelector('#gmail-form');if(form){const saveAccount=form.onsubmit;form.onsubmit=function(event){saveAccount.call(this,event);updateCalendarUI()}}
 new MutationObserver(updateCalendarUI).observe(document.querySelector('#records'),{childList:true,subtree:true});
 document.querySelectorAll('.notice').forEach(node=>{if(node.textContent.includes('可安裝 PWA'))node.textContent='可安裝 PWA · 所有行事曆功能統一使用 Gmail 的 Google 行事曆。加入活動需到 Google 確認儲存；不自動同步修改／刪除。'});
 render();
})();
