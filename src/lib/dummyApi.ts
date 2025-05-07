// Fake AI response dene wala function
export const fakeChatAPI = async (prompt: string): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`AI: this response for - "${prompt}" `);
        }, 1000);
    });
};
