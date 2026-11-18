import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const css=readFileSync(new URL('../src/design-system.css',import.meta.url),'utf8');
const light=css.match(/:root\s*\{([\s\S]*?)\}/)[1];
const dark=css.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\}/)[1];
const parse=section=>Object.fromEntries([...section.matchAll(/(--[\w-]+):\s*(#[\da-fA-F]{6})/g)].map(([,name,value])=>[name,value]));
function luminance(hex){const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];}
function contrast(a,b){const values=[luminance(a),luminance(b)].sort((x,y)=>x-y);return (values[1]+.05)/(values[0]+.05);}
for(const [mode,tokens] of [['light',parse(light)],['dark',{...parse(light),...parse(dark)}]]) {
  for(const [foreground,background] of [['--body','--page'],['--body','--surface'],['--body','--surface-muted'],['--body','--surface-warm'],['--ink','--surface-warm'],['--accent-text','--page'],['--accent-text','--surface'],['--accent-text','--surface-muted'],['--accent-text','--surface-warm'],['--accent-text','--accent-soft'],['--on-accent','--accent'],['--on-inverse','--inverse'],['--inverse-muted','--inverse'],['--error','--error-bg'],['--success','--success-bg'],['--focus','--page'],['--focus','--surface-muted']]) {
    test(`${mode}: ${foreground} on ${background} meets 4.5:1`,()=>{const ratio=contrast(tokens[foreground],tokens[background]);assert.ok(ratio>=4.5,`${ratio.toFixed(2)}:1`);});
  }
}
