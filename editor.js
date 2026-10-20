(async()=>{
  'use strict';
  const api=window.PORTFOLIO_TEXT,$=selector=>document.querySelector(selector);
  const form=$('#fields'),selector=$('#section'),frame=$('#preview'),status=$('#save-status');
  let base,copy,section='home',saveTimer,previewTimer;
  const labels={home:'Главная',about:'Обо мне',footer:'Шапка и подвал',ui:'Кнопки и подписи'};
  const homeFields={
    home:[['heading','Главный заголовок',3,'Enter переносит текст на новую строку.'],['intro','Основной текст',6],['introExtra','Дополнительный абзац',4],['heroCaption','Подпись под панорамой'],['worksTitle','Заголовок раздела работ'],['worksLabel','Подзаголовок раздела работ']],
    about:[['aboutTitle','Заголовок'],['aboutEyebrow','Подпись над заголовком'],['aboutIntro','Первый абзац',5],['aboutExtra','Второй абзац',5]],
    footer:[['brandName','Имя в шапке'],['footerName','Имя в подвале'],['footerRole','Профессия в подвале'],['footerNote','Дополнительная подпись'],['siteTitle','Название вкладки браузера'],['metaDescription','Описание сайта для поиска',4]]
  };
  const uiFields={navWork:'Пункт меню «Работы»',navAbout:'Пункт меню «Обо мне»',viewWork:'Переход к работам',openProject:'Открытие проекта',back:'Возврат к работам',client:'Название поля «Клиент»',personal:'Название поля личного проекта',role:'Название поля с твоим вкладом',format:'Название поля с форматом',publications:'Заголовок публикаций',release:'Ссылка на релиз',zoom:'Увеличить изображение',fit:'Показать изображение целиком',original:'Открыть исходное изображение',close:'Закрыть просмотр'};
  function notice(message){$('#notice').textContent=message;$('#notice').hidden=!message}
  function report(message,error=false){status.textContent=message;status.style.color=error?'#b83222':''}
  function rebase(remote,local,old,path='',conflicts=[]){
    if(typeof remote==='string'){
      if(local===old||typeof local!=='string')return remote;
      if(remote!==old&&remote!==local)conflicts.push(path);
      return local;
    }
    if(typeof remote==='number')return remote;
    const result=Array.isArray(remote)?[]:{};
    for(const key of Object.keys(remote))result[key]=rebase(remote[key],local?.[key],old?.[key],path?path+'.'+key:key,conflicts);
    return result;
  }
  function save(){
    clearTimeout(saveTimer);
    try{localStorage.setItem(api.DRAFT_KEY,JSON.stringify({version:1,savedAt:new Date().toISOString(),baseCopy:base,copy}));report('Черновик сохранён на этом устройстве · '+new Date().toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'}))}
    catch{report('Браузер не сохранил черновик. Скачай его копию.',true)}
    sendPreview();
  }
  function sendPreview(){
    const preview=frame.contentWindow;
    if(!preview?.PORTFOLIO_TEXT?.published)return;
    preview.PORTFOLIO_TEXT.apply(copy);
    preview.dispatchEvent(new preview.Event('portfolio-text-updated'));
  }
  function changed(){
    report('Сохраняю черновик…');clearTimeout(saveTimer);saveTimer=setTimeout(save,250);
    clearTimeout(previewTimer);previewTimer=setTimeout(sendPreview,180);
  }
  function get(path){return path.reduce((value,key)=>value[key],copy)}
  function set(path,value){const parent=path.slice(0,-1).reduce((obj,key)=>obj[key],copy);parent[path.at(-1)]=value}
  function field(container,path,title,rows=0,hint=''){
    const label=document.createElement('label'),name=document.createElement('span'),input=document.createElement(rows?'textarea':'input');
    label.className='field';name.textContent=title;input.value=get(path);input.maxLength=12000;input.dataset.path=path.join('.');
    if(rows)input.rows=rows;else input.type='text';
    input.addEventListener('input',()=>{
      set(path,input.value);
      if(path[0]==='projects'&&path[2]==='title'){
        $('#section-title').textContent=input.value||'Проект без названия';
        document.querySelectorAll('#section-list button').forEach(button=>{if(button.dataset.section===path[1])button.textContent=input.value||'Проект без названия'});
        for(const option of selector.options)if(option.value===path[1])option.textContent=input.value||'Проект без названия';
      }
      changed();
    });label.append(name,input);
    if(hint){const small=document.createElement('small');small.textContent=hint;label.append(small)}container.append(label);
  }
  function details(title){const node=document.createElement('details'),summary=document.createElement('summary');summary.textContent=title;node.append(summary);form.append(node);return node}
  function sectionTitle(key){return labels[key]||copy.projects[key].title||'Проект без названия'}
  function render(){
    form.replaceChildren();$('#section-title').textContent=sectionTitle(section);
    document.querySelectorAll('#section-list button').forEach(button=>{if(button.dataset.section===section)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current')});selector.value=section;
    if(homeFields[section])for(const[key,title,rows,hint]of homeFields[section])field(form,['home',key],title,rows,hint);
    else if(section==='ui')for(const[key,title]of Object.entries(uiFields))field(form,['ui',key],title);
    else{
      const p=copy.projects[section];
      for(const[key,title,rows,hint]of [['title','Название проекта'],['description','Описание проекта',7,'Можно разделять абзацы пустой строкой.'],['cardLabel','Подпись на карточке главной страницы'],['label','Подпись над названием проекта']])field(form,['projects',section,key],title,rows,hint);
      const meta=details('Клиент, твой вклад и формат');
      for(const[key,title]of [['client','Клиент или личный проект'],['role','Твой вклад'],['format','Формат работы']])field(meta,['projects',section,key],title);
      if(Object.keys(p.groups).length||Object.keys(p.subheadings).length){
        const groups=details('Заголовки внутри проекта');
        for(const group of ['groups','subheadings'])for(const key of Object.keys(p[group]))field(groups,['projects',section,group,key],group==='groups'?'Раздел '+(Number(key)+1):'Подзаголовок');
      }
      const captions=details('Подписи к изображениям');
      p.captions.forEach((caption,i)=>{
        const row=document.createElement('div'),img=document.createElement('img'),number=document.createElement('span');row.className='caption-heading';img.src=window.PORTFOLIO_DATA.previews[window.PORTFOLIO_DATA.projects[section].media[i][0]];img.alt='';img.loading='lazy';number.textContent='Изображение '+(i+1);row.append(img,number);captions.append(row);field(captions,['projects',section,'captions',i],'Подпись '+(i+1));
      });
      if(p.releaseContexts.length){const releases=details('Подписи к публикациям');p.releaseContexts.forEach((_,i)=>field(releases,['projects',section,'releaseContexts',i],'Публикация '+(i+1)))}
    }
  }
  function previewUrl(){
    const url=new URL('./',location.href);url.searchParams.set('text-preview','1');url.hash=copy.projects[section]?'project-'+section:section==='about'?'sp-about':section==='ui'?'project-imagination-flood':'';return url;
  }
  function goToSection(key){
    save();section=key;render();const url=previewUrl();frame.src=url.href;$('#full-preview').href=url.href;
  }
  function navigation(){
    $('#section-list').replaceChildren();selector.replaceChildren();
    for(const key of ['home',...Object.keys(copy.projects),'about','footer','ui']){
      const title=sectionTitle(key),option=document.createElement('option'),button=document.createElement('button');option.value=key;option.textContent=title;selector.append(option);button.type='button';button.textContent=title;button.dataset.section=key;button.addEventListener('click',()=>goToSection(key));$('#section-list').append(button);
    }
  }
  function download(){save();const blob=new Blob([JSON.stringify(copy,null,2)+'\n'],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='site-text.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
  $('#export').addEventListener('click',download);
  selector.addEventListener('change',()=>goToSection(selector.value));
  $('#import').addEventListener('click',()=>$('#import-file').click());
  $('#import-file').addEventListener('change',async event=>{
    const file=event.target.files[0];if(!file)return;
    try{if(file.size>2*1024*1024)throw new Error('Файл слишком большой.');const value=JSON.parse(await file.text()),loaded=value.copy||value;if(loaded.version!==1||!loaded.home||!loaded.projects)throw new Error('Это не файл текстов портфолио.');copy=api.normalize(loaded,base);save();navigation();render();sendPreview();notice('Черновик загружен. Проверь тексты перед публикацией.')}
    catch(error){notice('Не удалось загрузить черновик: '+error.message)}event.target.value='';
  });
  $('#reset').addEventListener('click',()=>$('#reset-dialog').showModal());
  $('#confirm-reset').addEventListener('click',async()=>{
    try{base=await api.fetchPublished();copy=api.clone(base);save();navigation();render();sendPreview();notice('Загружены опубликованные тексты.');$('#reset-dialog').close()}
    catch(error){notice(error.message);$('#reset-dialog').close()}
  });
  $('#publish').addEventListener('click',async()=>{
    save();$('#publish').disabled=true;
    try{
      const latest=await api.fetchPublished();
      if(JSON.stringify(latest)!==JSON.stringify(base)){
        const conflicts=[];copy=rebase(latest,copy,base,'',conflicts);base=latest;save();navigation();render();sendPreview();notice('На сайте появились новые тексты. Твои правки сохранены, остальные тексты обновлены. '+(conflicts.length?'Есть пересекающиеся правки: '+conflicts.length+'. ':'')+'Проверь результат и ещё раз нажми «Опубликовать».');return;
      }
      $('#publish-data').value=JSON.stringify(copy,null,2)+'\n';$('#copy-status').textContent='';$('#publish-dialog').showModal();
    }catch(error){notice('Не удалось проверить опубликованные тексты: '+error.message)}finally{$('#publish').disabled=false}
  });
  $('#copy-publish').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText($('#publish-data').value);$('#copy-status').textContent='Скопировано. Теперь открой GitHub и вставь правки.'}
    catch{$('#manual-copy').open=true;$('#publish-data').focus();$('#publish-data').select();$('#copy-status').textContent='Нажми Ctrl+C или ⌘C, чтобы скопировать выделенный текст.'}
  });
  $('#select-all').addEventListener('click',()=>{$('#publish-data').focus();$('#publish-data').select()});
  document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
  $('#mobile-preview').addEventListener('click',()=>{const active=$('#workspace').classList.toggle('preview-only');$('#mobile-preview').textContent=active?'Вернуться к полям':'Предпросмотр'});
  form.addEventListener('submit',event=>event.preventDefault());
  frame.addEventListener('load',sendPreview);
  addEventListener('message',event=>{if(event.origin===location.origin&&event.source===frame.contentWindow&&event.data?.type==='portfolio-text-ready')sendPreview()});
  addEventListener('pagehide',()=>{if(copy)save()});
  try{
    base=await api.fetchPublished();const saved=api.draft();
    if(saved){const conflicts=[];copy=saved.baseCopy?rebase(base,api.normalize(saved.copy,base),saved.baseCopy,'',conflicts):api.normalize(saved.copy,base);if(conflicts.length)notice('На сайте и в черновике изменены одни и те же поля. Восстановлен твой текст; проверь его перед публикацией.');}
    else copy=api.clone(base);
    navigation();goToSection(section);$('#workspace').setAttribute('aria-busy','false');for(const id of ['export','publish','reset','section'])$('#'+id).disabled=false;
  }catch(error){report('Не удалось открыть редактор.',true);$('#section-title').textContent='Тексты не загрузились';form.textContent='Обнови страницу и попробуй ещё раз. '+error.message;$('#workspace').setAttribute('aria-busy','false')}
})();
