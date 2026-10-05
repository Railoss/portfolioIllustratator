(()=>{
  document.getElementById('year').textContent=new Date().getFullYear();

  const figures=[...document.querySelectorAll('figure.art')];
  const all=figures.map(f=>{
    const img=f.querySelector('img');
    const cap=f.querySelector('figcaption');
    return {
      src:img.getAttribute('src'),
      cap:cap?cap.textContent:(img.getAttribute('alt')||'')
    };
  });

  const dlg=document.getElementById('lightbox');
  const li=document.getElementById('lightbox-img');
  const lc=document.getElementById('lightbox-cap');
  let cur=0;

  function draw(){
    const x=all[cur];
    if(!x)return;
    li.src=x.src;
    li.alt=x.cap||'Иллюстрация';
    lc.textContent=x.cap||'';
  }

  function open(i){
    cur=i;
    draw();
    dlg.showModal();
    document.body.style.overflow='hidden';
  }

  function close(){
    dlg.close();
    document.body.style.overflow='';
  }

  function move(n){
    if(!all.length)return;
    cur=(cur+n+all.length)%all.length;
    draw();
  }

  figures.forEach((f,i)=>{
    f.addEventListener('click',()=>open(i));
  });

  dlg.querySelector('.lightbox__close').onclick=close;
  dlg.querySelector('.lightbox__prev').onclick=()=>move(-1);
  dlg.querySelector('.lightbox__next').onclick=()=>move(1);
  dlg.addEventListener('click',e=>{if(e.target===dlg)close();});
  document.addEventListener('keydown',e=>{
    if(!dlg.open)return;
    if(e.key==='ArrowLeft')move(-1);
    if(e.key==='ArrowRight')move(1);
    if(e.key==='Escape')close();
  });
})();