import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getMaintenanceWindow, getRetryAfterSeconds, isPublicAssetPath } from '@/lib/maintenanceMode';

const maintenanceHtml = (input: { pathname: string; until: number | null }) => {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const untilText = input.until ? new Date(input.until).toISOString() : '';
  const redirect = input.pathname !== '/maintenance';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Maintenance Mode | VANHSYA</title>
  <meta name="description" content="VANHSYA is temporarily under maintenance. Please check back shortly." />
  <meta name="robots" content="noindex,nofollow" />
  <meta name="theme-color" content="#0A0A10" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  ${redirect ? `<meta http-equiv="refresh" content="3;url=/maintenance?from=${encodeURIComponent(input.pathname)}" />` : ''}
  <style>
    :root{color-scheme:dark}
    *{box-sizing:border-box}
    body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; background:#0A0A10; color:#fff}
    .bg{position:fixed;inset:0;background:
      radial-gradient(circle at 20% 25%, rgba(245,199,106,.10), transparent 55%),
      radial-gradient(circle at 75% 25%, rgba(168,85,247,.18), transparent 55%),
      radial-gradient(circle at 50% 85%, rgba(99,102,241,.14), transparent 55%),
      linear-gradient(#000, #000); pointer-events:none}
    .wrap{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:88px 16px 56px}
    .card{width:min(1100px,100%);border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);backdrop-filter: blur(16px); border-radius:28px; padding:22px}
    .top{display:flex;gap:14px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap}
    .badge{display:inline-flex;align-items:center;gap:10px;padding:10px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);font-weight:900;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.75)}
    .h1{margin:14px 0 0;font-size:44px;line-height:1.02;letter-spacing:-.02em;font-weight:900;background:linear-gradient(90deg,#fff,#c7d2fe,#e9d5ff);-webkit-background-clip:text;background-clip:text;color:transparent}
    .p{margin:14px 0 0;max-width:760px;color:rgba(255,255,255,.70);font-size:16px;line-height:1.6}
    .grid{display:grid;grid-template-columns:1.6fr .9fr;gap:16px;margin-top:18px}
    @media (max-width: 980px){.grid{grid-template-columns:1fr}}
    .panel{border:1px solid rgba(255,255,255,.10);background:rgba(0,0,0,.22);border-radius:22px;padding:16px}
    .kpi{display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap}
    .k{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.55);font-weight:900}
    .v{font-weight:900;color:rgba(255,255,255,.92)}
    canvas{display:block;width:100%;height:320px;border-radius:18px;border:1px solid rgba(255,255,255,.10);background:rgba(0,0,0,.25)}
    .btns{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}
    a.btn,button.btn{border-radius:16px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);color:#fff;padding:12px 14px;font-weight:900;text-decoration:none;display:inline-flex;gap:10px;align-items:center}
    a.btn.primary,button.btn.primary{background:linear-gradient(90deg,#4f46e5,#7c3aed);border-color:rgba(255,255,255,.10)}
    .small{margin-top:12px;color:rgba(255,255,255,.55);font-size:12px;line-height:1.55}
    .links{display:grid;grid-template-columns:1fr;gap:10px;margin-top:14px}
    .link{padding:12px 14px;border-radius:18px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.03);text-decoration:none;color:#fff}
    .link b{display:block;font-size:14px}
    .link span{display:block;margin-top:4px;color:rgba(255,255,255,.60);font-size:12px}
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="wrap">
    <div class="card">
      <div class="top">
        <div>
          <div class="badge">Maintenance Mode · VANHSYA</div>
          <div class="h1">Systems are upgrading.</div>
          <div class="p">We’re improving reliability and performance. Play a quick round while you wait. If you were routed here from <b>${esc(
            input.pathname
          )}</b>, your request is safe to retry when we’re back.</div>
        </div>
        <div class="panel" style="min-width:260px">
          <div class="kpi">
            <div>
              <div class="k">Status</div>
              <div class="v">503 · Service Unavailable</div>
            </div>
            <div>
              <div class="k">Retry</div>
              <div class="v" id="retryAfter">${untilText ? esc(untilText) : 'Soon'}</div>
            </div>
          </div>
          <div class="btns">
            <a class="btn primary" href="/maintenance">Open arcade</a>
            <a class="btn" href="/">Home</a>
          </div>
          <div class="small">Tip: keep documents ready and avoid last-minute edits. VANHSYA never guarantees approvals.</div>
        </div>
      </div>

      <div class="grid">
        <div class="panel">
          <div class="kpi">
            <div class="k">Arcade</div>
            <div class="v"><span id="score">0</span> · best <span id="best">0</span></div>
          </div>
          <div style="margin-top:12px">
            <canvas id="c" width="980" height="320"></canvas>
          </div>
          <div class="btns">
            <button class="btn primary" id="start">Start</button>
            <button class="btn" id="pause">Pause</button>
            <button class="btn" id="reset">Reset</button>
          </div>
          <div class="small" id="hint">Use arrow keys or drag/touch to dodge. Collect sparks for +25.</div>
        </div>
        <div class="panel">
          <div class="k">Quick links</div>
          <div class="links">
            <a class="link" href="/ai-tools"><b>AI Tools</b><span>Practice, simulate, verify, and track progress</span></a>
            <a class="link" href="/countries"><b>Countries</b><span>Explore destinations and pathways</span></a>
            <a class="link" href="/contact"><b>Contact</b><span>Get help from the team</span></a>
            <a class="link" href="/api/health"><b>Health</b><span>System health endpoint (JSON)</span></a>
          </div>
          <div class="small">If you see repeated downtime, try again later. Avoid spamming retries.</div>
        </div>
      </div>
    </div>
  </div>
  <script>
    (function(){
      var c=document.getElementById('c'); if(!c) return;
      var ctx=c.getContext('2d'); if(!ctx) return;
      var scoreEl=document.getElementById('score'); var bestEl=document.getElementById('best'); var hintEl=document.getElementById('hint');
      var startBtn=document.getElementById('start'); var pauseBtn=document.getElementById('pause'); var resetBtn=document.getElementById('reset');
      var dpr=Math.max(1,window.devicePixelRatio||1);
      function resize(){
        var r=c.getBoundingClientRect();
        c.width=Math.floor(r.width*dpr); c.height=Math.floor(r.height*dpr);
        ctx.setTransform(dpr,0,0,dpr,0,0);
      }
      window.addEventListener('resize',resize,{passive:true}); resize();
      var key={}; window.addEventListener('keydown',function(e){key[e.key]=true; if(e.key===' '){e.preventDefault(); paused=!paused;}});
      window.addEventListener('keyup',function(e){key[e.key]=false;});
      var ptr={a:false,x:0,y:0};
      c.addEventListener('pointerdown',function(e){ptr.a=true;ptr.x=e.clientX;ptr.y=e.clientY;c.setPointerCapture(e.pointerId);});
      c.addEventListener('pointermove',function(e){if(!ptr.a)return;ptr.x=e.clientX;ptr.y=e.clientY;});
      c.addEventListener('pointerup',function(){ptr.a=false;}); c.addEventListener('pointercancel',function(){ptr.a=false;});
      var best=0; try{best=Number(localStorage.getItem('vanhsya.maint.best')||0)||0;}catch(e){}
      var running=false, paused=false, alive=true, score=0;
      var ship={x:.5,y:.74,vx:0,vy:0};
      var hazards=[], sparks=[], stars=[];
      function initStars(){
        stars=[]; for(var i=0;i<160;i++){stars.push({x:Math.random()*c.clientWidth,y:Math.random()*c.clientHeight,z:.3+Math.random()*.9});}
      }
      initStars();
      function clamp(n,a,b){return Math.max(a,Math.min(b,n));}
      function hit(ax,ay,ar,bx,by,br){var dx=ax-bx,dy=ay-by,rr=ar+br;return dx*dx+dy*dy<=rr*rr;}
      function reset(){
        running=false; paused=false; alive=true; score=0; ship={x:.5,y:.74,vx:0,vy:0}; hazards=[]; sparks=[];
        if(hintEl) hintEl.textContent='Reset complete. Start when ready.';
        if(scoreEl) scoreEl.textContent='0';
      }
      var last=performance.now(), spawnA=0, coinA=0;
      function step(t){
        var dt=Math.min(.045,Math.max(0,(t-last)/1000)); last=t;
        var w=c.clientWidth,h=c.clientHeight;
        for(var i=0;i<stars.length;i++){stars[i].y+=(18+60*stars[i].z)*dt; if(stars[i].y>h){stars[i].y=-2;stars[i].x=Math.random()*w;}}
        if(running && !paused && alive){
          var ax=(key.ArrowLeft?-1:0)+(key.ArrowRight?1:0)+(key.a?-1:0)+(key.d?1:0);
          var ay=(key.ArrowUp?-1:0)+(key.ArrowDown?1:0)+(key.w?-1:0)+(key.s?1:0);
          ship.vx=clamp(ship.vx+ax*dt*1.8,-.9,.9); ship.vy=clamp(ship.vy+ay*dt*1.8,-.9,.9);
          if(ptr.a){
            var rr=c.getBoundingClientRect();
            var px=(ptr.x-rr.left)/rr.width, py=(ptr.y-rr.top)/rr.height;
            ship.x+= (px-ship.x)*dt*6; ship.y+=(py-ship.y)*dt*6; ship.vx*=.6; ship.vy*=.6;
          }else{
            ship.x+=ship.vx*dt; ship.y+=ship.vy*dt;
          }
          ship.vx*=.92; ship.vy*=.92; ship.x=clamp(ship.x,.05,.95); ship.y=clamp(ship.y,.14,.92);
          spawnA+=dt*.95; while(spawnA>=1 && hazards.length<20){spawnA-=1; hazards.push({x:.06+Math.random()*.88,y:-.08,r:8+Math.random()*10,vx:(-0.18+Math.random()*0.36)*0.18,vy:0.38+Math.random()*0.7});}
          coinA+=dt*.6; while(coinA>=1 && sparks.length<6){coinA-=1; sparks.push({x:.08+Math.random()*.84,y:-.06,r:7,vy:0.42+Math.random()*0.5});}
          for(var j=0;j<hazards.length;j++){hazards[j].x+=hazards[j].vx*dt; hazards[j].y+=hazards[j].vy*dt; if(hazards[j].x<.03||hazards[j].x>.97)hazards[j].vx*=-1;}
          hazards=hazards.filter(function(o){return o.y<1.2});
          for(var k=0;k<sparks.length;k++){sparks[k].y+=sparks[k].vy*dt;}
          sparks=sparks.filter(function(o){return o.y<1.2});
          var sx=ship.x*w, sy=ship.y*h, sr=12;
          for(var m=0;m<hazards.length;m++){var hx=hazards[m].x*w, hy=hazards[m].y*h; if(hit(sx,sy,sr,hx,hy,hazards[m].r)){alive=false; running=false; if(hintEl) hintEl.textContent='Impact detected. Reset and try again.';}}
          for(var n=sparks.length-1;n>=0;n--){var cx=sparks[n].x*w, cy=sparks[n].y*h; if(hit(sx,sy,sr,cx,cy,sparks[n].r*2.2)){sparks.splice(n,1); score+=25;}}
          score+=10; if(score>best){best=score; try{localStorage.setItem('vanhsya.maint.best',String(best));}catch(e){}}
          if(scoreEl) scoreEl.textContent=String(score);
          if(bestEl) bestEl.textContent=String(best);
        }
        ctx.clearRect(0,0,w,h);
        var bg=ctx.createLinearGradient(0,0,w,h); bg.addColorStop(0,'#05050b'); bg.addColorStop(1,'#0a0a10'); ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
        var glow=ctx.createRadialGradient(w*.2,h*.25,40,w*.2,h*.25,w*.9); glow.addColorStop(0,'rgba(245,199,106,.10)'); glow.addColorStop(.45,'rgba(168,85,247,.14)'); glow.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=glow; ctx.fillRect(0,0,w,h);
        for(var s=0;s<stars.length;s++){ctx.globalAlpha=.35+.55*stars[s].z; ctx.fillStyle='rgba(255,255,255,.9)'; ctx.fillRect(stars[s].x,stars[s].y,1.2*stars[s].z,1.2*stars[s].z);}
        ctx.globalAlpha=1;
        for(var hh=0;hh<hazards.length;hh++){var x=hazards[hh].x*w,y=hazards[hh].y*h; ctx.fillStyle='rgba(255,255,255,.06)'; ctx.strokeStyle='rgba(255,255,255,.18)'; ctx.lineWidth=1; ctx.beginPath(); ctx.arc(x,y,hazards[hh].r,0,Math.PI*2); ctx.fill(); ctx.stroke();}
        for(var cc=0;cc<sparks.length;cc++){var px=sparks[cc].x*w,py=sparks[cc].y*h; var g=ctx.createRadialGradient(px,py,0,px,py,sparks[cc].r*2.4); g.addColorStop(0,'rgba(245,199,106,.95)'); g.addColorStop(.6,'rgba(245,199,106,.28)'); g.addColorStop(1,'rgba(245,199,106,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(px,py,sparks[cc].r*2.4,0,Math.PI*2); ctx.fill();}
        var shx=ship.x*w, shy=ship.y*h, shr=12;
        var sg=ctx.createRadialGradient(shx,shy,0,shx,shy,shr*3.2); sg.addColorStop(0,'rgba(99,102,241,.85)'); sg.addColorStop(.65,'rgba(168,85,247,.20)'); sg.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(shx,shy,shr*2.6,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='rgba(255,255,255,.92)'; ctx.beginPath(); ctx.moveTo(shx,shy-shr*1.25); ctx.lineTo(shx-shr,shy+shr*1.15); ctx.lineTo(shx+shr,shy+shr*1.15); ctx.closePath(); ctx.fill();
        requestAnimationFrame(step);
      }
      requestAnimationFrame(function(t){last=t;step(t);});
      if(bestEl) bestEl.textContent=String(best);
      if(startBtn) startBtn.addEventListener('click',function(){running=true; paused=false; alive=true; if(hintEl) hintEl.textContent='Dodge debris. Sparks add +25. Survive to grow score.';});
      if(pauseBtn) pauseBtn.addEventListener('click',function(){paused=!paused; if(hintEl) hintEl.textContent=paused?'Paused. Press Pause again to resume.':'Back online. Keep moving.';});
      if(resetBtn) resetBtn.addEventListener('click',reset);
      reset();
    })();
  </script>
</body>
</html>`;
};

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  if (isPublicAssetPath(pathname)) return NextResponse.next();

  const now = Date.now();
  const win = getMaintenanceWindow(process.env, now);
  if (!win.active) return NextResponse.next();

  if (pathname === '/api/health') return NextResponse.next();

  const retryAfterSeconds = getRetryAfterSeconds(win.until, now);

  if (pathname.startsWith('/api/')) {
    const body = JSON.stringify({
      status: 'maintenance',
      message: 'Service temporarily unavailable due to maintenance.',
      retryAfter: win.until ? new Date(win.until).toISOString() : null
    });
    return new NextResponse(body, {
      status: 503,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
        ...(retryAfterSeconds ? { 'retry-after': String(retryAfterSeconds) } : {})
      }
    });
  }

  const accept = req.headers.get('accept') || '';
  if (!accept.includes('text/html')) return NextResponse.next();

  const html = maintenanceHtml({ pathname, until: win.until });
  return new NextResponse(html, {
    status: 503,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow',
      ...(retryAfterSeconds ? { 'retry-after': String(retryAfterSeconds) } : {})
    }
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)']
};

