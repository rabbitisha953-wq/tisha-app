import { sendOtp, verifyOtp } from './auth.js';
import { auth } from './firebase.js';

const path = location.pathname.split('/').pop();
document.addEventListener('DOMContentLoaded', ()=>{
  if(!path || path==='index.html') indexInit();
  if(path==='dashboard.html') dashboardInit();
  if(path==='chat.html') chatInit();
});

function indexInit(){
  setTimeout(()=>{ document.getElementById('splash').classList.add('hidden'); document.getElementById('mainApp').classList.remove('hidden'); }, 900);
  const country = document.getElementById('country');
  const prefix = document.getElementById('phonePrefix');
  country.addEventListener('change', ()=> prefix.value = country.value);

  document.getElementById('btnSend').addEventListener('click', async ()=>{
    const phone = prefix.value + document.getElementById('phoneInput').value.trim();
    if(!/^[+0-9]{6,15}$/.test(phone)){ alert('Enter valid phone number'); return; }
    const r = await sendOtp(phone);
    if(r.success){ document.getElementById('otpArea').style.display='block'; alert('OTP sent (check SMS)'); }
    else alert('Error sending OTP: '+r.error);
  });

  document.getElementById('btnVerify').addEventListener('click', async ()=>{
    const code = document.getElementById('otpInput').value.trim();
    if(!code){ alert('Enter OTP'); return; }
    const r = await verifyOtp(code);
    if(r.success){ location.href='dashboard.html'; }
    else alert('OTP verify failed: '+r.error);
  });
}

function dashboardInit(){
  const chats = document.getElementById('chats');
  const sample = [{name:'Amina', msg:'Hey, ready for call?', time:'2:21 PM'},{name:'Rafi', msg:'Sent the files', time:'1:05 PM'},{name:'Nila', msg:'See you soon!', time:'Yesterday'}];
  chats.innerHTML='';
  sample.forEach(s=>{ const el=document.createElement('div'); el.className='chat-item'; el.innerHTML=`<div class="avatar">${s.name[0]}</div><div class="meta"><div class="name">${s.name}</div><div class="msg">${s.msg}</div></div><div class="time muted">${s.time}</div>`; el.addEventListener('click', ()=> location.href='chat.html'); chats.appendChild(el); });
  document.getElementById('logoutBtn').addEventListener('click', ()=>{ auth.signOut(); location.href='index.html'; });
}

function chatInit(){
  const messages = document.getElementById('messages');
  const send = document.getElementById('sendBtn');
  const input = document.getElementById('messageInput');
  messages.innerHTML = '<div class="msg">Welcome to TISHA full demo chat.</div>';
  send.addEventListener('click', ()=>{ const v = input.value.trim(); if(!v) return; const me = document.createElement('div'); me.className='msg me'; me.textContent = v; messages.appendChild(me); input.value=''; messages.scrollTop = messages.scrollHeight; });
  document.getElementById('backBtn').addEventListener('click', ()=> history.back());
}
export { };
