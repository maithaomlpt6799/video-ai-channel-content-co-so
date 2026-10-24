# Voice patch Ep01 v2: pickup mới (Speko) + đoạn cũ giữ lại. Nén khoảng lặng, chuẩn hoá -15 LUFS, xuất mốc cue.
import json, subprocess, numpy as np, wave
SR=48000
def load(f):
    raw=subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.int16).astype(np.float32)/32768
def save(f,x):
    y=(np.clip(x,-1,1)*32767).astype(np.int16)
    with wave.open(f,'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes())
def compress(x, maxgap=0.38, keep_each=0.16):
    hop=int(0.01*SR); n=len(x)//hop
    db=np.array([20*np.log10(np.sqrt(np.mean(x[i*hop:(i+1)*hop]**2))+1e-9) for i in range(n)])
    sp=db>-40; idx=np.nonzero(sp)[0]; first,last=idx[0],idx[-1]
    keep=[]; cur=max(0,first*hop-int(0.03*SR)); i=first
    while i<=last:
        if not sp[i]:
            j=i
            while j<=last and not sp[j]: j+=1
            if (j-i)*0.01>maxgap:
                keep.append((cur,i*hop+int(keep_each*SR))); cur=j*hop-int(keep_each*SR)
            i=j
        else: i+=1
    keep.append((cur,min(len(x),(last+1)*hop+int(0.12*SR))))
    fade=int(0.008*SR); parts=[x[a:b].copy() for a,b in keep]; y=parts[0]
    for p in parts[1:]:
        r=np.linspace(0,1,fade); y[-fade:]=y[-fade:]*(1-r)+p[:fade]*r; y=np.concatenate([y,p[fade:]])
    def remap(t):
        s=t*SR; acc=0
        for k,(a,b) in enumerate(keep):
            if s<b: return (acc+max(0,s-a)-k*fade)/SR
            acc+=b-a
        return (acc-len(keep)*fade)/SR
    return y, remap
def f0_median(x):
    fr=int(0.04*SR); hop=int(0.02*SR); out=[]
    for i in range(0,len(x)-fr,hop):
        s=x[i:i+fr]
        if np.sqrt(np.mean(s**2))<0.03: continue
        s=s-s.mean(); ac=np.correlate(s,s,'full')[fr-1:]
        lo,hi=int(SR/400),int(SR/120); k=lo+np.argmax(ac[lo:hi])
        if ac[k]>0.4*ac[0]: out.append(SR/k)
    return float(np.median(out)) if out else 0
def loudnorm(src,dst,I=-15):
    subprocess.run(['ffmpeg','-v','error','-y','-i',src,'-af',f'loudnorm=I={I}:TP=-1.5:LRA=7','-ar',str(SR),'-ac','1',dst],check=True)

# Mốc từ Speko transcription (word timestamps, giây) của từng pickup
PICK={
 'hookA':({'son':0.5,'ba':1.8,'angle':2.5,'tin':4.2},0.38),
 'hookB':({'content':0.7,'co_khi':2.0,'sai':3.8},0.38),
 'p2a':({'thoi_son':0.8,'do':1.3},0.38),
 'p2b':({'muon':0.1,'noi_bat':1.1,'son_do':2.3,'ba_hoang':3.2,'moi_mau':3.9},0.5),
 'p2c':({'muon':0.1,'gan_gui':0.8,'day_muon':2.2,'phut':3.0,'xinh':3.6},0.5),
 'p2d':({'muon':0.0,'dinh_kien':0.6,'ai_bao':2.1,'chi_dep':3.7},0.5),
 'p2e':({'do':0.1,'san_pham':1.1,'insight':2.5,'cach_ke':3.2,'ba':4.7,'angle':5.5},0.38),
 'p3':({'insight':0.5,'cach_ke':1.3},0.38),
}
out={}
for sid,(cues,gap) in PICK.items():
    x=load(f'/root/rv/vo3/{sid}.wav')
    y,remap=compress(x,maxgap=gap,keep_each=0.2 if gap>0.4 else 0.16)
    save(f'/root/rv/vo3/final/{sid}_c.wav',y)
    loudnorm(f'/root/rv/vo3/final/{sid}_c.wav',f'/root/rv/vo3/final/{sid}.wav')
    z=load(f'/root/rv/vo3/final/{sid}.wav')
    out[sid]={'duration':round(len(z)/SR,3),'cues':{k:round(max(0,remap(v)),3) for k,v in cues.items()},'src':'pickup'}
    print(sid, round(len(x)/SR,2),'->',out[sid]['duration'], 'f0', round(f0_median(z)))

# Đoạn cũ giữ lại (đã chuẩn hoá -15 LUFS từ bản trước)
old=json.load(open('/root/rv/remotion-video/src/ep01c/voice-timing.json'))
V='/root/rv/remotion-video/public/ep01c/voice'
for sid,cut in [('s1',None),('s2',None),('s3',0.95),('s5b',2.85)]:
    x=load(f'{V}/{sid}.wav')
    if cut:
        x=x[:int(cut*SR)].copy(); f=int(0.03*SR); x[-f:]*=np.linspace(1,0,f)
    key=sid if not cut else sid+'k'
    save(f'/root/rv/vo3/final/{key}.wav',x)
    cues={k:v for k,v in old[sid]['cues'].items() if not cut or v<cut}
    out[key]={'duration':round(len(x)/SR,3),'cues':cues,'src':'reuse'}
    print(key, out[key]['duration'], 'f0', round(f0_median(x)))
json.dump(out,open('/root/rv/vo3/final/timing.json','w'),indent=1,ensure_ascii=False)
