// ═══ КАКИЕ ОЗВУЧКИ ПАКА КАЧАТЬ ЗАРАНЕЕ, И В КАКОМ ПОРЯДКЕ (10.75) ═══
// Чистая функция без сети. «Озвучка» здесь — любой короткий звук, который
// проектор играет голосом по ходу игры: правила раунда (`rules_audio`),
// озвучка вопроса (`media.voice`), звуковые файлы вопроса и ответа.
// Видео, фоновая музыка и треки «Угадай мелодии»/«Своей игры» сюда НЕ
// входят: у мелодии своя предзагрузка (`preloadAudioAll`), а музыка и видео
// большие и играют по-другому.

const AUDIO_EXT = /\.(mp3|wav|m4a|aac|ogg|opus|flac)$/i

export interface VoicePackLike {
  rounds: {
    rules_audio?: string | null
    questions: { hidden?: boolean; media?: { question?: string[]; voice?: string | null; answer?: string[] } }[]
  }[]
}

function roundVoices(r: VoicePackLike['rounds'][number], fromQuestion = 0): string[] {
  const out: string[] = []
  if (fromQuestion === 0 && r.rules_audio) out.push(r.rules_audio)
  r.questions.filter(q => !q.hidden).forEach((q, i) => {
    if (i < fromQuestion) return
    const m = q.media
    if (!m) return
    if (m.voice) out.push(m.voice)
    for (const p of m.question ?? []) if (AUDIO_EXT.test(p)) out.push(p)
    for (const p of m.answer ?? []) if (AUDIO_EXT.test(p)) out.push(p)
  })
  return out
}

/** Все озвучки пака, ближайшие — первыми: остаток текущего раунда (с
 *  правилами, если вопрос ещё не начат), потом следующие раунды по порядку,
 *  в самом конце — уже пройденное (на случай возврата назад). Без повторов. */
export function collectVoicePaths(pack: VoicePackLike, roundNumber: number, questionIndex: number): string[] {
  const rounds = pack.rounds
  const cur = Math.min(Math.max(roundNumber, 0), Math.max(rounds.length - 1, 0))
  const out: string[] = []
  if (rounds[cur]) out.push(...roundVoices(rounds[cur], questionIndex))
  for (let i = cur + 1; i < rounds.length; i++) out.push(...roundVoices(rounds[i]))
  for (let i = 0; i < cur; i++) out.push(...roundVoices(rounds[i]))
  // пройденное в текущем раунде (правила, прошлые вопросы) — в самый хвост
  if (rounds[cur] && questionIndex > 0) out.push(...roundVoices(rounds[cur], 0))
  return [...new Set(out)]
}
