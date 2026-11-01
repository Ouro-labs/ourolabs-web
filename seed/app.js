'use strict';
document.querySelectorAll('.rush[data-deadline]').forEach(r=>{const d=r.querySelector('[data-dday]');const ms=new Date(r.dataset.deadline)-Date.now();if(!d||isNaN(ms))return;const days=Math.ceil(ms/864e5);
 if(ms<=0){d.textContent='Closed · 마감';return;}
 d.textContent=days<=1?'D-DAY · 오늘 마감':'D-'+(days-1)+' · 마감 임박';if(days<=4)d.classList.add('is-hot');});
document.querySelectorAll('.faq details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.faq details').forEach(o=>{if(o!==d)o.open=false;});}));
const car=document.getElementById('car'),n=document.getElementById('carN'),l=document.getElementById('carL');
if(car){const up=()=>{const max=car.scrollWidth-car.clientWidth;const p=max>0?car.scrollLeft/max:1;const items=car.children.length;const i=Math.min(items,Math.max(1,Math.round(p*(items-1))+1));n.textContent=String(i).padStart(2,'0');l.style.width=(14+p*86)+'%';};car.addEventListener('scroll',up,{passive:true});up();}


const API='https://script.google.com/macros/s/AKfycbxga8Z1FE1Imqpx3AyUYSIYRLslDVyeu4ekXqrKbRcT0qKKhj56nFsF-KjlXQ4ahDqQaA/exec';
const f=document.getElementById('applyForm');
if(f){f.addEventListener('submit',async e=>{e.preventDefault();const m=document.getElementById('applyMsg');m.className='form__msg';
 let bad=null;f.querySelectorAll('[required]').forEach(el=>{const ok=el.type==='checkbox'?el.checked:(el.type==='email'?/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim()):el.value.trim()!=='');el.setAttribute('aria-invalid',ok?'false':'true');if(!ok&&!bad)bad=el;});
 if(bad){m.textContent='Please check the required fields. 필수 항목을 확인해 주세요.';m.classList.add('err');bad.focus();return;}
 const d=Object.fromEntries(new FormData(f));d.consent=!!f.consent.checked;d.role=[d.level,d.role,d.size].filter(Boolean).join(' · ');d.lang=['참석: '+(d.attend||'-'),d.lang].filter(Boolean).join(' · ');const b=f.querySelector('button');b.disabled=true;m.textContent='Submitting… 접수 중';
 try{const r=await fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(d)});const j=await r.json();
  if(!j.ok)throw new Error(j.error||'error');
  f.classList.add('is-done');const box=document.createElement('div');box.className='done';
  box.innerHTML=j.duplicate?'<h3>Already applied · 이미 신청됨</h3><p>No. '+j.id+'. Please check your confirmation email.</p>':'<h3>Application received · 신청 완료</h3><p>No. '+j.id+'. A confirmation email is on its way; results follow by email. 확인 메일을 보냈습니다.</p>';
  f.after(box);m.textContent='';
 }catch(err){m.textContent='Could not submit. Please try again. 잠시 후 다시 시도해 주세요.';m.classList.add('err');b.disabled=false;}
});}

const g=document.getElementById('globalForm');
if(g){g.addEventListener('submit',async e=>{e.preventDefault();const m=document.getElementById('globalMsg');m.className='form__msg';
 let bad=null;g.querySelectorAll('[required]').forEach(el=>{const ok=el.type==='email'?/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim()):el.value.trim()!=='';el.setAttribute('aria-invalid',ok?'false':'true');if(!ok&&!bad)bad=el;});
 if(bad){m.textContent='Please add your name and email.';m.classList.add('err');bad.focus();return;}
 const d=Object.fromEntries(new FormData(g));d.action='global';d.source=document.referrer?'ref '+document.referrer.slice(0,80):'seed apply';const b=g.querySelector('button');b.disabled=true;m.textContent='Sending…';
 try{const r=await fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(d)});const k=await r.json();if(!k.ok)throw new Error(k.error||'error');
  g.classList.add('is-done');const box=document.createElement('div');box.className='done';box.innerHTML=k.duplicate?'<h3>You are already on the list</h3><p>We will email you when the global cohort opens.</p>':'<h3>You are on the global waitlist</h3><p>We will invite you first when the 2027 global cohort opens. 글로벌 기수가 열리면 가장 먼저 연락드리겠습니다.</p>';g.after(box);m.textContent='';
 }catch(err){m.textContent='Could not send. Please try again.';m.classList.add('err');b.disabled=false;}
});}

const cp=document.getElementById('carPrev'),cn=document.getElementById('carNext'),cc=document.getElementById('car');
if(cp&&cc){const step=()=>{const c=cc.querySelector('.story');return c?c.getBoundingClientRect().width+20:300};cp.onclick=()=>cc.scrollBy({left:-step(),behavior:'smooth'});cn.onclick=()=>cc.scrollBy({left:step(),behavior:'smooth'});}
