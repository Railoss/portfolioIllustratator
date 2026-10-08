(()=>{
    const root=document.getElementById('sergey-portfolio-concept');
    const {assets,projects,previews,dimensions}=window.PORTFOLIO_DATA;
    const home=root.querySelector('.sp-home'),detail=root.querySelector('.sp-case'),gallery=root.querySelector('.sp-case-gallery'),publications=root.querySelector('.sp-case-publications');
    let previous=null,pending=null;
    const homeTitle=document.title;
    const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const transition=root.querySelector('.sp-project-transition');
    const sectionNav=root.querySelector('.sp-case-nav'),viewer=root.querySelector('.sp-lightbox'),viewerImage=viewer.querySelector('img'),viewerStage=viewer.querySelector('.sp-lightbox-stage'),zoomButton=viewer.querySelector('[data-image-zoom]');
    let imageList=[],imageIndex=0,savedOverflow='';
    function setZoom(zoomed){viewer.classList.toggle('sp-lightbox-zoomed',zoomed);if(zoomed)viewerImage.style.setProperty('--image-width',Math.max(viewerImage.naturalWidth,viewerStage.clientWidth*2)+'px');zoomButton.textContent=zoomed?'Вписать':'Увеличить';zoomButton.setAttribute('aria-pressed',String(zoomed));viewerStage.scrollTo(0,0)}
    function displayImage(){
      const [asset,alt]=imageList[imageIndex];setZoom(false);viewerImage.src=assets[asset];viewerImage.alt=alt;
      viewerImage.style.setProperty('--image-width',dimensions[asset][0]+'px');
      viewer.querySelector('[data-image-original]').href=assets[asset];
      viewer.querySelector('#sp-lightbox-caption').textContent=alt+(imageList.length>1?' · '+(imageIndex+1)+' / '+imageList.length:'');
      viewer.querySelector('[data-image-previous]').disabled=imageList.length<2;viewer.querySelector('[data-image-next]').disabled=imageList.length<2;
    }
    function openImage(list,index){imageList=list;imageIndex=index;displayImage();savedOverflow=document.body.style.overflow;document.body.style.overflow='hidden';viewer.showModal()}
    function closeImage(){if(viewer.open)viewer.close()}
    function stepImage(step){imageIndex=(imageIndex+step+imageList.length)%imageList.length;displayImage()}
    viewer.querySelector('[data-image-close]').addEventListener('click',closeImage);
    viewer.querySelector('[data-image-previous]').addEventListener('click',()=>stepImage(-1));
    viewer.querySelector('[data-image-next]').addEventListener('click',()=>stepImage(1));
    zoomButton.addEventListener('click',()=>setZoom(!viewer.classList.contains('sp-lightbox-zoomed')));
    viewerImage.addEventListener('click',()=>setZoom(!viewer.classList.contains('sp-lightbox-zoomed')));
    viewer.addEventListener('close',()=>{document.body.style.overflow=savedOverflow;viewerImage.removeAttribute('src');setZoom(false)});
    viewer.addEventListener('click',event=>{if(event.target===viewer){const rect=viewer.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeImage()}});
    viewer.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();stepImage(event.key==='ArrowRight'?1:-1)}});
    root.querySelector('[data-image="hero"]').addEventListener('click',()=>openImage([['hero',root.querySelector('.sp-hero img').alt]],0));
    function announce(text){root.querySelector('[data-announcement]').textContent=text}
    function scrollToGroup(heading,behavior){heading.style.scrollMarginTop=(sectionNav.hidden?12:sectionNav.getBoundingClientRect().height+12)+'px';heading.scrollIntoView({block:'start',behavior})}
    function showHome(){closeImage();detail.hidden=true;home.hidden=false;document.title=homeTitle;announce('Главная страница портфолио')}
    function cancelPending(){clearTimeout(pending);pending=null;transition.hidden=true}
    function jump(id){cancelPending();if(location.hash==='#'+id)route();else location.hash=id}
    function openProject(key,trigger){
      const p=projects[key];if(!p)return;closeImage();previous=trigger||root.querySelector('[data-project="'+key+'"]');document.title=p.title+' — Сергей / J’PAN';
      ['label','title','description','client','role','format'].forEach(field=>root.querySelector('[data-case-'+field+']').textContent=p[field]);
      gallery.replaceChildren();gallery.classList.toggle('sp-case-wide',!!p.wide);
      function publicationLink(label,url){const a=document.createElement('a');a.textContent='Ссылка на релиз ↗';a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.className='sp-release-link cursor-interaction';a.title=label;a.setAttribute('aria-label','Ссылка на релиз: '+label);return a}
      publications.replaceChildren();
      sectionNav.replaceChildren();sectionNav.hidden=Object.keys(p.groups||{}).length<3;
      const usedLinks=new Set();
      p.media.forEach(([asset,alt,linkIndex,published,wide],index)=>{
        if(p.groups?.[index]){
          const heading=document.createElement('h3'),link=document.createElement('button');heading.className='sp-gallery-heading';heading.id='case-'+key+'-'+index;heading.textContent=p.groups[index];gallery.append(heading);
          link.type='button';link.textContent=p.groups[index];link.addEventListener('click',()=>{history.pushState(null,'','#project-'+key+'/'+(key==='menus'&&index===10?'halloween':index));scrollToGroup(heading,reduceMotion.matches?'instant':'smooth')});sectionNav.append(link);
        }
        if(p.subheadings?.[index]){const heading=document.createElement('h4');heading.className='sp-gallery-subheading';heading.textContent=p.subheadings[index];gallery.append(heading)}
        const figure=document.createElement('figure'),visual=document.createElement('button'),img=document.createElement('img'),caption=document.createElement('figcaption'),label=document.createElement('span');
        figure.classList.toggle('sp-media-published',!!published);if(wide)figure.style.gridColumn='1 / -1';
        visual.type='button';visual.className='sp-media-art';visual.setAttribute('aria-label','Увеличить: '+alt);visual.addEventListener('click',()=>openImage(p.media,index));
        img.src=previews[asset];img.alt=alt;img.dataset.asset=asset;img.loading='lazy';img.decoding='async';[img.width,img.height]=dimensions[asset];label.textContent=alt;visual.append(img);caption.append(label);
        if(Number.isInteger(linkIndex)){const [linkLabel,url]=p.proof.links[linkIndex];if(!usedLinks.has(url)){caption.append(publicationLink(linkLabel,url));usedLinks.add(url)}}
        figure.append(visual,caption);gallery.append(figure);
      });
      p.proof.links.forEach(([label,url])=>{if(!usedLinks.has(url)){const card=document.createElement('div'),context=document.createElement('span');card.className='sp-release-card';context.className='sp-release-context';context.textContent=label;card.append(context,publicationLink(label,url));publications.append(card);usedLinks.add(url)}});
      publications.hidden=!publications.childElementCount;
      if(!publications.hidden){const heading=document.createElement('h3');heading.className='sp-release-heading';heading.textContent='Релизы проекта';publications.prepend(heading)}
      let row=[];
      function centerRow(){if(row.length%2)row.at(-1).classList.add('sp-media-single');row=[]}
      for(const child of gallery.children){
        if(child.tagName!=='FIGURE'||child.style.gridColumn){centerRow();continue}
        row.push(child);
      }
      centerRow();
      home.hidden=true;detail.hidden=false;root.scrollIntoView({block:'start',behavior:'auto'});root.querySelector('[data-return]').focus({preventScroll:true});announce('Проект: '+p.title);
    }
    function route(){
      cancelPending();
      const [key,section]=location.hash.startsWith('#project-')?location.hash.slice(9).split('/'):[];
      if(key&&Object.hasOwn(projects,key)){openProject(key);if(section){const index=key==='menus'&&section==='halloween'?'10':section,heading=root.querySelector('#case-'+key+'-'+CSS.escape(index));if(heading)scrollToGroup(heading,'instant')}return}
      const wasDetail=!detail.hidden;showHome();
      const target=location.hash==='#sp-work'?root.querySelector('#sp-work'):location.hash==='#sp-about'?root.querySelector('#sp-about'):root;
      target.scrollIntoView({block:'start',behavior:'auto'});
      if(wasDetail&&previous){previous.focus({preventScroll:true});previous.scrollIntoView({block:'center',behavior:'auto'})}
    }
    root.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
      cancelPending();previous=button;
      const hash='#project-'+button.dataset.project;
      if(reduceMotion.matches){
        if(location.hash!==hash)history.pushState(null,'',hash);
        route();
        return;
      }
      transition.hidden=false;
      pending=setTimeout(()=>{
        pending=null;
        if(location.hash!==hash)history.pushState(null,'',hash);
        route();
      },1000);
    }));
    root.querySelectorAll('[data-jump]').forEach(button=>button.addEventListener('click',()=>jump(button.dataset.jump)));
    root.querySelector('[data-home]').addEventListener('click',()=>{cancelPending();history.pushState(null,'',location.pathname+location.search);route();root.scrollIntoView({block:'start',behavior:'auto'})});
    root.querySelector('[data-return]').addEventListener('click',()=>jump('sp-work'));
    root.addEventListener('keydown',event=>{if(event.key==='Escape'&&!viewer.open&&!detail.hidden)root.querySelector('[data-return]').click()});
    window.addEventListener('hashchange',route);
    window.addEventListener('popstate',route);
    route();
  })();
