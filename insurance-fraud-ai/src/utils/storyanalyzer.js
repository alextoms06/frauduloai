export function analyzeStory(text) {
    if (!text || text.trim().length === 0) {
      return {
        probability: 10,
        verdict: "fake claim",
        reasons: ["empty or missing description"]
      };
    }
  
    const lower = text.toLowerCase();
    let score = 50;
    const reasons = [];
  
    // 1. Length & detail
    if (text.length > 200) score += 15;
    else if (text.length < 80) {
      score -= 15;
      reasons.push("very short description");
    }
  
    // 2. Accident-related keywords
    const accidentWords = [
      "accident", "crash", "hit", "collision", "brake",
      "signal", "speed", "road", "vehicle", "injury"
    ];
    const keywordHits = accidentWords.filter(w => lower.includes(w)).length;
    score += keywordHits * 3;
  
    if (keywordHits < 2) {
      score -= 20;
      reasons.push("lack of accident-related terms");
    }
  
    // 3. Suspicious phrases
    const suspicious = [
      "suddenly", "don’t remember", "not sure",
      "maybe", "i think", "approximately"
    ];
    const suspiciousHits = suspicious.filter(w => lower.includes(w)).length;
    score -= suspiciousHits * 5;
  
    if (suspiciousHits > 2) {
      reasons.push("vague or uncertain narration");
    }
  
    // 4. Time / place consistency
    if (/\b(am|pm|morning|night|evening)\b/.test(lower)) score += 5;
    else {
      score -= 5;
      reasons.push("no clear time reference");
    }
  
    // 5. Numeric realism
    if (/\b\d{2,3}\s?(km\/h|kmh|mph)\b/.test(lower)) score += 8;
    else {
      score -= 5;
      reasons.push("no speed or numeric detail");
    }
  
    // clamp
    score = Math.max(5, Math.min(95, score));
  
    const verdict = score >= 70 ? "genuine claim" : "fake claim";
  
    return {
      probability: score,
      verdict,
      reasons
    };
  }
  