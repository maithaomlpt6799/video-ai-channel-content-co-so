import json,sys,base64
src,out=sys.argv[1],sys.argv[2]
d=json.load(open(src))
open(out,'wb').write(base64.b64decode(d['audio_base64']))
print(json.dumps({k:d[k] for k in d if k!='audio_base64'}))
