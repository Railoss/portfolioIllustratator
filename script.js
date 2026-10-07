(()=>{
    const root=document.getElementById('sergey-portfolio-concept');
    const {assets,projects}=window.PORTFOLIO_DATA;
    const home=root.querySelector('.sp-home'),detail=root.querySelector('.sp-case'),gallery=root.querySelector('.sp-case-gallery'),publications=root.querySelector('.sp-case-publications');
    let previous=null,pending=null;
    const homeTitle=document.title;
    const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
    function announce(text){root.querySelector('[data-announcement]').textContent=text}
    function showHome(){detail.hidden=true;home.hidden=false;document.title=homeTitle;announce('Главная страница портфолио')}
    function cancelPending(){clearTimeout(pending);pending=null}
    function jump(id){cancelPending();if(location.hash==='#'+id)route();else location.hash=id}
    function openProject(key,trigger){
      const p=projects[key];if(!p)return;previous=trigger||root.querySelector('[data-project="'+key+'"]');document.title=p.title+' — Сергей / J’PAN';
      ['label','title','description','client','role','format'].forEach(field=>root.querySelector('[data-case-'+field+']').textContent=p[field]);
      gallery.replaceChildren();gallery.classList.toggle('sp-case-wide',!!p.wide);
      function publicationLink(label,url){const a=document.createElement('a');a.textContent=label+' ↗';a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.className='cursor-interaction';return a}
      publications.replaceChildren();
      const usedLinks=new Set();
      p.media.forEach(([asset,alt,linkIndex,published,wide],index)=>{
        if(p.groups?.[index]){const heading=document.createElement('h3');heading.className='sp-gallery-heading';heading.textContent=p.groups[index];gallery.append(heading)}
        const figure=document.createElement('figure'),visual=document.createElement('div'),img=document.createElement('img'),caption=document.createElement('figcaption'),label=document.createElement('span');
        figure.classList.toggle('sp-media-published',!!published);if(wide)figure.style.gridColumn='1 / -1';
        visual.className='sp-media-art';img.src=assets[asset];img.alt=alt;img.dataset.asset=asset;label.textContent=alt;visual.append(img);caption.append(label);
        if(published&&Number.isInteger(linkIndex)){const [linkLabel,url]=p.proof.links[linkIndex];if(!usedLinks.has(url)){caption.append(publicationLink(linkLabel,url));usedLinks.add(url)}}
        figure.append(visual,caption);gallery.append(figure);
      });
      p.proof.links.forEach(([label,url])=>{if(!usedLinks.has(url)){publications.append(publicationLink(label,url));usedLinks.add(url)}});
      publications.hidden=!publications.childElementCount;
      home.hidden=true;detail.hidden=false;root.scrollIntoView({block:'start',behavior:'auto'});root.querySelector('[data-return]').focus({preventScroll:true});announce('Проект: '+p.title);
    }
    function route(){
      cancelPending();
      const key=location.hash.startsWith('#project-')?location.hash.slice(9):null;
      if(key&&Object.hasOwn(projects,key)){openProject(key);return}
      const wasDetail=!detail.hidden;showHome();
      const target=location.hash==='#sp-work'?root.querySelector('#sp-work'):location.hash==='#sp-about'?root.querySelector('#sp-about'):root;
      target.scrollIntoView({block:'start',behavior:'auto'});
      if(wasDetail&&previous){previous.focus({preventScroll:true});previous.scrollIntoView({block:'center',behavior:'auto'})}
    }
    root.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
      cancelPending();previous=button;
      if(!reduceMotion.matches){button.querySelector('.sp-project-art').animate([
        {transform:'none'},{transform:'translate(-2px,0) rotate(-.4deg)'},{transform:'translate(2px,-1px) rotate(.4deg)'},{transform:'none'}
      ],{duration:260,easing:'ease-out'})}
      pending=setTimeout(()=>{const hash='#project-'+button.dataset.project;if(location.hash===hash)openProject(button.dataset.project,button);else location.hash=hash},reduceMotion.matches?0:200);
    }));
    root.querySelectorAll('[data-jump]').forEach(button=>button.addEventListener('click',()=>jump(button.dataset.jump)));
    root.querySelector('[data-home]').addEventListener('click',()=>{cancelPending();history.pushState(null,'',location.pathname+location.search);route();root.scrollIntoView({block:'start',behavior:'auto'})});
    root.querySelector('[data-return]').addEventListener('click',()=>jump('sp-work'));
    root.addEventListener('keydown',event=>{if(event.key==='Escape'&&!detail.hidden)root.querySelector('[data-return]').click()});
    window.addEventListener('hashchange',route);
    route();
  })();
