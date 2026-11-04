const KEY='quote.studio.draft.v2',$=s=>document.querySelector(s),body=$('#lines');let entries=[],saveTimer;
const fields=['business','client','email','valid','issued','tax','deposit','terms','currency'];
function safe(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function currency(){return $('#currency').value||'USD'}
function fmt(n){return new Intl.NumberFormat(undefined,{style:'currency',currency:currency()}).format(Number(n)||0)}
function draft(){return Object.fromEntries(fields.map(k=>[k,$('#'+k).value]).concat([['entries',entries]]))}
function persist(manual=false){localStorage.setItem(KEY,JSON.stringify(draft()));$('#save-state').textContent='Saved just now';if(manual)toast('Draft saved on this device')}
function scheduleSave(){clearTimeout(saveTimer);$('#save-state').textContent='Saving…';saveTimer=setTimeout(()=>persist(),350)}
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),1800)}
function addLine(item={name:'',qty:1,rate:0}){entries.push({...item});draw()}
function draw(){body.innerHTML=entries.map((x,i)=>`<tr><td><input class="input" data-field="name" data-i="${i}" value="${safe(x.name)}" placeholder="e.g. Landing page design"></td><td class="numeric"><input class="input" data-field="qty" data-i="${i}" type="number" min="0" step=".25" value="${safe(x.qty)}" style="width:78px;text-align:right"></td><td class="numeric"><input class="input" data-field="rate" data-i="${i}" type="number" min="0" step=".01" value="${safe(x.rate)}" style="width:105px;text-align:right"></td><td class="numeric" id="amount-${i}">${fmt((+x.qty||0)*(+x.rate||0))}</td><td class="line-remove"><button class="btn icon danger" data-remove="${i}" aria-label="Remove estimate item">×</button></td></tr>`).join('');totals()}