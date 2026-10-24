import numpy as np, math, wave
from PIL import Image, ImageFilter
OUT='/root/rv/lab-assets/'
INK=np.array([0x24,0x23,0x21],np.float32); PAPER=np.array([0xF5,0xF0,0xE7],np.float32)
rng=np.random.default_rng(7)

def smooth(a,b,x):
    t=np.clip((x-a)/(b-a),0,1); return t*t*(3-2*t)

def halftone_cutout(src, out, height, crop=None, cell=7.0, angle=45, contrast=1.25, border=12):
    im=Image.open(src).convert('RGBA')
    if crop: im=im.crop(crop)
    w=int(im.width*height/im.height); im=im.resize((w,height),Image.LANCZOS)
    a=np.asarray(im).astype(np.float32)/255
    rgb,alpha=a[...,:3],a[...,3]
    g=0.299*rgb[...,0]+0.587*rgb[...,1]+0.114*rgb[...,2]
    g=np.clip((g-0.5)*contrast+0.55,0,1)
    dark=1-g
    H,W=g.shape; yy,xx=np.mgrid[0:H,0:W].astype(np.float32)
    th=math.radians(angle); u=xx*math.cos(th)+yy*math.sin(th); v=-xx*math.sin(th)+yy*math.cos(th)
    cu=(np.floor(u/cell)+0.5)*cell; cv=(np.floor(v/cell)+0.5)*cell
    d=np.sqrt((u-cu)**2+(v-cv)**2)
    r=np.sqrt(np.clip(dark,0,1))*cell*0.72
    ink=1-smooth(r-0.7,r+0.7,d)
    # keep some continuous tone in deep shadows for readability
    ink=np.clip(ink*0.9+smooth(0.7,0.95,dark)*0.6,0,1)
    col=PAPER[None,None,:]*(1-ink[...,None])+INK[None,None,:]*ink[...,None]
    # white sticker border via dilation
    al=Image.fromarray((alpha*255).astype(np.uint8))
    hard=al.point(lambda p:255 if p>110 else 0)
    big=hard.filter(ImageFilter.MaxFilter(border*2+1)).filter(ImageFilter.GaussianBlur(1.2))
    pad=border+4
    canvas=np.zeros((H+2*pad,W+2*pad,4),np.float32)
    bigA=np.asarray(big.resize((W,H)) if big.size!=(W,H) else big).astype(np.float32)/255
    canvas[pad:pad+H,pad:pad+W,:3]=255; canvas[pad:pad+H,pad:pad+W,3]=bigA
    # expand border beyond original bounds: recompute on padded canvas
    hardp=Image.new('L',(W+2*pad,H+2*pad),0); hardp.paste(hard,(pad,pad))
    bigp=np.asarray(hardp.filter(ImageFilter.MaxFilter(border*2+1)).filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32)/255
    canvas[...,:3]=255; canvas[...,3]=bigp
    sub=canvas[pad:pad+H,pad:pad+W]
    m=alpha[...,None]
    sub[...,:3]=sub[...,:3]*(1-m)+col*m
    Image.fromarray(np.clip(canvas*[1,1,1,255],0,255).astype(np.uint8),'RGBA').save(OUT+out)
    print('saved',out,canvas.shape)

# people (cut-outs from the user's two AI character images)
halftone_cutout('/root/rv/collage-assets/chi_cut.png','office_girl.png',1100)
em=Image.open('/root/rv/collage-assets/em_cut.png'); 
halftone_cutout('/root/rv/collage-assets/em_cut.png','student_girl.png',1100,crop=(0,0,int(em.width*0.94),em.height))
chi=Image.open('/root/rv/collage-assets/chi_cut.png')
halftone_cutout('/root/rv/collage-assets/chi_cut.png','natural_face.png',820,crop=(int(chi.width*0.12),int(chi.height*0.08),int(chi.width*0.62),int(chi.height*0.52)),cell=6.0)

# ---------- procedural unbranded lipstick (2x supersampled) ----------
def lipstick(out, bullet=(0xD9,0x45,0x3D), body=(0x8B,0x30,0x42)):
    S=2; W,H=460*S,1340*S
    img=np.zeros((H,W,4),np.float32)
    yy,xx=np.mgrid[0:H,0:W].astype(np.float32)
    L=np.array([-0.5,0.0,0.86]); L=L/np.linalg.norm(L)
    def cyl(x0,x1,y0,y1,color,metal=False,gloss=0.6,top=None):
        cx=(x0+x1)/2; hw=(x1-x0)/2
        nx=(xx-cx)/hw
        mask=(np.abs(nx)<=1)&(yy>=y0)&(yy<=y1)
        if top is not None: mask&=top(xx,yy)
        nz=np.sqrt(np.clip(1-nx**2,0,1))
        diff=np.clip(nx*L[0]+nz*L[2],0,1)
        spec=np.clip(diff,0,1)**(60 if not metal else 18)
        base=np.array(color,np.float32)/255
        if metal:
            band=0.55+0.45*np.cos(nx*3.2+0.8)
            c=base[None,None,:]*(0.35+0.9*diff[...,None]*band[...,None])+spec[...,None]*0.9
        else:
            c=base[None,None,:]*(0.28+0.85*diff[...,None])+spec[...,None]*gloss
        rim=smooth(0.86,1.0,np.abs(nx))[...,None]
        c=c*(1-0.35*rim)
        aa=1-smooth(0.985,1.0,np.abs(nx))
        a=(mask*aa)
        img[...,:3]=img[...,:3]*(1-a[...,None])+np.clip(c,0,1)*a[...,None]
        img[...,3]=np.maximum(img[...,3],a)
    gold=(0xC9,0xA4,0x5C)
    cx=W/2
    cyl(cx-200*S,cx+200*S,700*S,1320*S,body,gloss=0.55)          # body
    cyl(cx-205*S,cx+205*S,680*S,712*S,gold,metal=True)           # collar ring
    cyl(cx-150*S,cx+150*S,430*S,690*S,gold,metal=True)           # inner sleeve
    slope=lambda X,Y: Y>=(120*S+(X-(cx-130*S))/(260*S)*(-0)+ (cx+130*S-X)/(260*S)*150*S)
    cyl(cx-128*S,cx+128*S,110*S,440*S,bullet,gloss=0.85,top=slope)  # bullet with slanted tip
    # slanted face highlight
    face=(yy>=110*S)&(np.abs(xx-cx)<=128*S)
    tip_y=120*S+(cx+130*S-xx)/(260*S)*150*S
    fm=face&(yy>=tip_y)&(yy<=tip_y+14*S)
    img[fm,:3]=np.clip(img[fm,:3]*1.25+0.06,0,1)
    # grain
    img[...,:3]=np.clip(img[...,:3]+rng.normal(0,0.018,(H,W,1)),0,1)
    im=Image.fromarray((img*255).astype(np.uint8),'RGBA').resize((W//S,H//S),Image.LANCZOS)
    im.save(OUT+out); print('saved',out,im.size)
lipstick('lipstick.png')

# ---------- textures ----------
def paper_grain(out,w=1080,h=1920):
    n=rng.normal(0,1,(h//2,w//2)).astype(np.float32)
    im=Image.fromarray(np.uint8(np.clip(128+n*10,0,255))).resize((w,h),Image.BICUBIC).filter(ImageFilter.GaussianBlur(0.6))
    a=np.asarray(im).astype(np.float32)
    # fibers
    for _ in range(900):
        x,y=rng.integers(0,w),rng.integers(0,h); L=rng.integers(8,40); ang=rng.uniform(0,math.pi)
        for t in range(L):
            px=int(x+t*math.cos(ang)); py=int(y+t*math.sin(ang))
            if 0<=px<w and 0<=py<h: a[py,px]-=rng.uniform(6,16)
    big=rng.normal(0,1,(h//60,w//60)).astype(np.float32)
    blot=np.asarray(Image.fromarray(np.uint8(np.clip(128+big*30,0,255))).resize((w,h),Image.BICUBIC)).astype(np.float32)-128
    a=np.clip(a+blot*0.35,0,255)
    Image.fromarray(a.astype(np.uint8)).save(OUT+out); print('saved',out)
paper_grain('paper_grain.png')
for i in range(3):
    n=rng.normal(128,34,(480,270)).astype(np.float32)
    Image.fromarray(np.uint8(np.clip(n,0,255))).resize((1080,1920),Image.NEAREST).save(OUT+f'grain_{i}.png')
print('grain frames ok')

def crumple(out,w=900,h=520):
    pts=rng.uniform(0,1,(70,2))*[w,h]
    yy,xx=np.mgrid[0:h,0:w]
    d=np.full((h,w),1e9); idx=np.zeros((h,w),int); d2=np.full((h,w),1e9)
    for i,(px,py) in enumerate(pts):
        dd=(xx-px)**2+(yy-py)**2
        m=dd<d; d2=np.where(m,d,np.minimum(d2,dd)); idx=np.where(m,i,idx); d=np.where(m,dd,d)
    shade=rng.uniform(0.82,1.08,len(pts))[idx]
    edge=smooth(0,90,np.sqrt(d2)-np.sqrt(d))
    v=shade*(0.9+0.1*edge)
    im=Image.fromarray(np.uint8(np.clip(v*235,0,255))).filter(ImageFilter.GaussianBlur(1.4))
    im.save(OUT+out); print('saved',out)
crumple('crumple.png')

# ---------- synthesized SFX (self-made, no licensing issues) ----------
SR=48000
def wav(name,x):
    x=x/ (np.max(np.abs(x))+1e-9)*0.85
    y=(x*32767).astype(np.int16)
    with wave.open(OUT+name,'wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes())
def env(n,a,d): t=np.arange(n)/SR; return np.minimum(t/a,1)*np.exp(-t/d)
def lp(x,k): return np.convolve(x,np.ones(k)/k,'same')
def hp(x,k): return x-lp(x,k)
n=int(0.35*SR); t=np.arange(n)/SR
wav('sfx_paper_impact.wav', np.sin(2*np.pi*(70+40*np.exp(-t*30))*t)*env(n,0.002,0.07)*0.9 + lp(rng.normal(0,1,n),6)*env(n,0.001,0.04)*0.5)
n=int(0.55*SR); x=np.zeros(n)
for _ in range(60):
    s=rng.integers(0,n-2000); L=rng.integers(200,1500); x[s:s+L]+=hp(rng.normal(0,1,L),5)*rng.uniform(0.2,1)*np.hanning(L)
wav('sfx_crumple.wav',x*env(n,0.01,0.3))
n=int(0.42*SR); t=np.arange(n)/SR; noise=rng.normal(0,1,n)
rip=hp(noise,3)*(0.5+0.5*np.sign(np.sin(2*np.pi*(40+300*t)*t)))*np.minimum(t/0.03,1)*np.exp(-np.maximum(t-0.25,0)*25)
wav('sfx_rip.wav',rip)
n=int(0.12*SR); t=np.arange(n)/SR
wav('sfx_pop.wav', np.sin(2*np.pi*(900*np.exp(-t*25)+180)*t)*env(n,0.001,0.035))
n=int(0.3*SR); t=np.arange(n)/SR
wav('sfx_stamp.wav', np.sin(2*np.pi*55*t)*env(n,0.001,0.09)*1.0 + lp(rng.normal(0,1,n),3)*env(n,0.001,0.025)*0.8)
n=int(0.32*SR); t=np.arange(n)/SR
flip=lp(rng.normal(0,1,n),2)*np.sin(np.pi*np.clip(t/0.32,0,1))**2*(0.6+0.4*np.sin(2*np.pi*22*t))
wav('sfx_page_flip.wav',flip)
n=int(0.6*SR); t=np.arange(n)/SR; x=rng.normal(0,1,n); k=np.clip((12-10*np.sin(np.pi*t/0.6)).astype(int),2,14)
y=np.array([x[max(0,i-k[i]):i+1].mean() for i in range(n)])
wav('sfx_whoosh.wav',y*np.sin(np.pi*t/0.6)**2)
n=int(0.05*SR); t=np.arange(n)/SR
wav('sfx_tick.wav',np.sin(2*np.pi*2400*t)*env(n,0.0005,0.008))
print('sfx ok')
