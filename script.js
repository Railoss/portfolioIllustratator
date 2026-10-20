(async()=>{
    await window.PORTFOLIO_TEXT.load();
    const root=document.getElementById('sergey-portfolio-concept');
    const {assets,projects,previews,dimensions}=window.PORTFOLIO_DATA;
    const home=root.querySelector('.sp-home'),detail=root.querySelector('.sp-case'),gallery=root.querySelector('.sp-case-gallery'),publications=root.querySelector('.sp-case-publications');
    let previous=null,pending=null,transitionRun=0,flyerAnimation=null,flyingCorner=null,openingCard=null,transitionOverflow=null;
    let homeTitle=document.title;
    const text=()=>window.PORTFOLIO_TEXT.current;
    const ui=key=>text()?.ui[key]||({zoom:'Увеличить',fit:'Показать целиком',release:'Ссылка на релиз',publications:'Публикации J’PAN',personal:'Проект',client:'Клиент'})[key];
    const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const transition=root.querySelector('.sp-project-transition');
    const sectionNav=root.querySelector('.sp-case-nav'),viewer=root.querySelector('.sp-lightbox'),viewerImage=viewer.querySelector('img'),viewerStage=viewer.querySelector('.sp-lightbox-stage'),zoomButton=viewer.querySelector('[data-image-zoom]');
    let imageList=[],imageIndex=0,savedOverflow='';
    function setZoom(zoomed){viewer.classList.toggle('sp-lightbox-zoomed',zoomed);if(zoomed)viewerImage.style.setProperty('--image-width',Math.max(viewerImage.naturalWidth,viewerStage.clientWidth*2)+'px');zoomButton.textContent=zoomed?ui('fit'):ui('zoom');zoomButton.setAttribute('aria-pressed',String(zoomed));viewerStage.scrollTo(0,0)}
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
    function cancelPending(){
      transitionRun++;
      clearTimeout(pending);pending=null;
      if(flyerAnimation){flyerAnimation.cancel();flyerAnimation=null}
      if(flyingCorner){flyingCorner.remove();flyingCorner=null}
      if(openingCard){openingCard.classList.remove('sp-project-is-opening');openingCard=null}
      if(transitionOverflow!==null){document.body.style.overflow=transitionOverflow;transitionOverflow=null}
      transition.classList.remove('sp-transition-arrived');transition.hidden=true;
    }
    function jump(id){cancelPending();if(location.hash==='#'+id)route();else location.hash=id}
    function navigateWithLogo(hash,label,trigger){
      cancelPending();
      const run=transitionRun;
      function complete(){
        if(run!==transitionRun)return;
        pending=null;
        if(location.hash!==hash)history.pushState(null,'',hash);
        route();
      }
      if(reduceMotion.matches){complete();return}
      const corner=trigger?.querySelector('.sp-project-corner'),source=corner?.getBoundingClientRect();
      transition.setAttribute('aria-label',label);
      transition.hidden=false;
      transitionOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
      function startOrbit(){
        if(run!==transitionRun)return;
        transition.classList.add('sp-transition-arrived');
        if(flyingCorner){flyingCorner.remove();flyingCorner=null}
        pending=setTimeout(complete,1000);
      }
      if(!corner||!source.width||source.bottom<=0||source.top>=window.innerHeight){startOrbit();return}
      openingCard=trigger;openingCard.classList.add('sp-project-is-opening');
      const logo=transition.querySelector('.sp-transition-logo').getBoundingClientRect(),scale=logo.width/480;
      const sourceScale=source.width/108,sourceCenter={x:source.left+source.width/2,y:source.top+source.height/2};
      const targetCenter={x:logo.left+74*scale,y:logo.top+629.5*scale};
      const dx=targetCenter.x-sourceCenter.x,dy=targetCenter.y-sourceCenter.y,distance=Math.hypot(dx,dy);
      const ux=distance?dx/distance:1,uy=distance?dy/distance:0;
      let nx=-uy,ny=ux;if(ny>0){nx=-nx;ny=-ny}
      const shape=[[443,838],[443,874],[443,895],[457,909],[479,909],[511,909]];
      const start=shape.map(([x,y])=>({x:source.left+(x-423)*sourceScale,y:source.top+(y-818)*source.height/111}));
      const end=shape.map(([x,y])=>({x:logo.left+(x-403)*scale,y:logo.top+(y-244)*scale}));
      const projections=start.map(p=>(p.x-sourceCenter.x)*ux+(p.y-sourceCenter.y)*uy);
      const minProjection=Math.min(...projections),span=Math.max(...projections)-minProjection||1;
      const weights=projections.map(p=>(p-minProjection)/span);
      const svgNS='http://www.w3.org/2000/svg';
      flyingCorner=document.createElementNS(svgNS,'svg');flyingCorner.setAttribute('class','sp-transition-flyer');
      flyingCorner.setAttribute('viewBox','0 0 '+window.innerWidth+' '+window.innerHeight);
      flyingCorner.setAttribute('preserveAspectRatio','none');flyingCorner.setAttribute('aria-hidden','true');
      const ribbon=document.createElementNS(svgNS,'path');flyingCorner.append(ribbon);transition.append(flyingCorner);
      const clamp=x=>Math.max(0,Math.min(1,x)),out=x=>1-Math.pow(1-x,3),inOut=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
      const arc=Math.min(90,distance*.14),duration=620;
      function renderFlight(t){
        // The leading edge shoots ahead while the trailing edge stays attached.
        const head=out(clamp((t-.05)/.52)),tail=inOut(clamp((t-.26)/.62)),stretch=head-tail,blend=(head+tail)/2;
        const settle=clamp((t-.88)/.12),spring=Math.sin(settle*Math.PI*2)*.12*(1-settle);
        const points=start.map((p,i)=>{
          const progress=tail+stretch*weights[i];
          const lx=(p.x-sourceCenter.x)*(1-blend)+(end[i].x-targetCenter.x)*blend;
          const ly=(p.y-sourceCenter.y)*(1-blend)+(end[i].y-targetCenter.y)*blend;
          const along=(lx*ux+ly*uy)*(1+spring),across=(-lx*uy+ly*ux)*(1-.45*stretch-spring*.5);
          const bend=Math.sin(Math.PI*progress)*arc;
          return {x:sourceCenter.x+dx*progress+ux*along-uy*across+nx*bend,y:sourceCenter.y+dy*progress+uy*along+ux*across+ny*bend};
        });
        const xy=p=>p.x.toFixed(2)+','+p.y.toFixed(2);
        ribbon.setAttribute('d','M'+xy(points[0])+' L'+xy(points[1])+' C'+xy(points[2])+' '+xy(points[3])+' '+xy(points[4])+' L'+xy(points[5]));
        ribbon.style.strokeWidth=(34*(sourceScale*(1-blend)+scale*blend)*(1-.42*stretch)).toFixed(2)+'px';
      }
      let frame=0;const started=performance.now();
      flyerAnimation={cancel:()=>cancelAnimationFrame(frame)};
      function step(now){
        if(run!==transitionRun)return;
        const t=clamp((now-started)/duration);renderFlight(t);
        if(t<1)frame=requestAnimationFrame(step);
        else{flyerAnimation=null;startOrbit()}
      }
      renderFlight(0);frame=requestAnimationFrame(step);
    }
    function openProject(key,trigger){
      const p=projects[key];if(!p)return;closeImage();previous=trigger||root.querySelector('[data-project="'+key+'"]');document.title=p.title+' — '+(text()?.home.brandName||'Сергей Белик')+(p.personal?'':' / J’PAN');
      ['label','title','description','client','role','format'].forEach(field=>root.querySelector('[data-case-'+field+']').textContent=p[field]);
      root.querySelector('[data-case-client]').previousElementSibling.textContent=ui(p.personal?'personal':'client');
      gallery.replaceChildren();gallery.classList.toggle('sp-case-wide',!!p.wide);gallery.classList.toggle('sp-case-illustration',!!p.personal);
      function publicationLink(label,url){const a=document.createElement('a');a.textContent=ui('release')+' ↗';a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.className='sp-release-link cursor-interaction';a.title=label;a.setAttribute('aria-label',ui('release')+': '+label);return a}
      publications.replaceChildren();
      sectionNav.replaceChildren();sectionNav.hidden=Object.keys(p.groups||{}).length<3;
      const usedLinks=new Set();
      p.media.forEach(([asset,alt,linkIndex,published,wide],index)=>{
        if(p.groups?.[index]){
          const heading=document.createElement('h3'),link=document.createElement('button');heading.className='sp-gallery-heading';heading.id='case-'+key+'-'+index;heading.textContent=p.groups[index];gallery.append(heading);
          if(p.groupDescriptions?.[index]){const description=document.createElement('p');description.className='sp-gallery-description';description.textContent=p.groupDescriptions[index];gallery.append(description)}
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
      if(!publications.hidden){const heading=document.createElement('h3');heading.className='sp-release-heading';heading.textContent=ui('publications');publications.prepend(heading)}
      let row=[];
      function centerRow(){if(row.length%2)row.at(-1).classList.add('sp-media-single');row=[]}
      for(const child of gallery.children){
        if(child.tagName!=='FIGURE'||child.style.gridColumn){centerRow();continue}
        row.push(child);
      }
      centerRow();
      home.hidden=true;detail.hidden=false;
      root.scrollIntoView({block:'start',behavior:'auto'});root.querySelector('[data-return]').focus({preventScroll:true});
      announce('Проект: '+p.title);
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
      previous=button;
      navigateWithLogo('#project-'+button.dataset.project,'Открываем проект',button);
    }));
    root.querySelectorAll('[data-jump]').forEach(button=>button.addEventListener('click',()=>jump(button.dataset.jump)));
    root.querySelector('[data-home]').addEventListener('click',()=>{cancelPending();history.pushState(null,'',location.pathname+location.search);route();root.scrollIntoView({block:'start',behavior:'auto'})});
    root.querySelector('[data-return]').addEventListener('click',()=>navigateWithLogo('#sp-work','Возвращаемся к работам'));
    root.addEventListener('keydown',event=>{
      if(event.key!=='Escape')return;
      if(!transition.hidden){event.preventDefault();cancelPending();previous?.focus({preventScroll:true});return}
      if(!viewer.open&&!detail.hidden)root.querySelector('[data-return]').click();
    });
    window.addEventListener('hashchange',route);
    window.addEventListener('popstate',route);
    setZoom(false);
    route();
  })();
