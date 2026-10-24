import json, subprocess, numpy as np, wave
SR=48000
def load(f):
    raw=subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.int16).astype(np.float32)/32768
def save(f,x):
    y=(np.clip(x,-1,1)*32767).astype(np.int16)
    with wave.open(f,'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(y.tobytes())
# key cues (seconds, original timing) measured via Speko transcription word timestamps
CUES={
 's1':{'y_tuong':1.0,'ban2':2.2,'cong_thuc':3.1},
 's2':{'thoi_son':0.9,'mau_dep':3.5,'mem_moi':4.4,'de_dung':5.4,'xong':6.8,'bi_tiep':7.6},
 's3':{'doi_cach':0.1,'ai':1.3,'luc_nao':2.4,'ho_gap':3.7,'van_de':4.3},
 's4a':{'who':0.1,'voi':0.9,'idea':3.0,'headline':3.8},
 's4b':{'who':0.1,'moi_tap':1.0,'idea':2.6,'headline':3.5},
 's4c':{'who':0.1,'so_noi':1.5,'idea':3.3,'headline':4.9},
 's5a':{'thay_khong':0.1,'mot_thoi':1.0,'doi_tinh':2.6,'ba_huong':3.8},
 's5b':{'lan_toi':0.1,'dung_chi':1.5,'hay_nhin':3.1},
}
out={}
for sid,cues in CUES.items():
    x=load(f'/root/rv/vo2/{sid}.wav')
    hop=int(0.01*SR); n=len(x)//hop
    db=np.array([20*np.log10(np.sqrt(np.mean(x[i*hop:(i+1)*hop]**2))+1e-9) for i in range(n)])
    speech=db>-40
    idx=np.nonzero(speech)[0]; first,last=idx[0],idx[-1]
    # silent runs between first and last speech
    keep=[]  # list of (orig_start, orig_end) sample ranges to keep
    cur=max(0,first*hop-int(0.03*SR))
    i=first
    while i<=last:
        if not speech[i]:
            j=i
            while j<=last and not speech[j]: j+=1
            L=(j-i)*0.01
            if L>0.38:
                cut_a=i*hop+int(0.16*SR); cut_b=j*hop-int(0.16*SR)
                keep.append((cur,cut_a)); cur=cut_b
            i=j
        else: i+=1
    end=min(len(x),(last+1)*hop+int(0.12*SR))
    keep.append((cur,end))
    # assemble with 8ms crossfades
    parts=[x[a:b].copy() for a,b in keep]
    fade=int(0.008*SR)
    y=parts[0]
    for p in parts[1:]:
        r=np.linspace(0,1,fade)
        y[-fade:]=y[-fade:]*(1-r)+p[:fade]*r
        y=np.concatenate([y,p[fade:]])
    # time map
    def remap(t):
        s=t*SR; acc=0
        for k,(a,b) in enumerate(keep):
            if s<b:
                return (acc+max(0,s-a)-(k*fade))/SR
            acc+=b-a
        return (acc-len(keep)*fade)/SR
    save(f'/root/rv/vo2/final/{sid}_raw.wav',y)
    out[sid]={'duration':round(len(y)/SR,3),'cues':{k:round(max(0,remap(v)),3) for k,v in cues.items()}}
    print(sid, round(len(x)/SR,2),'->',out[sid]['duration'], out[sid]['cues'])
json.dump(out,open('/root/rv/vo2/final/timing.json','w'),indent=1)
print('total speech', round(sum(v['duration'] for v in out.values()),2))
