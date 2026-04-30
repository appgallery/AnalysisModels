import axios from "axios";

const callOllama = async (model, systemPrompt, sampleData) => {
    const prompt = `
System:
${systemPrompt}

IMPORTANT OUTPUT RULE:
Return ONLY raw JSON.
Do NOT wrap in markdown.
Do NOT use \`\`\`json
Do NOT add explanations, notes, headings, or extra text.
Output must be valid JSON only.

If NO issues exist, return { \"issues\": [] }.

User Data:
${JSON.stringify(sampleData, null, 2)}
`;
        console.log("Process start")
    const response = await axios.post(process.env.OLLAMA_URL, {
        model: model,
        prompt: prompt,
        stream: false,
    });
    console.log("Process Completed")
    console.log("Response", response.data)
    // const data = await response.response.json();
    return JSON.parse(response.data.response);
};


const handleRequest = async (req, res, model) => {
    console.log("API Called")
    try {
        const { systemPrompt, sampleData } = req.body;

        if (!systemPrompt || !sampleData) {
            return res.status(400).json({
                success: false,
                message: "systemPrompt and sampleData are required",
            });
        }
        console.log("Going to model")
        const result = await callOllama(model, systemPrompt, sampleData);

        res.json({
            success: true,
            model,
            issues: result.issues,
        });
        console.log("API Response:", JSON.stringify(responsePayload, null, 2));

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const reviewWithModel1 = (req, res) =>
    handleRequest(req, res, process.env.MODEL_1);

export const reviewWithModel2 = (req, res) =>
    handleRequest(req, res, process.env.MODEL_2);

export const reviewWithModel3 = (req, res) =>
    handleRequest(req, res, process.env.MODEL_3);

export const reviewWithModel4 = (req, res) =>
    handleRequest(req, res, process.env.MODEL_4);