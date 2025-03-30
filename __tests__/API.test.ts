test("api is working properly", async () => {
    const res = await fetch("https://text.pollinations.ai/models", {
        method: "GET"
    });
    
    const status = res.status;
    expect(status).toBe(200);
});