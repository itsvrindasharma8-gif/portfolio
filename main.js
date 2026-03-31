/* main.js — shared across all pages */
(function(){
  /* ── Canvas Particles ── */
  var cvs=document.getElementById('bgCanvas');
  if(cvs&&window.matchMedia('(hover:hover)').matches){
    var ctx=cvs.getContext('2d'),W,H,pts=[];
    var COLS=window.PARTICLE_COLORS||['#e85d75','#00b4a6','#7c5cbf','#f7a325'];
    var COUNT=window.PARTICLE_COUNT||80;
    function resize(){W=cvs.width=window.innerWidth;H=cvs.height=window.innerHeight}
    resize();window.addEventListener('resize',resize);
    function P(){this.reset()}
    P.prototype.reset=function(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-.5)*.35;this.vy=(Math.random()-.5)*.35;this.r=Math.random()*1.6+.4;this.col=COLS[Math.floor(Math.random()*COLS.length)];this.a=Math.random()*.5+.15};
    P.prototype.update=function(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset()};
    P.prototype.draw=function(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=this.col+Math.floor(this.a*255).toString(16).padStart(2,'0');ctx.fill()};
    for(var i=0;i<COUNT;i++)pts.push(new P());
    var lines=!!window.PARTICLE_LINES;
    (function frame(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<pts.length;i++){
        pts[i].update();pts[i].draw();
        if(lines){
          for(var j=i+1;j<pts.length;j++){
            var d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
            if(d<110){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle='rgba(232,93,117,'+(0.1*(1-d/110))+')';ctx.lineWidth=.5;ctx.stroke()}
          }
        }
      }
      requestAnimationFrame(frame);
    })();
  }

  /* ── Scroll Reveal ── */
  var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.1});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el)});

  /* ── Auto-discover Animation Observers ──
     Elements with data-anim-target get an IntersectionObserver
     that animates children when the container scrolls into view.
     data-anim-target=".selector"  — child elements to animate
     data-anim-prop="width"        — CSS property to set (default: width)
     data-anim-attr="w"            — data-* attribute to read value from (default: w)
  */
  document.querySelectorAll('[data-anim-target]').forEach(function(container){
    var target=container.dataset.animTarget;
    var prop=container.dataset.animProp||'width';
    var attr=container.dataset.animAttr||'w';
    var o=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.querySelectorAll(target).forEach(function(el){
            el.style[prop]=(el.dataset[attr]||0)+'%';
          });
          o.unobserve(e.target);
        }
      });
    },{threshold:.3});
    o.observe(container);
  });
})();
