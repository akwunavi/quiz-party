from hy_load import *
import pickle
d=pickle.load(open('hy_M.pkl','rb')); M=d['M']
print('f51->#58',M[50,58-40],'f51->#63',M[50,63-40])
cand=[(M[i,n-40,0],M[i,n-40,1],i+1,n) for i in range(73) for n in range(40,99) if M[i,n-40,0]>=0.75 and M[i,n-40,1]<=40]
print(len(cand))
for c in sorted(cand,key=lambda t:(t[2],t[3])): print('f%d->#%d %.3f %.1f cx %.0f->%.0f'%(c[2],c[3],c[0],c[1],d['cx'][c[2]-1],d['Rcx'][c[3]]))
print('cx per clip frame',[round(x) for x in d['cx']])
