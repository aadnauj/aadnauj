const H=document.documentElement;
// THEME
document.getElementById('tb').addEventListener('click',()=>{H.dataset.theme=H.dataset.theme==='dark'?'light':'dark'});
// HAMBURGER
const hb=document.getElementById('hb'),mm=document.getElementById('mm');
hb.addEventListener('click',()=>mm.classList.toggle('open'));
mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mm.classList.remove('open')));
document.addEventListener('click',e=>{if(!hb.contains(e.target)&&!mm.contains(e.target))mm.classList.remove('open')});
// ACTIVE NAV
const secs=document.querySelectorAll('section[id]');
const nas=document.querySelectorAll('.ni a,.mm a');
window.addEventListener('scroll',()=>{
  let c='';secs.forEach(s=>{if(window.scrollY>=s.offsetTop-110)c=s.id});
  nas.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+c));
},{passive:true});
// TYPING
const roles=['Computer Science Student','Web Developer','Machine Learning Enthusiast'];
let ri=0,ci=0,del=false;
const tt=document.getElementById('tt');
function type(){
  const w=roles[ri];
  if(!del){tt.textContent=w.slice(0,++ci);if(ci===w.length){del=true;setTimeout(type,1900);return}}
  else{tt.textContent=w.slice(0,--ci);if(ci===0){del=false;ri=(ri+1)%roles.length;setTimeout(type,420);return}}
  setTimeout(type,del?44:76);
}
setTimeout(type,1300);// REVEALS
const ro=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('vis');ro.unobserve(x.target)}}),{threshold:.1});
document.querySelectorAll('.rev').forEach(r=>ro.observe(r));
// SKILL CARDS
const so=new IntersectionObserver(e=>e.forEach((x,i)=>{if(x.isIntersecting){setTimeout(()=>x.target.classList.add('vis'),i*105);so.unobserve(x.target)}}),{threshold:.1});
document.querySelectorAll('.skc').forEach(c=>so.observe(c));
// PROJECT CARDS
const po=new IntersectionObserver(e=>e.forEach((x,i)=>{if(x.isIntersecting){setTimeout(()=>x.target.classList.add('vis'),i*135);po.unobserve(x.target)}}),{threshold:.08});
document.querySelectorAll('.pc').forEach(c=>po.observe(c));
// TIMELINE
const to=new IntersectionObserver(e=>e.forEach((x,i)=>{if(x.isIntersecting){setTimeout(()=>x.target.classList.add('vis'),i*210);to.unobserve(x.target)}}),{threshold:.15});
document.querySelectorAll('.ti').forEach(t=>to.observe(t));

// Custom cursor
// Custom cursor
const cursor = document.getElementById('cursor');
const cursorGlow = document.getElementById('cursor-glow');

let mx=0,my=0,gx=0,gy=0;

document.addEventListener('mousemove',e=>{
  mx=e.clientX;
  my=e.clientY;

  cursor.style.left=mx-6+'px';
  cursor.style.top=my-6+'px';
});

function animateCursor(){
  gx+=(mx-gx)*0.12;
  gy+=(my-gy)*0.12;

  cursorGlow.style.left=gx+'px';
  cursorGlow.style.top=gy+'px';

  requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll('a,button,.skill-card,.project-card,.about-card')
.forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cursor.style.transform='scale(2.5)';
  });

  el.addEventListener('mouseleave',()=>{
    cursor.style.transform='scale(1)';
  });
});