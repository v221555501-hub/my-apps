/* Each sidebar item owns its content, filters, add action and deep link. */
const viewDefinitions=C?{
 '營運總覽':{slug:'overview',title:'社區營運總覽',description:'掌握整體待辦與近期進度，再進入各工作分頁。',list:'近期未完成事項',add:'新增紀錄',kind:'overview'},
 '資料夾待辦':{slug:'folders',title:'資料夾待辦',description:'選擇資料夾，只查看這個資料夾的事項。',list:'資料夾內的紀錄',add:'新增待辦',kind:'folders'},
 '設備修繕':{slug:'repairs',title:'設備修繕',description:'只顯示設備檢修、廠商聯絡與修繕進度。',list:'修繕案件',add:'新增修繕案件',kind:'repairs',cat:'廠商與修繕'},
 '會議決議':{slug:'meetings',title:'會議決議',description:'追蹤管委會決議及所有權人會議的執行情形。',list:'會議與決議紀錄',add:'新增會議決議',kind:'meetings',cat:'會議決議'},
 '行事曆':{slug:'calendar',title:'社區行事曆',description:'查看日期、指定時間、週末與假日；點選日期查看當天事項。',list:'月曆',add:'新增行程',kind:'calendar'},
 '提醒清單':{slug:'reminders',title:'提醒清單',description:'只列出逾期、今天與未來七天需要處理的未完成事項。',list:'待處理提醒',add:'新增提醒',kind:'reminders'}
}:{
 '我的待辦':{slug:'tasks',title:cfg.title,description:cfg.subtitle,list:'我的待辦清單',add:'新增待辦',kind:'overview'},
 '今日安排':{slug:'today',title:'今日安排',description:'只顯示今天進行中的事項，包含跨日計畫。',list:'今天的事項',add:'新增今日待辦',kind:'today'},
 '月曆':{slug:'calendar',title:'我的月曆',description:'點選日期，查看那一天的事項與時間安排。',list:'月曆',add:'新增行程',kind:'calendar'},
 '已完成':{slug:'completed',title:'已完成',description:'已完成的事項集中保存在這裡，可隨時重新開啟。',list:'已完成事項',add:'新增待辦',kind:'completed'}
};
const emptyView=(text)=>`<div class="empty">✧<br>${esc(text)}</div>`;
const originalRender=render;
const sectionSummary=document.createElement('div');sectionSummary.id='section-summary';sectionSummary.className='section-summary';document.querySelector('.layout').before(sectionSummary);
function repairCard(t){return `<div class="record-context repair-context"><span>設備修繕</span><strong>${esc(t.contact||'尚未指定廠商／負責人')}</strong><span>${esc(t.community)}</span></div>`+card(t)}
function meetingCard(t){return `<div class="record-context meeting-context ${t.cat==='所有權人會議'?'owner':''}"><span>${esc(t.cat)}</span><strong>${t.status==='已完成'?'已結案':'決議執行追蹤'}</strong><span>${esc(t.contact||'尚未指定負責人')}</span></div>`+card(t)}
function groupTasks(title,list){return `<section class="reminder-group"><h3>${title}<span>${list.length} 筆</span></h3>${list.length?list.map(card).join(''):emptyView('這個區間沒有待處理事項')}</section>`}
render=function(){
 originalRender();const definition=viewDefinitions[view]||Object.values(viewDefinitions)[0],kind=definition.kind;document.body.dataset.view=kind;
 $('#heading').textContent=definition.title;document.querySelector('header .muted').textContent=definition.description;$('#add').textContent='＋ '+definition.add;
 document.querySelector('.hero').hidden=kind!=='overview';$('#stats').hidden=kind!=='overview';$('#communities').hidden=!C||!['overview','folders'].includes(kind);
 const right=document.querySelector('.right');right.hidden=!['overview','folders'].includes(kind);document.querySelector('.layout').classList.toggle('single-view',right.hidden);
 document.querySelectorAll('[data-nav]').forEach(button=>{const active=button.dataset.nav===view;button.classList.toggle('active',active);if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current')});
 const categorySelect=$('#category');categorySelect.hidden=kind==='repairs'||kind==='calendar'&&!selected;const categoryValues=kind==='meetings'?['會議決議','所有權人會議']:cfg.cats;categorySelect.innerHTML='<option value="">所有分類</option>'+opts(categoryValues,category);
 const isCalendar=kind==='calendar';$('#search').hidden=isCalendar&&!selected;$('#status').hidden=isCalendar&&!selected;$('#priority').hidden=isCalendar&&!selected;$('#clear').hidden=false;
 $('#search').placeholder=kind==='repairs'?'搜尋設備、廠商、修繕進度…':kind==='meetings'?'搜尋會議、決議、執行內容…':'搜尋這個分頁的事項…';
 let list=filtered();$('#list-title').textContent=definition.list;
 if(kind==='overview'){
   if(C){list=list.filter(t=>t.status!=='已完成').slice(0,6);$('#records').innerHTML=list.length?list.map(card).join(''):emptyView('近期沒有待處理事項')}
   sectionSummary.hidden=true;
 }else if(kind==='calendar'){
   sectionSummary.hidden=true;$('#records').innerHTML=calendar(true)+(selected?`<section class="day-agenda"><h3>${esc(selected)} 的事項</h3>${list.length?list.map(card).join(''):emptyView('這一天沒有符合條件的事項')}</section>`:'<p class="calendar-prompt">請點選月曆上的日期，查看當日清單。此頁不會混列其他日期的紀錄。</p>');
 }else if(kind==='reminders'){
   sectionSummary.hidden=true;list=list.filter(t=>t.status!=='已完成');const overdue=list.filter(t=>Schedule.overdue(t)),now=list.filter(t=>!Schedule.overdue(t)&&Schedule.covers(t,today)),soon=list.filter(t=>!Schedule.overdue(t)&&!Schedule.covers(t,today));$('#records').innerHTML=groupTasks('逾期待處理',overdue)+groupTasks('今天',now)+groupTasks('未來七天',soon);
 }else{
   $('#records').innerHTML=list.length?list.map(kind==='repairs'?repairCard:kind==='meetings'?meetingCard:card).join(''):emptyView(kind==='repairs'?'目前沒有修繕案件':kind==='meetings'?'目前沒有會議決議':kind==='folders'?'這個資料夾沒有符合條件的事項':'目前沒有符合條件的事項');
   sectionSummary.hidden=!['repairs','meetings'].includes(kind);
   if(!sectionSummary.hidden){const pending=list.filter(t=>t.status!=='已完成'),overdue=pending.filter(t=>Schedule.overdue(t));sectionSummary.innerHTML=`<div><small>${kind==='repairs'?'修繕案件':'會議紀錄'}</small><strong>${list.length}</strong></div><div><small>追蹤中</small><strong>${pending.length}</strong></div><div><small>已逾期</small><strong>${overdue.length}</strong></div>`}
 }
 if(kind==='folders')$('#list-title').textContent=community?'資料夾：'+community:'全部資料夾的紀錄';
};
const originalEdit=edit;
edit=function(id){originalEdit(id);if(id)return;const definition=viewDefinitions[view];if(definition?.cat)$('#form').elements.cat.value=definition.cat;if(view==='已完成')$('#form').elements.status.value='已完成';$('#dialog-title').textContent=definition?.add||'新增事項';};
function switchView(next,{keepFolder=false,updateUrl=true,scroll=true}={}){
 if(!viewDefinitions[next])next=cfg.nav[0];const folder=keepFolder?community:'';view=next;query=status=category=priority=selected='';community=folder;$('#search').value='';for(const id of ['status','category','priority'])$('#'+id).value='';if(C)$('#community').value=community;
 if(updateUrl)history.replaceState(null,'','#'+viewDefinitions[view].slug);render();if(scroll)window.scrollTo({top:0,behavior:'instant'});
}
function routeView(){const slug=location.hash.slice(1),match=Object.entries(viewDefinitions).find(([,definition])=>definition.slug===slug);return match?match[0]:cfg.nav[0]}
document.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(C&&button.dataset.community){switchView('資料夾待辦',{keepFolder:true,scroll:false})}if(C&&button.dataset.allFolders)switchView('資料夾待辦',{scroll:false});});
window.addEventListener('hashchange',()=>switchView(routeView(),{updateUrl:false}));
switchView(routeView(),{scroll:false});
