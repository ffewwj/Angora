const app=document.getElementById('app');
const def={stars:0,best:{},log:[],pin:'1234',done:false,name:'',rewards:[{n:'Watch TV 15 minutes',c:5},{n:'Snack 1 piece',c:8},{n:'Choose dinner menu',c:15}]};
let S,G;
function load(){try{S=Object.assign({},def,JSON.parse(localStorage.getItem('angora')||'{}'))}catch(e){S=JSON.parse(JSON.stringify(def))}}
function save(){try{localStorage.setItem('angora',JSON.stringify(S))}catch(e){}}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
const pick=(a,n)=>shuf(a).slice(0,n);
function say(t){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=.8;speechSynthesis.speak(u)}catch(e){}}
function beep(ok){try{const c=new (window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.frequency.value=ok?880:220;g.gain.value=.08;o.start();o.stop(c.currentTime+.18)}catch(e){}}

const A={
 "i": {
  "map": "images/map.webp",
  "clotheroom": "images/clotheroom.webp",
  "cart": "images/cart.webp",
  "school": "images/school.webp",
  "background": "images/background.webp",
  "bedroom": "images/bedroom.webp",
  "house": "images/house.webp",
  "super": "images/super.webp",
  "Sprite": "images/Sprite.webp",
  "wash": "images/wash.webp",
  "wash2": "images/wash2.webp",
  "clothes": "images/clothes.webp",
  "clothes2": "images/clothes2.webp",
  "clothes3": "images/clothes3.webp",
  "clothes4": "images/clothes4.webp",
  "clothes5": "images/clothes5.webp",
  "next": "images/next.webp",
  "apple": "images/apple.webp",
  "fruit": "images/fruit.webp",
  "snack": "images/snack.webp",
  "snack3": "images/snack3.webp",
  "milk1": "images/milk1.webp",
  "milk2": "images/milk2.webp",
  "snack5": "images/snack5.webp",
  "cart2": "images/cart2.webp",
  "cart3": "images/cart3.webp",
  "cart5": "images/cart5.webp",
  "bag1": "images/bag1.webp",
  "bag2": "images/bag2.webp",
  "bag3": "images/bag3.webp",
  "bag4": "images/bag4.webp",
  "bag5": "images/bag5.webp",
  "angoralogo": "images/angoralogo.webp",
  "angoraText": "images/angoraText.webp",
  "start": "images/start.webp",
  "kitchen": "images/kitchen.webp",
  "kpan": "images/pan.webp",
  "kknife": "images/knife.webp",
  "kpot": "images/pot.webp",
  "kspoon": "images/spoon.webp",
  "kfork": "images/fork.webp",
  "kplate": "images/plate.webp",
  "park": "images/park.webp",
  "activities": "images/activities.webp",
  "classroom": "images/classroom.webp",
  "supermkt": "images/supermkt.webp",
  "sub_history": "images/history.webp",
  "sub_science": "images/sci.webp",
  "sub_math": "images/math.webp",
  "sub_music": "images/music.webp",
  "sub_pe": "images/pe.webp",
  "sub_english": "images/eng.webp",
  "p_monkey": "images/monkey.webp",
  "p_rabbit": "images/rabbit.webp",
  "p_panda": "images/panda.webp",
  "p_bear": "images/bear.webp",
  "p_cat": "images/cat.webp",
  "cat": "images/cat1.webp"
 },
 "a": {
  "chip": "media/chip.webm",
  "pudding1": "media/pudding1.webm",
  "eraser": "media/eraser.webm",
  "soda1": "media/soda1.webm",
  "pencil2": "media/pencil2.webm",
  "laundry room": "media/laundry_room.webm",
  "apple": "media/apple.webm",
  "earth1": "media/earth1.webm",
  "book1": "media/book1.webm",
  "dress": "media/dress.webm",
  "cherry": "media/cherry.webm",
  "Blouse": "media/Blouse.webm",
  "supermarket": "media/supermarket.webm",
  "shorts": "media/shorts.webm",
  "house": "media/house.webm",
  "cookieandcream": "media/cookieandcream.webm",
  "jeans": "media/jeans.webm",
  "milk": "media/milk.webm",
  "t-shirt": "media/t-shirt.webm",
  "school": "media/school.webm"
 }
};
let cur=null,SS=1,IM={};
function playKey(k,fb){if(A.a[k]){try{if(cur)cur.pause();cur=new Audio(A.a[k]);cur.play().catch(()=>fb&&say(fb))}catch(e){fb&&say(fb)}}else fb&&say(fb)}
function snd(w){const it=IM[w];playKey(it&&it[2],w)}
const im=k=>A.i[k];
const IT=(w,s,a)=>[w,s,a];
const LAUN=[
  IT('t-shirt','clothes','t-shirt'),
  IT('blouse','clothes2','Blouse'),
  IT('jeans','clothes3','jeans'),
  IT('shorts','clothes4','shorts'),
  IT('dress','clothes5','dress')
];
const SUPER=[
  IT('apple','apple','apple'),
  IT('cherry','fruit','cherry'),
  IT('cookie and cream','snack','cookieandcream'),
  IT('pudding','snack3','pudding1'),
  IT('milk','milk1','milk'),
  IT('soda','milk2','soda1'),
  IT('chip','snack5','chip')
];
const SCH=[
  IT('earth','bag1','earth1'),
  IT('book','bag2','book1'),
  IT('pencil','bag3','pencil2'),
  IT('eraser','bag4','eraser'),
  IT('blouse','bag5','Blouse')
];
const K=[
  ['pan','kpan'],
  ['knife','kknife'],
  ['pot','kpot'],
  ['spoon','kspoon'],
  ['fork','kfork'],
  ['plate','kplate']
];
const BW=['bed','curtain','picture','window','pillow','blanket','chair'];
const BS=[['I sleep on a ___.','bed'],['I close the ___ at night.','curtain'],['I look at the ___ on the wall.','picture'],['I open the ___ to see outside.','window'],['I rest my head on a ___.','pillow'],['I am cold. I need a ___.','blanket'],['I sit on a ___ at my desk.','chair']];
// scenes: item=[word,sprite,x,y,w,h,ox,oy,target]; target=[id,x,y,w,h,ox,oy]; arrow=[x,y]
const SC={
laun:{bg:'clotheroom',nx:[1186,679],t:[['wash',291,422,264,345,.5758,.3507],['wash2',877,454,275,340,.2436,.4382]],
 i:[['t-shirt','clothes',292,134,186.2,160.4,.4168,.501,'wash2'],
 ['blouse','clothes2',1007,139,99.6,175.6,.2896,.5,'wash'],
 ['jeans','clothes3',859,136,168.6,175.6,.4542,.457,'wash2'],
 ['shorts','clothes4',477,136,138.9,126.5,.4184,.5013,'wash'],
 ['dress','clothes5',654,132,131.7,181.9,.3512,.4505,'wash2']]},
super:{bg:'cart',nx:[1193,73],t:[['cart2',735,395,218.2,193.1,.4745,.5],['cart3',994,588,218.2,193.1,.3614,.5764],['cart5',989,266,218.2,193.1,.4503,.5]],
 i:[['apple','apple',153,309,109.6,119.8,.3904,.595,'cart3'],
 ['cherry','fruit',478,565,105.6,137.8,.4215,.4931,'cart3'],
 ['cookie and cream','snack',209,427,229.9,91.4,.4268,.5018,'cart5'],
 ['pudding','snack3',161,569,152.8,146.5,.4192,.5011,'cart5'],
 ['milk','milk1',347,571,100,160,.5,.5189,'cart2'],
 ['soda','milk2',300,304,74.4,131,.3843,.5,'cart2'],
 ['chip','snack5',471,337,185.5,277.7,.5012,.5008,'cart5']]},
school:{bg:'school',nx:[1181,664],t:[],bag:['book','pencil','eraser'],
 i:[['earth','bag1',308,315,175.3,175.3,.3443,.5],
 ['book','bag2',637,315,264.5,177.1,.4556,.5],
 ['pencil','bag3',916,408,223,376.2,.4057,.5],
 ['eraser','bag4',320,526,202.3,183.8,.4608,.5011],
 ['blouse','bag5',614,522,262.4,186.4,.4173,.4987]]}};
SC.kit={bg:'kitchen'};
SC.bed={bg:'bedroom',lab:1,nx:[1186,679],
 s:[['curtain',795,86,116,38,[765,40,110,380]],['picture',427,210,116,38,[372,72,100,168]],['window',935,193,132,44,[845,85,335,215]],['chair',394,513,116,38,[295,340,190,270]],['pillow',1015,413,112,38,[800,355,300,110]],['blanket',747,487,150,50,[480,440,540,100]],['bed',747,636,116,38,[505,540,650,160]]]};
const SCHQ=[...SCH.slice(0,4),IT('ruler','📏'),IT('scissors','✂️'),IT('notebook','📓'),IT('crayon','🖍️'),IT('backpack','🎒')];
const L=[
{en:'Laundry Room',n:'Laundry Room',ic:'house',sc:'laun',k:'listen',items:LAUN,au:'laundry room',mp:'house'},
{en:'Supermarket',n:'Supermarket',ic:'super',sc:'super',k:'see',items:SUPER,mp:'supermarket'},
{en:'School',n:'School',ic:'Sprite',sc:'school',k:'school',items:SCH,test:SCHQ,mp:'school'},
{en:'My Kitchen',n:'My Kitchen',ic:'kitchen',sc:'kit',k:'kitchen',items:K},
{en:'My Bedroom',n:'My Bedroom',ic:'bedroom',sc:'bed',k:'fill',items:BW.map(w=>[w,'🛏️'])}];
const MAX=L.length*3;
const unlocked=i=>i==0||S.best[i-1]>0;
const starsTxt=n=>'★'.repeat(n)+'☆'.repeat(3-n);
const total=()=>L.reduce((a,_,i)=>a+(S.best[i]||0),0);

function build(l){
 const k=L[l].k,P=L[l].test||L[l].items;IM=Object.fromEntries(P.map(x=>[x[0],x]));
 if(k=='listen')return pick(P,5).map(([w])=>({t:'p',p:'Listen and tap the picture',s:w,auto:1,img:1,o:shuf([w,...pick(P.filter(x=>x[0]!=w).map(x=>x[0]),2)]),a:w}))
 if(k=='see')return pick(P,5).map(([w,s])=>({t:'p',pic:s,p:'What’s this?',s:w,o:shuf([w,...pick(P.filter(x=>x[0]!=w).map(x=>x[0]),2)]),a:w}));
 if(k=='school')return [...shuf(SUBQ).map(q=>({t:'sub',...q,o:shuf(q.o)})),...shuf(ACTQ).map(q=>({t:'act',...q}))];
 if(k=='kitchen')return shuf(P).map(([w])=>({t:'k',w}));
 return pick(BS,5).map(([q,a])=>({t:'p',p:q,s:a,o:shuf([a,...pick(BW.filter(x=>x!=a),3)]),a}));
}
function fit(){const sw=document.getElementById('sw');if(!sw)return;const hh=(document.getElementById('hud')||{offsetHeight:0}).offsetHeight;SS=Math.min((innerWidth-16)/1280,(innerHeight-hh-130)/720);SS=Math.max(SS,.25);sw.style.width=1280*SS+'px';sw.style.height=720*SS+'px';document.getElementById('stage').style.transform='scale('+SS+')'}
addEventListener('resize',fit);
const box=(x,y,w,h,ox,oy)=>`left:${x-ox*w}px;top:${y-oy*h}px;width:${w}px;height:${h}px`;
function hud(){return `<div class="top" id="hud"><button class="btn alt sm" onclick="home()">🗺️ Maps</button>
<button class="btn alt sm" onclick="shop()">🎁 Store</button><span class="pill" id="stars">⭐ 
${S.stars}</span></div>`}

function intro(){
 app.className='wide';
 app.innerHTML=`<div id="sw"><div id="stage" style="background-image:url(${im('background')})">
 <img src="${im('angoralogo')}" style="${box(658,217,302.5,241.7,.505,.512)}">
 <img src="${im('angoraText')}" style="${box(633,362,198.9,58.1,.375,.416)}">
 <img class="clk" src="${im('start')}" onclick="home()" style="${box(640,446,412.3,78.9,.4646,.4026)}"></div></div>`;
 fit();
}
function home(){
 app.className='wide';
 let h=`<div id="sw"><div id="stage" style="background-image:url(${im('map')})">
  <div class="shopbtn" onclick="shop()" title="Store">🎁</div>
  <div class="pill starbtn" id="stars">⭐ ${S.stars}</div>`;
 const POS=[[356,280],[645,280],[928,280],[500,480],[790,480]],sz=120;
 L.forEach((l,i)=>{const ok=unlocked(i),[x,y]=POS[i];
  h+=`<div class="mp ${ok?'':'lock'}" ${ok?`onclick="${l.mp?`playKey('${l.mp}');`:''}place(${i},1)"`:''} style="left:${x-90}px;top:${y-sz/2}px;width:180px"><img src="${im(l.ic)}" style="width:${sz}px;height:${sz}px">${ok?'':'<div class="lk">🔒</div>'}<div class="lb">${l.n}</div><div class="lb st">${ok?starsTxt(S.best[i]||0):'🔒'}</div></div>`});
 app.innerHTML=h+`</div></div></div>`;
 fit();
}
function welcome(i){
 const l=L[i],sc=SC[l.sc],o=document.createElement('div');o.className='wel';
 o.style.backgroundImage=sc?`url(${im(sc.bg)})`:'linear-gradient(135deg,#F6C1CC,#FFE9A8)';
 o.innerHTML=`<div class="wb">
 <div class="wc">🐱</div>
  <div class="w1">Welcome to</div>
    <div class="w2">
      ${[...l.en].map((ch,k)=>`<span style="animation-delay:
        ${.5+k*.07}s">
        ${ch==' '?'&nbsp;':ch}</span>`).join('')}
    </div>
  </div>`;
 document.body.appendChild(o);beep(true);
 let d=0;const go=()=>{if(d)return;d=1;o.remove();place(i)};o.onclick=go;setTimeout(go,2600);
}
function place(i,w){
 if(w){welcome(i);return}
 const l=L[i],sc=SC[l.sc];app.className='wide';IM=Object.fromEntries(l.items.map(x=>[x[0],x]));
 if(l.k=='kitchen')return teachK(i);
 if(sc.lab)return placeLab(i,sc);
 if(l.au)playKey(l.au);
 let h=hud()+`<div id="sw"><div id="stage" style="background-image:url(${im(sc.bg)})">`;
 sc.t.forEach(t=>{h+=`<img class="tg" id="tg-${t[0]}" src="${im(t[0])}" style="${box(...t.slice(1))}">`});
 sc.i.forEach(it=>{const l0=it[2]-it[6]*it[4],t0=it[3]-it[7]*it[5];
  h+=`<img class="it" data-w="${esc(it[0])}" data-tg="${it[8]||''}" data-l="${l0}" data-t="${t0}" src="${im(it[1])}" style="left:${l0}px;top:${t0}px;width:${it[4]}px;height:${it[5]}px">`});
 h+=`<img class="clk nxt" id="nxt" src="${im('next')}" onclick="${l.k=='school'?`lineGame(${i})`:`start(${i})`}" style="${box(sc.nx[0],sc.nx[1],79.2,43.9,.379,.5)};display:none"></div></div>
 <div class="nar" style="text-align:center"><div id="cap" class="bub" style="display:inline-block;font-size:26px;margin:6px">${sc.bag?'What should go in your school bag? Tap it!':sc.t.length?'Drag the stuff and put it in the right place!':'Tap the picture to hear the word!'}</div></div>`;
 app.innerHTML=h;fit();bind(sc);
}

function placeLab(i,sc){
 let h=hud()+`<div id="sw"><div id="stage" style="background-image:url(${im(sc.bg)})">`;
 sc.s.forEach(t=>{h+=`<div class="slot" data-w="${esc(t[0])}" style="left:${t[1]-t[3]/2}px;top:${t[2]-t[4]/2}px;width:${t[3]}px;height:${t[4]}px"></div>`});
 shuf(sc.s.map(t=>t[0])).forEach((w,k)=>{const l0=22,t0=52+k*92;
  h+=`<div class="chip" data-w="${esc(w)}" data-l="${l0}" data-t="${t0}" style="left:${l0}px;top:${t0}px">${esc(w)}</div>`});
 h+=`<img class="clk nxt" id="nxt" src="${im('next')}" onclick="start(${i})" style="${box(sc.nx[0],sc.nx[1],79.2,43.9,.379,.5)};display:none"></div></div>
 <div class="nar" style="text-align:center"><div id="cap" class="bub" style="display:inline-block;font-size:26px;margin:6px">Drag each word to the right thing in the room!</div></div>`;
 app.innerHTML=h;fit();bindLab(sc);
}
function bindLab(sc){
 const n=sc.s.length,done=new Set();let drag=null;
 document.querySelectorAll('.chip').forEach(el=>{
  el.onpointerdown=e=>{if(el.classList.contains('done'))return;
   e.preventDefault();el.setPointerCapture(e.pointerId);snd(el.dataset.w);
   drag={x:e.clientX,y:e.clientY,m:0};el.style.zIndex=9;el.classList.remove('sk')};
  el.onpointermove=e=>{if(!drag)return;const dx=(e.clientX-drag.x)/SS,dy=(e.clientY-drag.y)/SS;
   drag.m=Math.max(drag.m,Math.hypot(dx,dy));
   el.style.left=+el.dataset.l+dx+'px';el.style.top=+el.dataset.t+dy+'px'};
  el.onpointerup=e=>{if(!drag)return;const m=drag.m;drag=null;el.style.zIndex=5;
   const back=()=>{el.style.left=el.dataset.l+'px';el.style.top=el.dataset.t+'px'};
   if(m<8){back();return}
   const sr=document.getElementById('stage').getBoundingClientRect(),px=(e.clientX-sr.left)/SS,py=(e.clientY-sr.top)/SS;
   const cx=parseFloat(el.style.left)+el.offsetWidth/2,cy=parseFloat(el.style.top)+el.offsetHeight/2;
   const inR=(r,x,y)=>x>r[0]-15&&x<r[0]+r[2]+15&&y>r[1]-15&&y<r[1]+r[3]+15;
   const hit=sc.s.filter(t=>!done.has(t[0])&&(inR(t[5],px,py)||inR(t[5],cx,cy)))
    .sort((a,b)=>a[5][2]*a[5][3]-b[5][2]*b[5][3])[0];
   if(hit&&hit[0]==el.dataset.w){
    el.style.width=hit[3]+'px';el.style.height=hit[4]+'px';
    el.style.left=hit[1]-hit[3]/2+'px';el.style.top=hit[2]-hit[4]/2+'px';
    el.classList.add('done');done.add(hit[0]);beep(true);
    if(done.size==n){cap('Excellent! All done. Go to the quiz!','okc');document.getElementById('nxt').style.display='block'}
    else cap('✔ '+hit[0]+' ('+done.size+'/'+n+')','okc')}
   else{beep(false);back();void el.offsetWidth;el.classList.add('sk');cap(hit?'Try putting it somewhere else.':'Drop it on the right thing!','noc')}};
 });
}
function bind(sc){
 const done=new Set(),n=sc.bag?sc.bag.length:sc.i.length;let drag=null;
 const finish=t=>{cap(t,'okc');const nx=document.getElementById('nxt');if(nx)nx.style.display='block'};
 const tc=t=>[t[1]-t[5]*t[3]+t[3]/2,t[2]-t[6]*t[4]+t[4]/2];
 document.querySelectorAll('.it').forEach(el=>{
  el.onpointerdown=e=>{if(el.classList.contains('done'))return;
   e.preventDefault();el.setPointerCapture(e.pointerId);
   const w=el.dataset.w;snd(w);
   drag={el,x:e.clientX,y:e.clientY,m:0};el.style.zIndex=9;el.classList.remove('bn');
   if(sc.bag){
    if(sc.bag.includes(w)){
     if(!done.has(w)){done.add(w);el.classList.add('gok');beep(true);
      if(done.size==n)finish('Excellent! Everything is in the bag. Go to the quiz!');else cap('✔ '+w+' ('+done.size+'/'+n+')','okc')}
    }else{
     S.stars=Math.max(0,S.stars-1);save();
     const sp=document.getElementById('stars');if(sp)sp.textContent='⭐ '+S.stars;
     el.classList.remove('gno','sk');void el.offsetWidth;el.classList.add('gno','sk');
     setTimeout(()=>el.classList.remove('gno','sk'),1000);
     beep(false);cap('✖ '+w+' does not go in the bag! −1 ⭐','noc')}
   }else cap(w);
  };
  el.onpointermove=e=>{if(!drag||!sc.t.length)return;const dx=(e.clientX-drag.x)/SS,dy=(e.clientY-drag.y)/SS;
   drag.m=Math.max(drag.m,Math.hypot(dx,dy));
   el.style.left=+el.dataset.l+dx+'px';
   el.style.top=+el.dataset.t+dy+'px'};
  el.onpointerup=e=>{if(!drag)return;const m=drag.m;drag=null;el.style.zIndex=2;
   const back=()=>{el.style.left=el.dataset.l+'px';el.style.top=el.dataset.t+'px'};
   if(m<8||!sc.t.length){back();if(!sc.bag){void el.offsetWidth;el.classList.add('bn')}return}
   const cx=parseFloat(el.style.left)+el.offsetWidth/2,cy=parseFloat(el.style.top)+el.offsetHeight/2;
   const dist=t=>{const c=tc(t);return Math.hypot(c[0]-cx,c[1]-cy)};
   const hit=sc.t.filter(t=>{const l=t[1]-t[5]*t[3],tp=t[2]-t[6]*t[4];return cx>l-20&&cx<l+t[3]+20&&cy>tp-20&&cy<tp+t[4]+20}).sort((a,b)=>dist(a)-dist(b))[0];
   if(hit&&hit[0]==el.dataset.tg){const c=tc(hit);
    el.style.left=(c[0]-el.offsetWidth/2)+'px';el.style.top=(c[1]-el.offsetHeight/2)+'px';
    el.classList.add('done');done.add(el.dataset.w);beep(true);
    if(done.size==n)finish('Excellent! All done. Go to the quiz!');else cap('✔ '+el.dataset.w+' ('+done.size+'/'+n+')','okc')}
   else{beep(false);back();void el.offsetWidth;el.classList.add('sk');cap(hit?'Try putting it somewhere else.':'Drop it into the right place!','noc')}};
 });
}
// ===== Kitchen: TV picture -> learn first, then type the word =====
function kScene(inner){
 return `<div id="sw"><div id="stage" style="background-image:url(${im('kitchen')})"><div class="kdark"></div>
 <img src="${im('cat')}" style="left:920px;top:436px;height:294px">${inner}</div></div>`}
let KS=null;
function teachK(i){KS={i,idx:0,seen:new Set()};drawT()}
function drawT(){
 const P=L[KS.i].items,w=P[KS.idx][0],n=P.length;KS.seen.add(KS.idx);
 const all=KS.seen.size==n;
 app.className='wide';
 app.innerHTML=hud()+kScene(`
  <img class="kit clk" id="kit" src="${im(P[KS.idx][1])}" onclick="kSay()" style="left:140px;top:100px;width:940px;height:500px ">
  <div class="kbub ${all?'okc':''}" id="kb"><span>This is a ${esc(w)}!</span></div>
  <button class="btn kbtn" style="left:196px;top:580px;width:100px" onclick="kMove(-1)">◀</button>
  <div class="kbox kword" style="left:311px;top:576px;width:300px;height:72px">${esc(w)}</div>
  <button class="btn kbtn" style="left:626px;top:580px;width:100px" onclick="kMove(1)">▶</button>
  <div class="khint" style="left:251px;top:654px;width:420px;font-size:26px;letter-spacing:0">${all?'✔ Great! Tap Next to play':(KS.idx+1)+' / '+n+' · Tap the picture 🔊'}</div>
  ${all?`<img class="clk nxt" src="${im('next')}" onclick="start(${KS.i})" style="left:1100px;top:50px;width:130px;height:72px">`:''}`);
 fit();kSay();
}
function kSay(){
 const w=L[KS.i].items[KS.idx][0];say(w);
 const e=document.getElementById('kit');if(e){e.classList.remove('bn');void e.offsetWidth;e.classList.add('bn')}
}
function kMove(d){const n=L[KS.i].items.length;KS.idx=(KS.idx+d+n)%n;drawT()}
function showK(){
 app.className='wide';const q=G.qs[G.n],w=q.w;
 app.innerHTML=qTop()+kScene(`
  <img class="kit" src="${im(IM[w][1])}" style="left:140px;top:100px;width:940px;height:500px">
  <div class="kbub" id="kb">What is this?</div>
  <div class="kbox" id="kbx" style="left:311px;top:576px;width:300px;height:72px"><input id="kin" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Type here" onkeydown="if(event.key=='Enter')chkK()"></div>
  <div class="khint" style="left:311px;top:652px;width:300px">${w[0]} ${'_ '.repeat(w.length-1)}</div>
  <button class="btn kbtn" id="kgo" style="left:626px;top:580px" onclick="chkK()">Check</button>`);
 fit();const e=document.getElementById('kin');if(e)e.focus();
}
function chkK(){
 const q=G.qs[G.n],e=document.getElementById('kin');if(!e||e.disabled)return;
 const b=document.getElementById('kb');
 if(!e.value.trim()){b.className='kbub';b.textContent='Type the word!';e.focus();return}
 const ok=e.value.trim().toLowerCase()==q.w;e.disabled=true;beep(ok);if(ok)G.sc++;
 b.className='kbub '+(ok?'okc':'noc');
 b.innerHTML='<span>'+(ok?'Excellent!':'The answer is:<br><b>'+esc(q.w)+'</b>')+'</span>';
 if(!ok){const x=document.getElementById('kbx');x.classList.add('sk')}
 setSc();
 const g=document.getElementById('kgo');g.textContent=G.n==G.qs.length-1?'View Results':'Next';g.onclick=next;
 say(q.w);
}
function start(i){G={i,qs:build(i),n:0,sc:0};showQ()}
function show(){
 app.className='quiz';const q=G.qs[G.n];
 const pic=o=>{const s=IM[o][1];return A.i[s]?`<img class="oi" src="${im(s)}">`:`<span class="oe">${s}</span>`};
 let h=`<div class="top"><button class="btn alt sm" onclick="place(G.i)">Back</button><span>Item ${G.n+1}/5</span><span class="pill">✔ ${G.sc}</span></div>
 <div class="bar"><i style="width:${G.n*20}%"></i></div>
 <div class="card"><div class="mascot"><div class="cat">🐱</div><div class="bub">${esc(q.p)}</div></div>`;
 if(q.pic)h+=`<div style="text-align:center"><img class="qi" src="${im(q.pic)}"></div>`;
 if(q.s)h+=`<div style="text-align:center"><button class="btn sm" onclick="snd(G.qs[G.n].s)">Listen!</button></div>`;
 h+=`<div class="opts">`+q.o.map((o,j)=>`<button class="opt ${q.img?'big':''}" onclick="ans(${j})">${q.img?pic(o):esc(o)}</button>`).join('')+'</div>';
 h+='<div class="msg" id="fb"></div><div id="nx"></div></div>';
 app.innerHTML=h;
 if(q.auto)snd(q.s);
}
function ans(j){
 const q=G.qs[G.n],bs=document.querySelectorAll('.opt');if(bs[0].disabled)return;
 const ok=q.o[j]==q.a;bs.forEach((b,x)=>{b.disabled=true;if(q.o[x]==q.a)b.classList.add('ok')});
 if(!ok)bs[j].classList.add('no');fin(ok,q.a)
}
function fin(ok,a){
 beep(ok);if(ok)G.sc++;
 document.getElementById('fb').innerHTML=ok?'<span style="color:var(--ok)">Excellent!</span>':'The correct answer is: '+esc(a);
 document.getElementById('nx').innerHTML=`<button class="btn" onclick="next()">${G.n==4?'View Results':'Next Question'}</button>`;
}
function next(){G.n++;G.n<G.qs.length?showQ():result()}
function result(){app.className='';
 const s=G.sc,N=G.qs.length,st=s==N?3:s==N-1?2:s>=N-2?1:0,i=G.i;let extra='';
 if(st>0){S.stars+=st;const first=!(S.best[i]>0);S.best[i]=Math.max(S.best[i]||0,st);
  if(!S.done&&L.every((_,x)=>S.best[x]>0)){S.done=true;save();return ending(true)}
  if(first&&i<L.length-1)extra='<p> Next location unlocked!</p>'}
 save();
 app.innerHTML=`<div class="card pop" 
 style="text-align:center">
  <div class="q-emoji">${st?'🏅':'🐱'}</div>
  <h2>${st?'Pass!':'Try again!'}</h2><p>You got ${s} out of ${N} correct</p><div class="star" style="font-size:44px">${starsTxt(st)}</div><p>${st?`You earned +${st} ⭐ (total ${S.stars})`:`You need at least ${N-2} correct to pass`}</p>${extra}<button class="btn" onclick="start(${i})">Play Again</button> <button class="btn alt" onclick="home()">Map</button>${st&&i<L.length-1?` <button class="btn" onclick="place(${i+1},1)">Next Location</button>`:''}</div>`;
}
function ending(first){app.className='';
 app.innerHTML=`<div class="card pop" style="text-align:center">${first?'<h2>🎉 You passed all locations!</h2>':''}<div class="cert"><div class="q-emoji">🏆</div><h1>Certificate</h1><p>This is to certify that</p><input id="nm" value="${esc(S.name)}" placeholder="Enter your name" style="text-align:center" oninput="S.name=this.value;save()"><p>has completed<br><b>Angora English Adventure</b><br>Laundry · Market · School · Kitchen · Bedroom</p><div class="star" style="font-size:34px">⭐ ${total()}/${MAX}</div><p>Great job! 🐱</p></div><p>You can play again to earn more stars!</p><button class="btn" onclick="home()">Back to Map</button></div>`;
}
function askPin(cb){
 const m=document.createElement('div');m.className='modal';
 m.innerHTML=`<div class="card"><b>For parents</b><p>Enter PIN to confirm</p><input id="pn" type="password" inputmode="numeric" maxlength="8"><div class="msg" id="pm"></div><button class="btn" id="po">Confirm</button> <button class="btn alt" id="pc">Cancel</button></div>`;
 document.body.appendChild(m);const i=m.querySelector('#pn');i.focus();
 m.querySelector('#pc').onclick=()=>m.remove();
 m.querySelector('#po').onclick=()=>{if(i.value==S.pin){m.remove();cb()}else m.querySelector('#pm').textContent='Invalid PIN'};
}
function shop(){app.className='';
 let h=`<div class="top"><button class="btn alt sm" onclick="home()">Back</button><span class="pill">⭐ ${S.stars}</span></div><div class="card"><h2>🎁 Reward Store</h2>`;
 S.rewards.forEach((r,i)=>{h+=`<div class="row"><span>${esc(r.n)}<br><small>${r.c} stars</small></span><button class="btn sm" ${S.stars<r.c?'disabled style="opacity:.5"':''} onclick="redeem(${i})">Redeem</button></div>`});
 h+=`</div><div class="card"><b>Redemption History</b>${S.log.slice(0,5).map(l=>`<div class="row">${esc(l)}</div>`).join('')||'<p>No history yet</p>'}</div><button class="btn alt" onclick="askPin(manage)">⚙️ Settings (Parent)</button>`;
 app.innerHTML=h;
}
function redeem(i){const r=S.rewards[i];askPin(()=>{if(S.stars<r.c)return;S.stars-=r.c;S.log.unshift(new Date().toLocaleDateString('th-TH')+' · '+r.n+' (−'+r.c+')');save();shop()})}
function manage(){app.className='';
 let h=`<div class="top"><button class="btn alt sm" onclick="shop()">← Back</button></div><div class="card"><h2>Manage Rewards</h2>`;
 S.rewards.forEach((r,i)=>{h+=`<div class="row"><span>${esc(r.n)} · ${r.c} stars</span><button class="btn alt sm" onclick="S.rewards.splice(${i},1);save();manage()">Delete</button></div>`});
 h+=`<p>Add new reward</p><input id="rn" placeholder="Reward name (e.g., Ice Cream)"><input id="rc" type="number" min="1" placeholder="Cost in stars" style="margin-top:8px"><div style="margin-top:8px"><button class="btn" onclick="addR()">Add Reward</button></div></div>
 <div class="card"><p>Change PIN (default 1234)</p><input id="np" type="password" inputmode="numeric" maxlength="8" placeholder="New PIN"><div style="margin-top:8px"><button class="btn" onclick="const v=document.getElementById('np').value;if(v){S.pin=v;save();manage()}">Save PIN</button></div></div>`;
 app.innerHTML=h;
}
function addR(){const n=document.getElementById('rn').value.trim(),c=+document.getElementById('rc').value;if(n&&c>0){S.rewards.push({n,c});save();manage()}}

// ===== School: extra games =====
// 1) Draw lines: animal -> action   2) Guess the subject from the picture (5)   3) Type what the animal likes (5)
const LINEA=[['monkey','dance'],['frog','jump'],['rabbit','eat'],['capybara','read']];
const SUBQ=[
 {pic:'sub_pe',emo:'',a:'History',o:['Math','History','English']},
 {pic:'sub_science',emo:'',a:'Science',o:['Science','Art','English']},
 {pic:'sub_math',emo:'',a:'Math',o:['Math','Music','Art']},
 {pic:'sub_music',emo:'',a:'Music',o:['Music','Math','Art']},
 {pic:'sub_english',emo:'',a:'English',o:['Art','Science','English']}];

const ACTQ=[
 {an:'monkey',pic:'p_monkey',emo:'',w:'dance',acc:['dance','dancing']},
 {an:'rabbit',pic:'p_rabbit',emo:'',w:'dance',acc:['dance','dancing']},
 {an:'panda',pic:'p_panda',emo:'',w:'climb',acc:['climb','climbing']},
 {an:'bear',pic:'p_bear',emo:'',w:'walk',acc:['walk','walking']},
 {an:'cat',pic:'p_cat',emo:'',w:'eat',acc:['eat','eating']}];

// picture with emoji fallback if the image file is missing
function emoFix(el,e){const d=document.createElement('div');d.className='emo';d.style.cssText=el.style.cssText;d.style.fontSize=((parseFloat(el.style.height)||120)*.7)+'px';d.textContent=e;el.replaceWith(d)}
const aimg=(k,e,css,cls)=>`<img ${cls?`class="${cls}" `:''}src="${im(k)}" style="${css}" onerror="emoFix(this,'${e}')">`;
const qTop=()=>`<div class="top" id="hud"><button class="btn alt sm" onclick="place(${G.i})">Back</button><span class="pill">Item ${G.n+1}/${G.qs.length}</span><span class="pill" id="ksc">✔ ${G.sc}</span></div>`;
const sSt=(bg,inner)=>`<div id="sw"><div id="stage" style="background-image:url(${im(bg)})">${inner}</div></div><div class="nar" style="text-align:center;min-height:70px"><div id="nx"></div></div>`;
const cap=(t,c)=>{const e=document.getElementById('cap');if(e){e.textContent=t;e.className='bub'+(c?' '+c:'')}};
const setSc=()=>{const s=document.getElementById('ksc');if(s)s.textContent='✔ '+G.sc};

// ---- Game 1: draw a line from each animal to its action ----
function lineGame(i){
 app.className='wide';
 const Y=[210,360,502,650],W=shuf(LINEA.map(a=>a[1]));
 let h=hud()+`<div id="sw"><div id="stage" style="background-image:url(${im('park')})"><div class="kdark"></div>
 <div class="ltitle">What are we doing?</div>
 <svg id="lsvg" width="1280" height="720" viewBox="0 0 1280 720"></svg>`;
 h+=`<img src="${im('activities')}" style="left:0;top:0;width:1280px;height:720px;z-index:2;pointer-events:none">`;
 LINEA.forEach((a,k)=>{h+=`<div class="ldot" data-k="${a[0]}" data-a="${a[1]}" data-y="${Y[k]}" style="left:315px;top:${Y[k]-45}px"></div>`});
 W.forEach((w,k)=>{h+=`<div class="rdot" data-w="${w}" data-y="${Y[k]}" style="left:966px;top:${Y[k]-50}px"><i></i><span>${w}</span></div>`});
 h+=`<img class="clk nxt" id="nxt" src="${im('next')}" onclick="start(${i})" style="${box(1190,60,79.2,43.9,.379,.5)};display:none"></div></div>
 <div class="nar" style="text-align:center"><div id="cap" class="bub" style="display:inline-block;font-size:26px;margin:6px">Drag a line from each animal to what it is doing!</div></div>`;
 app.innerHTML=h;fit();bindLine();
}
function bindLine(){
 const st=document.getElementById('stage'),sv=document.getElementById('lsvg'),done=new Set(),n=LINEA.length;
 const pt=e=>{const r=st.getBoundingClientRect();return[(e.clientX-r.left)/SS,(e.clientY-r.top)/SS]};
 const mk=(x,y)=>{const l=document.createElementNS('http://www.w3.org/2000/svg','line');
  [['x1',x],['y1',y],['x2',x],['y2',y],['stroke','#fff'],['stroke-width',12],['stroke-linecap','round']].forEach(([a,v])=>l.setAttribute(a,v));
  sv.appendChild(l);return l};
 document.querySelectorAll('.ldot').forEach(d=>{
  let ln=null;const y0=+d.dataset.y;
  d.onpointerdown=e=>{if(done.has(d.dataset.k))return;e.preventDefault();d.setPointerCapture(e.pointerId);say(d.dataset.k);ln=mk(360,y0)};
  d.onpointermove=e=>{if(!ln)return;const[x,y]=pt(e);ln.setAttribute('x2',x);ln.setAttribute('y2',y)};
  d.onpointercancel=()=>{if(ln){ln.remove();ln=null}};
  d.onpointerup=e=>{if(!ln)return;const[x,y]=pt(e),l=ln;ln=null;
   const t=[...document.querySelectorAll('.rdot')].find(r=>!r.classList.contains('ok')&&x>930&&Math.abs(y-(+r.dataset.y))<60);
   if(t&&t.dataset.w==d.dataset.a){
    l.setAttribute('x2',985);l.setAttribute('y2',t.dataset.y);l.setAttribute('stroke','#2ecc71');
    d.classList.add('ok');t.classList.add('ok');done.add(d.dataset.k);beep(true);say(t.dataset.w);
    if(done.size==n){cap('Excellent! All matched. Go on!','okc');document.getElementById('nxt').style.display='block'}
    else cap('✔ '+d.dataset.k+' → '+t.dataset.w+' ('+done.size+'/'+n+')','okc')}
   else{l.setAttribute('stroke','#e74c3c');beep(false);cap(t?'Try another one!':'Drop the line on a word!','noc');setTimeout(()=>l.remove(),450)}};
 });
}

// ---- Game 2: what subject is this? ----
function showQ(){const q=G.qs[G.n];q.t=='sub'?showS():q.t=='act'?showA():q.t=='k'?showK():show()}
function showS(){
 app.className='wide';const q=G.qs[G.n],X=[167,507,835];
 app.innerHTML=qTop()+sSt('classroom',`${aimg(q.pic, q.emo,
'left: 300px;top: 30px;width: 700px;height: 650px;object-fit:contain;z-index:2')}
  <div class="sbub" id="sb">What subject is this?</div>
  ${q.o.map((o,j)=>`<button class="spill" style="left:${X[j]}px" onclick="ansS(${j})">${esc(o)}</button>`).join('')}`);
 fit();
}
function ansS(j){
 const q=G.qs[G.n],bs=document.querySelectorAll('.spill');if(bs[0].disabled)return;
 const ok=q.o[j]==q.a;bs.forEach((b,x)=>{b.disabled=true;if(q.o[x]==q.a)b.classList.add('ok')});
 if(!ok)bs[j].classList.add('no');
 beep(ok);if(ok)G.sc++;setSc();say(q.a);
 const b=document.getElementById('sb');b.className='sbub '+(ok?'okc':'noc');b.innerHTML=ok?'Excellent!':'The answer is: <b>'+esc(q.a)+'</b>';
 document.getElementById('nx').innerHTML=`<button class="btn" onclick="next()">${G.n==G.qs.length-1?'View Results':'Next'}</button>`;
}

// ---- Game 3: "I'm monkey, I like ____" -> type the action ----
function showA(){
 app.className='wide';const q=G.qs[G.n];
 app.innerHTML=qTop()+sSt('supermkt',`<div class="kdark"></div>
  <div class="sbub" id="sb">What is the ${esc(q.an)} doing?</div>
  ${aimg(q.pic,q.emo,'left:30px;top:20px;width:1200px;height:600px;object-fit:contain;z-index:2')}
  <div class="tbar">I’m ${esc(q.an)} , I like to <input id="tin" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" onkeydown="if(event.key=='Enter')chkA()"></div>
  <button class="btn kbtn" id="kgo" style="left:1130px;top:572px" onclick="chkA()">Check</button>
  <div class="khint" style="left:167px;top:664px;width:946px">${q.w[0]} ${'_ '.repeat(q.w.length-1)}</div>`);
 fit();const e=document.getElementById('tin');if(e)e.focus();
}
function chkA(){
 const q=G.qs[G.n],e=document.getElementById('tin');if(!e||e.disabled)return;
 const b=document.getElementById('sb'),v=e.value.trim().toLowerCase();
 if(!v){b.className='sbub';b.textContent='Type the word!';e.focus();return}
 const ok=q.acc.includes(v);e.disabled=true;beep(ok);if(ok)G.sc++;setSc();
 b.className='sbub '+(ok?'okc':'noc');b.innerHTML=ok?'Excellent!':'The answer is: <b>'+esc(q.w)+'</b>';
 const g=document.getElementById('kgo');g.textContent=G.n==G.qs.length-1?'View Results':'Next';g.onclick=next;
 say(q.w);
}

load();document.body.style.backgroundImage='url('+A.i.background+')';intro();