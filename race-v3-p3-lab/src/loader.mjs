import {readFileSync} from 'node:fs';
export function loadContract(relUrl,base=import.meta.url){
  const url=new URL(relUrl,base);
  const c=JSON.parse(readFileSync(url,'utf8'));
  if(c.shift?.arraysFile){
    const a=JSON.parse(readFileSync(new URL(c.shift.arraysFile,url),'utf8'));
    c.shift.arrays=Object.fromEntries(Object.entries(a.modes[c.shift.mode]).map(([k,v])=>[k,v.C]));
    c.shift.scaleCanvasPerSrc=a.sprite_scale_canvas_per_src;
  }
  return c;
}
export const dog4Contract=()=>loadContract('../characters/dog4.contract.json');
export const frenkContract=()=>loadContract('../characters/frenk.contract.json');
