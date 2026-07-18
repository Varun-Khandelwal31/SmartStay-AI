# Prompts Evaluation (Week 7)

This document contains the prompt engineering process and evaluation history for the SmartStay AI Review Analyzer feature.

## Prompt Version 1: Simple Instructions
```
Analyze this hotel review:
"${review}"

Provide:
- sentiment: Positive, Neutral, or Negative
- summary: 2-3 sentence summary
- keyIssues: list of issues mentioned in the review
- hotelResponse: a professional response to this guest review
- priority: Low, Medium, or High
```

## Prompt Version 2: Detailed Guidelines and Rules
```
You are an expert hotel guest relations manager. Analyze the guest review and generate structured insights. 
You must output a JSON object that adheres exactly to the following rules:
1. "sentiment": Strictly one of: "Positive", "Neutral", "Negative".
2. "summary": A concise 2-3 sentence summary of the guest's main feedback points.
3. "keyIssues": An array of strings representing the main issues or highlights mentioned (e.g., "Cleanliness", "Room Service", "Staff Behavior"). If no specific issues are highlighted, provide an empty array [].
4. "hotelResponse": A professional, empathetic, and polite response draft written from the perspective of the hotel manager. Address the key issues directly. If the review is negative, apologize sincerely and offer action. If positive, thank the guest.
5. "priority": Strictly one of: "Low", "Medium", "High". Assign "High" for safety/health hazards or major complaints, "Medium" for minor complaints or mixed reviews, and "Low" for positive reviews.
```

## Prompt Version 3: Few-Shot Examples (Structured Format)
```
You are a hospitality AI assistant. Analyze the guest review and output JSON matching the required schema.

Example 1:
Input: "The room was extremely dirty and the staff ignored my complaints about the broken AC."
Output:
{
  "sentiment": "Negative",
  "summary": "The guest had a poor experience due to room cleanliness and a malfunctioning air conditioner. They also felt ignored by the staff when raising these concerns.",
  "keyIssues": ["Cleanliness", "Broken AC", "Staff Behavior"],
  "hotelResponse": "Dear Guest, We sincerely apologize for the unacceptable state of your room and the lack of responsiveness from our team regarding your AC issues. This does not reflect our standards. We are addressing these concerns with our housekeeping and maintenance staff immediately to ensure it does not happen again. We hope you will give us another chance in the future.",
  "priority": "High"
}

Analyze the following review:
"${review}"
```

---

## Evaluation

### Example Input Review
> *"We checked in late and the room smelled like smoke even though we booked a non-smoking room. The front desk staff was friendly and quickly changed our room to a clean one. The rest of our stay was great and the breakfast was delicious."*

### Example Output (from Prompt Version 2)
```json
{
  "sentiment": "Neutral",
  "summary": "Although the guest initial room smelled like smoke despite booking a non-smoking room, the staff was friendly and quickly accommodated them with a clean room. The remainder of the stay was pleasant, and the breakfast was highly appreciated.",
  "keyIssues": [
    "Initial room odor / Smoke smell",
    "Room booking issue"
  ],
  "hotelResponse": "Dear Guest, Thank you for sharing your feedback. We apologize for the initial inconvenience regarding the smoke odor in your assigned room. We are glad our front desk team resolved this quickly for you. It is wonderful to hear you enjoyed the rest of your stay, especially our breakfast. We look forward to welcoming you back for an flawless stay.",
  "priority": "Medium"
}
```

---

## Best Performing Prompt

**Selected Prompt**: **Prompt Version 2**

### Reason for Choice
1. **Consistency with Gemini Native JSON Features**: Gemini 1.5 and 2.5 models support structured outputs natively via `responseSchema` and `responseMimeType`. Prompt Version 2 focuses on providing the logical rules and guidelines rather than micro-managing JSON syntax or few-shot patterns, allowing the model to naturally use the schema definitions.
2. **Clear Operational Guidelines**: Version 2 explains *how* to classify priority levels (High for safety/health, Medium for minor complaints, Low for positive reviews) and how to craft responses depending on sentiment (apologetic for negative, grateful for positive).
3. **No Halucinated Examples**: Few-shot prompts (Version 3) can sometimes bias the model's responses to mimic the style or wording of the examples too closely. Version 2 encourages dynamic, review-specific insights while strictly adhering to the schema boundaries.
