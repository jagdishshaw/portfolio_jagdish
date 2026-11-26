const $=id=>document.getElementById(id),still=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
let mx=-999,my=-999;
// name letters
let n=0;document.querySelectorAll('h1 span').forEach(s=>{const t=s.textContent;s.textContent='';s.setAttribute('aria-hidden','true');for(const c of t){const b=document.createElement('b');b.textContent=c;b.style.animationDelay=n++*.06+'s';s.append(b)}});
const letters=[...document.querySelectorAll('h1 b')];
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;
 if(fine&&!still){$('cur').style.opacity=1;$('cur').style.transform=`translate(${mx}px,${my}px)`;$('cur').classList.toggle('big',!!e.target.closest('a,button,h1,.chip'))}
 if(!still)letters.forEach(l=>{const r=l.getBoundingClientRect(),dx=r.x+r.width/2-mx,dy=r.y+r.height/2-my,d=Math.hypot(dx,dy),f=Math.max(0,1-d/160);
 l.style.transform=f?`translate(${dx*f*.5}px,${dy*f*.5}px) rotate(${dx*f*.2}deg)`:'';l.style.color=f>.25?'var(--hot)':''})});
addEventListener('pointerup',e=>{if(e.pointerType!=='mouse'){mx=my=-999;letters.forEach(l=>{l.style.transform='';l.style.color=''})}});
document.querySelectorAll('.mag').forEach(b=>{b.onpointermove=e=>{if(still)return;const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.x-r.width/2)*.3}px,${(e.clientY-r.y-r.height/2)*.4}px)`};b.onpointerleave=()=>b.style.transform=''});
if(fine&&!still)document.querySelectorAll('.card').forEach(c=>{c.onpointermove=e=>{const r=c.getBoundingClientRect();c.style.transform=`perspective(900px) rotateY(${((e.clientX-r.x)/r.width-.5)*7}deg) rotateX(${-((e.clientY-r.y)/r.height-.5)*7}deg)`};c.onpointerleave=()=>c.style.transform=''});
// typing role
const roles=['Web development','Frontend: HTML, CSS, JavaScript','Learning React and Next.js','Backend fundamentals with Node.js'];let ri=0,ci=roles[0].length,del=true;
function type(){const w=roles[ri];ci+=del?-1:1;$('role').textContent=w.slice(0,ci)+'▌';let t=del?30:60;if(!del&&ci===w.length){del=true;t=1600}else if(del&&ci===0){del=false;ri=(ri+1)%roles.length}setTimeout(type,t)}
if(!still)setTimeout(type,1800);
// particle network
const cv=$('net'),g=cv.getContext('2d');let W,H,pts=[];
function size(){const d=devicePixelRatio||1;W=cv.clientWidth;H=cv.clientHeight;cv.width=W*d;cv.height=H*d;g.setTransform(d,0,0,d,0,0);pts=Array.from({length:Math.min(80,W/12|0)},()=>({x:Math.random()*W,y:Math.random()*H,u:Math.random()-.5,v:Math.random()-.5}))}
function net(){g.clearRect(0,0,W,H);const r=cv.getBoundingClientRect(),m={x:mx-r.x,y:my-r.y};
 pts.forEach((p,i)=>{if(!still){p.x+=p.u;p.y+=p.v}if(p.x<0||p.x>W)p.u*=-1;if(p.y<0||p.y>H)p.v*=-1;g.fillStyle='#35e0d0';g.globalAlpha=.7;g.fillRect(p.x-1.5,p.y-1.5,3,3);
 [...pts.slice(i+1),m].forEach(q=>{const d=Math.hypot(p.x-q.x,p.y-q.y),max=q===m?170:100;if(d<max){g.globalAlpha=(1-d/max)*.5;g.strokeStyle=q===m?'#ff5c35':'#8b6bff';g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke()}})});
 if(!still)requestAnimationFrame(net)}
size();net();addEventListener('resize',()=>{size();if(still)net()});
// skill pit
const pit=$('pit'),chips='C,C++,HTML5,CSS3,JavaScript,Java,React,Next.js,Node.js,MySQL,MongoDB,Git,GitHub,Grid,DOM,Debugging'.split(',').map((t,i)=>{const el=document.createElement('div');el.className='chip';el.textContent=t;pit.append(el);return{el,x:(i*83)%240,y:(i%6)*55,u:(i%5)-2,v:0,held:false}});
chips.forEach(c=>{let ox,oy;c.el.onpointerdown=e=>{c.held=true;c.el.setPointerCapture(e.pointerId);ox=e.clientX-c.x;oy=e.clientY-c.y};
 c.el.onpointermove=e=>{if(!c.held)return;const x=e.clientX-ox,y=e.clientY-oy;c.u=x-c.x;c.v=y-c.y;c.x=x;c.y=y;if(still)draw(c)};c.el.onpointerup=c.el.onpointercancel=()=>c.held=false});
function draw(c){c.x=Math.max(0,Math.min(pit.clientWidth-c.el.offsetWidth,c.x));c.y=Math.max(0,Math.min(pit.clientHeight-c.el.offsetHeight,c.y));c.el.style.transform=`translate(${c.x}px,${c.y}px)`}
function step(){const W=pit.clientWidth,H=pit.clientHeight;chips.forEach(c=>{if(!c.held){c.v+=.5;c.x+=c.u;c.y+=c.v;const w=c.el.offsetWidth,h=c.el.offsetHeight;
 if(c.x<0||c.x>W-w)c.u*=-.7;if(c.y>H-h){c.v*=-.55;c.u*=.94;if(Math.abs(c.v)<1)c.v=0}if(c.y<0)c.v*=-.5}});
 for(let i=0;i<chips.length;i++)for(let j=i+1;j<chips.length;j++){const a=chips[i],b=chips[j],aw=a.el.offsetWidth,bw=b.el.offsetWidth,dx=b.x+bw/2-a.x-aw/2,dy=b.y-a.y,ox=(aw+bw)/2-Math.abs(dx),oy=a.el.offsetHeight-Math.abs(dy);
 if(ox>0&&oy>0){const ax=ox<oy?'x':'y',v=ax==='x'?'u':'v',s=((ax==='x'?dx:dy)<0?-1:1)*Math.min(ox,oy)/2;if(!a.held){a[ax]-=s;a[v]*=.8;a[v]-=s*.05}if(!b.held){b[ax]+=s;b[v]*=.8;b[v]+=s*.05}}}
 chips.forEach(draw)}
(function loop(){step();if(!still)requestAnimationFrame(loop)})();
if(still)for(let i=0;i<300;i++)step();
$('shake').onclick=()=>{chips.forEach(c=>{c.u=Math.random()*24-12;c.v=-Math.random()*18});if(still)for(let i=0;i<300;i++)step()};
// demos
$('pw').oninput=e=>{const p=e.target.value,miss=[[p.length>=12,'12+ characters'],[/[a-z]/.test(p)&&/[A-Z]/.test(p),'mixed case'],[/\d/.test(p),'a number'],[/[^A-Za-z0-9]/.test(p),'a symbol']].filter(r=>!r[0]).map(r=>r[1]),s=p?4-miss.length:0;
 $('mt').style.width=(p?Math.max(1,s)*25:0)+'%';$('mt').style.background=s<3?'var(--hot)':'var(--aqua)';$('pwo').textContent=!p?'Waiting for input':miss.length?'Add '+miss[0]:'Meets all four checks'};
const fnv=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.codePointAt(0),16777619);return(h>>>0).toString(16).padStart(8,'0')};
const base=fnv($('file').value);const chk=()=>{const h=fnv($('file').value),same=h===base;$('hash').textContent=`checksum ${h} (saved ${base})`;$('fs').textContent=same?'✓ Unchanged':'⚠ File changed';$('fs').className=same?'ok':'bad'};$('file').oninput=chk;chk();
$('scan').onclick=()=>{const b=$('scan');b.disabled=true;$('log').textContent='';[['Public storage bucket',0],['Root account MFA',1],['Open SSH port',0],['Encryption at rest',1]].forEach((r,i)=>setTimeout(()=>{const d=document.createElement('div');d.className='line '+(r[1]?'ok':'bad');d.textContent=(r[1]?'✓ pass  ':'⚠ risk  ')+r[0];$('log').append(d);if(i===3)b.disabled=false},500*(i+1)))};
function packet(){const r=k=>Math.random()*k|0,d=document.createElement('div');d.className='line';d.textContent=`${['TCP','UDP','DNS','TLS'][r(4)]}  10.0.0.${r(250)+2} → 10.0.0.1  ${r(1400)+60} B`;$('pk').prepend(d);while($('pk').children.length>5)$('pk').lastChild.remove()}
for(let i=0;i<5;i++)packet();if(!still)setInterval(packet,900);
// page
$('copy').onclick=()=>{const b=$('copy'),sel=()=>{getSelection().selectAllChildren($('em'));b.textContent='Selected, now copy it'};navigator.clipboard?navigator.clipboard.writeText($('em').textContent).then(()=>b.textContent='Copied',sel):sel()};
const prog=()=>{const m=document.documentElement.scrollHeight-innerHeight;$('bar').style.transform=`scaleX(${m>0?scrollY/m:0})`};addEventListener('scroll',prog,{passive:true});prog();
if('IntersectionObserver'in window){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}}));document.documentElement.classList.add('js');document.querySelectorAll('.rv').forEach(e=>o.observe(e))}
