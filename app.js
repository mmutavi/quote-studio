const KEY='quote.studio.draft.v2',$=s=>document.querySelector(s),body=$('#lines');let entries=[],saveTimer;
const fields=['business','client','email','valid','issued','tax','deposit','terms','currency'];
function safe(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function currency(){return $('#currency').value||'USD'}
function fmt(n){return new Intl.NumberFormat(undefined,{style:'currency',currency:currency()}).format(Number(n)||0)}
function draft(){return Object.fromEntries(fields.map(k=>[k,$('#'+k).value]).concat([['entries',entries]]))}
function persist(manual=false){localStorage.setItem(KEY,JSON.stringify(draft()));$('#save-state').textContent='Saved just now';if(manual)toast('Draft saved on this device')}
function scheduleSave(){clearTimeout(saveTimer);$('#save-state').textContent='Saving…';saveTimer=setTimeout(()=>persist(),350)}