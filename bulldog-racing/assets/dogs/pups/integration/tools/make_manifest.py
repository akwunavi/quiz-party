#!/usr/bin/env python3
"""Builds ../../MANIFEST.json — the integration manifest of Bulldog No.4 «Пупс» (technical id dog4) — from the approved files as they are:
SHA-256 / bytes are read from disk (this branch) or from git (race alpha masters in Codex branches); geometry (paw line, body centre) is
measured on the alpha. Nothing is re-encoded or changed. usage: python3 tools/make_manifest.py  (run from bulldog4-pups/integration_v1)"""
import json,hashlib,os,subprocess,numpy as np
from PIL import Image
H=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));P=os.path.dirname(H);R=os.path.dirname(P)   # integration_v1, bulldog4-pups, repo
def sha(rel):
    b=open(os.path.join(R,rel),'rb').read();return {'path':rel,'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b)}
def gitsha(branch,path):
    ref='origin/'+branch;b=subprocess.run(['git','-C',R,'show',f'{ref}:{path}'],capture_output=True,check=True).stdout
    return {'git':f'{branch}:{path}','commit':subprocess.run(['git','-C',R,'rev-parse',ref],capture_output=True,text=True).stdout.strip(),'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b)}
def geo(a):
    a=a.astype(float);m=a>128;ys,xs=np.nonzero(m)
    return dict(bodyCenterX=round(float((a.sum(0)*np.arange(a.shape[1])).sum()/a.sum()),2),pawLineY=int(ys.max()),top=int(ys.min()))
G0='bulldog4-pups/front_stand_g0/G0_FRONT_STAND_alpha_1276.png'
g0=geo(np.asarray(Image.open(os.path.join(R,G0)))[...,3])
gates=json.load(open(os.path.join(P,'selection_v2/results/gates.json')))['gates']
atlas=json.load(open(os.path.join(R,'dog4-v3-lab/manifest.json')));layout=json.load(open(os.path.join(R,'dog4-v3-lab/layout.json')))
A=lambda clip:{**sha('dog4-v3-lab/'+atlas['clips'][clip]['file']),'frames':atlas['clips'][clip]['frames']}
base=np.asarray(Image.open(os.path.join(R,'dog4-v3-lab/assets/base.png')).convert('RGBA'))[...,3]
bg=geo(base[:atlas['cellHeight'],:atlas['cellWidth']])
sx=layout['spriteWidth']/atlas['cellWidth'];sy=layout['spriteHeight']/atlas['cellHeight']
ACC,WRK='ACCEPTED','WORKING'
M={
 'schema':'bulldog4-pups/character-manifest/1',
 'id':'dog4','name':'Пупс','number':4,
 'technicalIds':{'id':'dog4','legacy':['bulldog4','DOG4_*'],'note':'технические имена не переименовываются (решение 23.10.2026)'},
 'notDog5':'Это собака №4 «Пупс». Собака №5 — отдельная работа Codex, к этому пакету не относится.',
 'version':'pups-integration-1.0.1','date':'2026-11-02',
 'fps':24,
 'statusLegend':{ACC:'принято пользователем окончательно (движение / решение); не переделывается',
   WRK:'технически готово и проверено (входит в эталон V3 / собрано по утверждённому правилу), отдельного «утверждаю» пользователя нет; переделка не планируется',
   'NOT_A_DOG_ASSET':'делает игровой движок, не клип собаки'},
 'docs':{'status':'bulldog4-pups/STATUS.md','readme':'bulldog4-pups/integration_v1/README.md','assets':'bulldog4-pups/integration_v1/ASSET_REGISTRY.md',
   'states':'bulldog4-pups/integration_v1/STATES_AND_TRANSITIONS.md','audit':'bulldog4-pups/DOG4_PUPS_AUDIT.md','decisions':'bulldog4-pups/DECISIONS.md'},
 'selection':{
  'frame':{'width':1276,'height':720,'note':'все клипы экрана выбора — полный кадр 1276×720 анфас, одна и та же камера; рисовать одним и тем же преобразованием'},
  'display':{'reference':'638×360 (масштаб 0,5) — так проверено в лабораториях selection_v1/v2',
    'scale':'единый для FRONT_STAND, IDLE и SELECTED; без поклипового сдвига и масштаба',
    'cardRule':'ОБЯЗАТЕЛЬНО: верхний край изображения = верхний край области отображения карточки (overflow: hidden). На SELECTED s63–s70 кончики ушей уходят за верхний край кадра — так они уходят за край карточки. Над кадром не должно быть видимого фона, иначе виден ровный срез ушей. Растушёвка, уменьшение персонажа и сдвиг кадров запрещены (решение пользователя 02.11.2026).'},
  'anchor':{'pawLineY':g0['pawLineY'],'bodyCenterX':g0['bodyCenterX'],'units':'px полного кадра 1276×720 (alpha > 128), по G0',
    'stability':'s0, s120 и все 104 ворот IDLE совпадают с G0: сдвиг центра ≤ 0,2 px, линия лап ± 1 px (selection_v2/results/seams_alpha_geometry.json)'},
  'states':{
   'FRONT_STAND':{'status':ACC,'role':'опорная поза экрана выбора (G0); как статичная картинка — для превью/загрузки, в цикле не вставляется','asset':{**sha(G0),'format':'PNG RGBA 1276×720'},'studio':sha('bulldog4-pups/front_stand_g0/G0_FRONT_STAND_studio_1276.png')},
   'IDLE':{'status':ACC,'role':'ожидание выбора, бесконечный цикл f0→f239→f0','asset':{**sha('bulldog4-pups/idle_loop_v1/alpha/DOG4_IDLE_v1_alpha_loop240.webm'),'format':'WebM VP9 + alpha (ALPHA_MODE=1), 1276×720, 24 к/с'},
     'frames':240,'durationS':10.0,'loop':True,'source':sha('bulldog4-pups/idle_g1/DOG4_IDLE_G1_kling_original.mp4'),'build':'bulldog4-pups/idle_loop_v1/ (тон к G0, alpha)','note':'IDLE G1; спокойные участки не сокращаются (решение 02.11.2026)'},
   'SELECTED':{'status':ACC,'role':'реакция на выбор: улыбка, один подскок обеими передними лапами, возврат в G0; один раз целиком','asset':{**sha('bulldog4-pups/selected_v4_game/alpha/DOG4_SELECTED_v4_alpha_s0-s120.webm'),'format':'WebM VP9 + alpha (ALPHA_MODE=1), 1276×720, 24 к/с'},
     'frames':121,'durationS':round(121/24,3),'loop':False,'source':sha('bulldog4-pups/selected_g2v4/DOG4_SELECTED_G2v4_kling_original.mp4'),'build':'bulldog4-pups/selected_v4_game/ (тон к G0, alpha)',
     'knownImperfection':'s63–s70 (0,33 с): кончики ушей за верхним краем кадра — оставлено как есть, см. display.cardRule'},
   'RETURN_TO_IDLE':{'status':'NOT_NEEDED','note':'отдельного клипа нет и не будет: SELECTED сам кончается в G0, дальше IDLE с f1'}},
  'transitions':[
   {'from':'IDLE','to':'IDLE','when':'f239 → f0, цикл'},
   {'from':'IDLE','to':'SELECTED','when':'выбор подтверждён на любом кадре IDLE: IDLE доигрывает вперёд своими кадрами до ближайших ворот (кадр ворот показывается), со следующего кадра — SELECTED s0'},
   {'from':'SELECTED','to':'IDLE','when':'после s120 — сразу IDLE f1 (s120 ≈ G0 ≈ f0, f0 второй раз не показывается)'},
   {'from':'SELECTED / IDLE','to':'RACE','when':'смена экрана игрой; клипа-моста анфас → гонка нет (в V3 гонка начинается с RACE_STAND = BASE)'}],
  'policy':{'pick':'на любом кадре IDLE','wait':'только вперёд, без обратной перемотки, без кроссфейда, без статичной паузы на G0',
    'gates':gates,'gateRanges':['f0–f23','f29–f37','f74–f93','f181–f197','f206–f239'],
    'gateRule':'кадр IDLE отличается от G0 ≤ 1,2/255 (кадр 319×180) и глаза открыты (область глаз ≤ 7/255)',
    'maxWait':{'frames':87,'s':3.625,'pickAt':'f94','gate':'f181'},'meanWaitS':0.789,'waitHistogramFrames':{'<1 s':163,'1–2 s':37,'2–3 s':24,'3–3.62 s':16},
    'selectedPlays':'один раз, полностью, без прерывания; повторный выбор во время ожидания и SELECTED игнорируется',
    'afterSelected':{'clip':'IDLE','frame':1},'returnToIdleClip':None,'crossfade':False},
  'runtime':'bulldog4-pups/integration_v1/runtime/dog4_selection.mjs',
  'lab':'bulldog4-pups/selection_v2/ (REPORT.md, results/DELAY_TABLE.md)'},
 'race':{
  'engine':'Race V3 (физика общая, не меняется этим пакетом): dog4-v3-lab/model.mjs',
  'atlas':{'manifest':sha('dog4-v3-lab/manifest.json'),'cellWidth':atlas['cellWidth'],'cellHeight':atlas['cellHeight'],'columns':atlas['columns'],
    'copy':'race-v3-frenk-lab/dog4assets/ — побайтная копия тех же PNG (аудит 23.10.2026)'},
  'layout':{**sha('dog4-v3-lab/layout.json'),'spriteWidth':layout['spriteWidth'],'spriteHeight':layout['spriteHeight'],'spriteAnchorX':layout['spriteAnchorX'],'spriteTopOffset':layout['spriteTopOffset'],
    'draw':'drawImage(cell, x − spriteAnchorX, laneY − spriteTopOffset, spriteWidth, spriteHeight), x — позиция собаки на трассе, laneY — линия дорожки (dog4-v3-lab/app.mjs)',
    'scaleFromCell':[round(sx,4),round(sy,4)]},
  'anchor':{'pawLineCellY':bg['pawLineY'],'pawLineSpriteY':round(bg['pawLineY']*sy,1),'pawLineWorld':'≈ laneY (spriteTopOffset 110 ≈ линия лап BASE 95 × 1,16)',
    'bodyCenterCellX':bg['bodyCenterX'],'bodyCenterSpriteX':round(bg['bodyCenterX']*sx,1),'note':'по ячейке BASE (alpha > 128); у всех клипов первый/последний кадр стойки — линия лап 94–95'},
  'contract':{**sha('race-v3-p3-lab/characters/dog4.contract.json'),'note':'тождествен dog4-v3-lab/model.mjs frameFor (тест P3 T2 PASS)'},
  'states':{
   'RACE_STAND':{'status':ACC,'v3':'BASE','atlas':A('BASE'),'sampler':'constant frame 0','windows':'0,5 с до старта; 1,5 с после финиша','master':gitsha('codex/dog4-run-reference-20261012','DOG4_BASE_STAND.png'),'note':'= START f0 (= RUN #0), боковая стойка'},
   'START':{'status':ACC,'v3':'START','atlas':A('START'),'sampler':'bands [[24,72],[16,24]] → 40 кадров за 1,000 с','master':gitsha('codex/bulldog4-technical-audit-20261009','dog4-start-alpha.webm'),'timing':'рабочий V3'},
   'RUN':{'status':ACC,'v3':'RUN','atlas':A('RUN'),'sampler':'пролог #0–10, затем цикл #11–22 (12 кадров = 0,5 с)','master':gitsha('preview/bulldog-04-alpha-20261008','dog4-run-alpha.webm'),'note':'alpha утверждена, цикл #11–22 — рабочий'},
   'STOP':{'status':ACC,'v3':'STOP','atlas':A('STOP'),'sampler':'24 к/с, 37 кадров = 1,542 с','master':gitsha('codex/dog4-stop-asset-20261012','dog4_stop_alpha.webm')},
   'FINISH':{'status':WRK,'v3':'FINISH_DECELERATE → BASE','atlas':'= STOP, затем RACE_STAND','sampler':'STOP 37 кадров, затем BASE 1,5 с','note':'отдельного клипа нет, как у Фрэнка'},
   'SNIFF_PEE':{'status':ACC,'v3':'SNIFF_PEE','atlas':A('SNIFF_PEE'),'sampler':'bands [[48,24],[82,48],[20,24],[55,32],[24,24]] → 229 кадров за 7,260 с','master':gitsha('codex/dog4-final-timing-20261012','dog4_sniff_pee_optimized_alpha.webm'),'timing':'движение утверждено, тайминг рабочий'},
   'RETURN':{'status':WRK,'v3':'RETURN (часть события SNIFF_PEE)','atlas':A('RETURN'),'sampler':'bands [[16,48],[68,40],[8,24],[17,48]] → 109 кадров за 2,721 с','master':gitsha('codex/dog4-return-montage-20261012','dog4_return_A_alpha.webm'),'note':'не путать с RETURN_TO_IDLE экрана выбора'},
   'BUTTERFLY':{'status':WRK,'v3':'BUTTERFLY','atlas':A('BUTTERFLY'),'sampler':'24 к/с, 121 кадр = 5,042 с','master':gitsha('codex/dog4-butterfly-20261013','dog4_butterfly_alpha.webm'),
     'note':'ТОЛЬКО реакция собаки: бабочка из исходного Kling вырезана маской. Саму бабочку создаёт игровой движок отдельно.'},
   'ROLL':{'status':ACC,'v3':'ROLL','atlas':A('ROLL'),'sampler':'24 к/с, 145 кадров = 6,042 с, без RETURN','master':gitsha('codex/dog4-roll-alpha-20261013','dog4_roll_alpha.webm'),'note':'хореография утверждена (13.10), стыки рабочие'},
   'BUTTERFLY_OBJECT':{'status':'NOT_A_DOG_ASSET','note':'летящую бабочку создаёт игровой движок в координатах мира и синхронизирует с реакцией Пупса по контракту Race V3 (решение 02.11.2026); в пакете собаки её нет. Справка: в исходном Kling бабочка была видна ≈ #29–77'}},
  'v3Events':[
   {'event':'перед стартом','segments':['BASE 0,5 с','START','RUN']},
   {'event':'BUTTERFLY','segments':['RUN','STOP','BUTTERFLY','START','RUN']},
   {'event':'SNIFF_PEE','segments':['RUN','STOP','SNIFF_PEE','RETURN','START','RUN']},
   {'event':'ROLL','segments':['RUN','STOP','ROLL','START','RUN']},
   {'event':'событие в самом начале (early)','segments':['BASE','<действие>','(RETURN)','START','RUN'],'note':'STOP пропускается, собака ещё не стартовала'},
   {'event':'финиш','segments':['RUN','FINISH_DECELERATE (= STOP)','BASE 1,5 с']}],
  'joins':'все стыки замерены в аудите (DOG4_PUPS_AUDIT.md §2.2, audit_evidence/joins_alpha_metrics.json): линия лап на стыках стоек 0…±0,6 px игры'},
 'handoff':'Экран выбора (анфас, 1276×720) и гонка (боковой спрайт 207×116) — разные экраны с разными масштабами; переход — смена экрана игрой. Клипа «анфас → старт» у Пупса нет; V3 его не требует.',
 'blockingDefects':[],
 'acceptance':{'date':'2026-11-02','package':'61f7a6e','status':'ACCEPTED — библиотека Пупса завершена; дальше — общая сборка Bulldog Racing по этому манифесту',
   'firstCommonRace':'Пупс №4 + Фрэнк №1 + Зефир №2',
   'decisions':['масштаб и якоря гонки — как есть (ячейка 178×100 → спрайт 207×116, anchor 148/110); без выявленного дефекта не пересчитывать',
     'BUTTERFLY — существующая alpha-реакция без бабочки; бабочку создаёт движок и синхронизирует с реакцией по контракту Race V3; новых анимаций нет',
     'IDLE и SELECTED — как есть; спокойные участки IDLE не сокращать; карточка обрезает по верхнему краю кадра',
     'известные допустимые несовершенства гоночных анимаций заранее не перерабатываются'],
   'notYet':'merge, deploy, production и изменения Race V3 — не выполняются до отдельного решения'},
 'openDecisions':[],
 'knownLimitations':'см. bulldog4-pups/integration_v1/README.md, «Известные допустимые ограничения»'}
open(os.path.join(P,'MANIFEST.json'),'w').write(json.dumps(M,ensure_ascii=False,indent=1)+'\n')
print('G0',g0,'BASE cell',bg)
