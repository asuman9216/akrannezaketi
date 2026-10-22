const fs=require('fs'),vm=require('vm'),assert=require('assert');
const base='C:/Users/ASUMAN/Desktop/hikayem/akran-nezaketi-web/';
function element(){return {hidden:false,children:[],attrs:{},classList:{toggle(){},remove(){}},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]},addEventListener(k,f){this[k]=f},append(e){this.children.push(e)},textContent:''}}
function run(videoUrl){
 const els={};const get=s=>els[s]??=(element());
 const pages=['kahramanlar','hikaye','sahneler','video'].map(id=>Object.assign(element(),{id}));
 const links=pages.map(p=>Object.assign(element(),{hash:'#'+p.id}));
 const document={querySelector:get,querySelectorAll:s=>s==='.page'?pages:links,createElement:element,addEventListener(){}};
 const context={document,location:{hash:''},window:{SITE_CONFIG:{videoUrl},addEventListener(){},scrollTo(){}},URL,clearInterval,setInterval};
 vm.createContext(context);vm.runInContext(fs.readFileSync(base+'app.js','utf8'),context);
 assert.equal(get('#scene-image').src,'assets/1.png');
 get('#next').click();assert.equal(get('#slide-number').textContent,'02');
 get('#previous').click();get('#previous').click();assert.equal(get('#slide-number').textContent,'04');
 context.location.hash='#sahneler';vm.runInContext('navigate()',context);assert.equal(pages[2].hidden,false);assert.equal(pages[0].hidden,true);
 context.location.hash='#unknown';vm.runInContext('navigate()',context);assert.equal(pages[0].hidden,false);
 for(const file of ['1','2','3','4'])assert(fs.existsSync(base+'assets/'+file+'.png'));
 if(videoUrl.startsWith('https:')){assert.equal(get('#video-link').href,videoUrl);assert.equal(get('#video-link').hidden,false);assert.equal(get('#video-pending').hidden,true)}
 else assert(!get('#video-link').href);
}
run('');run('https://example.com/film');run('javascript:alert(1)');
console.log('PASS: scene navigation, wraparound, section routing, all four assets, empty/valid/unsafe video links.');
