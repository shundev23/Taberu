import React, { useEffect, useState } from 'react';
import './Taberu.css';

function Taberu() {
    const [taberuTop, setTaberuTop] = useState(null);
    const [taberuList, setTaberuList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/Taberu');
                if (!response.ok) {
                    throw new Error("サーバーエラー");
                }
                const data = await response.json();
                console.log(data); // レスポンスデータの確認

                if (data.taberu_top && data.taberu_top.length > 0) {
                    setTaberuTop(data.taberu_top[0]);
                }
                if (data.taberu_list) {
                    setTaberuList(data.taberu_list);
                }
            } catch (error) {
                console.error("APIからのデータ取得中に失敗しました。:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="Taberu-Top">
            {taberuTop ? (
                <div className="row align-items-center my-5">
                    <div className="col-lg-7">
                        <img 
                            className="img-fluid rounded mb-4 mb-lg-0" 
                            src={taberuTop.image ? taberuTop.image : 'path/to/static/images/main_image.jpg'} 
                            alt=""
                        />
                    </div>
                    <div className="col-lg-5">
                        <h1 className="font-weight-light">{taberuTop.title}</h1>
                        <p>{taberuTop.description}</p>
                        <a className="btn btn-primary" href={`Taberu/detail/${taberuTop.id}`}>詳細</a>
                    </div>
                </div>
            ) : (
                <p>データをロード中...</p>
            )}

            <div className="card text-white bg-secondary my-5 py-4 text-center">
                <div className="card-body">
                    <p className="text-white m-0">今日はどのオムライスを食べようか。</p>
                </div>
            </div>

            <div className="row">
                {taberuList.map(taberu => (
                    <div className="col-md-4 mb-5" key={taberu.id}>
                        <div className="card h-100">
                            <img 
                                className="card-img-top" 
                                src={taberu.image ? taberu.image.url : 'path/to/static/images/01.jpg'} 
                                alt={taberu.title}
                            />
                            <div className="card-body">
                                <h2 className="card-title">{taberu.title}</h2>
                                <p className="card-text">{taberu.description}</p>
                            </div>
                            <div className="card-footer">
                                <a href={`Taberu/detail/${taberu.id}`} className="btn btn-primary btn-sm">詳しく見る</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Taberu;
