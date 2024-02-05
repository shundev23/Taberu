import React, { useState, useEffect } from 'react';

function Login() {
    // HTML形式のレスポンスデータを保存するための状態
    const [htmlContent, setHtmlContent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/login');
                if (!response.ok) {
                    throw new Error("Server Error");
                }
                const html = await response.text(); // HTMLとしてレスポンスデータを取得
                setHtmlContent(html); // 状態にHTMLデータを保存
            } catch (error) {
                console.error("failured of getting API Data", error);
                setError(error.toString());
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {error && <p>Server Error: {error}</p>}
            {htmlContent ? (
                // HTMLコンテンツを安全に挿入
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : (
                <p>データの読み込み中...</p>
            )}
        </div>
    );
}

export default Login;
